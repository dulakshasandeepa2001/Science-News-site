import { Clock, User, Sparkles, Calendar } from 'lucide-react';

// Temporary fallback if date-utils or UI components aren't working
const getRelativeTimeString = (dateStr) => {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = diffTime / (1000 * 60 * 60);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return diffMinutes === 0 ? 'Just now' : `${diffMinutes} min ago`;
    }
    if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return '';
  } catch {
    return '';
  }
};

// Check if article was published within the last 7 hours
const isRecentlyPublished = (dateStr) => {
  try {
    const publishDate = new Date(dateStr);
    const now = new Date();
    const diffInHours = (now - publishDate) / (1000 * 60 * 60);
    return diffInHours <= 7; // True if published within last 7 hours
  } catch {
    return false;
  }
};

const NewsCard = ({ article, highlighted = false }) => {
  const relativeTime = getRelativeTimeString(article.date);
  return (
    <div 
      className={`group cursor-pointer overflow-hidden bg-card border rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full ${
        highlighted ? 'border-primary/30 shadow-md' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-md"
        >
          Read More
        </button>
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
            {article.category}
          </span>
          {highlighted && isRecentlyPublished(article.date) && (
            <span className="ml-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Sparkles size={12} className="mr-1" /> Latest
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className={`${highlighted ? 'text-2xl' : 'text-xl'} font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300`}>
          {article.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.summary}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User size={14} />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
        </div>
        <div className="mt-2 text-xs flex items-center">
          <Calendar size={12} className="mr-1 text-muted-foreground" />
          <span className="text-muted-foreground">{article.date}</span>
          {relativeTime && (
            <span className={`ml-2 font-medium ${isRecentlyPublished(article.date) ? 'text-amber-500' : 'text-primary'}`}>
              {relativeTime}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

