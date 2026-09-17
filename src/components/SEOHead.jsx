import { useEffect } from 'react';

const DEFAULT_SITE_NAME = 'Daily Science News';
const DEFAULT_DOMAIN = 'https://sciencenewshub.click';
const DEFAULT_FALLBACK_IMAGE = 'https://sciencenewshub.click/assets/lab.jpg';

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_FALLBACK_IMAGE,
  publishedTime,
  modifiedTime,
  author = 'Daily Science News',
  category,
  schema,
  faq,
  noindex = false
}) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title 
      ? (title.includes(DEFAULT_SITE_NAME) ? title : `${title} - ${DEFAULT_SITE_NAME}`)
      : 'Daily Science News - Latest Scientific Discoveries & Insights';
    document.title = fullTitle;

    // Helper function to update or create a meta tag
    const setMetaTag = (selector, nameAttr, nameValue, contentValue) => {
      if (!contentValue) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper function to update or create link rel tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Helper function to ensure meta description is always between 25 and 158 characters (Bing & Google compliant)
    const formatMetaDescription = (rawText) => {
      const fallback = 'Stay informed with cutting-edge research, space exploration, physics breakthroughs, AI technology, and health discoveries from around the world.';
      if (!rawText) return fallback;
      const clean = rawText.replace(/\s+/g, ' ').trim();
      if (clean.length > 158) {
        const truncated = clean.substring(0, 155);
        const lastSpace = truncated.lastIndexOf(' ');
        return (lastSpace > 60 ? truncated.substring(0, lastSpace) : truncated) + '...';
      }
      if (clean.length < 25) {
        return `${clean} - Daily Science News provides verified scientific research, space, physics, and medical breakthroughs.`;
      }
      return clean;
    };

    // 2. Base SEO Meta Tags (Google Discover & Google News Compliant)
    const metaDesc = formatMetaDescription(description);
    const metaKeys = keywords || 'science news, scientific discoveries, space research, astronomy, physics, technology, health';
    
    // Normalize current URL to always use canonical apex domain (no www, no hash)
    let currentUrl = canonicalUrl;
    if (!currentUrl && typeof window !== 'undefined') {
      currentUrl = window.location.origin.replace('www.sciencenewshub.click', 'sciencenewshub.click') + window.location.pathname;
    }
    if (!currentUrl) currentUrl = DEFAULT_DOMAIN;

    const imageUrl = ogImage || DEFAULT_FALLBACK_IMAGE;

    setMetaTag('meta[name="description"]', 'name', 'description', metaDesc);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', metaKeys);
    
    // Google Discover & Robots Directives
    const robotsContent = noindex 
      ? 'noindex, follow' 
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('meta[name="robots"]', 'name', 'robots', robotsContent);
    setMetaTag('meta[name="googlebot"]', 'name', 'googlebot', robotsContent);
    setMetaTag('meta[name="googlebot-news"]', 'name', 'googlebot-news', noindex ? 'noindex' : 'index, follow');
    setLinkTag('canonical', currentUrl);

    // 3. Open Graph Tags (High Resolution Image Specifications for Google Discover)
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDesc);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', DEFAULT_SITE_NAME);
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');
    if (imageUrl) {
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
      setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', imageUrl);
      setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
      setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '675');
      setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', title || 'Daily Science News');
    }

    // 4. Twitter Card Tags (Large Image Card)
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@ScienceNewsHub');
    setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@ScienceNewsHub');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDesc);
    if (imageUrl) {
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
      setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', title || 'Daily Science News');
    }

    // 5. Article-Specific Meta Tags
    if (ogType === 'article') {
      const pubIso = publishedTime ? new Date(publishedTime).toISOString() : new Date().toISOString();
      const modIso = modifiedTime ? new Date(modifiedTime).toISOString() : pubIso;
      setMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', pubIso);
      setMetaTag('meta[property="article:modified_time"]', 'property', 'article:modified_time', modIso);
      setMetaTag('meta[property="article:author"]', 'property', 'article:author', author || 'Daily Science News');
      setMetaTag('meta[property="article:section"]', 'property', 'article:section', category || 'Science');
      setMetaTag('meta[property="article:publisher"]', 'property', 'article:publisher', DEFAULT_DOMAIN);
    }

    // 6. JSON-LD Structured Data (Google Discover NewsArticle Schema)
    let jsonLdId = 'dynamic-seo-schema';
    let scriptTag = document.getElementById(jsonLdId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    let schemaData = schema;
    if (!schemaData) {
      if (ogType === 'article') {
        const pubIso = publishedTime ? new Date(publishedTime).toISOString() : new Date().toISOString();
        const modIso = modifiedTime ? new Date(modifiedTime).toISOString() : pubIso;
        
        schemaData = {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl
          },
          "headline": title || fullTitle,
          "description": metaDesc,
          "image": [
            imageUrl,
            {
              "@type": "ImageObject",
              "url": imageUrl,
              "contentUrl": imageUrl,
              "width": 1200,
              "height": 675
            }
          ],
          "datePublished": pubIso,
          "dateModified": modIso,
          "author": [{
            "@type": "Person",
            "name": author || "Science News Editorial Staff",
            "jobTitle": "Science Journalist",
            "url": `${DEFAULT_DOMAIN}/about`
          }],
          "publisher": {
            "@type": "NewsMediaOrganization",
            "name": DEFAULT_SITE_NAME,
            "url": DEFAULT_DOMAIN,
            "logo": {
              "@type": "ImageObject",
              "url": `${DEFAULT_DOMAIN}/favicon.ico`,
              "width": 60,
              "height": 60
            }
          },
          "articleSection": category || "Science",
          "inLanguage": "en-US",
          "isAccessibleForFree": "true",
          "keywords": metaKeys
        };

        if (Array.isArray(faq) && faq.length > 0) {
          const faqSchema = {
            "@type": "FAQPage",
            "mainEntity": faq.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          };
          schemaData = {
            "@context": "https://schema.org",
            "@graph": [
              schemaData,
              faqSchema
            ]
          };
        }
      } else {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": DEFAULT_SITE_NAME,
          "url": DEFAULT_DOMAIN,
          "description": metaDesc,
          "inLanguage": "en-US",
          "publisher": {
            "@type": "NewsMediaOrganization",
            "name": DEFAULT_SITE_NAME,
            "url": DEFAULT_DOMAIN
          }
        };
      }
    }

    scriptTag.text = JSON.stringify(schemaData);

  }, [title, description, keywords, canonicalUrl, ogType, ogImage, publishedTime, modifiedTime, author, category, schema, faq]);

  return null;
}
