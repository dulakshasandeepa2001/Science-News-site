import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
  "Tim_Cook_Apple_CEO_Transition": "tim-cook-apple-ceo-transition",
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
  "Elon_Musk_SpaceX_Starship_Flight_14_Launch_Delay": "elon-musk-spacex-starship-flight-14-launch-delay"
};

const SLUG_ALIASES = {
  "ancient-forest": "ancient-forest-under-arctic-ice",
  "florida-panther": "florida-panther-habitat-expansion",
  "zombie-virus": "zombie-virus-rabbits-study",
  "aspirin-replacement-clopidogrel": "aspirin-replacement",
  "russia-enteromix-cancer-vaccine": "russia-enteromix-vaccine",
  "sony-humanoid-robots-vulnerability": "sony-robots",
  "rare-orange-shark-discovered": "orange-shark"
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

function parseAllArticles() {
  const articlesDir = path.join(rootDir, 'src', 'data', 'articles');
  const articlesList = [];
  const seenSlugs = new Set();

  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.js') && !f.endsWith('.new'));

    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
        const idMatch = content.match(/id:\s*["']?([\w-]+)["']?/);
        const id = idMatch ? idMatch[1] : path.basename(file, '.js');
        const title = extractField(content, 'title') || id.replace(/_/g, ' ');
        const summary = extractField(content, 'summary') || title;
        const category = extractField(content, 'category') || 'Science';
        const date = extractField(content, 'date') || 'August 17, 2026';
        const slug = extractField(content, 'slug') || null;

        const articleObj = { id, title, summary, category, date, slug };
        const articleSlug = getSlug(articleObj);

        if (!seenSlugs.has(articleSlug)) {
          seenSlugs.add(articleSlug);
          articlesList.push(articleObj);
        }
      } catch (e) {}
    }
  }

  const inlineArticles = [
    { id: "3", title: "Scientists Uncover Hidden Brain Shortcut to Weight Loss", category: "Health & Medicine", date: "August 10, 2025" },
    { id: "4", title: "DNA Breakthrough: New Gene Editing Technique Discovered", category: "Health & Medicine", date: "August 9, 2025" },
    { id: "5", title: "AI System Detects Diseases Before Symptoms Appear", category: "Technology", date: "August 8, 2025" },
    { id: "6", title: "Quantum Internet Breakthrough: Secure Communication Achieved Over 100km", category: "Technology", date: "August 7, 2025" },
    { id: "7", title: "New Carbon Capture Technology Removes CO2 at Record Efficiency", category: "Environment", date: "August 6, 2025" },
    { id: "9", title: "Breakthrough in Quantum Computing Achieves Error Correction Milestone", category: "Technology", date: "August 14, 2025" }
  ];

  for (const item of inlineArticles) {
    const slug = getSlug(item);
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      articlesList.push(item);
    }
  }

  return articlesList;
}

const articlesList = parseAllArticles();
const slugMap = new Map();
articlesList.forEach(a => {
  slugMap.set(getSlug(a), a);
});

console.log('==============================================');
console.log('       COMPREHENSIVE SEO & LINK AUDIT         ');
console.log('==============================================\n');

console.log(`1. ARTICLES DATA:`);
console.log(`- Total valid articles: ${articlesList.length}`);
console.log(`- Total unique slugs: ${slugMap.size}`);

// 2. INDEX.HTML AUDIT
console.log(`\n2. INDEX.HTML AUDIT:`);
const indexHtmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

const canonicalMatch = indexHtmlContent.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
console.log(`- Head Canonical URL: ${canonicalMatch ? canonicalMatch[1] : 'MISSING'}`);

const allHrefs = [...indexHtmlContent.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
const articleLinks = allHrefs.filter(h => h.startsWith('/article/'));
console.log(`- Total <a href="/article/..."> in index.html: ${articleLinks.length}`);

const brokenLinks = [];
articleLinks.forEach(link => {
  const slug = link.replace('/article/', '');
  const canonical = SLUG_ALIASES[slug] || slug;
  if (!slugMap.has(slug) && !slugMap.has(canonical)) {
    brokenLinks.push(slug);
  }
});

if (brokenLinks.length > 0) {
  console.error(`❌ BROKEN SLUGS IN INDEX.HTML (${brokenLinks.length}):`, brokenLinks);
} else {
  console.log(`✓ All ${articleLinks.length} article links in index.html resolve correctly!`);
}

// 3. SITEMAP.XML AUDIT
console.log(`\n3. SITEMAP.XML AUDIT:`);
const sitemapContent = fs.readFileSync(path.join(rootDir, 'public', 'sitemap.xml'), 'utf-8');
const sitemapLocs = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapArticleUrls = sitemapLocs.filter(loc => loc.includes('/article/'));
console.log(`- Total URLs in sitemap.xml: ${sitemapLocs.length}`);
console.log(`- Article URLs in sitemap.xml: ${sitemapArticleUrls.length}`);

const brokenSitemap = [];
sitemapArticleUrls.forEach(url => {
  const slug = url.split('/article/')[1];
  const canonical = SLUG_ALIASES[slug] || slug;
  if (!slugMap.has(slug) && !slugMap.has(canonical)) {
    brokenSitemap.push(slug);
  }
});
if (brokenSitemap.length > 0) {
  console.error(`❌ Broken URLs in sitemap.xml:`, brokenSitemap);
} else {
  console.log(`✓ All ${sitemapArticleUrls.length} article URLs in sitemap.xml are valid!`);
}

// 4. NEWS SITEMAP
console.log(`\n4. NEWS-SITEMAP.XML AUDIT:`);
const newsSitemapContent = fs.readFileSync(path.join(rootDir, 'public', 'news-sitemap.xml'), 'utf-8');
const newsLocs = [...newsSitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`- Total URLs in news-sitemap.xml: ${newsLocs.length}`);

// 5. AUXILIARY SITEMAPS
console.log(`\n5. AUXILIARY SITEMAPS:`);
['post-sitemap.xml', 'page-sitemap.xml', 'category-sitemap.xml'].forEach(sm => {
  const p = path.join(rootDir, 'public', sm);
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf-8');
    const count = [...c.matchAll(/<loc>([^<]+)<\/loc>/g)].length;
    console.log(`- ${sm}: EXISTS, ${count} URLs`);
  } else {
    console.log(`- ${sm}: MISSING`);
  }
});

// 6. ROBOTS.TXT
console.log(`\n6. ROBOTS.TXT:`);
const robotsContent = fs.readFileSync(path.join(rootDir, 'public', 'robots.txt'), 'utf-8');
console.log(robotsContent.trim());

console.log('\n==============================================');
console.log('               AUDIT COMPLETE                 ');
console.log('==============================================');
