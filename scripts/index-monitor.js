/**
 * Science News Hub Automated 1-Hour Indexing Monitor & Email Alert
 * 
 * Flow:
 * 1. Submits article URL to Google Indexing API & IndexNow
 * 2. Monitors Google Search Console Index status every 15 minutes
 * 3. If NOT indexed after 60 minutes -> Sends high-priority Email Alert via Resend API
 * 4. If INDEXED -> Sends celebratory confirmation email and exits
 * 
 * Zero external dependencies: Uses native Node.js https & crypto modules.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const DOMAIN = 'https://sciencenewshub.click';
const SITE_URL = 'https://sciencenewshub.click/';
const SA_PATH = path.join(rootDir, 'service-account.json');
const CONFIG_PATH = path.join(rootDir, 'alert-config.json');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body });
      });
    });

    req.on('error', err => reject(err));
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * 1. Load Alert Config
 */
export function loadAlertConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.log(`⚠️ [Alert Monitor] alert-config.json not found.`);
    console.log(`   Creating default alert-config.json template...`);
    const defaultTemplate = {
      recipientEmail: "dulakshasandeepa2001@gmail.com",
      resendApiKey: "re_YOUR_RESEND_API_KEY_HERE"
    };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultTemplate, null, 2), 'utf8');
    return defaultTemplate;
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

/**
 * 2. Send Email via Resend API
 */
export async function sendEmailAlert({ to, subject, html }) {
  const config = loadAlertConfig();
  const apiKey = config.resendApiKey;

  if (!apiKey || apiKey.includes('YOUR_RESEND_API_KEY')) {
    console.log(`⚠️ [Email Alert] Resend API key is not configured in alert-config.json.`);
    console.log(`   Please add your free API key from https://resend.com to activate email notifications.`);
    return false;
  }

  const payload = JSON.stringify({
    from: 'Science News Hub Monitor <onboarding@resend.dev>',
    to: [to || config.recipientEmail],
    subject: subject,
    html: html
  });

  try {
    const res = await makeRequest({
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);

    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log(`📧 [Email Alert] Email successfully delivered to: ${to || config.recipientEmail}`);
      return true;
    } else {
      console.log(`⚠️ [Email Alert] Resend returned HTTP ${res.statusCode}: ${res.body}`);
      return false;
    }
  } catch (err) {
    console.log(`⚠️ [Email Alert] Failed to send email: ${err.message}`);
    return false;
  }
}

/**
 * 3. Google OAuth2 Token for Search Console
 */
