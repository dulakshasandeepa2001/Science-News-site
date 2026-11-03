import { useParams, Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import NewsCard from './NewsCard.jsx';
import SEOHead from './SEOHead.jsx';
import NewsletterSubscription from './NewsletterSubscription.jsx';
import { articles } from '../data/articlesCollection.js';
import { getArticleLink } from '../lib/article-utils.js';

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
  
  // Filter and deduplicate articles by category
  const uniqueCategoryMap = new Map();
  articles
    .filter(
      article => article && (
        article.category === formattedCategory || 
        article.category === categoryName ||
        (article.category && article.category.toLowerCase().includes(categoryName.toLowerCase()))
      )
    )
    .forEach(art => {
      if (art && art.id && !uniqueCategoryMap.has(art.id)) {
        uniqueCategoryMap.set(art.id, art);
      }
    });

  const categoryArticles = Array.from(uniqueCategoryMap.values()).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${formattedCategory} News & Latest Discoveries - Daily Science News`}
        description={`Explore the latest scientific news, research papers, and breakthrough developments in ${formattedCategory}.`}
        keywords={`${formattedCategory} news, ${categoryName} discoveries, science research ${categoryName}`}
        canonicalUrl={`https://sciencenewshub.click/category/${categoryName.toLowerCase()}`}
        ogType="website"
        noindex={categoryArticles.length === 0 || categoryName.includes('{') || categoryName.includes('}')}
      />
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
        <NewsletterSubscription 
          variant="section"
          title={`Stay Updated on ${formattedCategory}`}
          description={`Subscribe to get instant email alerts when new verified ${formattedCategory.toLowerCase()} discoveries and breakthroughs are published.`}
          source={`category-${categoryName}`}
        />
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
