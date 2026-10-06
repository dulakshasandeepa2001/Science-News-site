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
  // Numeric IDs
  "1": "spacecraft-black-hole-journey",
  "2": "einstein-ring-black-hole",
  "3": "brain-shortcut-weight-loss",
  "4": "dna-sequencing-breakthrough",
  "5": "ai-discovers-new-materials",
  "6": "quantum-internet-milestone",
  "7": "carbon-capture-technology",
  "8": "ancient-forest-under-arctic-ice",
  "9": "quantum-computing-error-correction",
  "10": "florida-panther-habitat-expansion",
  "11": "florida-panther-habitat-expansion",
  "12": "zombie-virus-rabbits-study",
  "13": "sony-robots",
  "14": "orange-shark",
  "15": "british-paralympian-john-mcfall-astronaut",
  "16": "aspirin-replacement",
  "20": "changan-nevo-a06",
  "21": "russia-enteromix-vaccine",
  "22": "cyanobacteria-mars-oxygen",
  "23": "mars-life-discovery",
  "24": "military-drone-mothership",
  "25": "british-pilot-mars-simulation",
  "26": "oldest-mummies-southeast-asia",

  // CamelCase & Underscore IDs
  "MoonBaseI_BlueOriginMission": "moon-base-1-blue-origin-mission",
  "SpaceX_Starlink_10000_Satellites": "spacex-starlink-10000-satellites",
  "BlueOriginNewGlennExplosion": "blue-origin-new-glenn-explosion",
  "TRexTinyArmsEvolutionarySacrifice": "t-rex-tiny-arms-evolutionary-sacrifice",
  "Exoplanet_WASP121b_GemstoneRain": "exoplanet-wasp-121b-gemstone-rain",
  "Red_Dwarf_Stars_Swallowing_Planets": "red-dwarf-stars-swallowing-planets",
  "M87_Black_Hole_Radiation_Jet_XRay": "m87-black-hole-radiation-jet-xray",
  "Asteroid_2025_TP5_Close_Approach": "asteroid-2025-tp5-close-approach",
  "Japan_HTV_X_Cargo_ISS": "japan-htv-x-cargo-iss",
  "Atlantic_AMOC_Collapse_Risk": "atlantic-amoc-collapse-risk",
  "Rocket_Lab_Protests_NASA_Mars_Orbiter_Blue_Origin": "rocket-lab-protests-nasa-700m-mars-orbiter-contract-blue-origin",
  "RocketLabMarsOrbiterProtest": "rocket-lab-protests-nasa-700m-mars-orbiter-contract-blue-origin",
  "RocketLabProtestsNASA": "rocket-lab-protests-nasa-700m-mars-orbiter-contract-blue-origin",
  "JWST_Chariklo_Asteroid_Ring_Changes": "jwst-chariklo-asteroid-ring-system-changes-discovery",
  "JWSTCharikloRings": "jwst-chariklo-asteroid-ring-system-changes-discovery",
  "CharikloRingSystemChanges": "jwst-chariklo-asteroid-ring-system-changes-discovery",
  "UK_September_Heatwave_Forecast_2026": "uk-september-heatwave-forecast-temperatures-met-office-weather-maps",
  "UKSeptemberHeatwaveForecast": "uk-september-heatwave-forecast-temperatures-met-office-weather-maps",
  "Sun_Swallowed_Super_Earth_Discovery": "sun-swallowed-super-earth-planet-chemical-fingerprint-discovery",
  "SunSwallowedSuperEarth": "sun-swallowed-super-earth-planet-chemical-fingerprint-discovery",
  "Apple_Watch_Series_12_Vs_Whoop_Oura_Readiness_Score": "apple-watch-series-12-vs-whoop-oura-readiness-score-health-sensing",
  "AppleWatchSeries12VsWhoopOura": "apple-watch-series-12-vs-whoop-oura-readiness-score-health-sensing",
  "Massive_Stars_Forming_Binary_System_ALMA_Discovery": "massive-stars-forming-binary-system-alma-breakthrough",
  "MassiveStarsFormingBinarySystemALMA": "massive-stars-forming-binary-system-alma-breakthrough",
  "Anthropic_Researcher_Jacob_Coxon_Resigns_AI_Extinction": "anthropic-researcher-jacob-coxon-resigns-ai-extinction-warning",
  "AnthropicResearcherJacobCoxon": "anthropic-researcher-jacob-coxon-resigns-ai-extinction-warning",
  "JacobCoxonAnthropicResignation": "anthropic-researcher-jacob-coxon-resigns-ai-extinction-warning",
  "PS5_System_Update_14_PSSR_2_Graphics_Upgrade": "ps5-system-update-14-pssr-2-graphics-upgrade-ps5-pro-2tb",
  "PS5SystemUpdate14PSSR2": "ps5-system-update-14-pssr-2-graphics-upgrade-ps5-pro-2tb",
  "OpenAI_Navier_Stokes_Millennium_Problem_Lean_Proof": "openai-solves-navier-stokes-millennium-problem-lean-proof-controversy",
  "OpenAINavierStokesProof": "openai-solves-navier-stokes-millennium-problem-lean-proof-controversy",
  "IPhone_18_Pro_Specs_Price_Upgrade_Guide_Foldable_Anniversary": "iphone-18-pro-specs-price-upgrade-guide-foldable-anniversary",
  "IPhone18ProSpecsPriceUpgradeGuide": "iphone-18-pro-specs-price-upgrade-guide-foldable-anniversary",
  "IPhone_18_Pro_Upgrade_Guide_Foldable_IPhone_20": "iphone-18-pro-upgrade-guide-foldable-iphone-20-preview",
  "IPhone18ProUpgradeGuide": "iphone-18-pro-upgrade-guide-foldable-iphone-20-preview",
  "Anthropic_Claude_Navier_Stokes_Terence_Tao_Rumor": "anthropic-claude-navier-stokes-millennium-problem-rumor-terence-tao",
  "AnthropicClaudeNavierStokes": "anthropic-claude-navier-stokes-millennium-problem-rumor-terence-tao",
  "LG_Smart_TV_Standby_Audio_Recording_Privacy_Flaw": "lg-smart-tv-standby-audio-recording-home-network-snooping-gamers-nexus",
  "LGSmartTVPrivacyInvestigation": "lg-smart-tv-standby-audio-recording-home-network-snooping-gamers-nexus",
  "Tim_Cook_Apple_CEO_Transition": "tim-cook-steps-down-john-ternus-new-apple-ceo",
  "Apple_September_Event_2026_Preview": "apple-september-event-2026-iphone-18-pro-foldable-preview",
  "AppleSeptemberEvent2026Preview": "apple-september-event-2026-iphone-18-pro-foldable-preview",
  "LUX_ZEPLIN_Dark_Matter_WIMP_Discovery": "lux-zeplin-dark-matter-wimp-particle-discovery",
  "Lux_Zeplin_Dark_Matter_WIMP_Discovery": "lux-zeplin-dark-matter-wimp-particle-discovery",
  "Academy_Of_Natural_Sciences_Museum_Closure": "academy-of-natural-sciences-drexel-museum-closure-philadelphia",
  "AcademyOfNaturalSciencesMuseumClosure": "academy-of-natural-sciences-drexel-museum-closure-philadelphia",
  "Water_Paint_Coating_Dewpoint": "water-paint-coating-dewpoint",
  "Wasp_Named_David_Attenborough_Birthday": "wasp-named-david-attenborough",
  "Tiny_Object_Solar_System_Atmosphere": "tiny-object-solar-system-atmosphere",
  "Global_Pandemic_Treaty_Delay": "global-pandemic-treaty-delay",
  "Pluto_Reclassification_Planet_Effort": "pluto-reclassification-planet-effort",
  "Interstellar_Comet_3I_ATLAS_Origin": "interstellar-comet-3i-atlas-origin",
  "Giant_Dam_Save_AMOC": "giant-dam-save-amoc",
  "Scarlet_Fever_Pre_Columbian_America": "scarlet-fever-pre-columbian-america",
  "Mexican_Government_Data_Theft_AI": "mexican-government-data-theft-ai",
  "Ohio_Fireball_Meteor_March_2026": "ohio-fireball-meteor-march-2026",
  "Ohio_Fireball_Meteor_Sonic_Boom_2026": "ohio-fireball-meteor-march-2026",
  "Artemis_2_Astronauts_Ready_Mission": "artemis-2-astronauts-ready-mission",
  "Silverpit_Crater_Asteroid_Impact": "silverpit-crater-asteroid-impact",
  "Prehistoric_Insects_South_America_Amber": "prehistoric-insects-south-america-amber",
  "Oldest_Mummies_Southeast_Asia": "oldest-mummies-southeast-asia",
  "Cleopatra_Sunken_Port_Discovery": "cleopatra-sunken-port-discovery",
  "British_Pilot_Mars_Simulation": "british-pilot-mars-simulation",
  "Military_Drone_Mother_Ship": "military-drone-mothership",
  "Mars_Life_Discovery": "mars-life-discovery",
  "Cyanobacteria_Mars_Oxygen": "cyanobacteria-mars-oxygen",
  "Russia_Enteromix_Vaccine": "russia-enteromix-vaccine",
  "Changan_Nevo_A06": "changan-nevo-a06",
  "Atlas_Comet_Confirmation": "atlas-comet",
  "Comet_Lemmon_Tail_Disruption": "comet-lemmon-tail-disruption",
  "Mosquitoes_Iceland_Discovery": "mosquitoes-iceland-discovery",
  "Ryugu_Asteroid_Water_Discovery": "ryugu-asteroid-water-discovery",
  "Geomagnetic_Storm_Northern_Lights": "geomagnetic-storm-northern-lights",
  "Mammoth_RNA_Discovery": "mammoth-rna-discovery",
  "Skydiver_Sun_Photography": "skydiver-sun-photography",
  "James_Watson_Passing": "james-watson-passing",
  "Shenzhou_21_Capsule_Mission": "shenzhou-21-capsule-mission",
  "NASA_Atlas_Comet_Images": "nasa-atlas-comet-images",
  "Ancient_Crocodile_Ancestor_Discovery": "ancient-crocodile-ancestor-discovery",
  "Aspirin_Replacement_Clopidogrel": "aspirin-replacement",
  "China_AR_Helmet": "china-ar-helmet",
  "Black_Death_Shadow": "black-death",
  "Space_Plane_Mission": "space-plane",
  "Uranus_New_Moon_Discovery": "uranus-moon",
  "Sony_Humanoid_Robots_Weaknesses": "sony-robots",
  "Orange_Shark_Discovery": "orange-shark",
  "Dinosaur_Fossil_Crocodile_Bone": "dinosaur-fossil-crocodile-bone",
  "Nobel_Prize_Medicine_2025": "nobel-prize-medicine-2025",
  "Nobel_Prize_Physics_2025": "nobel-prize-physics-2025",
  "Nobel_Prize_Chemistry_2025": "nobel-prize-chemistry-2025",
  "Celtic_Metal_Coins_Discovery": "celtic-metal-coins-discovery",
  "volcanic-eruption-prediction-mount-etna": "volcanic-eruption-prediction-mount-etna",
  "Volcanic_Eruption_Prediction_Mount_Etna": "volcanic-eruption-prediction-mount-etna",
  "Artemis_III_Astronauts_Named": "artemis-3-astronauts-named",
  "Global_Underground_Fungal_Network_Map_Revealed": "global-underground-fungal-network-map",
  "MAVEN_Mars_Spacecraft_Final_Journey": "maven-mars-spacecraft-final-journey",
  "Humpback_Whales_Sound_Discovery": "humpback-whales-sound-discovery",
  "British_Paralympian_John_McFall_Astronaut": "british-paralympian-john-mcfall-astronaut",
  "Psyche_Spacecraft_Mars_Gravity_Assist": "psyche-spacecraft-mars-gravity-assist",
  "Orcas_Ramming_Sunfish": "orcas-ramming-sunfish",
  "Double_Star_System_Both_Supernovae": "double-star-system-both-supernovae",
  "Pan_Am_Wreckage_Discovered": "pan-am-wreckage-discovered",
  "Little_Red_Dots_Early_Universe": "little-red-dots-early-universe",
  "Earhart_Nikumaroro_Clue": "earhart-nikumaroro-clue",
  "Jodrell_Bank_Observatory_Risk": "jodrell-bank-observatory-risk",
  "EarthBlackBoxTasmania": "earth-black-box-tasmania",
  "Earth_Black_Box_Tasmania": "earth-black-box-tasmania",
  "NewAirForceOneService": "new-air-force-one",
  "New_Air_Force_One_Service": "new-air-force-one",
  "Supernova_Remnant_Milky_Way": "supernova-remnant-milky-way",
  "Vaquita_Digital_Reconstruction": "vaquita-digital-reconstruction",
  "ISS_Ocean_Crash_Plan": "iss-ocean-crash-plan",
  "Euclid_Milky_Way_Center": "euclid-milky-way-center",
  "New_Marine_Species_Brazil": "new-marine-species-brazil",
  "Swift_Telescope_Rescue": "swift-telescope-rescue",
  "Antarctic_Titanosaur_Fossil": "antarctic-titanosaur-fossil",
  "LHC_Shutdown_Upgrade": "lhc-shutdown-upgrade",
  "GJ_3378b_Earth_Like_Planet": "gj-3378b-earth-like-planet",
  "Fermi_Paradox_AI_Explanation": "fermi-paradox-ai-explanation",
  "Nuclear_Satellite_BOHR": "nuclear-satellite-bohr",
  "India_Skyroot_Orbital_Rocket": "india-skyroot-orbital-rocket",
  "Koala_Cryopreservation": "koala-cryopreservation",
  "First_Space_XRay": "first-space-xray",
  "US_Space_Force_Meadowlands": "us-space-force-meadowlands",
  "Pluto_Titan_Mystery_Substance": "pluto-titan-mystery-substance",
  "Africa_First_Lunar_Mission_China_2029": "africa-first-lunar-mission-china-2029",
  "Pacific_Ring_Of_Fire_Volcanic_Cooling": "pacific-ring-of-fire-volcanic-cooling",
  "Dinosaur_Asteroid_Heat_17_Times": "dinosaur-asteroid-heat-17-times",
  "SpaceX_Rocket_Moon_Crash_2026": "spacex-rocket-moon-crash-2026",
  "World_Reservoirs_Sedimentation_2060": "world-reservoirs-sedimentation-2060",
  "Inouye_Solar_Telescope_Clearest_Sun_Images": "inouye-solar-telescope-clearest-sun-images",
  "Black_Hole_Star_Discovery": "first-ever-black-hole-star-discovered-james-webb-space-telescope",
  "SpaceX_AI_Starmind_Satellites": "spacex-massive-shift-artificial-intelligence-starmind-satellites-2026",
  "Total_Solar_Eclipse_Europe_2026": "total-solar-eclipse-august-2026-greenland-iceland-spain",
  "British_Fossil_Collection_Abu_Dhabi": "british-jurassic-coast-fossil-collection-sold-abu-dhabi-natural-history-museum",
  "AI_Designed_Virus_Stanford": "ai-creates-virus-first-time-stanford-university-bacteriophage-breakthrough-2026",
  "Cellular_Health_Science_Longevity_Breakthroughs": "cellular-health-science-longevity-breakthroughs",
  "Gut_Brain_Connection_Microbiome_Health_Science": "gut-brain-connection-microbiome-health-science",
  "AI_In_Health_Science_Precision_Medicine": "ai-in-health-science-precision-medicine",
  "Food_Science_Ultra_Processed_Foods_Metabolic_Health": "food-science-ultra-processed-foods-metabolic-health",
  "August_2026_Lunar_Eclipse_Blood_Moon_Guide": "august-2026-lunar-eclipse-blood-moon-guide",
  "Elon_Musk_SpaceX_Starship_Flight_14_Launch_Delay": "elon-musk-spacex-starship-flight-14-launch-delay",
  "Honor_Humanoid_Robot_Beats_Usain_Bolt_100m_Record": "honor-humanoid-robot-beats-usain-bolt-100m-record",
  "Apollo_12_Moon_Dust_Camera_Mishap": "apollo-12-moon-dust-camera-mishap-untold-story",
  "Solar_Flare_Northern_Lights_Geomagnetic_Storm": "solar-flare-northern-lights-geomagnetic-storm-forecast",
  "NASA_Nancy_Grace_Roman_Telescope_Launch": "nasa-nancy-grace-roman-space-telescope-launch-falcon-heavy",
  "James_Webb_LHS1140b_Biomarkers": "james-webb-telescope-detects-biomarkers-super-earth-lhs-1140b",
  "MRNA_Universal_Cancer_Vaccine_Phase3": "mrna-universal-cancer-vaccine-phase-3-trials",
  "Fault_Tolerant_Quantum_Processor_1000Qubits": "fault-tolerant-quantum-processor-1000-qubits-breakthrough",
  "Perovskite_Silicon_Tandem_Solar_34Percent": "perovskite-silicon-tandem-solar-cells-shatter-efficiency-record",
  "Ancient_DNA_Two_Million_Year_Hominin": "ancient-dna-2-million-year-fossil-unknown-human-ancestor-africa",
  "Ancient_Supervolcano_Discovered_England_The_Wash": "ancient-supervolcano-discovered-england-the-wash-geology",
  "Saturn_Decagon_Atmosphere_South_Pole_Discovery": "saturn-decagon-atmosphere-south-pole-discovery",
  "New_Earthquake_Prediction_Model_UC_Riverside": "new-earthquake-prediction-model-uc-riverside-kamchatka-faults",
  "Mathspace_Data_Breach_Australia_NZ": "mathspace-data-breach-australia-new-zealand-students-schools",
  "TypeSafe_Jev_AI_System_One_Model_Agent_Decisions": "typesafe-jev-ai-system-one-model-agent-decisions-security",
  "typesafe-jev-ai": "typesafe-jev-ai-system-one-model-agent-decisions-security"
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

