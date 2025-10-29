import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
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
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

