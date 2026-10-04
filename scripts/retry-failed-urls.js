import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const FAILED_URLS = [
  'https://sciencenewshub.click/article/atlas-comet',
  'https://sciencenewshub.click/article/comet-lemmon-tail-disruption',
  'https://sciencenewshub.click/article/volcanic-eruption-prediction-mount-etna',
  'https://sciencenewshub.click/article/celtic-metal-coins-discovery',
  'https://sciencenewshub.click/article/nobel-prize-chemistry-2025',
  'https://sciencenewshub.click/article/nobel-prize-physics-2025',
  'https://sciencenewshub.click/article/nobel-prize-medicine-2025',
  'https://sciencenewshub.click/article/dinosaur-fossil-crocodile-bone',
  'https://sciencenewshub.click/article/cleopatra-sunken-port-discovery',
  'https://sciencenewshub.click/article/artemis-2-astronauts-ready-mission',
  'https://sciencenewshub.click/article/silverpit-crater-asteroid-impact',
  'https://sciencenewshub.click/article/oldest-mummies-southeast-asia',
  'https://sciencenewshub.click/article/british-pilot-mars-simulation',
  'https://sciencenewshub.click/article/military-drone-mothership',
  'https://sciencenewshub.click/article/russia-enteromix-vaccine',
  'https://sciencenewshub.click/article/changan-nevo-a06',
  'https://sciencenewshub.click/article/china-ar-helmet',
  'https://sciencenewshub.click/article/black-death',
  'https://sciencenewshub.click/article/space-plane',
  'https://sciencenewshub.click/article/orange-shark',
  'https://sciencenewshub.click/article/uranus-moon',
  'https://sciencenewshub.click/article/sony-robots',
  'https://sciencenewshub.click/article/aspirin-replacement',
  'https://sciencenewshub.click/article/zombie-virus-rabbits-study',
  'https://sciencenewshub.click/article/florida-panther-habitat-expansion',
  'https://sciencenewshub.click/article/einstein-ring-black-hole',
  'https://sciencenewshub.click/article/spacecraft-black-hole-journey',
  'https://sciencenewshub.click/article/ancient-forest-under-arctic-ice',
  'https://sciencenewshub.click/blog/prime-numbers-cryptography',
  'https://sciencenewshub.click/blog/exoplanets-search-life',
  'https://sciencenewshub.click/blog/crispr-gene-editing',
];
function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')); });
    if (postData) req.write(postData);
    req.end();
  });
}
function b64u(str) {
  return Buffer.from(str).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
async function getToken(sa) {
  const now = Math.floor(Date.now()/1000);
  const h = b64u(JSON.stringify({alg:'RS256',typ:'JWT'}));
  const c = b64u(JSON.stringify({iss:sa.client_email,scope:'https://www.googleapis.com/auth/indexing',aud:'https://oauth2.googleapis.com/token',exp:now+3600,iat:now}));
  const sig = crypto.createSign('RSA-SHA256').update(`${h}.${c}`).sign(sa.private_key,'base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const body = new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:`${h}.${c}.${sig}`}).toString();
  const res = await makeRequest({hostname:'oauth2.googleapis.com',port:443,path:'/token',method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Length':Buffer.byteLength(body)}},body);
  if (res.statusCode!==200) throw new Error(`OAuth failed: ${res.statusCode}`);
  return JSON.parse(res.body).access_token;
}
async function main() {
  console.log('=======================================================');
  console.log('Science News Hub - Retry Failed URLs ('+FAILED_URLS.length+' URLs)');
  console.log('Quota resets daily at midnight UTC. Run this tomorrow!');
  console.log('=======================================================\n');
  const saPath = path.join(rootDir,'service-account.json');
  if (!fs.existsSync(saPath)) { console.error('ERROR: No service-account.json'); process.exit(1); }
  const sa = JSON.parse(fs.readFileSync(saPath,'utf8'));
  console.log('Service account: '+sa.client_email);
  const token = await getToken(sa);
  console.log('OAuth token acquired!\n');
  let ok=0, fail=0, stillFailed=[];
  for (const url of FAILED_URLS) {
    const payload = JSON.stringify({url,type:'URL_UPDATED'});
    try {
      const res = await makeRequest({hostname:'indexing.googleapis.com',port:443,path:'/v3/urlNotifications:publish',method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token,'Content-Length':Buffer.byteLength(payload)}},payload);
      if (res.statusCode===200) { console.log('OK '+url); ok++; }
      else { console.log('FAIL HTTP '+res.statusCode+' '+url); stillFailed.push(url); fail++; }
    } catch(e) { console.log('ERR '+url+': '+e.message); stillFailed.push(url); fail++; }
  }
  console.log('\n=======================================================');
  console.log('SUCCESS: '+ok+'/'+FAILED_URLS.length+' URLs indexed');
  if (fail>0) { console.log('FAILED: '+fail+' URLs - run again tomorrow'); stillFailed.forEach(u=>console.log('  '+u)); }
  console.log('=======================================================');
}
main().catch(e=>{console.error(e);process.exit(1);});
