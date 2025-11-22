import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User } from 'lucide-react';
import { blogs } from '../data/blogsCollection.js';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogCategories = [
    { id: 'all', name: 'All Topics' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'technology', name: 'Technology' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'astronomy', name: 'Astronomy' }
  ];

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      'mathematics': 'Mathematics',
      'science': 'Science',
      'technology': 'Technology',
      'agriculture': 'Agriculture',
      'astronomy': 'Astronomy'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Science Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In-depth articles, analysis, and insights across various scientific disciplines
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {blogCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {selectedCategory === 'all' ? 'Latest Posts' : `${blogCategories.find(c => c.id === selectedCategory)?.name} Posts`}
          </h2>
          
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <Link to={`/blog/${blog.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                          {getCategoryDisplayName(blog.category)}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {blog.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        {blog.date}
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Read Full Article
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No blog posts found in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
