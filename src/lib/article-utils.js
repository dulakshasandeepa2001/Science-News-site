/**
 * Article Slug & Routing Utilities for Daily Science News
 * Ensures all URLs follow SEO standards: strictly lowercase, hyphens instead of underscores/CamelCase.
 */

// Helper to convert any text to a clean URL slug
export function toSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-alphanumeric chars
    .replace(/[\s_]+/g, '-')   // replace spaces and underscores with hyphens
    .replace(/-+/g, '-');      // collapse multiple hyphens
}

// Map of legacy IDs (numeric, CamelCase, or underscore strings) to clean SEO slugs
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
  "Elon_Musk_SpaceX_Starship_Flight_14_Launch_Delay": "elon-musk-spacex-starship-flight-14-launch-delay",
  "Honor_Humanoid_Robot_Beats_Usain_Bolt_100m_Record": "honor-humanoid-robot-beats-usain-bolt-100m-record"
};

// Aliases mapping common slug variations to primary canonical slug
const SLUG_ALIASES = {
  "ancient-forest": "ancient-forest-under-arctic-ice",
  "florida-panther": "florida-panther-habitat-expansion",
  "zombie-virus": "zombie-virus-rabbits-study",
  "aspirin-replacement-clopidogrel": "aspirin-replacement",
  "russia-enteromix-cancer-vaccine": "russia-enteromix-vaccine",
  "sony-humanoid-robots-vulnerability": "sony-robots",
  "rare-orange-shark-discovered": "orange-shark"
};

/**
 * Gets the clean SEO slug for any article object.
 */
export function getArticleSlug(article) {
  if (!article) return '';
  if (article.slug) return toSlug(article.slug);
  
  const idStr = String(article.id);
  if (LEGACY_SLUG_MAP[idStr]) {
    return LEGACY_SLUG_MAP[idStr];
  }
  
  if (typeof article.id === 'string' && article.id.length > 0) {
    return toSlug(article.id);
  }
  
  if (article.title) {
    return toSlug(article.title);
  }
  
  return `article-${idStr}`;
}

/**
 * Gets the clean SEO path for an article (/article/slug)
 */
export function getArticleLink(article) {
  const slug = getArticleSlug(article);
  return `/article/${slug}`;
}

/**
 * Finds an article in an array by slug, id, or normalized string.
 */
export function findArticleBySlugOrId(articlesList, targetSlugOrId) {
  if (!targetSlugOrId || !articlesList) return null;
  const targetNorm = toSlug(targetSlugOrId);
  const canonicalTarget = SLUG_ALIASES[targetNorm] || targetNorm;

  return articlesList.find(art => {
    if (String(art.id) === String(targetSlugOrId)) return true;
    if (art.slug && (toSlug(art.slug) === targetNorm || toSlug(art.slug) === canonicalTarget)) return true;
    
    const computedSlug = getArticleSlug(art);
    if (computedSlug === targetNorm || computedSlug === canonicalTarget) return true;
    if (SLUG_ALIASES[computedSlug] === targetNorm || SLUG_ALIASES[computedSlug] === canonicalTarget) return true;
    
    if (typeof art.id === 'string' && (toSlug(art.id) === targetNorm || toSlug(art.id) === canonicalTarget)) return true;
    return false;
  }) || null;
}
