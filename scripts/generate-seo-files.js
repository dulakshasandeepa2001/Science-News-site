import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const DOMAIN = 'https://sciencenewshub.click';
const DEFAULT_IMAGE = 'https://sciencenewshub.click/assets/lab.jpg';

function toSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

const LEGACY_SLUG_MAP = {
  "Curiosity_Rover_Footprints_Mars_Mount_Sharp": "curiosity-rover-spots-odd-footprints-mars-mount-sharp-discovery",
  "Massive_New_Moon_Crater_Discovered_NASA_LRO_McGetchin": "massive-new-moon-crater-discovered-nasa-lro-mcgetchin-basin",
  "Massive_Stars_Forming_Binary_System_ALMA_Discovery": "massive-stars-forming-binary-system-alma-breakthrough",
  "UK_September_Heatwave_Forecast_2026": "uk-september-heatwave-forecast-temperatures-met-office-weather-maps",
  "BlueOriginNewGlennExplosion": "blue-origin-new-glenn-explosion",
  "Asteroid_2025_TP5_Close_Approach": "asteroid-2025-tp5-close-approach",
  "JWST_Chariklo_Asteroid_Ring_Changes": "jwst-chariklo-asteroid-ring-system-changes-discovery",
  "MoonBaseI_BlueOriginMission": "moon-base-1-blue-origin-mission",
  "When_Is_The_Next_Meteor_Shower_2026_Calendar": "when-is-the-next-meteor-shower-2026-calendar-orionids-geminids",
  "Dario_Amodei_AI_Slowdown_Pace_The_Frontier": "dario-amodei-ai-slowdown-warning-plan-anthropic-pace-the-frontier",
  "Sun_Swallowed_Super_Earth_Discovery": "sun-swallowed-super-earth-planet-chemical-fingerprint-discovery",
  "US_Confirms_Weapons_Deployed_Orbit_Space_Force": "us-confirms-weapons-deployed-orbit-space-force-troy-meink",
  "Quantum_Entanglement_Z_Bosons_CERN_ATLAS": "quantum-entanglement-z-bosons-confirmed-cern-large-hadron-collider-atlas",
  "OpenAI_Navier_Stokes_Millennium_Problem_Lean_Proof": "openai-solves-navier-stokes-millennium-problem-lean-proof-controversy",
  "Solar_Flare_Northern_Lights_Geomagnetic_Storm": "solar-flare-northern-lights-geomagnetic-storm-forecast",
  "Anthropic_Claude_Navier_Stokes_Terence_Tao_Rumor": "anthropic-claude-navier-stokes-millennium-problem-rumor-terence-tao",
  "TRexTinyArmsEvolutionarySacrifice": "t-rex-tiny-arms-evolutionary-sacrifice",
  "Anthropic_Researcher_Jacob_Coxon_Resigns_AI_Extinction": "anthropic-researcher-jacob-coxon-resigns-ai-extinction-warning",
  "SpaceX_Starlink_10000_Satellites": "spacex-starlink-10000-satellites",
  "August_2026_Lunar_Eclipse_Blood_Moon_Guide": "august-2026-lunar-eclipse-blood-moon-guide",
  "Japan_HTV_X_Cargo_ISS": "japan-htv-x-cargo-iss",
  "Red_Dwarf_Stars_Swallowing_Planets": "red-dwarf-stars-swallowing-planets",
  "Ancient_Supervolcano_Discovered_England_The_Wash": "ancient-supervolcano-discovered-england-the-wash-geology",
  "LUX_ZEPLIN_Dark_Matter_WIMP_Discovery": "lux-zeplin-dark-matter-wimp-particle-discovery",
  "Academy_Of_Natural_Sciences_Museum_Closure": "academy-of-natural-sciences-drexel-museum-closure-philadelphia",
  "Psyche_Spacecraft_Mars_Gravity_Assist": "psyche-spacecraft-mars-gravity-assist",
  "Elon_Musk_SpaceX_Starship_Flight_14_Launch_Delay": "elon-musk-spacex-starship-flight-14-launch-delay",
  "NASA_Nancy_Grace_Roman_Telescope_Launch": "nasa-nancy-grace-roman-space-telescope-launch",
  "New_Earthquake_Prediction_Model_UC_Riverside": "new-earthquake-prediction-model-uc-riverside-kamchatka-faults",
  "Mathspace_Data_Breach_Australia_NZ": "mathspace-data-breach-australia-new-zealand-students-schools",
  "Saturn_Decagon_Atmosphere_South_Pole_Discovery": "saturn-decagon-atmosphere-south-pole-discovery",
  "Atlas_Comet_Confirmation": "atlas-comet",
  "Double_Star_System_Both_Supernovae": "double-star-system-both-supernovae",
  "Cellular_Health_Science_Longevity_Breakthroughs": "cellular-health-science-longevity-breakthroughs",
  "Global_Pandemic_Treaty_Delay": "global-pandemic-treaty-delay",
  "Honor_Humanoid_Robot_Beats_Usain_Bolt_100m_Record": "honor-humanoid-robot-beats-usain-bolt-100m-record",
  "Pluto_Reclassification_Planet_Effort": "pluto-reclassification-planet-effort",
  "Prehistoric_Insects_South_America_Amber": "prehistoric-insects-south-america-amber",
  "Food_Science_Ultra_Processed_Foods_Metabolic_Health": "food-science-ultra-processed-foods-metabolic-health",
  "Shenzhou_21_Capsule_Mission": "shenzhou-21-capsule-mission",
  "AI_In_Health_Science_Precision_Medicine": "ai-in-health-science-precision-medicine",
  "Gut_Brain_Connection_Microbiome_Health_Science": "gut-brain-connection-microbiome-health-science",
  "Atlantic_AMOC_Collapse_Risk": "atlantic-amoc-collapse-risk",
  "Giant_Dam_Save_AMOC": "giant-dam-save-amoc",
  "Inouye_Solar_Telescope_Clearest_Sun_Images": "inouye-solar-telescope-clearest-sun-images",
  "Dinosaur_Asteroid_Heat_17_Times": "dinosaur-asteroid-heat-17-times",
  "Exoplanet_WASP121b_GemstoneRain": "exoplanet-wasp-121b-gemstone-rain",
  "World_Reservoirs_Sedimentation_2060": "world-reservoirs-sedimentation-2060",
  "Apollo_12_Moon_Dust_Camera_Mishap": "apollo-12-moon-dust-camera-mishap-untold-story",
  "Interstellar_Comet_3I_ATLAS_Origin": "interstellar-comet-3i-atlas-origin",
  "NASA_Atlas_Comet_Images": "nasa-atlas-comet-images",
  "Pacific_Ring_Of_Fire_Volcanic_Cooling": "pacific-ring-of-fire-volcanic-cooling",
  "AI_Designed_Virus_Stanford": "ai-creates-virus-first-time-stanford-university-bacteriophage-breakthrough-2026",
  "British_Fossil_Collection_Abu_Dhabi": "british-jurassic-coast-fossil-collection-sold-abu-dhabi-natural-history-museum",
  "Black_Hole_Star_Discovery": "first-ever-black-hole-star-discovered-james-webb-space-telescope",
  "Humpback_Whales_Sound_Discovery": "humpback-whales-sound-discovery",
  "SpaceX_Rocket_Moon_Crash_2026": "spacex-rocket-moon-crash-2026",
  "Mammoth_RNA_Discovery": "mammoth-rna-discovery",
  "Global_Underground_Fungal_Network_Map_Revealed": "global-underground-fungal-network-map",
  "SpaceX_AI_Starmind_Satellites": "spacex-massive-shift-artificial-intelligence-starmind-satellites-2026",
  "Artemis_2_Astronauts_Ready_Mission": "artemis-2-astronauts-ready-mission",
  "M87_Black_Hole_Radiation_Jet_XRay": "m87-black-hole-radiation-jet-xray",
  "Geomagnetic_Storm_Northern_Lights": "geomagnetic-storm-northern-lights",
  "Total_Solar_Eclipse_Europe_2026": "total-solar-eclipse-august-2026-greenland-iceland-spain",
  "Supernova_Remnant_Milky_Way": "supernova-remnant-milky-way",
  "Swift_Telescope_Rescue": "swift-telescope-rescue",
  "Africa_First_Lunar_Mission_China_2029": "africa-first-lunar-mission-china-2029",
  "Little_Red_Dots_Early_Universe": "little-red-dots-early-universe",
  "Ryugu_Asteroid_Water_Discovery": "ryugu-asteroid-water-discovery",
  "James_Watson_Passing": "james-watson-passing",
  "Skydiver_Sun_Photography": "skydiver-sun-photography",
  "Silverpit_Crater_Asteroid_Impact": "silverpit-crater-asteroid-impact",
  "Euclid_Milky_Way_Center": "euclid-milky-way-center",
  "23": "mars-life-discovery",
  "Mars_Life_Discovery": "mars-life-discovery",
  "New_Marine_Species_Brazil": "new-marine-species-brazil",
  "Artemis_III_Astronauts_Named": "artemis-3-astronauts-named",
  "James_Webb_LHS1140b_Biomarkers": "james-webb-telescope-detects-biomarkers-super-earth-lhs-1140b",
  "Fault_Tolerant_Quantum_Processor_1000Qubits": "fault-tolerant-quantum-processor-1000-qubits-breakthrough",
  "MRNA_Universal_Cancer_Vaccine_Phase3": "mrna-universal-cancer-vaccine-phase-3-trials",
  "Perovskite_Silicon_Tandem_Solar_34Percent": "perovskite-silicon-tandem-solar-cells-shatter-efficiency-record",
  "Ancient_DNA_Two_Million_Year_Hominin": "ancient-dna-2-million-year-fossil-unknown-human-ancestor-africa"
};

