import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { 
  ArrowLeft, 
  Clock, 
  User, 
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
  Sparkles,
  ListOrdered,
  Calendar,
  Bookmark
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
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (propArticle) {
      setArticle(propArticle);
    } else if (articleId) {
      const foundArticle = findArticleBySlugOrId(articles, articleId);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        navigate('/');
      }
    }
  }, [articleId, navigate, propArticle]);

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

        <article className="space-y-10">
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
                  <span>{article.readTime || '6 min read'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} />
                  <span>Published: {article.date}</span>
                </div>
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
                className="w-full h-72 md:h-[440px] object-cover"
                loading="eager"
              />
              <figcaption className="text-xs text-muted-foreground bg-card/90 px-4 py-2.5 border-t">
                Research press illustration and scientific imagery related to {article.title}
              </figcaption>
            </figure>

            {/* Table of Contents (TOC) for Smooth Reader Experience & SEO */}
            {article.content?.sections?.length > 1 && (
              <nav aria-label="Table of Contents" className="p-6 rounded-2xl bg-card border border-primary/20 shadow-sm space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-foreground uppercase tracking-wider">
                  <ListOrdered size={18} className="text-primary" /> Table of Contents
                </div>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground pt-1">
                  {article.content.sections.map((section, index) => (
                    <li key={index}>
                      <a 
                        href={`#section-${index + 1}`}
                        className="hover:text-primary hover:underline flex items-start gap-2 py-1 transition-colors"
                      >
                        <span className="font-semibold text-primary/80 shrink-0">{index + 1}.</span>
                        <span className="line-clamp-1">{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </header>

          {/* Full Linear Article Content (No Accordions - 100% Crawlable) */}
          <div className="space-y-10 pt-2">
            {article.content?.sections?.map((section, index) => (
              <section 
                key={index} 
                id={`section-${index + 1}`} 
                className="scroll-mt-24 space-y-4 border-b pb-8 last:border-b-0"
              >
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-baseline gap-3">
                  <span className="text-primary/60 font-mono text-xl md:text-2xl">{index + 1}.</span>
                  <span>{section.title}</span>
                </h2>
                
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-serif whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* Author Bio, E-E-A-T Standards & Editorial Oversight Box */}
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
                This scientific report has been written and reviewed in accordance with Science News Publishing&apos;s rigorous editorial guidelines. Our editorial team verifies findings against original publications in leading peer-reviewed scientific journals such as <em>Nature</em>, <em>Science</em>, <em>The Lancet</em>, <em>Cell</em>, <em>The Astrophysical Journal</em>, and official releases from NASA, ESA, CERN, WHO, and international universities.
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

            {/* Outbound Authoritative References */}
            <section className="p-6 rounded-2xl bg-muted/30 border text-xs md:text-sm space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <ExternalLink size={16} className="text-primary" /> Authoritative Sources &amp; Primary Literature
              </h3>
              <p className="text-muted-foreground">
                For complete datasets, clinical trial registries, and peer-reviewed primary papers related to this report, please consult:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li><a href="https://www.nature.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Nature Scientific Journal &amp; Research Articles</a></li>
                <li><a href="https://www.science.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Science / AAAS Official Publications</a></li>
                <li><a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PubMed / National Library of Medicine (NIH)</a></li>
                <li><a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">World Health Organization (WHO) Research Portals</a></li>
                <li><a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NASA Science &amp; Space Exploration Releases</a></li>
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
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
