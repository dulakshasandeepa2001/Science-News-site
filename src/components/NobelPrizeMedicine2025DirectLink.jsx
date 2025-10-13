import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Clock, User, ExternalLink } from 'lucide-react';
import { Nobel_Prize_Medicine_2025 } from '../data/articles/Nobel_Prize_Medicine_2025.js';

const NobelPrizeMedicine2025DirectLink = () => {
  const article = Nobel_Prize_Medicine_2025;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {article.summary}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
            <span>{article.date}</span>
          </div>
          
          <Link to="/article/nobel-prize-medicine-2025">
            <Button className="w-full group">
              Read Full Article
              <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NobelPrizeMedicine2025DirectLink;