async function getSearchConsoleToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64UrlEncode(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }));

  const signatureInput = `${header}.${claims}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(sa.private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const jwt = `${signatureInput}.${signature}`;
  const postData = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt
  }).toString();

  const res = await makeRequest({
    hostname: 'oauth2.googleapis.com',
    port: 443,
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, postData);

  if (res.statusCode !== 200) {
    throw new Error(`OAuth2 error: ${res.statusCode} - ${res.body}`);
  }

  const json = JSON.parse(res.body);
  return json.access_token;
}

/**
 * 4. Check Google Index Status
 */
async function checkIndexStatus(token, targetUrl) {
  const payload = JSON.stringify({
    inspectionUrl: targetUrl,
    siteUrl: SITE_URL
  });

  try {
    const res = await makeRequest({
      hostname: 'searchconsole.googleapis.com',
      port: 443,
      path: '/v1/urlInspection/index:inspect',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);

    if (res.statusCode === 200) {
      const data = JSON.parse(res.body);
      const indexResult = data.inspectionResult?.indexStatusResult;
      const coverage = indexResult?.coverageState || 'UNKNOWN';
      const verdict = indexResult?.verdict || 'NEUTRAL';
      const lastCrawl = indexResult?.lastCrawlTime || 'Never';

      const isIndexed = coverage.toLowerCase().includes('indexed') || verdict === 'PASS';
      return {
        success: true,
        isIndexed,
        coverage,
        verdict,
        lastCrawl
      };
    } else {
      return {
        success: false,
        error: `HTTP ${res.statusCode}: ${res.body}`
      };
    }
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
}

/**
 * 5. Helper: Sleep
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * MAIN MONITOR LOOP
 */
export async function monitorArticle(targetUrl, waitMinutes = 60) {
  console.log(`=======================================================`);
  console.log(`🕵️ Science News Hub: 1-Hour Indexing Monitor & Alert`);
  console.log(`=======================================================`);
  console.log(`Target URL: ${targetUrl}`);
  console.log(`Monitoring Window: ${waitMinutes} Minutes\n`);

  const alertConfig = loadAlertConfig();
  console.log(`Alert Recipient: ${alertConfig.recipientEmail}`);

  // 1. Initial Fast-Index Trigger
  try {
    const { submitGoogleIndexing, submitIndexNow } = await import('./fast-index.js');
    console.log(`⚡ [Initial Submit] Triggering instant indexing via Google Indexing API & IndexNow...`);
    await submitIndexNow([targetUrl]);
    await submitGoogleIndexing([targetUrl]);
  } catch (e) {
    console.log(`ℹ️ Initial trigger notice: ${e.message}`);
  }

  if (!fs.existsSync(SA_PATH)) {
    console.log(`❌ Service account file not found at ${SA_PATH}`);
    return;
  }

  const sa = JSON.parse(fs.readFileSync(SA_PATH, 'utf8'));
  const checkIntervalMinutes = 15;
  const totalChecks = Math.floor(waitMinutes / checkIntervalMinutes);
  let elapsedMinutes = 0;

  for (let i = 1; i <= totalChecks; i++) {
    console.log(`\n⏳ [Check ${i}/${totalChecks}] Waiting ${checkIntervalMinutes} minutes before index verification (Elapsed: ${elapsedMinutes}m)...`);
    await sleep(checkIntervalMinutes * 60 * 1000);
    elapsedMinutes += checkIntervalMinutes;

    console.log(`🔍 [Check ${i}/${totalChecks}] Authenticating with Google Search Console API...`);
    try {
      const token = await getSearchConsoleToken(sa);
      const status = await checkIndexStatus(token, targetUrl);

      if (status.success) {
        console.log(`📊 Google Coverage: ${status.coverage} | Verdict: ${status.verdict} | Last Crawled: ${status.lastCrawl}`);
        if (status.isIndexed) {
          console.log(`🎉 [SUCCESS] Article is confirmed INDEXED by Google!`);
          
          // Send Success Confirmation Email
          await sendEmailAlert({
            to: alertConfig.recipientEmail,
            subject: `✅ [INDEXED] Article is Live on Google Search | Science News Hub`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                <h2 style="color: #22543d; margin-top: 0;">🎉 Good News! Your Article is Indexed by Google</h2>
                <p style="font-size: 15px; color: #4a5568;">Your article was successfully indexed within <strong>${elapsedMinutes} minutes</strong>.</p>
                <div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 15px; border-radius: 4px; margin: 20px 0;">
                  <strong>Article URL:</strong><br />
                  <a href="${targetUrl}" style="color: #2b6cb0;">${targetUrl}</a><br /><br />
                  <strong>Coverage Status:</strong> ${status.coverage}<br />
                  <strong>Googlebot Last Crawl:</strong> ${status.lastCrawl}
                </div>
                <p style="font-size: 13px; color: #718096;">Automated notification from Science News Hub Indexing Suite.</p>
              </div>
            `
          });
          return;
        }
      } else {
        console.log(`ℹ️ Note: Search Console API check returned: ${status.error}`);
      }
    } catch (err) {
      console.log(`⚠️ Search Console Token Error: ${err.message}`);
    }
  }

  // If we reach here, 60 minutes have elapsed and article is NOT indexed
  console.log(`\n🚨 [ALERT] Article is STILL NOT INDEXED after ${waitMinutes} minutes!`);
  console.log(`📧 Sending high-priority Alert Email to ${alertConfig.recipientEmail}...`);

  const inspectLink = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE_URL)}&id=${encodeURIComponent(targetUrl)}`;

  const alertSent = await sendEmailAlert({
    to: alertConfig.recipientEmail,
    subject: `🚨 [ALERT] Article NOT Indexed After 1 Hour | Science News Hub`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #e53e3e; border-radius: 12px; background: #fff;">
        <div style="background: #fff5f5; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #c53030; margin: 0 0 8px 0; font-size: 20px;">⚠️ Google Indexing Timeout Alert (60 Mins)</h2>
          <p style="color: #4a5568; margin: 0; font-size: 14px;">The article below has not been indexed by Google after <strong>1 hour</strong> of publishing.</p>
        </div>

        <div style="background: #f7fafc; padding: 16px; border-radius: 8px; border: 1px solid #edf2f7; margin-bottom: 24px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #718096; font-weight: bold;">Target Article:</p>
          <a href="${targetUrl}" style="color: #2b6cb0; word-break: break-all; font-weight: bold; font-size: 15px;">${targetUrl}</a>
        </div>

        <h3 style="color: #1a202c; font-size: 16px; margin: 0 0 12px 0;">Recommended Immediate Actions:</h3>
        <ol style="color: #4a5568; font-size: 14px; line-height: 1.7; padding-left: 20px; margin-bottom: 24px;">
          <li>Click the button below to open Google Search Console URL Inspection.</li>
          <li>Click <strong>"TEST LIVE URL"</strong> to ensure Googlebot does not hit any block or soft 404.</li>
          <li>Click <strong>"REQUEST INDEXING"</strong> to manually bump priority queue.</li>
        </ol>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${inspectLink}" style="background: #e53e3e; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block;">
            OPEN SEARCH CONSOLE URL INSPECTION →
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 12px; color: #a0aec0; margin: 0;">Automated real-time alert sent by Science News Hub Fast Indexing Suite.</p>
      </div>
    `
  });

  if (alertSent) {
    console.log(`✓ [Alert Monitor] Alert email sent successfully.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  let targetUrl = null;

  const urlIdx = args.indexOf('--url');
  if (urlIdx !== -1 && args[urlIdx + 1]) {
    targetUrl = args[urlIdx + 1];
  } else {
    targetUrl = `${DOMAIN}/`;
  }

  // Check if testing email directly
  if (args.includes('--test-email')) {
    const config = loadAlertConfig();
    console.log(`Testing Resend email delivery to ${config.recipientEmail}...`);
    await sendEmailAlert({
      to: config.recipientEmail,
      subject: `🧪 [Test] Science News Hub Indexing Alert Test`,
      html: `<h3>Test email working! Your Indexing Email Alert system is active.</h3>`
    });
    return;
  }

  const waitMinutes = 60;
  await monitorArticle(targetUrl, waitMinutes);
}

if (process.argv[1] && process.argv[1].endsWith('index-monitor.js')) {
  main();
}
