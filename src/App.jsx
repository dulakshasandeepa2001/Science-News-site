import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import ArticlePage from './components/ArticlePage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import AncientForestArticlePage from './components/articles/AncientForestArticlePage.jsx';
import FloridaPantherArticlePage from './components/articles/FloridaPantherArticlePage.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/article/:articleId" element={<ArticlePage />} />
        <Route path="/article/ancient-forest" element={<AncientForestArticlePage />} />
        <Route path="/article/florida-panther" element={<FloridaPantherArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

