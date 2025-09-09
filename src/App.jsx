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
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
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
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

