import { Link } from 'react-router-dom';
import { Beaker, Facebook, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-16 text-card-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Beaker className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Science News
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted global destination for cutting-edge scientific research, space missions, technology breakthroughs, and health discoveries.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all active:scale-95" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all active:scale-95" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all active:scale-95" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="mailto:contact@sciencenewshub.click" className="p-2 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all active:scale-95" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
          <div>
            <h3 className="font-bold text-base mb-4 tracking-wide text-foreground">Categories</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/category/space" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"><span>Space &amp; Astronomy</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/category/physics" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"><span>Physics Discoveries</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/category/health" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"><span>Health &amp; Medicine</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/category/technology" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"><span>Technology &amp; AI</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/category/environment" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"><span>Environment &amp; Climate</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="font-bold text-base mb-4 tracking-wide text-foreground">Quick Links</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-semibold text-primary">About Us &amp; Founder</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">Website Disclaimer</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Science Blog</Link></li>
              <li><a href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">XML Sitemap</a></li>
              <li><a href="/rss.xml" className="text-muted-foreground hover:text-primary transition-colors">RSS News Feed</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-base mb-4 tracking-wide text-foreground">Stay Informed</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Get the latest scientific breakthroughs delivered straight to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3.5 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors shadow-sm active:scale-[0.98]"
              >
                Subscribe Free
              </button>
            </form>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
          <p>&copy; {currentYear} Science News Publishing. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