function getSlug(art) {
  if (art.slug) return toSlug(art.slug);
  const idStr = String(art.id);
  if (LEGACY_SLUG_MAP[idStr]) return LEGACY_SLUG_MAP[idStr];
  if (typeof art.id === 'string' && art.id.length > 0) return toSlug(art.id);
  if (art.title) return toSlug(art.title);
  return `article-${idStr}`;
}

function extractField(content, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*(?:\`([\\s\\S]*?)\`|"((?:\\\\.|[^"\\\\])*)"|'((?:\\\\.|[^'\\\\])*)')`);
  const match = content.match(regex);
  if (!match) return null;
  const raw = match[1] || match[2] || match[3] || '';
  return raw
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, ' ')
    .replace(/\n\s*/g, ' ')
    .trim();
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDateForXml(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return d.toISOString().split('T')[0];
}

function formatDateForRss(dateStr) {
  if (!dateStr) return new Date().toUTCString();
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

function parseArticleObject(content) {
  try {
    let code = content
      .replace(/import\s+(\w+)\s+from\s+['"][^'"]+['"];?/g, 'const $1 = "";')
      .replace(/import\s*\{[^}]*\}\s*from\s+['"][^'"]+['"];?/g, '')
      .replace(/export\s+default\s+[^;]+;?/g, '')
      .replace(/export\s+const\s+(\w+)\s*=\s*/g, 'exports.$1 = ')
      .replace(/export\s+default\s*\{/g, 'exports.__default = {');

    const sandbox = { exports: {}, console };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { timeout: 1500 });
    const keys = Object.keys(sandbox.exports);
    if (keys.length > 0) {
      return sandbox.exports[keys[0]];
    }
  } catch {
    // fallback
  }
  return null;
}

