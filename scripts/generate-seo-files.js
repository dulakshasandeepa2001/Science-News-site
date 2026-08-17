import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  "11": "florida-panther-habitat-expansion",
  "12": "zombie-virus-rabbits-study",
  "13": "sony-humanoid-robots-vulnerability",
  "14": "rare-orange-shark-discovered",
  "16": "aspirin-replacement-clopidogrel",
  "21": "russia-enteromix-cancer-vaccine",
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
  "AI_Designed_Virus_Stanford": "ai-creates-virus-first-time-stanford-university-bacteriophage-breakthrough-2026"
};

function getSlug(art) {
  if (art.slug) return toSlug(art.slug);
  const idStr = String(art.id);
  if (LEGACY_SLUG_MAP[idStr]) return LEGACY_SLUG_MAP[idStr];
  if (typeof art.id === 'string' && art.id.length > 0) return toSlug(art.id);
  if (art.title) return toSlug(art.title);
  return `article-${idStr}`;
}

function formatDateForXml(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch (e) {}
  return new Date().toISOString();
}

function formatDateForRss(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toUTCString();
  } catch (e) {}
  return new Date().toUTCString();
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

function parseArticleFiles() {
  const articlesDir = path.join(__dirname, '..', 'src', 'data', 'articles');
  const articlesList = [];

  if (!fs.existsSync(articlesDir)) return articlesList;

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.js'));

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');

      const idMatch = content.match(/id:\s*["']?([\w-]+)["']?/);
      const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
      const summaryMatch = content.match(/summary:\s*["'`]([\s\S]*?)["'`]\s*,/);
      const categoryMatch = content.match(/category:\s*["']([^"']+)["']/);
      const dateMatch = content.match(/date:\s*["']([^"']+)["']/);
      const authorMatch = content.match(/author:\s*["']([^"']+)["']/);
      const imageMatch = content.match(/image:\s*["']([^"']+)["']/);
      const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);

      const id = idMatch ? idMatch[1] : path.basename(file, '.js');
      const title = titleMatch ? titleMatch[1].replace(/\\"/g, '"') : id.replace(/_/g, ' ');
      const summary = summaryMatch ? summaryMatch[1].replace(/\\"/g, '"').replace(/\n\s*/g, ' ').trim() : title;
      const category = categoryMatch ? categoryMatch[1] : 'Science';
      const date = dateMatch ? dateMatch[1] : 'August 17, 2026';
      const author = authorMatch ? authorMatch[1] : 'Science News Publishing';
      const image = imageMatch ? imageMatch[1] : DEFAULT_IMAGE;
      const slug = slugMatch ? slugMatch[1] : null;

      articlesList.push({
        id,
        title,
        summary,
        category,
        date,
        author,
        image,
        slug
      });
    } catch (e) {
      console.warn(`Could not parse article file ${file}:`, e.message);
    }
  }

  articlesList.sort((a, b) => new Date(b.date) - new Date(a.date));

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
  const articlesList = parseArticleFiles();
  const blogsList = parseBlogFiles();
  const categories = ['Space', 'Physics', 'Technology', 'Health', 'Biology', 'Environment', 'Archaeology', 'Mathematics'];

  // 1. Generate Sitemap XML (With Image Extensions for Google Discover)
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  xml += `  <url><loc>${DOMAIN}/</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
  xml += `  <url><loc>${DOMAIN}/about</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
  xml += `  <url><loc>${DOMAIN}/contact</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
  xml += `  <url><loc>${DOMAIN}/privacy-policy</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
  xml += `  <url><loc>${DOMAIN}/terms</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
  xml += `  <url><loc>${DOMAIN}/disclaimer</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
  xml += `  <url><loc>${DOMAIN}/blog</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>\n`;

  for (const cat of categories) {
    xml += `  <url><loc>${DOMAIN}/category/${cat.toLowerCase()}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  }

  for (const art of articlesList) {
    const slug = getSlug(art);
    const pubDate = formatDateForXml(art.date);
    const imgUrl = art.image || DEFAULT_IMAGE;
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/article/${slug}</loc>\n`;
    xml += `    <lastmod>${pubDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
    xml += `      <image:title>${escapeXml(art.title)}</image:title>\n`;
    xml += `      <image:caption>${escapeXml(art.summary)}</image:caption>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
  }

  for (const blog of blogsList) {
    xml += `  <url><loc>${DOMAIN}/blog/${blog.id}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  }
  xml += `</urlset>\n`;

  // 2. Generate Google News Sitemap (Google News & Discover Specific)
  let newsXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  newsXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  for (const art of articlesList.slice(0, 50)) {
    const slug = getSlug(art);
    const pubDate = formatDateForXml(art.date);
    const imgUrl = art.image || DEFAULT_IMAGE;
    newsXml += `  <url>\n`;
    newsXml += `    <loc>${DOMAIN}/article/${slug}</loc>\n`;
    newsXml += `    <news:news>\n`;
    newsXml += `      <news:publication>\n`;
    newsXml += `        <news:name>Science News Publishing</news:name>\n`;
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

  // 3. Generate High-Quality RSS Feed (Google Publisher Center & Feedly Compliant)
  let rssXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  rssXml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">\n`;
  rssXml += `  <channel>\n`;
  rssXml += `    <title>Science News Publishing</title>\n`;
  rssXml += `    <link>${DOMAIN}</link>\n`;
  rssXml += `    <description>Latest Scientific Discoveries, Space Exploration Missions, AI Breakthroughs, and Peer-Reviewed Research</description>\n`;
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
    rssXml += `      <dc:creator>${escapeXml(art.author)}</dc:creator>\n`;
    rssXml += `      <category>${escapeXml(art.category)}</category>\n`;
    rssXml += `      <description>${escapeXml(art.summary)}</description>\n`;
    rssXml += `      <media:content url="${escapeXml(imgUrl)}" medium="image" width="1200" height="675">\n`;
    rssXml += `        <media:title>${escapeXml(art.title)}</media:title>\n`;
    rssXml += `      </media:content>\n`;
    rssXml += `    </item>\n`;
  }
  rssXml += `  </channel>\n`;
  rssXml += `</rss>\n`;

  const dirs = [
    path.join(__dirname, '..', 'public'),
    path.join(__dirname, '..', 'dist')
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'news-sitemap.xml'), newsXml, 'utf-8');
    fs.writeFileSync(path.join(dir, 'rss.xml'), rssXml, 'utf-8');
  }

  console.log(`✓ Successfully generated Google Discover & News SEO files for ${articlesList.length} articles in public/ and dist/`);
}

main();
