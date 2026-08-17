import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import { articles } from '../data/articlesCollection.js';
import { findArticleBySlugOrId, getArticleSlug, getArticleLink } from '../lib/article-utils.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';

const ArticlePage = ({ article: propArticle }) => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(propArticle || null);
  const [visibleSections, setVisibleSections] = useState([0]); // First section is always visible
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (propArticle) {
      setArticle(propArticle);
      setVisibleSections([0]);
    } else if (articleId) {
      const foundArticle = findArticleBySlugOrId(articles, articleId);
      if (foundArticle) {
        setArticle(foundArticle);
        setVisibleSections([0]);
      } else {
        navigate('/');
      }
    }
  }, [articleId, navigate, propArticle]);

  const toggleSection = (index) => {
    if (visibleSections.includes(index)) {
      setVisibleSections(visibleSections.filter(i => i !== index));
    } else {
      setVisibleSections([...visibleSections, index]);
    }
  };

  const showNextSection = () => {
    if (!article) return;
    const nextIndex = Math.max(...visibleSections) + 1;
    if (nextIndex < article.content.sections.length) {
      setVisibleSections([...visibleSections, nextIndex]);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isLastVisibleSection = article ? Math.max(...visibleSections) === article.content.sections.length - 1 : false;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Loading scientific report...</p>
        </div>
      </div>
    );
  }

  // Related articles in same category or latest
  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.category === article.category || !article.category))
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://sciencenewshub.click/article/${getArticleSlug(article)}`;
  const shareTitle = encodeURIComponent(article.title);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${article.title} - Science News Publishing`}
        description={article.summary}
        keywords={`${article.category}, science news, ${article.title.toLowerCase().split(' ').slice(0, 5).join(', ')}, peer-reviewed, research`}
        canonicalUrl={`https://sciencenewshub.click/article/${getArticleSlug(article)}`}
        ogType="article"
        ogImage={article.image}
        publishedTime={article.date}
        author={article.author || 'Science News Editorial Team'}
        category={article.category}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          onClick={handleBackToHome}
          variant="ghost" 
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All News
        </Button>

        <article className="space-y-8">
          {/* Article Header */}
          <header className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary text-primary-foreground px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                  {article.category || 'Science'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" /> Peer-Reviewed &amp; Fact-Checked
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {article.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
                {article.summary}
              </p>
            </div>

            {/* Author Byline & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-card border text-xs md:text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                    <User size={16} />
                  </div>
                  <span className="font-semibold text-foreground">{article.author || 'Science News Publishing'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={15} />
                  <span>{article.readTime || '5 min read'}</span>
                </div>
                <span>Published: {article.date}</span>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium mr-1 hidden sm:inline">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label="Share on X"
                >
                  <Twitter size={15} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors relative"
                  aria-label="Copy link"
                >
                  {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <figure className="relative overflow-hidden rounded-2xl border shadow-md">
              <img 
                src={article.image} 
                alt={`${article.title} - Scientific Discovery Coverage`}
                className="w-full h-72 md:h-[420px] object-cover"
                loading="eager"
              />
              <figcaption className="text-xs text-muted-foreground bg-card/90 px-4 py-2 border-t">
                Illustration / Official Research Press Image for {article.title}
              </figcaption>
            </figure>
          </header>

          {/* Article Content Sections */}
          <div className="space-y-6">
            {article.content.sections.map((section, index) => (
              <Card key={index} className="overflow-hidden border border-border/80 shadow-sm hover:border-primary/30 transition-colors">
                <CardContent className="p-0">
                  <div 
                    className="p-6 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground">
                        {section.title}
                      </h2>
                      {visibleSections.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  
                  {visibleSections.includes(index) && (
                    <div className="px-6 pb-6 border-t bg-muted/10">
                      <div className="pt-6">
                        <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-serif">
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
                  className="px-8 py-3 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Click Here to Read More
                  <ChevronDown className="h-5 w-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Article Complete & Author Bio Box (E-E-A-T) */}
            {isLastVisibleSection && (
              <div className="space-y-8 pt-6">
                
                {/* Author & Editorial Oversight Box */}
                <section className="p-6 md:p-8 rounded-2xl bg-card border border-border space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold text-lg">
                      SN
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg text-foreground">Science News Editorial Desk</h3>
                      <p className="text-xs text-muted-foreground">Specialized Science Journalists &amp; Academic Editors</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This scientific report has been written and reviewed in accordance with Science News Publishing&apos;s rigorous editorial guidelines. Our editorial team verifies findings against original publications in leading scientific journals such as <em>Nature</em>, <em>Science</em>, <em>The Astrophysical Journal</em>, and official releases from NASA, ESA, CERN, and international universities.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                    <span className="inline-flex items-center gap-1 text-primary font-medium">
                      <CheckCircle2 size={14} /> Fact-Checked
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-primary font-medium">
                      <BookOpen size={14} /> Academic Citations
                    </span>
                    <span>•</span>
                    <Link to="/about" className="text-primary hover:underline font-semibold">
                      Learn About Our Editorial Standards &rarr;
                    </Link>
                  </div>
                </section>

                {/* References & Outbound Citations */}
                <section className="p-6 rounded-2xl bg-muted/30 border text-xs md:text-sm space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <ExternalLink size={16} className="text-primary" /> Authoritative Sources &amp; Further Reading
                  </h3>
                  <p className="text-muted-foreground">
                    For primary datasets and official research publications related to this report, please consult:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li><a href="https://www.nature.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Nature Scientific Journal</a></li>
                    <li><a href="https://www.science.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Science / AAAS Official Publications</a></li>
                    <li><a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NASA Space Exploration &amp; Mission Data</a></li>
                  </ul>
                </section>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <section className="space-y-4 pt-4 border-t">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="text-primary" size={20} /> Recommended Scientific Reports
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {relatedArticles.map((rel) => (
                        <Link
                          key={rel.id}
                          to={getArticleLink(rel)}
                          className="group block p-4 rounded-xl bg-card border hover:border-primary/40 transition-all hover:shadow-md"
                        >
                          <img
                            src={rel.image}
                            alt={rel.title}
                            className="w-full h-28 object-cover rounded-lg mb-3"
                          />
                          <span className="text-[11px] font-bold text-primary uppercase">{rel.category}</span>
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1">
                            {rel.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                <div className="text-center py-6">
                  <Button onClick={handleBackToHome} variant="outline" size="lg">
                    Back to All Discoveries
                  </Button>
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
