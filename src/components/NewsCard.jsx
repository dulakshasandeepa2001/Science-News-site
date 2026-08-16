import { Clock, User, Sparkles, Calendar, ArrowRight } from 'lucide-react';

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

const isRecentlyPublished = (dateStr) => {
  try {
    const publishDate = new Date(dateStr);
    const now = new Date();
    const diffInHours = (now - publishDate) / (1000 * 60 * 60);
    return diffInHours <= 7;
  } catch {
    return false;
  }
};

const NewsCard = ({ article, highlighted = false }) => {
  const relativeTime = getRelativeTimeString(article.date);

  return (
    <div 
      className={`group cursor-pointer overflow-hidden bg-card border rounded-2xl hover:shadow-xl transition-all duration-300 transform sm:hover:-translate-y-1 active:scale-[0.98] flex flex-col h-full ${
        highlighted ? 'border-primary/40 shadow-lg ring-1 ring-primary/20' : 'border-border/60 hover:border-primary/30'
      }`}
    >
      {/* Article Image Container */}
      <div className="relative overflow-hidden aspect-[16/9] sm:aspect-[16/10]">
        <img 
          src={article.image} 
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-primary/90 backdrop-blur-md text-primary-foreground px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
            {article.category}
          </span>
          {highlighted && isRecentlyPublished(article.date) && (
            <span className="bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm animate-pulse">
              <Sparkles size={12} /> Latest
            </span>
          )}
        </div>

        {/* Desktop Read Button Badge */}
        <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1 text-xs font-semibold bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-foreground shadow-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
          <span>Read Story</span>
          <ArrowRight size={13} className="text-primary" />
        </div>
      </div>

      {/* Article Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className={`${highlighted ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'} font-extrabold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200`}>
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-3 border-t border-border/50 flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate max-w-[65%]">
              <User size={13} className="text-primary shrink-0" />
              <span className="truncate font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock size={13} className="text-muted-foreground shrink-0" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-muted-foreground shrink-0" />
              <span>{article.date}</span>
            </div>
            {relativeTime && (
              <span className={`font-semibold ${isRecentlyPublished(article.date) ? 'text-amber-500' : 'text-primary'}`}>
                {relativeTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