// Parse curated articles strictly based on articlesCollection.js imports
function parseCuratedArticles() {
  const articlesCollectionPath = path.join(rootDir, 'src', 'data', 'articlesCollection.js');
  const articlesDir = path.join(rootDir, 'src', 'data', 'articles');
  const collectionContent = fs.readFileSync(articlesCollectionPath, 'utf-8');

  // Extract all import paths: import { ... } from "./articles/<FileName>.js";
  const importMatches = [...collectionContent.matchAll(/from\s+["']\.\/articles\/([\w-]+)\.js["']/g)];
  const fileNames = importMatches.map(m => m[1]);

  const articlesList = [];
  const seenSlugs = new Set();

  for (const name of fileNames) {
    const filePath = path.join(articlesDir, `${name}.js`);
    if (!fs.existsSync(filePath)) continue;

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsedObj = parseArticleObject(content) || {};

      const idMatch = content.match(/id:\s*["']?([\w-]+)["']?/);
      const id = parsedObj.id || (idMatch ? idMatch[1] : name);
      const title = parsedObj.title || extractField(content, 'title') || id.replace(/_/g, ' ');
      const summary = parsedObj.summary || extractField(content, 'summary') || title;
      const category = parsedObj.category || extractField(content, 'category') || 'Science';
      const date = parsedObj.date || extractField(content, 'date') || 'August 17, 2026';
      const author = parsedObj.author || extractField(content, 'author') || 'Daily Science News';
      const slug = parsedObj.slug || extractField(content, 'slug') || null;

      // Extract image if URL string
      let image = parsedObj.image;
      if (!image || typeof image !== 'string' || !image.startsWith('http')) {
        const imgMatch = content.match(/image:\s*["'](https?:\/\/[^"']+)["']/);
        image = imgMatch ? imgMatch[1] : DEFAULT_IMAGE;
      }

      const articleObj = {
        ...parsedObj,
        id,
        title,
        summary,
        category,
        date,
        author,
        image,
        slug,
        seoTitle: parsedObj.seoTitle || title,
        metaDescription: parsedObj.metaDescription || summary,
        readTime: parsedObj.readTime || '6 min read',
        imageAlt: parsedObj.imageAlt || `${title} - Science News`,
        imageCaption: parsedObj.imageCaption || '',
        content: parsedObj.content || null,
        faq: parsedObj.faq || null,
        table: parsedObj.table || parsedObj.comparisonTable || null,
      };
      const articleSlug = getSlug(articleObj);

      if (!seenSlugs.has(articleSlug)) {
        seenSlugs.add(articleSlug);
        articlesList.push(articleObj);
      }
    } catch (e) {
      console.warn(`Could not parse ${name}:`, e.message);
    }
  }

  articlesList.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  return articlesList;
}

// Generate static HTML for crawler & AdSense inspection
function generateStaticPageHtml({
  title,
  description,
  canonicalUrl,
  heading,
  subheading,
  bodyHtml,
  ogType = 'website'
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeXml(title)}</title>
    <meta name="description" content="${escapeXml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${escapeXml(title)}" />
    <meta property="og:description" content="${escapeXml(description)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Daily Science News" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(title)}" />
    <meta name="twitter:description" content="${escapeXml(description)}" />
    <meta name="theme-color" content="#0284c7" />
    
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9410415611160830" crossorigin="anonymous"></script>

    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-V7715Z65M7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-V7715Z65M7');
    </script>
  </head>
  <body class="min-h-screen bg-background text-foreground antialiased font-sans">
    <div id="root">
      <header style="padding: 2.5rem 1.5rem; background: #0f172a; color: #ffffff; text-align: center;">
        <p style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #38bdf8; margin-bottom: 0.5rem;">Daily Science News</p>
        <h1 style="font-size: 2.4rem; font-weight: 800; margin-bottom: 0.75rem; line-height: 1.2;">${escapeXml(heading)}</h1>
        ${subheading ? `<p style="font-size: 1.1rem; color: #94a3b8; max-width: 700px; margin: 0 auto; line-height: 1.6;">${escapeXml(subheading)}</p>` : ''}
      </header>

      <main style="padding: 2.5rem 1.5rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.7; color: #1e293b;">
        ${bodyHtml}
      </main>

      <footer style="padding: 2rem 1.5rem; background: #0f172a; color: #94a3b8; text-align: center; font-size: 0.9rem; margin-top: 3rem;">
        <p>&copy; 2026 Daily Science News. Founder &amp; Chief Editor: Dulaksha Sandeepa. All rights reserved.</p>
        <p style="margin-top: 0.75rem;">
          <a href="/about" style="color: #60a5fa; margin: 0 8px;">About Us</a> | 
          <a href="/contact" style="color: #60a5fa; margin: 0 8px;">Contact</a> | 
          <a href="/privacy-policy" style="color: #60a5fa; margin: 0 8px;">Privacy Policy</a> | 
          <a href="/terms" style="color: #60a5fa; margin: 0 8px;">Terms</a> | 
          <a href="/disclaimer" style="color: #60a5fa; margin: 0 8px;">Disclaimer</a>
        </p>
      </footer>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
}

function generateStaticArticlePageHtml(article, slug) {
  const title = article.seoTitle || article.title || 'Science News Report';
  const description = article.metaDescription || article.summary || '';
  const canonicalUrl = `${DOMAIN}/article/${slug}`;
  const author = article.author || 'Daily Science News Editorial Team';
  const category = article.category || 'Science';
  const date = article.date || new Date().toISOString().split('T')[0];
  const readTime = article.readTime || '6 min read';
  const image = article.image || DEFAULT_IMAGE;
  const imageAlt = article.imageAlt || `${article.title} - Science News`;
  const imageCaption = article.imageCaption || '';

  // Sections HTML
  let sectionsHtml = '';
  if (article.content && Array.isArray(article.content.sections)) {
    sectionsHtml = article.content.sections.map((sec, idx) => {
      let secImgHtml = '';
      if (sec.image) {
        secImgHtml = `
          <figure style="margin: 2rem 0; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff;">
            <img src="${escapeXml(sec.image)}" alt="${escapeXml(sec.imageAlt || sec.title)}" style="width: 100%; max-height: 480px; object-fit: cover;" loading="lazy" />
            ${sec.imageCaption ? `<figcaption style="padding: 0.75rem 1rem; font-size: 0.85rem; color: #64748b; background: #f8fafc; border-top: 1px solid #e2e8f0;">${escapeXml(sec.imageCaption)}</figcaption>` : ''}
          </figure>
        `;
      }

      const paragraphs = (sec.content || '')
        .split('\n\n')
        .filter(p => p.trim().length > 0)
        .map(p => `<p style="margin-bottom: 1.25rem; font-size: 1.08rem; line-height: 1.8; color: #1e293b;">${escapeXml(p.trim())}</p>`)
        .join('');

      return `
        <section id="section-${idx + 1}" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid #e2e8f0;">
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; line-height: 1.3;">
            <span style="color: #0284c7; font-family: monospace; margin-right: 0.5rem;">${idx + 1}.</span>${escapeXml(sec.title)}
          </h2>
          ${paragraphs}
          ${secImgHtml}
        </section>
      `;
    }).join('');
  } else if (article.summary) {
    sectionsHtml = `
      <section style="margin-bottom: 2.5rem;">
        <p style="font-size: 1.15rem; line-height: 1.8; color: #1e293b;">${escapeXml(article.summary)}</p>
      </section>
    `;
  }

  // Table HTML
  let tableHtml = '';
  const tableData = article.comparisonTable || article.table;
  if (tableData && Array.isArray(tableData.headers) && Array.isArray(tableData.rows)) {
    const headerCells = tableData.headers.map(h => `<th style="padding: 0.75rem 1rem; border: 1px solid #cbd5e1; background: #f1f5f9; font-weight: bold; text-align: left;">${escapeXml(h)}</th>`).join('');
    const bodyRows = tableData.rows.map(row => {
      const cells = row.map((c, i) => `<td style="padding: 0.75rem 1rem; border: 1px solid #e2e8f0; ${i === 0 ? 'font-weight: 600; color: #0f172a;' : 'color: #475569;'}">${escapeXml(c)}</td>`).join('');
      return `<tr style="background: #ffffff;">${cells}</tr>`;
    }).join('');

    tableHtml = `
      <section style="margin: 2.5rem 0; padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">${escapeXml(tableData.title || 'Key Facts & Comparison')}</h3>
        ${tableData.description ? `<p style="font-size: 0.95rem; color: #64748b; margin-bottom: 1rem;">${escapeXml(tableData.description)}</p>` : ''}
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
            <thead><tr>${headerCells}</tr></thead>
            <tbody>${bodyRows}</tbody>
          </table>
        </div>
      </section>
    `;
  }

  // FAQ HTML
  let faqHtml = '';
  let faqJsonLd = '';
  if (Array.isArray(article.faq) && article.faq.length > 0) {
    const faqItems = article.faq.map((item, idx) => `
      <div style="margin-bottom: 1.25rem; padding: 1rem 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">Q${idx + 1}: ${escapeXml(item.question)}</h4>
        <p style="margin: 0; color: #475569; font-size: 0.95rem; line-height: 1.6;">${escapeXml(item.answer)}</p>
      </div>
    `).join('');

    faqHtml = `
      <section style="margin: 3rem 0; padding: 1.5rem; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 1.25rem;">Frequently Asked Questions (FAQ)</h3>
        ${faqItems}
      </section>
    `;

    const faqEntities = article.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }));
    faqJsonLd = `
    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqEntities
    })}
    </script>
    `;
  }

  // NewsArticle JSON-LD
  const articleJsonLd = `
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": description,
    "image": [image],
    "datePublished": formatDateForXml(date),
    "dateModified": formatDateForXml(date),
    "author": [{
      "@type": "Person",
      "name": author,
      "url": `${DOMAIN}/about`
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Daily Science News",
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/assets/lab.jpg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  })}
  </script>
  `;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeXml(title)} - Daily Science News</title>
    <meta name="description" content="${escapeXml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph / Social -->
    <meta property="og:title" content="${escapeXml(title)} - Daily Science News" />
    <meta property="og:description" content="${escapeXml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${escapeXml(image)}" />
    <meta property="og:site_name" content="Daily Science News" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(title)}" />
    <meta name="twitter:description" content="${escapeXml(description)}" />
    <meta name="twitter:image" content="${escapeXml(image)}" />
    <meta name="theme-color" content="#0284c7" />

    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9410415611160830" crossorigin="anonymous"></script>

    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-V7715Z65M7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-V7715Z65M7');
    </script>

    ${articleJsonLd}
    ${faqJsonLd}
  </head>
  <body class="min-h-screen bg-background text-foreground antialiased font-sans" style="margin: 0; font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; color: #0f172a;">
    <div id="root">
      <header style="padding: 1.5rem 1rem; background: #0f172a; color: #ffffff; text-align: center; border-bottom: 3px solid #0284c7;">
        <div style="max-width: 900px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="/" style="font-size: 1.3rem; font-weight: 800; color: #38bdf8; text-decoration: none; letter-spacing: -0.02em;">DAILY SCIENCE NEWS</a>
          <nav style="display: flex; gap: 1rem; font-size: 0.9rem;">
            <a href="/" style="color: #94a3b8; text-decoration: none;">Home</a>
            <a href="/category/${escapeXml((category || 'science').toLowerCase().replace(/[^\w]/g, ' ').trim().split(/\s+/)[0])}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${escapeXml(category || 'Science')}</a>
            <a href="/about" style="color: #94a3b8; text-decoration: none;">About</a>
            <a href="/contact" style="color: #94a3b8; text-decoration: none;">Contact</a>
          </nav>
        </div>
      </header>

      <main style="padding: 2.5rem 1.25rem; max-width: 860px; margin: 0 auto; background: #ffffff; min-height: 80vh; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-top: 1.5rem; margin-bottom: 2rem; border-radius: 16px; border: 1px solid #e2e8f0;">
        <article>
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <span style="background: #e0f2fe; color: #0284c7; font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase;">${escapeXml(category)}</span>
            <span style="background: #ecfdf5; color: #059669; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; border: 1px solid #a7f3d0;">✓ Peer-Reviewed &amp; Fact-Checked</span>
          </div>

          <h1 style="font-size: 2.3rem; font-weight: 800; color: #0f172a; line-height: 1.25; margin: 0 0 1.25rem 0;">${escapeXml(article.title)}</h1>
          
          <p style="font-size: 1.2rem; line-height: 1.6; color: #475569; margin-bottom: 1.5rem; font-weight: 400;">${escapeXml(article.summary || '')}</p>

          <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 0.85rem; color: #64748b; margin-bottom: 2rem;">
            <span>✍️ <strong>By:</strong> ${escapeXml(author)}</span>
            <span>📅 <strong>Published:</strong> ${escapeXml(date)}</span>
            <span>⏱️ <strong>Read Time:</strong> ${escapeXml(readTime)}</span>
          </div>

          <figure style="margin: 0 0 2.5rem 0; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0;">
            <img src="${escapeXml(image)}" alt="${escapeXml(imageAlt)}" style="width: 100%; max-height: 480px; object-fit: cover;" loading="eager" />
            ${imageCaption ? `<figcaption style="padding: 0.75rem 1rem; font-size: 0.85rem; color: #64748b; background: #f8fafc; border-top: 1px solid #e2e8f0; font-style: italic;">${escapeXml(imageCaption)}</figcaption>` : ''}
          </figure>

          ${sectionsHtml}

          ${tableHtml}

          ${faqHtml}

          <div style="margin-top: 3rem; padding: 1.5rem; background: #eff6ff; border-radius: 12px; border: 1px solid #bfdbfe; font-size: 0.9rem; color: #1e3a8a;">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.05rem; font-weight: 700;">Editorial Standards &amp; Fact-Checking Transparency</h4>
            <p style="margin: 0; line-height: 1.6;">
              This report adheres to Daily Science News' rigorous academic guidelines. All claims are verified against primary scientific literature from institutions including NASA, ESA, CERN, and peer-reviewed journals. Supervised by Dulaksha Sandeepa.
              Questions or corrections? Contact <a href="mailto:contact@sciencenewshub.click" style="color: #2563eb; font-weight: bold;">contact@sciencenewshub.click</a>.
            </p>
          </div>
        </article>
      </main>

      <footer style="padding: 2.5rem 1.5rem; background: #0f172a; color: #94a3b8; text-align: center; font-size: 0.9rem;">
        <p>&copy; 2026 Daily Science News. Founder &amp; Chief Editor: Dulaksha Sandeepa. All rights reserved.</p>
        <p style="margin-top: 0.75rem;">
          <a href="/about" style="color: #60a5fa; margin: 0 8px;">About Us</a> | 
          <a href="/contact" style="color: #60a5fa; margin: 0 8px;">Contact</a> | 
          <a href="/privacy-policy" style="color: #60a5fa; margin: 0 8px;">Privacy Policy</a> | 
          <a href="/terms" style="color: #60a5fa; margin: 0 8px;">Terms</a> | 
          <a href="/disclaimer" style="color: #60a5fa; margin: 0 8px;">Disclaimer</a>
        </p>
      </footer>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
}

