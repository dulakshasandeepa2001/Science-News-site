import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ArrowLeft, Clock, User, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { blogs } from '../data/blogsCollection.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const BlogPostPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [visibleSections, setVisibleSections] = useState([0]); // First section is always visible
  
  useEffect(() => {
    if (blogId) {
      const foundBlog = blogs.find(b => b.id === blogId);
      if (foundBlog) {
        setBlog(foundBlog);
        document.title = `${foundBlog.title} - Science News Blog`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', foundBlog.summary);
        }
      } else {
        navigate('/blog');
      }
    }
  }, [blogId, navigate]);

  const toggleSection = (index) => {
    if (visibleSections.includes(index)) {
      setVisibleSections(visibleSections.filter(i => i !== index));
    } else {
      setVisibleSections([...visibleSections, index]);
    }
  };

  const showNextSection = () => {
    const nextIndex = visibleSections.length;
    if (nextIndex < blog?.content.sections.length) {
      setVisibleSections([...visibleSections, nextIndex]);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Loading blog post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/blog')}
                className="mb-4 text-white hover:text-white hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
              
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    {getCategoryDisplayName(blog.category)}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {blog.title}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-200 mb-4">
                  {blog.summary}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {blog.content.sections.map((section, index) => (
                <Card key={index} className="overflow-hidden">
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => toggleSection(index)}
                  >
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    {visibleSections.includes(index) ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </div>
                  
                  {visibleSections.includes(index) && (
                    <CardContent className="px-6 pb-6">
                      <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                        {section.content}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {visibleSections.length < blog.content.sections.length && (
              <div className="mt-8 text-center">
                <Button onClick={showNextSection} size="lg">
                  Read More
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {visibleSections.length === blog.content.sections.length && (
              <div className="mt-12 p-6 bg-accent rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-3">Enjoyed this blog post?</h3>
                <p className="text-muted-foreground mb-4">
                  Explore more insightful articles on our blog
                </p>
                <Button asChild>
                  <Link to="/blog">View All Blog Posts</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
