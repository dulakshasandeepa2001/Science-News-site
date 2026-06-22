import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ArrowLeft, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { MAVEN_Mars_Spacecraft_Final_Journey } from '../../data/articles/MAVEN_Mars_Spacecraft_Final_Journey.js';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

const MavenMarsSpacecraftFinalJourneyArticlePage = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState([0]);

  const article = MAVEN_Mars_Spacecraft_Final_Journey;

  useEffect(() => {
    document.title = `${article.title} - Science News Publishing`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', article.summary);
    }
  }, [article.title, article.summary]);

  const toggleSection = (index) => {
    if (visibleSections.includes(index)) {
      setVisibleSections(visibleSections.filter((i) => i !== index));
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
    navigate('/category/Space-Physics');

    document.title = 'Science News Publishing - Latest Scientific Discoveries';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Stay informed with cutting-edge research, breakthrough discoveries, and the latest developments in science and technology from around the world. Your trusted source for scientific news.'
      );
    }
  };

  const isLastVisibleSection =
    Math.max(...visibleSections) === article.content.sections.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          onClick={handleBackToHome}
          variant="ghost"
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Space & Physics Articles
        </Button>

        <article className="space-y-8">
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

          <div className="space-y-4">
            {article.content.sections.map((section, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between hover:opacity-70 transition-opacity"
                  >
                    <h2 className="text-xl font-semibold text-left">
                      {section.title}
                    </h2>
                    {visibleSections.includes(index) ? (
                      <ChevronUp size={20} className="flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown size={20} className="flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {visibleSections.includes(index) && (
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {!isLastVisibleSection && (
            <div className="flex justify-center pt-4">
              <Button
                onClick={showNextSection}
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Read Next Section
              </Button>
            </div>
          )}
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default MavenMarsSpacecraftFinalJourneyArticlePage;
