import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ArrowLeft, Clock, User, BookOpen, ListOrdered, Calendar, Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { blogs } from '../data/blogsCollection.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';

const BlogPostPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (blogId) {
      const foundBlog = blogs.find(b => b.id === blogId);
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        navigate('/blog');
      }
    }
  }, [blogId, navigate]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://sciencenewshub.click/blog/${blog.id}`;
  const shareTitle = encodeURIComponent(blog.title);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title={`${blog.title} - Science News Blog`}
        description={blog.summary}
        keywords={`${blog.category}, science blog, ${blog.title.toLowerCase().split(' ').slice(0, 5).join(', ')}, research insights`}
        canonicalUrl={`https://sciencenewshub.click/blog/${blog.id}`}
        ogType="article"
        ogImage={blog.image}
        publishedTime={blog.date}
        author={blog.author || 'Science News Editorial Team'}
        category={blog.category}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[360px] md:h-[480px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-10 max-w-4xl">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/blog')}
                className="mb-4 text-white hover:text-white hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Blog Posts
              </Button>
              
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  {getCategoryDisplayName(blog.category)}
                </span>
                
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  {blog.title}
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-200 line-clamp-2">
                  {blog.summary}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-primary" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
          
          {/* Social Share Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Share this analysis:</span>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Share on X"
              >
                <Twitter size={16} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors relative"
                aria-label="Copy link"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Table of Contents */}
          {blog.content?.sections?.length > 1 && (
            <nav aria-label="Table of Contents" className="p-6 rounded-2xl bg-card border border-primary/20 shadow-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground uppercase tracking-wider">
                <ListOrdered size={18} className="text-primary" /> Table of Contents
              </div>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground pt-1">
                {blog.content.sections.map((section, index) => (
                  <li key={index}>
                    <a 
                      href={`#blog-section-${index + 1}`}
                      className="hover:text-primary hover:underline flex items-start gap-2 py-1 transition-colors"
                    >
                      <span className="font-semibold text-primary/80 shrink-0">{index + 1}.</span>
                      <span className="line-clamp-1">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Full Linear Blog Sections (100% Crawlable) */}
          <div className="space-y-10">
            {blog.content?.sections?.map((section, index) => (
              <section 
                key={index} 
                id={`blog-section-${index + 1}`} 
                className="scroll-mt-24 space-y-4 border-b pb-8 last:border-b-0"
              >
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-baseline gap-3">
                  <span className="text-primary/60 font-mono text-xl md:text-2xl">{index + 1}.</span>
                  <span>{section.title}</span>
                </h2>
                
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-serif whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* Blog Footer Box */}
          <div className="mt-12 p-8 bg-card border rounded-2xl text-center space-y-4 shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">Enjoyed this scientific analysis?</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore more insightful articles, research breakdowns, and columns on our Science Blog.
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/blog">View All Blog Posts</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
