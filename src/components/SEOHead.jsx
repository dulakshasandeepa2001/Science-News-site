import { useEffect } from 'react';

const DEFAULT_SITE_NAME = 'Science News Publishing';
const DEFAULT_DOMAIN = 'https://sciencenewshub.click';

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://sciencenewshub.click/assets/logo.png',
  publishedTime,
  modifiedTime,
  author = 'Science News Publishing',
  category,
  schema
}) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title 
      ? (title.includes(DEFAULT_SITE_NAME) ? title : `${title} - ${DEFAULT_SITE_NAME}`)
      : 'Science News Publishing - Latest Scientific Discoveries & Insights';
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

    // 2. Base SEO Meta Tags
    const metaDesc = description || 'Stay informed with cutting-edge research, breakthrough discoveries, and the latest developments in science and technology from around the world.';
    const metaKeys = keywords || 'science news, scientific discoveries, space research, astronomy, physics, technology, health';
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : DEFAULT_DOMAIN);

    setMetaTag('meta[name="description"]', 'name', 'description', metaDesc);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', metaKeys);
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLinkTag('canonical', currentUrl);

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDesc);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', DEFAULT_SITE_NAME);
    if (ogImage) {
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    }

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDesc);
    if (ogImage) {
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    // 5. Article-Specific Meta Tags
    if (ogType === 'article') {
      if (publishedTime) setMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', new Date(publishedTime).toISOString());
      if (modifiedTime) setMetaTag('meta[property="article:modified_time"]', 'property', 'article:modified_time', new Date(modifiedTime).toISOString());
      if (author) setMetaTag('meta[property="article:author"]', 'property', 'article:author', author);
      if (category) setMetaTag('meta[property="article:section"]', 'property', 'article:section', category);
    }

    // 6. JSON-LD Structured Data (Schema.org)
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
        schemaData = {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": title || fullTitle,
          "description": metaDesc,
          "image": [ogImage],
          "datePublished": publishedTime ? new Date(publishedTime).toISOString() : new Date().toISOString(),
          "dateModified": modifiedTime ? new Date(modifiedTime).toISOString() : (publishedTime ? new Date(publishedTime).toISOString() : new Date().toISOString()),
          "author": [{
            "@type": "Organization",
            "name": author || DEFAULT_SITE_NAME
          }],
          "publisher": {
            "@type": "Organization",
            "name": DEFAULT_SITE_NAME,
            "url": DEFAULT_DOMAIN,
            "logo": {
              "@type": "ImageObject",
              "url": `${DEFAULT_DOMAIN}/favicon.ico`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl
          }
        };
      } else {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": DEFAULT_SITE_NAME,
          "url": DEFAULT_DOMAIN,
          "description": metaDesc
        };
      }
    }

    scriptTag.text = JSON.stringify(schemaData);

  }, [title, description, keywords, canonicalUrl, ogType, ogImage, publishedTime, modifiedTime, author, category, schema]);

  return null;
}