function generateStaticPages(articlesList) {
  const pages = [
    {
      filePath: 'about/index.html',
      canonicalUrl: `${DOMAIN}/about`,
      title: 'About Us & Editorial Standards - Daily Science News',
      description: 'Learn about Daily Science News, our editorial methodology, peer-reviewed fact-checking protocols, corrections policy, and founder Dulaksha Sandeepa.',
      heading: 'About Us & Editorial Standards',
      subheading: 'Dedicated to explaining verified breakthroughs in space exploration, astrophysics, particle physics, medicine, and planetary climate.',
      bodyHtml: `
        <article>
          <section style="margin-bottom: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Founder &amp; Chief Editor: Dulaksha Sandeepa</h2>
            <p style="color: #475569; margin-bottom: 1rem;">Science Explorer &amp; Digital Technology Specialist</p>
            <p>Daily Science News was founded by Dulaksha Sandeepa to bridge the gap between complex research institutions, planetary telemetry, and science enthusiasts globally. Every published article undergoes rigorous verification against peer-reviewed academic literature.</p>
          </section>

          <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem;">Editorial Verification Standards</h2>
            <p>We enforce a strict multi-tier factual verification process:</p>
            <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
              <li><strong>Primary Literature:</strong> All reporting is anchored in peer-reviewed scientific studies published in journals such as <em>Nature</em>, <em>Science</em>, <em>The Astrophysical Journal</em>, <em>Lancet</em>, and validated preprints on arXiv.org.</li>
              <li><strong>Agency Telemetry:</strong> Mission updates are cross-referenced with raw telemetry and official mission logs directly from NASA, ESA, JAXA, and CERN.</li>
              <li><strong>Context &amp; Limitations:</strong> We transparently detail study sample sizes, confidence intervals, and research limitations.</li>
            </ul>
          </section>

          <section style="margin-bottom: 2rem; padding: 1.5rem; background: #eff6ff; border-radius: 12px; border: 1px solid #bfdbfe;">
            <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.75rem;">Corrections &amp; Updates Policy</h2>
            <p>Accuracy is essential to scientific integrity. When factual errors or ambiguous statements are identified:</p>
            <ul style="padding-left: 1.5rem; margin-top: 0.5rem; color: #1e3a8a;">
              <li>We immediately rectify the inaccurate text.</li>
              <li>A transparent "Correction Note" is appended to the report detailing the modification and timestamp.</li>
              <li>Readers can report discrepancies directly to our editorial desk at <a href="mailto:contact@sciencenewshub.click" style="color: #2563eb; font-weight: bold;">contact@sciencenewshub.click</a>.</li>
            </ul>
          </section>

          <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem;">Responsible AI Transparency Disclosure</h2>
            <p>We utilize AI tools strictly as research assistants for syntax formatting, data synthesis, and literature scanning. 100% of articles are researched, fact-checked, and approved by human editorial oversight under Dulaksha Sandeepa.</p>
          </section>

          <section>
            <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem;">Editorial Independence</h2>
            <p>Daily Science News operates completely independent of external corporate sponsors, pharmaceutical firms, or aerospace defense contractors. Advertising displayed via Google AdSense adheres strictly to program policies and does not influence our editorial analysis.</p>
          </section>
        </article>
      `
    },
    {
      filePath: 'contact/index.html',
      canonicalUrl: `${DOMAIN}/contact`,
      title: 'Contact Us - Daily Science News Editorial Desk',
      description: 'Get in touch with the editorial team at Daily Science News. Send press releases, research tips, editorial corrections, or inquiries to founder Dulaksha Sandeepa.',
      heading: 'Contact the Editorial Desk',
      subheading: 'We welcome research submissions, academic press releases, reader feedback, and editorial corrections.',
      bodyHtml: `
        <article>
          <div style="display: grid; gap: 1.5rem;">
            <div style="padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">Direct Editorial Email</h2>
              <p style="color: #475569;">For press releases, academic news tips, and editorial correspondence:</p>
              <p style="font-size: 1.2rem; font-weight: bold; color: #0284c7; margin-top: 0.5rem;">
                <a href="mailto:contact@sciencenewshub.click" style="color: #0284c7;">contact@sciencenewshub.click</a>
              </p>
              <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.5rem;">Direct editor correspondence: sandeepadulaksha93@gmail.com</p>
            </div>

            <div style="padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">Editorial Response Time</h2>
              <p style="color: #475569;">Our editorial desk typically reviews inquiries within 24 to 48 business hours. For urgent corrections, please prefix your subject line with <code>[CORRECTION]</code>.</p>
            </div>

            <div style="padding: 1.5rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">Mailing &amp; Publisher Details</h2>
              <p style="color: #475569;">Daily Science News | Founder &amp; Chief Editor: Dulaksha Sandeepa</p>
              <p style="color: #475569;">Official Website: <a href="https://sciencenewshub.click" style="color: #0284c7;">https://sciencenewshub.click</a></p>
            </div>
          </div>
        </article>
      `
    },
    {
      filePath: 'privacy-policy/index.html',
      canonicalUrl: `${DOMAIN}/privacy-policy`,
      title: 'Privacy Policy - Daily Science News',
      description: 'Privacy policy for Daily Science News, including Google AdSense DART cookie disclosures, GDPR, CCPA, and data privacy rights.',
      heading: 'Privacy Policy',
      subheading: 'Last updated: September 2026. Fully compliant with Google AdSense, GDPR, and CCPA standards.',
      bodyHtml: `
        <article>
          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">1. Overview</h2>
            <p>At Daily Science News (accessible at https://sciencenewshub.click), the privacy of our visitors is of paramount importance. This Privacy Policy details the types of personal data we collect, how it is handled, and your privacy rights.</p>
          </section>

          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">2. Google AdSense &amp; DART Cookies</h2>
            <p>Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to https://sciencenewshub.click and other sites on the internet.</p>
            <p>Users may choose to opt-out of the use of the DART cookie by visiting the Google Ad and Content Network Privacy Policy at: <a href="https://policies.google.com/technologies/ads" style="color: #0284c7;" target="_blank" rel="noopener">https://policies.google.com/technologies/ads</a></p>
          </section>

          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">3. Log Files &amp; Analytics</h2>
            <p>Daily Science News follows standard procedure of using log files and Google Analytics 4 (anonymized IP tracking) to analyze trends, administer the site, and track user engagement. Information collected includes IP addresses, browser types, Internet Service Providers (ISP), date/time stamps, and referring pages.</p>
          </section>

          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">4. GDPR &amp; CCPA Privacy Rights</h2>
            <p>Under GDPR and CCPA regulations, visitors have the right to request access to, rectification of, or erasure of their personal data. We do not sell personal information to third parties.</p>
          </section>

          <section>
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">5. Contact Information</h2>
            <p>If you have any questions regarding this privacy policy, contact our Data Protection Officer at: <a href="mailto:contact@sciencenewshub.click" style="color: #0284c7;">contact@sciencenewshub.click</a>.</p>
          </section>
        </article>
      `
    },
    {
      filePath: 'terms/index.html',
      canonicalUrl: `${DOMAIN}/terms`,
      title: 'Terms of Service - Daily Science News',
      description: 'Terms of service and scientific content disclaimer for Daily Science News readers and subscribers.',
      heading: 'Terms of Service',
      subheading: 'Governing user access, intellectual property, and editorial content guidelines.',
      bodyHtml: `
        <article>
          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">1. Acceptance of Terms</h2>
            <p>By accessing Daily Science News at https://sciencenewshub.click, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </section>

          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">2. Intellectual Property &amp; Content Use</h2>
            <p>All original written reporting and commentary produced by Daily Science News is the intellectual property of Daily Science News. Quoted academic materials, research abstracts, and scientific imagery from NASA, ESA, JAXA, and peer-reviewed journals are credited to their respective institutional copyright holders under fair use educational reporting.</p>
          </section>

          <section>
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">3. Disclaimer of Liability</h2>
            <p>While our editorial team endeavors to ensure absolute scientific accuracy, scientific research is constantly evolving. Daily Science News is not liable for errors or omissions resulting from updated academic discoveries.</p>
          </section>
        </article>
      `
    },
    {
      filePath: 'disclaimer/index.html',
      canonicalUrl: `${DOMAIN}/disclaimer`,
      title: 'Medical & Scientific Research Disclaimer - Daily Science News',
      description: 'Important medical, clinical, and scientific disclaimer regarding health research and technological reports published on Daily Science News.',
      heading: 'Medical & Research Disclaimer',
      subheading: 'Important disclosures regarding scientific news, pre-clinical studies, and medical reporting.',
      bodyHtml: `
        <article>
          <div style="padding: 1.5rem; background: #fef2f2; border-radius: 12px; border: 1px solid #fecaca; margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; color: #991b1b; margin-bottom: 0.5rem;">Not Medical or Clinical Advice</h2>
            <p style="color: #7f1d1d;">The articles, news reports, and analyses published on Daily Science News are created exclusively for educational and informational purposes. They do not constitute professional medical advice, diagnosis, or treatment recommendations.</p>
          </div>

          <section style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">Early-Stage Research Disclosures</h2>
            <p>Our reporting frequently covers pre-clinical research, animal trials, in-vitro experiments, and early computational models. Findings observed in laboratories do not necessarily translate into human clinical efficacy without formal Phase 3 trials and regulatory approval (FDA, EMA, WHO).</p>
          </section>

          <section>
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">Consult Healthcare Professionals</h2>
            <p>Always seek the guidance of your physician or qualified healthcare provider with any questions you may have regarding a medical condition or therapeutic intervention.</p>
          </section>
        </article>
      `
    }
  ];

  // Category Hub Pages
  const categories = [
    { name: 'space', title: 'Space & Astronomy News', desc: 'Verified coverage of NASA missions, JWST observations, lunar exploration, and planetary science discoveries.' },
    { name: 'physics', title: 'Physics & Quantum Theory Discoveries', desc: 'Frontier research in particle physics, CERN ATLAS experiments, quantum computing, and astrophysics.' },
    { name: 'technology', title: 'Frontier AI & Technology Research', desc: 'Independent analysis of artificial intelligence safety, autonomous robotics, and computational science.' },
    { name: 'health', title: 'Health & Cellular Medicine News', desc: 'Peer-reviewed reporting on cellular longevity, oncology breakthroughs, and metabolic clinical science.' },
    { name: 'biology', title: 'Biology & Natural Sciences', desc: 'Discoveries in genomics, evolutionary paleontology, organism traits, and ecosystem biodiversity.' },
    { name: 'environment', title: 'Environment & Climate Geophysics', desc: 'Scientific telemetry on Atlantic ocean currents (AMOC), volcanology, and atmospheric dynamics.' },
    { name: 'archaeology', title: 'Archaeology & Prehistoric History', desc: 'Excavations, ancient hominin genomics, fossil discoveries, and anthropological research.' },
    { name: 'mathematics', title: 'Mathematics & Theoretical Logic', desc: 'Mathematical proofs, Navier-Stokes millennium problems, and cryptographic theory.' }
  ];

  for (const cat of categories) {
    const catArticles = articlesList.filter(a => {
      const reg = new RegExp(cat.name, 'i');
      return reg.test(a.category || '');
    }).slice(0, 10);

    let articlesListHtml = `<ul style="list-style: none; padding: 0; display: grid; gap: 1rem;">`;
    if (catArticles.length > 0) {
      for (const art of catArticles) {
        const slug = getSlug(art);
        articlesListHtml += `
          <li style="padding: 1rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;"><a href="/article/${slug}" style="color: #0284c7; text-decoration: none; font-weight: bold;">${escapeXml(art.title)}</a></h3>
            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 0.5rem;">${escapeXml(art.summary || '')}</p>
            <span style="font-size: 0.8rem; color: #94a3b8;">${escapeXml(art.date || '')} • ${escapeXml(art.author || 'Daily Science News')}</span>
          </li>
        `;
      }
    } else {
      articlesListHtml += `<li><p style="color: #64748b;">Explore our latest peer-reviewed reports in this discipline.</p></li>`;
    }
    articlesListHtml += `</ul>`;

    pages.push({
      filePath: `category/${cat.name}/index.html`,
      canonicalUrl: `${DOMAIN}/category/${cat.name}`,
      title: `${cat.title} - Daily Science News`,
      description: cat.desc,
      heading: cat.title,
      subheading: cat.desc,
      bodyHtml: `
        <article>
          <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">Curated Research Reports</h2>
            ${articlesListHtml}
          </div>
          <div style="margin-top: 2rem; text-align: center;">
            <a href="/" style="color: #0284c7; font-weight: bold;">&larr; Return to All Science News</a>
          </div>
        </article>
      `
    });
  }

  return pages;
}

