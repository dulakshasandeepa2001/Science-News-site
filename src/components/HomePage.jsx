import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import NewsCard from './NewsCard.jsx';
import SEOHead from './SEOHead.jsx';
import { articles } from '../data/articlesCollection.js';
import { getArticleLink } from '../lib/article-utils.js';
import { 
  Clock, 
  User, 
  Sparkles, 
  Rocket, 
  Atom, 
  HeartPulse, 
  Cpu, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const HomePage = () => {
  // Deduplicate and sort articles by publication date (newest first)
  const uniqueArticlesMap = new Map();
  articles.forEach((art) => {
    if (art && art.id && !uniqueArticlesMap.has(art.id)) {
      uniqueArticlesMap.set(art.id, art);
    }
  });

  const sortedArticles = Array.from(uniqueArticlesMap.values()).sort((a, b) => {
    return new Date(b.date || 0) - new Date(a.date || 0);
  });

  // 1. Featured / Hero Story (Top Breakthrough)
  const heroStory = sortedArticles[0] || articles[0];

  // 2. Latest Science News (Next 6 articles)
  const latestNews = sortedArticles.slice(1, 7);

  // Exclude hero & latest from category selections to avoid redundancy
  const usedIds = new Set([heroStory.id, ...latestNews.map((a) => a.id)]);

  // 3. Space & Astronomy Spotlight (4 articles)
  const spaceArticles = sortedArticles
    .filter((a) => !usedIds.has(a.id) && /space|astronomy|planet|orbit|moon|mars/i.test(a.category || ''))
    .slice(0, 4);
  spaceArticles.forEach((a) => usedIds.add(a.id));

  // 4. Physics & Deep Tech Spotlight (4 articles)
  const physicsTechArticles = sortedArticles
    .filter((a) => !usedIds.has(a.id) && /physics|quantum|technology|ai|cern/i.test(a.category || ''))
    .slice(0, 4);
  physicsTechArticles.forEach((a) => usedIds.add(a.id));

  // 5. Health, Longevity & Biology Research (4 articles)
  const healthArticles = sortedArticles
    .filter((a) => !usedIds.has(a.id) && /health|medicine|cellular|biology|nature|gut/i.test(a.category || ''))
    .slice(0, 4);
  healthArticles.forEach((a) => usedIds.add(a.id));

  // 6. Editor's Curated Picks (4 high-depth articles)
  const editorPicks = sortedArticles
    .filter((a) => !usedIds.has(a.id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Daily Science News - Latest Scientific Discoveries, Space & Research"
        description="Stay informed with verified breakthroughs in astronomy, space missions, physics, artificial intelligence, cellular longevity, and global science research."
        keywords="daily science news, scientific discoveries, space exploration, astronomy, quantum physics, AI technology, health research"
        canonicalUrl="https://sciencenewshub.click/"
        ogType="website"
      />
      <Header />
      
      {/* Editorial Trust Banner */}
      <section className="bg-primary/5 border-b py-3 px-4 text-xs md:text-sm text-center text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <ShieldCheck size={16} className="text-primary" /> Verified Academic &amp; Research Sources
        </span>
        <span className="hidden md:inline text-muted-foreground/50">•</span>
        <span>Peer-reviewed scientific journals &amp; space agency telemetry</span>
        <span className="hidden md:inline text-muted-foreground/50">•</span>
        <span className="text-primary font-semibold">Chief Editor: Dulaksha Sandeepa</span>
      </section>

      {/* Hero Section: Featured Story */}
      {heroStory && (
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles size={13} /> Featured Breakthrough
              </span>
              <span className="text-xs text-muted-foreground font-medium">{heroStory.category}</span>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center bg-card border rounded-3xl p-6 md:p-10 shadow-lg overflow-hidden">
              <div className="md:col-span-7 space-y-4">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  <Link to={getArticleLink(heroStory)} className="hover:text-primary transition-colors">
                    {heroStory.title}
                  </Link>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg line-clamp-3 leading-relaxed">
                  {heroStory.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <User size={15} className="text-primary" />
                    <span>{heroStory.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={15} />
                    <span>{heroStory.readTime || '7 min read'}</span>
                  </div>
                  <span>•</span>
                  <span>{heroStory.date}</span>
                </div>

                <div className="pt-3">
                  <Link 
                    to={getArticleLink(heroStory)}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 shadow-md transition-all text-sm"
                  >
                    Read Full Research Report <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="md:col-span-5 relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={heroStory.image} 
                  alt={heroStory.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest News Section (5-6 Articles) */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Live Reporting</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Latest Scientific News</h2>
            </div>
            <Link 
              to="/category/space" 
              className="text-xs md:text-sm font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Browse All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {latestNews.map((article) => (
              <article key={article.id} className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                <Link to={getArticleLink(article)} className="flex flex-col h-full">
                  <NewsCard article={article} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Space & Astronomy Spotlight (4 Articles) */}
      {spaceArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/20 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Rocket size={22} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Space &amp; Planetary Science</h2>
                  <p className="text-xs md:text-sm text-muted-foreground">Telescope observations, planetary geology, and cosmic missions</p>
                </div>
              </div>
              <Link 
                to="/category/space" 
                className="text-xs md:text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                View Space News <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {spaceArticles.map((article) => (
                <article key={article.id} className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                  <Link to={getArticleLink(article)} className="flex flex-col h-full">
                    <NewsCard article={article} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Physics, Quantum & Deep Tech Spotlight (4 Articles) */}
      {physicsTechArticles.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600">
                  <Atom size={22} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Physics &amp; Frontier Technology</h2>
                  <p className="text-xs md:text-sm text-muted-foreground">Quantum mechanics, theoretical physics, and AI innovations</p>
                </div>
              </div>
              <Link 
                to="/category/physics" 
                className="text-xs md:text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                View Physics Hub <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {physicsTechArticles.map((article) => (
                <article key={article.id} className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                  <Link to={getArticleLink(article)} className="flex flex-col h-full">
                    <NewsCard article={article} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Health, Medicine & Cellular Biology (4 Articles) */}
      {healthArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/20 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <HeartPulse size={22} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Health &amp; Life Sciences</h2>
                  <p className="text-xs md:text-sm text-muted-foreground">Cellular longevity, clinical oncology, and metabolic science</p>
                </div>
              </div>
              <Link 
                to="/category/health" 
                className="text-xs md:text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                View Health Science <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthArticles.map((article) => (
                <article key={article.id} className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                  <Link to={getArticleLink(article)} className="flex flex-col h-full">
                    <NewsCard article={article} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editor's Curated Analyses (4 Articles) */}
      {editorPicks.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
                  <Compass size={22} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Editor&apos;s Curated Analysis</h2>
                  <p className="text-xs md:text-sm text-muted-foreground">In-depth investigations into long-term scientific and geological questions</p>
                </div>
              </div>
              <Link 
                to="/about" 
                className="text-xs md:text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Editorial Standards <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {editorPicks.map((article) => (
                <article key={article.id} className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                  <Link to={getArticleLink(article)} className="flex flex-col h-full">
                    <NewsCard article={article} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scientific Discipline Hubs */}
      <section className="py-16 bg-muted/40 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Topic Navigation</span>
            <h2 className="text-3xl font-extrabold text-foreground mt-1">Explore Scientific Disciplines</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
              Access comprehensive peer-reviewed archives and investigative reports categorized by field.
            </p>
          </header>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link to="/category/space" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-primary/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <div className="p-3 rounded-xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                  <Rocket size={22} />
                </div>
                <h3 className="font-bold text-foreground text-sm md:text-base">Space &amp; Astronomy</h3>
                <p className="text-xs text-muted-foreground mt-1">Cosmic missions &amp; exoplanets</p>
              </div>
            </Link>
            
            <Link to="/category/physics" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-purple-500/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                  <Atom size={22} />
                </div>
                <h3 className="font-bold text-foreground text-sm md:text-base">Physics Discoveries</h3>
                <p className="text-xs text-muted-foreground mt-1">Quantum &amp; astrophysics</p>
              </div>
            </Link>
            
            <Link to="/category/technology" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-blue-500/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <Cpu size={22} />
                </div>
                <h3 className="font-bold text-foreground text-sm md:text-base">Technology &amp; AI</h3>
                <p className="text-xs text-muted-foreground mt-1">Frontier models &amp; robotics</p>
              </div>
            </Link>
            
            <Link to="/category/health" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-emerald-500/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                  <HeartPulse size={22} />
                </div>
                <h3 className="font-bold text-foreground text-sm md:text-base">Health &amp; Medicine</h3>
                <p className="text-xs text-muted-foreground mt-1">Oncology &amp; cellular biology</p>
              </div>
            </Link>

            <Link to="/category/biology" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-teal-500/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <h3 className="font-bold text-foreground text-sm md:text-base">Biology &amp; Nature</h3>
                <p className="text-xs text-muted-foreground mt-1">Genomics &amp; evolutionary traits</p>
              </div>
            </Link>

            <Link to="/category/environment" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-green-500/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <h3 className="font-bold text-foreground text-sm md:text-base">Environment &amp; Climate</h3>
                <p className="text-xs text-muted-foreground mt-1">Ocean currents &amp; geophysics</p>
              </div>
            </Link>

            <Link to="/category/archaeology" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-amber-500/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <h3 className="font-bold text-foreground text-sm md:text-base">Archaeology &amp; History</h3>
                <p className="text-xs text-muted-foreground mt-1">Ancient hominins &amp; fossils</p>
              </div>
            </Link>

            <Link to="/category/mathematics" className="group">
              <div className="bg-card border rounded-2xl p-5 text-center hover:border-red-500/50 hover:shadow-md transition-all h-full flex flex-col items-center justify-center">
                <h3 className="font-bold text-foreground text-sm md:text-base">Mathematics &amp; Logic</h3>
                <p className="text-xs text-muted-foreground mt-1">Millennium proofs &amp; theorems</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-background py-16 border-t">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
            Stay Ahead of Scientific Progress
          </h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Join over 10,000 science enthusiasts, researchers, and students receiving weekly breakdowns of verified peer-reviewed discoveries.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 text-sm border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Email address for science newsletter"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-semibold text-sm transition-all shadow-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-muted-foreground/70 mt-3">
            Zero spam. Unsubscribe at any time. Respecting your privacy under our{' '}
            <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
