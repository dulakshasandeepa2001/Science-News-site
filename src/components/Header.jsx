import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Search, Menu, Beaker } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Beaker className="h-8 w-8 text-primary" />
          </Link>
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Science News
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/category/Space-Physics" className="text-sm font-medium hover:text-primary transition-colors">
            Space & Physics
          </Link>
          <Link to="/category/Health-Medicine" className="text-sm font-medium hover:text-primary transition-colors">
            Health & Medicine
          </Link>
          <Link to="/category/Technology" className="text-sm font-medium hover:text-primary transition-colors">
            Technology
          </Link>
          <Link to="/category/Environment" className="text-sm font-medium hover:text-primary transition-colors">
            Environment
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

