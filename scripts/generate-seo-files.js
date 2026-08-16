import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articles } from '../src/data/articlesCollection.js';
import { blogs } from '../src/data/blogsCollection.js';
import { getArticleSlug } from '../src/lib/article-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://sciencenewshub.click';

function formatDateForXml(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString();
    }
  } catch (e) {}
  return new Date().toISOString();
}

function formatDateForRss(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toUTCString();
    }
  } catch (e) {}
  return new Date().toUTCString();
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap() {
  const categories = [
    'Space',
    'Physics',
    'Technology',
    'Health',
    'Biology',
    'Environment',
    'Archaeology',
    'Mathematics'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // 1. Homepage
  xml += `  <url>\n`;
  xml += `    <loc>${DOMAIN}/</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // 2. Blog Index
  xml += `  <url>\n`;
  xml += `    <loc>${DOMAIN}/blog</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;

  // 3. Categories
  for (const cat of categories) {
    const catSlug = cat.toLowerCase();
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/category/${catSlug}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // 4. Articles
  for (const article of articles) {
    const slug = getArticleSlug(article);
    const pubDate = formatDateForXml(article.date);
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/article/${slug}</loc>\n`;
    xml += `    <lastmod>${pubDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    if (article.image) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(article.image)}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(article.title)}</image:title>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  // 5. Blog Posts
  for (const blog of blogs) {
    const pubDate = formatDateForXml(blog.date);
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/blog/${blog.id}</loc>\n`;
    xml += `    <lastmod>${pubDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function generateGoogleNewsSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

  const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const article of sortedArticles) {
    const slug = getArticleSlug(article);
    const pubDate = formatDateForXml(article.date);

    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/article/${slug}</loc>\n`;
    xml += `    <news:news>\n`;
    xml += `      <news:publication>\n`;
    xml += `        <news:name>Science News Publishing</news:name>\n`;
    xml += `        <news:language>en</news:language>\n`;
    xml += `      </news:publication>\n`;
    xml += `      <news:publication_date>${pubDate}</news:publication_date>\n`;
    xml += `      <news:title>${escapeXml(article.title)}</news:title>\n`;
    xml += `    </news:news>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function generateRssFeed() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>Science News Publishing</title>\n`;
  xml += `    <link>${DOMAIN}</link>\n`;
  xml += `    <description>Latest Scientific Discoveries, Breakthroughs, Space Research, and Technology News</description>\n`;
  xml += `    <language>en-us</language>\n`;
  xml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  xml += `    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const article of sortedArticles) {
    const slug = getArticleSlug(article);
    const link = `${DOMAIN}/article/${slug}`;
    const pubDate = formatDateForRss(article.date);

    let fullBody = article.summary || '';
    if (article.content && article.content.sections) {
      fullBody = article.content.sections.map(s => `<p><strong>${escapeXml(s.title)}</strong>: ${escapeXml(s.content)}</p>`).join('\n');
    }

    xml += `    <item>\n`;
    xml += `      <title>${escapeXml(article.title)}</title>\n`;
    xml += `      <link>${link}</link>\n`;
    xml += `      <guid isPermaLink="true">${link}</guid>\n`;
    xml += `      <pubDate>${pubDate}</pubDate>\n`;
    xml += `      <author>${escapeXml(article.author || 'Science News Publishing')}</author>\n`;
    xml += `      <category>${escapeXml(article.category || 'Science')}</category>\n`;
    xml += `      <description>${escapeXml(article.summary)}</description>\n`;
    xml += `      <content:encoded><![CDATA[${fullBody}]]></content:encoded>\n`;
    if (article.image) {
      xml += `      <media:content url="${escapeXml(article.image)}" medium="image" />\n`;
    }
    xml += `    </item>\n`;
  }

  xml += `  </channel>\n`;
  xml += `</rss>\n`;
  return xml;
}

function updateIndexHtmlCrawlLinks() {
  const indexPath = path.join(__dirname, '..', 'index.html');
  if (!fs.existsSync(indexPath)) return;

  let indexContent = fs.readFileSync(indexPath, 'utf-8');

  // Build static anchor links for all articles, categories, and blogs
  let linkHtml = `\n    <!-- Static HTML Crawl Links Index for Googlebot Crawling -->\n`;
  linkHtml += `    <div id="google-crawl-links" style="display:none;" aria-hidden="true">\n`;
  linkHtml += `      <nav>\n`;
  linkHtml += `        <h2>Categories</h2>\n`;
  linkHtml += `        <ul>\n`;
  const categories = ['Space', 'Physics', 'Technology', 'Health', 'Biology', 'Environment', 'Archaeology', 'Mathematics'];
  for (const cat of categories) {
    linkHtml += `          <li><a href="/category/${cat.toLowerCase()}">${cat} News</a></li>\n`;
  }
  linkHtml += `        </ul>\n`;
  linkHtml += `        <h2>Latest Articles</h2>\n`;
  linkHtml += `        <ul>\n`;
  for (const article of articles) {
    const slug = getArticleSlug(article);
    linkHtml += `          <li><a href="/article/${slug}">${escapeXml(article.title)}</a></li>\n`;
  }
  linkHtml += `        </ul>\n`;
  linkHtml += `        <h2>Blog Posts</h2>\n`;
  linkHtml += `        <ul>\n`;
  for (const blog of blogs) {
    linkHtml += `          <li><a href="/blog/${blog.id}">${escapeXml(blog.title)}</a></li>\n`;
  }
  linkHtml += `        </ul>\n`;
  linkHtml += `      </nav>\n`;
  linkHtml += `    </div>\n`;

  // Replace existing crawl links section or insert before </body>
  if (indexContent.includes('<div id="google-crawl-links"')) {
    indexContent = indexContent.replace(/<div id="google-crawl-links"[\s\S]*?<\/div>\s*/, linkHtml);
  } else {
    indexContent = indexContent.replace('</body>', `${linkHtml}  </body>`);
  }

  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('✓ Injected complete HTML Crawl Links Index into index.html for Googlebot');
}

const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Write sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemap(), 'utf-8');
console.log('✓ Generated public/sitemap.xml');

// 2. Write news-sitemap.xml
fs.writeFileSync(path.join(publicDir, 'news-sitemap.xml'), generateGoogleNewsSitemap(), 'utf-8');
console.log('✓ Generated public/news-sitemap.xml');

// 3. Write rss.xml
fs.writeFileSync(path.join(publicDir, 'rss.xml'), generateRssFeed(), 'utf-8');
console.log('✓ Generated public/rss.xml');

// 4. Update index.html with complete crawl links
updateIndexHtmlCrawlLinks();
