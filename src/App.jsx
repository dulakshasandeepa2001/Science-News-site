import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import BlogPage from './components/BlogPage.jsx';
import BlogPostPage from './components/BlogPostPage.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import ArticlePage from './components/ArticlePage.jsx';
import AboutPage from './components/AboutPage.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import TermsPage from './components/TermsPage.jsx';
import DisclaimerPage from './components/DisclaimerPage.jsx';
import BMICalculatorPage from './components/BMICalculatorPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CookieConsent />
      <Routes>
        {/* Core Publication Hubs */}
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:blogId" element={<BlogPostPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        
        {/* Trust, Legal & E-E-A-T Editorial Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />

        {/* Interactive Health & Clinical Utilities */}
        <Route path="/bmi-calculator" element={<BMICalculatorPage />} />
        <Route path="/tools/bmi-calculator" element={<BMICalculatorPage />} />

        {/* Universal Canonical Article Route (Zero Redirect Multi-Mapping) */}
        <Route path="/article/:articleId" element={<ArticlePage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
