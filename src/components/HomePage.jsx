import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import NewsCard from './NewsCard.jsx';
import { articles } from '../data/articlesCollection.js';
import { Clock, User, Sparkles } from 'lucide-react';

const HomePage = () => {
  // Function to check if article was published within the last 7 hours
  const isRecentlyPublished = (articleDate) => {
    const publishDate = new Date(articleDate);
    const now = new Date();
    const diffInHours = (now - publishDate) / (1000 * 60 * 60);
    return diffInHours <= 7; // True if published within last 7 hours
  };

  // Parse dates and sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Filter articles - only show recently published articles in featured section
  const recentArticles = sortedArticles.filter(article => isRecentlyPublished(article.date));
  
  // Get the very latest article for the featured banner (only if it's recent)
  const featuredArticle = recentArticles.length > 0 ? recentArticles[0] : sortedArticles[0];
  
  // Get the next set of articles for the latest news section
  // Start from index 1 if we have a recent featured article, otherwise start from 0
  const startIndex = recentArticles.length > 0 ? 1 : 0;
  
  // Filter articles for latest news section - include both recently published 
  // and older articles, but prioritize recent ones
  let latestArticlesSet = new Set();
  
  // First add any recent articles (that aren't the featured one)
  recentArticles.slice(1).forEach(article => latestArticlesSet.add(article));
  
  // Then fill up to 3 total articles with the next most recent
  let i = startIndex;
  while (latestArticlesSet.size < 3 && i < sortedArticles.length) {
    if (!latestArticlesSet.has(sortedArticles[i]) && sortedArticles[i] !== featuredArticle) {
      latestArticlesSet.add(sortedArticles[i]);
    }
    i++;
  }
  
  const latestArticles = Array.from(latestArticlesSet);
  
  // Remaining articles for the regular grid - exclude both featured and latest articles
  const usedArticleIds = new Set([featuredArticle.id, ...latestArticles.map(a => a.id)]);
  const remainingArticles = sortedArticles.filter(article => !usedArticleIds.has(article.id));
  
    // Function to get the correct link for an article
  const getArticleLink = (article) => {
    // Log article info for debugging
    console.log('Article ID:', article.id);
    console.log('Article Title:', article.title);
    
    // First check the article ID
    // For articles with string IDs (most newer articles)
    if (article.id === "Oldest_Mummies_Southeast_Asia") return "/article/oldest-mummies-southeast-asia";
    if (article.id === "British_Pilot_Mars_Simulation") return "/article/british-pilot-mars-simulation";
    if (article.id === "Military_Drone_Mother_Ship") return "/article/military-drone-mothership";
    if (article.id === "Mars_Life_Discovery") return "/article/mars-life-discovery";
    if (article.id === "Cyanobacteria_Mars_Oxygen") return "/article/cyanobacteria-mars-oxygen";
    if (article.id === "Russia_Enteromix_Vaccine") return "/article/russia-enteromix-vaccine";
    if (article.id === "Changan_Nevo_A06") return "/article/changan-nevo-a06";
    if (article.id === "Sony_Humanoid_Robots_Weaknesses") return "/article/sony-robots";
    if (article.id === "Orange_Shark_Discovery") return "/article/orange-shark";
    if (article.id === "Uranus_New_Moon_Discovery") return "/article/uranus-moon";
    if (article.id === "Space_Plane_Mission") return "/article/space-plane";
    if (article.id === "Black_Death_Shadow") return "/article/black-death";
    if (article.id === "China_AR_Helmet") return "/article/china-ar-helmet";
    if (article.id === "Aspirin_Replacement_Clopidogrel") return "/article/aspirin-replacement";
    if (article.id === "Atlas_Comet_Confirmation") return "/article/atlas-comet";
    if (article.id === "volcanic-eruption-prediction-mount-etna") return "/article/volcanic-eruption-prediction-mount-etna";
    if (article.id === "Japan_HTV_X_Cargo_ISS") return "/article/japan-htv-x-cargo-iss";
    
    // For articles with numeric IDs (older articles)
    if (article.id === 8) return "/article/ancient-forest";
    if (article.id === 11) return "/article/florida-panther";
    if (article.id === 12) return "/article/zombie-virus";
    if (article.id === 16) return "/article/aspirin-replacement";
    
    // For any other articles, use the generic route
    return `/article/${article.id}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Latest Scientific Discoveries
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay informed with cutting-edge research, breakthrough discoveries, and the latest developments 
            in science and technology from around the world.
          </p>
        </div>
      </section>

      {/* Featured Article Banner */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden shadow-xl bg-card">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {featuredArticle.category}
                  </span>
                  {isRecentlyPublished(featuredArticle.date) && (
                    <span className="ml-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center inline-flex">
                      <Sparkles size={14} className="mr-1" /> Just Published
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredArticle.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{featuredArticle.summary}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
                <Link 
                  to={getArticleLink(featuredArticle)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2 w-fit"
                >
                  Read Full Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <header className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest News</h2>
            <p className="text-muted-foreground">
              The most recent scientific breakthroughs and discoveries
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <article key={article.id} className="bg-card rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
                <Link to={getArticleLink(article)}>
                  <NewsCard article={article} highlighted={true} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <header className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
            <p className="text-muted-foreground">
              Explore our collection of the most important scientific breakthroughs and discoveries.
            </p>
          </header>
          
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="main">
            {remainingArticles.map((article) => (
              <article key={article.id}>
                <Link to={getArticleLink(article)}>
                  <NewsCard article={article} />
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>

      {/* Category Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover articles in your favorite scientific fields
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/category/Space-Physics" className="block">
              <div className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-all hover:bg-primary/10">
                <h3 className="text-xl font-semibold mb-2">Space & Physics</h3>
                <p className="text-muted-foreground">Explore the cosmos and the fundamental laws of the universe</p>
              </div>
            </Link>
            
            <Link to="/category/Health-Medicine" className="block">
              <div className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-all hover:bg-primary/10">
                <h3 className="text-xl font-semibold mb-2">Health & Medicine</h3>
                <p className="text-muted-foreground">Discover breakthroughs in healthcare and medical research</p>
              </div>
            </Link>
            
            <Link to="/category/Technology" className="block">
              <div className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-all hover:bg-primary/10">
                <h3 className="text-xl font-semibold mb-2">Technology</h3>
                <p className="text-muted-foreground">Learn about innovations and advances in modern technology</p>
              </div>
            </Link>
            
            <Link to="/category/Environment" className="block">
              <div className="bg-card rounded-lg p-6 text-center hover:shadow-md transition-all hover:bg-primary/10">
                <h3 className="text-xl font-semibold mb-2">Environment</h3>
                <p className="text-muted-foreground">Stay informed about climate science and environmental issues</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest scientific discoveries and breakthroughs.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 border rounded-lg bg-background"
              aria-label="Email address for newsletter subscription"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
