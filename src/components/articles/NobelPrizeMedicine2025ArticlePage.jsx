import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ArrowLeft, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Nobel_Prize_Medicine_2025 } from '../../data/articles/Nobel_Prize_Medicine_2025.js';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

const NobelPrizeMedicine2025ArticlePage = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState([0]); // First section is always visible
  
  const article = Nobel_Prize_Medicine_2025; // Direct import from the individual file
  
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

  const isLastVisibleSection = visibleSections.length === article.content.sections.length;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBackToHome}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Button>

        <article className="space-y-8">
          {/* Article Header */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
              <span>{article.date}</span>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>

          {/* Article Content Sections */}
          <div className="space-y-6">
            {article.content.sections.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">
                        {section.title}
                      </h2>
                      {visibleSections.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  
                  {visibleSections.includes(index) && (
                    <div className="px-6 pb-6 border-t bg-muted/20">
                      <div className="pt-6">
                        <p className="text-lg leading-relaxed text-foreground">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Continue Reading Button */}
            {!isLastVisibleSection && (
              <div className="text-center py-8">
                <Button 
                  onClick={showNextSection}
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Click Here to Read More
                  <ChevronDown className="h-5 w-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Article Complete Message */}
            {isLastVisibleSection && (
              <div className="text-center py-8 border-t">
                <p className="text-lg text-muted-foreground mb-4">
                  You've reached the end of this article.
                </p>
                <Button onClick={handleBackToHome} variant="outline">
                  Back to Health & Medicine Articles
                </Button>
              </div>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default NobelPrizeMedicine2025ArticlePage;