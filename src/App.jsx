import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import BlogPage from './components/BlogPage.jsx';
import BlogPostPage from './components/BlogPostPage.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import ArticlePage from './components/ArticlePage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import AncientForestArticlePage from './components/articles/AncientForestArticlePage.jsx';
import FloridaPantherArticlePage from './components/articles/FloridaPantherArticlePage.jsx';
import ZombieVirusArticlePage from './components/articles/ZombieVirusArticlePage.jsx';
import SonyRobotsArticlePage from './components/articles/SonyRobotsArticlePage.jsx';
import OrangeSharkArticlePage from './components/articles/OrangeSharkArticlePage.jsx';
import UranusNewMoonArticlePage from './components/articles/UranusNewMoonArticlePage.jsx';
import SpacePlaneArticlePage from './components/articles/SpacePlaneArticlePage.jsx';
import BlackDeathShadowArticlePage from './components/articles/BlackDeathShadowArticlePage.jsx';
import ChinaARHelmetArticlePage from './components/articles/ChinaARHelmetArticlePage.jsx';
import AspirinReplacementArticlePage from './components/articles/AspirinReplacementArticlePage.jsx';
import AtlasCometArticlePage from './components/articles/AtlasCometArticlePage.jsx';
import ChanganNevoA06ArticlePage from './components/articles/ChanganNevoA06ArticlePage.jsx';
import RussiaEnteromixVaccineArticlePage from './components/articles/RussiaEnteromixVaccineArticlePage.jsx';
import CyanobacteriaMarsOxygenArticlePage from './components/articles/CyanobacteriaMarsOxygenArticlePage.jsx';
import MarsLifeDiscoveryArticlePage from './components/articles/MarsLifeDiscoveryArticlePage.jsx';
import MilitaryDroneMotherShipArticlePage from './components/articles/MilitaryDroneMotherShipArticlePage.jsx';
import BritishPilotMarsSimulationArticlePage from './components/articles/BritishPilotMarsSimulationArticlePage.jsx';
import OldestMummiesSoutheastAsiaArticlePage from './components/articles/OldestMummiesSoutheastAsiaArticlePage.jsx';
import CleopatraSunkenPortArticlePage from './components/articles/CleopatraSunkenPortArticlePage.jsx';
import DinosaurFossilCrocodileBoneArticlePage from './components/articles/DinosaurFossilCrocodileBoneArticlePage.jsx';
import NobelPrizeMedicine2025ArticlePage from './components/articles/NobelPrizeMedicine2025ArticlePage.jsx';
import NobelPrizePhysics2025ArticlePage from './components/articles/NobelPrizePhysics2025ArticlePage.jsx';
import NobelPrizeChemistry2025ArticlePage from './components/articles/NobelPrizeChemistry2025ArticlePage.jsx';
import CelticMetalCoinsDiscoveryArticlePage from './components/articles/CelticMetalCoinsDiscoveryArticlePage.jsx';
import VolcanicEruptionPredictionMountEtnaArticlePage from './components/articles/VolcanicEruptionPredictionMountEtnaArticlePage.jsx';
import JapanHTVXCargoISSArticlePage from './components/articles/JapanHTVXCargoISSArticlePage.jsx';
import Asteroid2025TP5CloseApproachArticlePage from './components/articles/Asteroid2025TP5CloseApproachArticlePage.jsx';
import SpaceXStarlink10000SatellitesArticlePage from './components/articles/SpaceXStarlink10000SatellitesArticlePage.jsx';
import MexicanGovernmentDataTheftArticlePage from './components/articles/MexicanGovernmentDataTheftArticlePage.jsx';
import AtlanticAMOCCollapseRiskArticlePage from './components/articles/AtlanticAMOCCollapseRiskArticlePage.jsx';
import TimCookAppleCEOTransitionArticlePage from './components/articles/TimCookAppleCEOTransitionArticlePage.jsx';
import WaterPaintCoatingArticlePage from './components/articles/WaterPaintCoatingArticlePage.jsx';
import BlueOriginNewGlennExplosionArticlePage from './components/articles/BlueOriginNewGlennExplosionArticlePage.jsx';
import MoonBaseIBlueOriginMissionArticlePage from './components/articles/MoonBaseIBlueOriginMissionArticlePage.jsx';
import RedDwarfStarsSwallowingPlanetsArticlePage from './components/articles/RedDwarfStarsSwallowingPlanetsArticlePage.jsx';
import TRexTinyArmsEvolutionarySacrificeArticlePage from './components/articles/TRexTinyArmsEvolutionarySacrificeArticlePage.jsx';
import BritishParalympianJohnMcFallAstronautArticlePage from './components/articles/BritishParalympianJohnMcFallAstronautArticlePage.jsx';
import HumpbackWhalesSoundDiscoveryArticlePage from './components/articles/HumpbackWhalesSoundDiscoveryArticlePage.jsx';
import Exoplanet_WASP121b_GemstoneRainArticlePage from './components/articles/Exoplanet_WASP121b_GemstoneRainArticlePage.jsx';
import MavenMarsSpacecraftFinalJourneyArticlePage from './components/articles/MavenMarsSpacecraftFinalJourneyArticlePage.jsx';
import M87_Black_Hole_Radiation_Jet_XRay_ArticlePage from './components/articles/M87_Black_Hole_Radiation_Jet_XRay_ArticlePage.jsx';
import EarthBlackBoxTasmaniaArticlePage from './components/articles/EarthBlackBoxTasmaniaArticlePage.jsx';
import NewAirForceOneServiceArticlePage from './components/articles/NewAirForceOneServiceArticlePage.jsx';
import SupernovaRemnantMilkyWayArticlePage from './components/articles/SupernovaRemnantMilkyWayArticlePage.jsx';
import VaquitaDigitalReconstructionArticlePage from './components/articles/VaquitaDigitalReconstructionArticlePage.jsx';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:blogId" element={<BlogPostPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/article/oldest-mummies-southeast-asia" element={<OldestMummiesSoutheastAsiaArticlePage />} />
        <Route path="/article/cleopatra-sunken-port-discovery" element={<CleopatraSunkenPortArticlePage />} />
        <Route path="/article/british-pilot-mars-simulation" element={<BritishPilotMarsSimulationArticlePage />} />
        <Route path="/article/military-drone-mothership" element={<MilitaryDroneMotherShipArticlePage />} />
        <Route path="/article/mars-life-discovery" element={<MarsLifeDiscoveryArticlePage />} />
        <Route path="/article/cyanobacteria-mars-oxygen" element={<CyanobacteriaMarsOxygenArticlePage />} />
        <Route path="/article/russia-enteromix-vaccine" element={<RussiaEnteromixVaccineArticlePage />} />
        <Route path="/article/changan-nevo-a06" element={<ChanganNevoA06ArticlePage />} />
        <Route path="/article/atlas-comet" element={<AtlasCometArticlePage />} />
        <Route path="/article/ancient-forest" element={<AncientForestArticlePage />} />
        <Route path="/article/florida-panther" element={<FloridaPantherArticlePage />} />
        <Route path="/article/zombie-virus" element={<ZombieVirusArticlePage />} />
        <Route path="/article/sony-robots" element={<SonyRobotsArticlePage />} />
        <Route path="/article/orange-shark" element={<OrangeSharkArticlePage />} />
        <Route path="/article/uranus-moon" element={<UranusNewMoonArticlePage />} />
        <Route path="/article/space-plane" element={<SpacePlaneArticlePage />} />
        <Route path="/article/black-death" element={<BlackDeathShadowArticlePage />} />
        <Route path="/article/china-ar-helmet" element={<ChinaARHelmetArticlePage />} />
        <Route path="/article/aspirin-replacement" element={<AspirinReplacementArticlePage />} />
        <Route path="/article/dinosaur-fossil-crocodile-bone" element={<DinosaurFossilCrocodileBoneArticlePage />} />
        <Route path="/article/nobel-prize-medicine-2025" element={<NobelPrizeMedicine2025ArticlePage />} />
        <Route path="/article/nobel-prize-physics-2025" element={<NobelPrizePhysics2025ArticlePage />} />
        <Route path="/article/nobel-prize-chemistry-2025" element={<NobelPrizeChemistry2025ArticlePage />} />
        <Route path="/article/celtic-metal-coins-discovery" element={<CelticMetalCoinsDiscoveryArticlePage />} />
        <Route path="/article/volcanic-eruption-prediction-mount-etna" element={<VolcanicEruptionPredictionMountEtnaArticlePage />} />
        <Route path="/article/japan-htv-x-cargo-iss" element={<JapanHTVXCargoISSArticlePage />} />
        <Route path="/article/asteroid-2025-tp5-close-approach" element={<Asteroid2025TP5CloseApproachArticlePage />} />
        <Route path="/article/spacex-starlink-10000-satellites" element={<SpaceXStarlink10000SatellitesArticlePage />} />
        <Route path="/article/mexican-government-data-theft-ai" element={<MexicanGovernmentDataTheftArticlePage />} />
        <Route path="/article/atlantic-amoc-collapse-risk" element={<AtlanticAMOCCollapseRiskArticlePage />} />
        <Route path="/article/tim-cook-apple-ceo-transition" element={<TimCookAppleCEOTransitionArticlePage />} />
        <Route path="/article/water-paint-coating" element={<WaterPaintCoatingArticlePage />} />
        <Route path="/article/blue-origin-new-glenn-explosion" element={<BlueOriginNewGlennExplosionArticlePage />} />
        <Route path="/article/moon-base-i-blue-origin-mission" element={<MoonBaseIBlueOriginMissionArticlePage />} />
        <Route path="/article/red-dwarf-stars-swallowing-planets" element={<RedDwarfStarsSwallowingPlanetsArticlePage />} />
        <Route path="/article/t-rex-tiny-arms-evolutionary-sacrifice" element={<TRexTinyArmsEvolutionarySacrificeArticlePage />} />
        <Route path="/article/british-paralympian-john-mcfall-astronaut" element={<BritishParalympianJohnMcFallAstronautArticlePage />} />
        <Route path="/article/humpback-whales-sound-discovery" element={<HumpbackWhalesSoundDiscoveryArticlePage />} />
        <Route path="/article/exoplanet-wasp-121b-gemstone-rain" element={<Exoplanet_WASP121b_GemstoneRainArticlePage />} />
        <Route path="/article/maven-mars-spacecraft-final-journey" element={<MavenMarsSpacecraftFinalJourneyArticlePage />} />
        <Route path="/article/m87-black-hole-radiation-jet-xray" element={<M87_Black_Hole_Radiation_Jet_XRay_ArticlePage />} />
        <Route path="/article/earth-black-box-tasmania" element={<EarthBlackBoxTasmaniaArticlePage />} />
        <Route path="/article/new-air-force-one" element={<NewAirForceOneServiceArticlePage />} />
        <Route path="/article/supernova-remnant-milky-way" element={<SupernovaRemnantMilkyWayArticlePage />} />
        <Route path="/article/vaquita-digital-reconstruction" element={<VaquitaDigitalReconstructionArticlePage />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

