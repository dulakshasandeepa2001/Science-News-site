import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Oldest_Mummies_Southeast_Asia } from '../../data/articles/Oldest_Mummies_Southeast_Asia.js';

const OldestMummiesSoutheastAsiaDirectLink = ({ isFeature }) => {
  const article = Oldest_Mummies_Southeast_Asia;
  
  const baseLinkClasses = "group block overflow-hidden transition-all";
  const linkClasses = isFeature 
    ? `${baseLinkClasses} h-full` 
    : baseLinkClasses;
  
  const baseCardClasses = "overflow-hidden border-0 h-full";
  const cardClasses = isFeature 
    ? `${baseCardClasses} flex flex-col` 
    : baseCardClasses;

  return (
    <Link to="/article/oldest-mummies-southeast-asia" className={linkClasses}>
      <Card className={cardClasses}>
        <div className={`relative overflow-hidden ${isFeature ? 'h-64' : 'h-48'}`}>
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              {article.category}
            </span>
          </div>
        </div>
        <CardContent className={`p-4 ${isFeature ? 'flex-1 flex flex-col' : ''}`}>
          <div className={`space-y-2 ${isFeature ? 'flex-1' : ''}`}>
            <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors ${isFeature ? 'text-2xl' : 'text-lg'}`}>
              {article.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2">
              {article.summary}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">{article.date}</span>
            <span className="text-xs text-muted-foreground">{article.readTime}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OldestMummiesSoutheastAsiaDirectLink;