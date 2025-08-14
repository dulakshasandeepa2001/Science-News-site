import { Beaker, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Beaker className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Science News Publishing</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for the latest scientific discoveries and breakthroughs from around the world.
            </p>
            <div className="flex gap-2">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Space & Physics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Health & Medicine</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Technology</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Environment</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Genetics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Editorial Team</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest scientific discoveries.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Science News Publishing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

