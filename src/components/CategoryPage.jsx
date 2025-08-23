import { useParams, Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import NewsCard from './NewsCard.jsx';
import { articles } from '../data/articlesCollection.js';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const formattedCategory = categoryName.replace(/-/g, ' & ');
  
  // Function to check if article was published within the last 7 hours
  const isRecentlyPublished = (articleDate) => {
    const publishDate = new Date(articleDate);
    const now = new Date();
    const diffInHours = (now - publishDate) / (1000 * 60 * 60);
    return diffInHours <= 7; // True if published within last 7 hours
  };
  
  // Filter articles by category
  const categoryArticles = articles
    .filter(
      article => article.category === formattedCategory || 
                article.category === categoryName
    )
    // Sort by date (newest first)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
  // Function to get the correct link for an article
  const getArticleLink = (article) => {
    if (article.id === 8) return "/article/ancient-forest";
    if (article.id === 11) return "/article/florida-panther";
    if (article.id === 12) return "/article/zombie-virus";
    if (article.id === "Sony_Humanoid_Robots_Weaknesses") return "/article/sony-robots";
    if (article.id === "Orange_Shark_Discovery") return "/article/orange-shark";
    if (article.id === "Uranus_New_Moon_Discovery") return "/article/uranus-moon";
    if (article.id === "Space_Plane_Mission") return "/article/space-plane";
    return `/article/${article.id}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {formattedCategory}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the latest discoveries and breakthroughs in {formattedCategory.toLowerCase()}.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <header className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{formattedCategory} Articles</h2>
            <p className="text-muted-foreground">
              Discover our collection of {formattedCategory.toLowerCase()} articles and research breakthroughs.
            </p>
          </header>
          
          {categoryArticles.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="main">
              {categoryArticles.map((article, index) => (
                <article key={article.id}>
                  <Link to={getArticleLink(article)}>
                    <NewsCard article={article} highlighted={isRecentlyPublished(article.date) || index < 2} />
                  </Link>
                </article>
              ))}
            </section>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No articles found in this category. Check back soon for updates!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated on {formattedCategory}</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest {formattedCategory.toLowerCase()} discoveries and breakthroughs.
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

export default CategoryPage;