function formatDateForNewsXml(dateStr) {
  if (!dateStr) return new Date().toISOString();
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
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

      let image = parsedObj.image;
      if (image && typeof image === 'string' && image.startsWith('/')) {
        image = DOMAIN + image;
      } else if (!image || typeof image !== 'string' || !image.startsWith('http')) {
        const imgMatch = content.match(/image:\s*["'](https?:\/\/[^"']+)["']/);
        if (imgMatch) {
          image = imgMatch[1];
        } else {
          const relImgMatch = content.match(/image:\s*["'](\/[^"']+)["']/);
          image = relImgMatch ? (DOMAIN + relImgMatch[1]) : DEFAULT_IMAGE;
        }
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
  const nowMs = Date.now();
  const fortyEightHoursMs = 48 * 60 * 60 * 1000;
  const recentArticles = articlesList.filter(art => {
    const pubTime = new Date(art.date).getTime();
    return !isNaN(pubTime) && (nowMs - pubTime) <= fortyEightHoursMs && (nowMs - pubTime) >= -86400000;
  });
  const newsArticles = recentArticles.length >= 2 ? recentArticles : articlesList.slice(0, 10);

  let newsXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  newsXml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  newsXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  for (const art of newsArticles) {
    const slug = getSlug(art);
    const pubDate = formatDateForNewsXml(art.date);
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

  // 6. Generate RSS Feed (rss.xml & feed.xml)
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
    path.join(rootDir, 'public')
  ];

  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    targetDirs.push(distDir);
  }

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

  console.log(`✓ Successfully generated XML Sitemaps and RSS Feeds (No static HTML prerender).`);
}

main();
