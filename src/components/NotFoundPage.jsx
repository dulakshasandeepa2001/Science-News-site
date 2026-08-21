import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { 
  Compass, 
  Home, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Atom, 
  Telescope, 
  FileQuestion,
  BookOpen
} from 'lucide-react';
import { articles } from '../data/articlesCollection.js';
import { getArticleLink } from '../lib/article-utils.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';

const NotFoundPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // 3 Featured recommended articles
  const recommendedArticles = articles.slice(0, 3);

  const categories = [
    { name: 'Space', label: 'Space & Astronomy', path: '/category/Space' },
    { name: 'Health & Medicine', label: 'Health & Medicine', path: '/category/Health%20&%20Medicine' },
    { name: 'Technology', label: 'Technology & AI', path: '/category/Technology' },
    { name: 'Physics', label: 'Physics', path: '/category/Physics' },
    { name: 'Environment', label: 'Environment & Climate', path: '/category/Environment' },
    { name: 'Archaeology', label: 'Archaeology', path: '/category/Archaeology' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="404 - Page Not Found | Science News Publishing"
        description="The scientific report or page you are looking for could not be found. Explore our latest discoveries, space research, and health reports."
      />
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-10">
          
          {/* Animated Cosmic Illustration & 404 Badge */}
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping duration-1000 opacity-60" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary/30 to-blue-500/20 blur-xl" />
            <div className="relative z-10 p-6 rounded-3xl bg-card border border-primary/30 shadow-2xl flex items-center justify-center text-primary">
              <Telescope className="w-16 h-16 md:w-20 md:h-20 animate-pulse text-primary" />
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-destructive/10 text-destructive border border-destructive/20">
              <FileQuestion className="w-4 h-4" /> 404: Cosmic Void
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Scientific Record Not Found
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              The research report, dataset, or page you were attempting to access might have drifted beyond our observable index, been relocated, or never existed.
            </p>
          </div>

          {/* Direct Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-2 p-1.5 rounded-2xl bg-card border shadow-lg">
            <div className="pl-3 text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              placeholder="Search 108+ scientific articles, space news, health research..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Button type="submit" size="sm" className="font-semibold rounded-xl">
              Search
            </Button>
          </form>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="rounded-xl font-bold shadow-md">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" /> Return to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl font-bold">
              <Link to="/blog">
                <BookOpen className="w-4 h-4 mr-2" /> Browse Science Blog
              </Link>
            </Button>
          </div>

          {/* Browse by Categories */}
          <div className="pt-6 border-t space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Or Explore Scientific Categories
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  to={cat.path}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Scientific Discoveries */}
          <div className="pt-8 border-t text-left space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="text-primary" size={20} /> Latest Scientific Discoveries
              </h2>
              <Link to="/" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {recommendedArticles.map((art) => (
                <Link
                  key={art.id}
                  to={getArticleLink(art)}
                  className="group block p-4 rounded-2xl bg-card border hover:border-primary/40 transition-all duration-200 hover:shadow-lg"
                >
                  <img 
                    src={art.image} 
                    alt={art.title}
                    className="w-full h-32 object-cover rounded-xl mb-3 group-hover:scale-[1.02] transition-transform duration-200" 
                  />
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{art.category}</span>
                  <h3 className="text-sm font-bold text-foreground line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                    {art.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
