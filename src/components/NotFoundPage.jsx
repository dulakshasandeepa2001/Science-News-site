import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-8">Page Not Found</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;