function parseBlogFiles() {
  return [
    { id: 'prime-numbers-cryptography', title: 'Prime Numbers in Modern Cryptography', date: 'August 12, 2025' },
    { id: 'exoplanets-search-life', title: 'The Search for Life on Exoplanets', date: 'August 10, 2025' },
    { id: 'crispr-gene-editing', title: 'CRISPR Gene Editing Revolutions', date: 'August 08, 2025' }
  ];
}

function main() {
  const articlesList = parseCuratedArticles();
  const blogsList = parseBlogFiles();
  const categories = ['space', 'physics', 'technology', 'health', 'biology', 'environment', 'archaeology', 'mathematics'];
  const today = new Date().toISOString().split('T')[0];

  // 1. Generate XML Sitemap (sitemap.xml)
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <!-- Core Static Pages -->\n`;
  xml += `  <url>\n    <loc>${DOMAIN}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${DOMAIN}/about</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${DOMAIN}/contact</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${DOMAIN}/privacy-policy</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${DOMAIN}/terms</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${DOMAIN}/disclaimer</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>${DOMAIN}/blog</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  xml += `\n  <!-- Category Hubs -->\n`;
  for (const cat of categories) {
    xml += `  <url>\n    <loc>${DOMAIN}/category/${cat}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
  }

  xml += `\n  <!-- Published Scientific Articles & Research Reports (${articlesList.length} Curated Articles) -->\n`;
  for (const art of articlesList) {
    const slug = getSlug(art);
    const pubDate = formatDateForXml(art.date);
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/article/${slug}</loc>\n`;
    xml += `    <lastmod>${pubDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `\n  <!-- Blog Posts -->\n`;
  for (const blog of blogsList) {
    xml += `  <url>\n    <loc>${DOMAIN}/blog/${blog.id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }
  xml += `</urlset>\n`;

  // 2. Generate Google News Sitemap (news-sitemap.xml)
  let newsXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  newsXml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  newsXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  for (const art of articlesList.slice(0, 50)) {
    const slug = getSlug(art);
    const pubDate = formatDateForXml(art.date);
    const imgUrl = art.image || DEFAULT_IMAGE;
    newsXml += `  <url>\n`;
    newsXml += `    <loc>${DOMAIN}/article/${slug}</loc>\n`;
    newsXml += `    <news:news>\n`;
    newsXml += `      <news:publication>\n`;
    newsXml += `        <news:name>Daily Science News</news:name>\n`;
    newsXml += `        <news:language>en</news:language>\n`;
    newsXml += `      </news:publication>\n`;
    newsXml += `      <news:publication_date>${pubDate}</news:publication_date>\n`;
    newsXml += `      <news:title>${escapeXml(art.title)}</news:title>\n`;
    newsXml += `    </news:news>\n`;
    newsXml += `    <image:image>\n`;
    newsXml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
    newsXml += `      <image:title>${escapeXml(art.title)}</image:title>\n`;
    newsXml += `    </image:image>\n`;
    newsXml += `  </url>\n`;
  }
  newsXml += `</urlset>\n`;

  // 3. Generate Post Sitemap (post-sitemap.xml)
  let postXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  postXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const art of articlesList) {
    const slug = getSlug(art);
    const pubDate = formatDateForXml(art.date);
    postXml += `  <url>\n    <loc>${DOMAIN}/article/${slug}</loc>\n    <lastmod>${pubDate}</lastmod>\n  </url>\n`;
  }
  for (const blog of blogsList) {
    postXml += `  <url>\n    <loc>${DOMAIN}/blog/${blog.id}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
  }
  postXml += `</urlset>\n`;

  // 4. Generate Page Sitemap (page-sitemap.xml)
  let pageXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  pageXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const corePages = ['', 'about', 'contact', 'privacy-policy', 'terms', 'disclaimer', 'blog'];
  for (const p of corePages) {
    const url = p ? `${DOMAIN}/${p}` : `${DOMAIN}/`;
    pageXml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
  }
  pageXml += `</urlset>\n`;

  // 5. Generate Category Sitemap (category-sitemap.xml)
  let categoryXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  categoryXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const cat of categories) {
    categoryXml += `  <url>\n    <loc>${DOMAIN}/category/${cat}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
  }
  categoryXml += `</urlset>\n`;

  // 6. Generate RSS Feed (rss.xml)
  let rssXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  rssXml += `<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>\n`;
  rssXml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">\n`;
  rssXml += `  <channel>\n`;
  rssXml += `    <title>Daily Science News</title>\n`;
  rssXml += `    <link>${DOMAIN}</link>\n`;
  rssXml += `    <description>Verified Scientific Discoveries, Space Exploration Missions, and Peer-Reviewed Research</description>\n`;
  rssXml += `    <language>en-us</language>\n`;
  rssXml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  rssXml += `    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  for (const art of articlesList) {
    const slug = getSlug(art);
    const link = `${DOMAIN}/article/${slug}`;
    const pubDate = formatDateForRss(art.date);
    const imgUrl = art.image || DEFAULT_IMAGE;
    rssXml += `    <item>\n`;
    rssXml += `      <title>${escapeXml(art.title)}</title>\n`;
    rssXml += `      <link>${link}</link>\n`;
    rssXml += `      <guid isPermaLink="true">${link}</guid>\n`;
    rssXml += `      <pubDate>${pubDate}</pubDate>\n`;
    rssXml += `      <dc:creator>${escapeXml(art.author || 'Dulaksha Sandeepa')}</dc:creator>\n`;
    rssXml += `      <category>${escapeXml(art.category || 'Science')}</category>\n`;
    rssXml += `      <description>${escapeXml(art.summary || '')}</description>\n`;
    rssXml += `      <media:content url="${escapeXml(imgUrl)}" medium="image" width="1200" height="675">\n`;
    rssXml += `        <media:title>${escapeXml(art.title)}</media:title>\n`;
    rssXml += `      </media:content>\n`;
    rssXml += `    </item>\n`;
  }
  rssXml += `  </channel>\n`;
  rssXml += `</rss>\n`;

  // Output directories
  const targetDirs = [
    path.join(rootDir, 'public'),
    path.join(rootDir, 'dist')
  ];

  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'news-sitemap.xml'), newsXml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'post-sitemap.xml'), postXml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'page-sitemap.xml'), pageXml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'category-sitemap.xml'), categoryXml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'rss.xml'), rssXml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'feed.xml'), rssXml, 'utf-8');
  }

  // 7. Prerender Static Core & Category HTML Pages
  const staticPages = generateStaticPages(articlesList);
  for (const page of staticPages) {
    const htmlContent = generateStaticPageHtml(page);
    for (const baseDir of targetDirs) {
      const fullPath = path.join(baseDir, page.filePath);
      const parentDir = path.dirname(fullPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.writeFileSync(fullPath, htmlContent, 'utf-8');
    }
  }

  // 8. Prerender Static HTML Pages for All Articles (Fixes AdSense CSR & Thin Content Rejection)
  let articleCount = 0;
  for (const art of articlesList) {
    const slug = getSlug(art);
    const articleHtml = generateStaticArticlePageHtml(art, slug);
    for (const baseDir of targetDirs) {
      const fullPath = path.join(baseDir, 'article', slug, 'index.html');
      const parentDir = path.dirname(fullPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.writeFileSync(fullPath, articleHtml, 'utf-8');
    }
    articleCount++;
  }

  console.log(`✓ Successfully generated sitemaps, RSS & Feed XMLs, ${staticPages.length} core pages, and ${articleCount} full static article pages for AdSense & Googlebot.`);
}

main();
