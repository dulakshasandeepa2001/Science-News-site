import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Search, Menu, X, Beaker, Sparkles, BookOpen, Compass, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Space & Physics', path: '/category/space' },
    { name: 'Health & Medicine', path: '/category/health' },
    { name: 'Technology', path: '/category/technology' },
    { name: 'Environment', path: '/category/environment' },
  ];

  const categoryLinks = [
    { name: 'Space', path: '/category/space', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
    { name: 'Physics', path: '/category/physics', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    { name: 'Technology', path: '/category/technology', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { name: 'Health', path: '/category/health', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    { name: 'Environment', path: '/category/environment', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    { name: 'Biology', path: '/category/biology', color: 'bg-teal-500/10 text-teal-500 border-teal-500/20' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Beaker className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent tracking-tight">
              Science News
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Search Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-full hover:bg-muted"
            aria-label="Search articles"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* Mobile Menu Hamburger Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-full hover:bg-muted"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-primary animate-in spin-in-90 duration-200" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-b bg-card/95 p-4 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearchSubmit} className="container mx-auto max-w-2xl flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search topics (e.g. Space, Physics, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                autoFocus
              />
            </div>
            <Button type="submit" size="sm" className="px-5 font-medium">Search</Button>
          </form>
        </div>
      )}

      {/* Interactive Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b bg-background/98 backdrop-blur-xl animate-in slide-in-from-top-4 duration-300 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="container mx-auto px-4 py-6 space-y-6">
            
            {/* Quick Links */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3">Navigation</span>
              <div className="grid gap-1 pt-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>Home & Featured</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>

                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-secondary" />
                    <span>Science Blog</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-3 pt-2 border-t">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3 flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-primary" /> Explore Categories
              </span>
              <div className="grid grid-cols-2 gap-2">
                {categoryLinks.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-between ${cat.color} transition-all active:scale-95`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer CTA */}
            <div className="pt-4 border-t text-center text-xs text-muted-foreground">
              <p>Science News Publishing • Updated Daily</p>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
