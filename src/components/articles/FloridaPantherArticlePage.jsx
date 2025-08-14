import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ArrowLeft, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import floridaPantherArticle from '../../data/articles/FloridaPantherArticlePage.js';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

const FloridaPantherArticlePage = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState([0]); // First section is always visible
  
  const article = floridaPantherArticle; // Direct import from the individual file
  
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = `${article.title} - Science News Publishing`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', article.summary);
    }
  }, [article.title, article.summary]);

  const toggleSection = (index) => {
    if (visibleSections.includes(index)) {
      setVisibleSections(visibleSections.filter(i => i !== index));
    } else {
      setVisibleSections([...visibleSections, index]);
    }
  };

  const showNextSection = () => {
    const nextIndex = Math.max(...visibleSections) + 1;
    if (nextIndex < article.content.sections.length) {
      setVisibleSections([...visibleSections, nextIndex]);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBackToCategory = () => {
    navigate(`/category/${article.category.toLowerCase().replace(' & ', '-')}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={handleBackToHome} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
          <Button variant="outline" size="sm" onClick={handleBackToCategory} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to {article.category}
          </Button>
        </div>
        
        {/* Article header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{article.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{article.summary}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-2">
              <User size={16} />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {article.readTime}
            </span>
            <span>{article.date}</span>
          </div>
        </div>
        
        {/* Article image */}
        <div className="mb-8">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto rounded-lg object-cover shadow-md"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg max-w-none">
          {article.content.sections.map((section, index) => (
            <Card key={index} className={`mb-6 ${index > 0 ? 'border border-primary/10' : 'border-0 shadow-none'}`}>
              {index === 0 ? (
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <p>{section.content}</p>
                </CardContent>
              ) : (
                <>
                  <div 
                    onClick={() => toggleSection(index)}
                    className="flex justify-between items-center p-6 cursor-pointer hover:bg-muted/50"
                  >
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                    {visibleSections.includes(index) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                  
                  {visibleSections.includes(index) && (
                    <CardContent>
                      <p>{section.content}</p>
                    </CardContent>
                  )}
                </>
              )}
            </Card>
          ))}
          
          {/* Show more sections button */}
          {visibleSections.length < article.content.sections.length && (
            <div className="text-center mt-8">
              <Button onClick={showNextSection}>
                Read More
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FloridaPantherArticlePage;
