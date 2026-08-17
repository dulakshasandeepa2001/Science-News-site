<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>RSS News Feed - Science News Publishing</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #0b0f19;
            color: #e2e8f0;
            margin: 0;
            padding: 30px 20px;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
          }
          header {
            background: #1e293b;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid #334155;
          }
          h1 {
            color: #f59e0b;
            margin: 0 0 8px 0;
            font-size: 24px;
          }
          p {
            color: #94a3b8;
            font-size: 14px;
            margin: 0;
            line-height: 1.5;
          }
          .feed-item {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            display: flex;
            gap: 20px;
            transition: border-color 0.2s;
          }
          .feed-item:hover {
            border-color: #f59e0b;
          }
          .feed-img {
            width: 180px;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
            flex-shrink: 0;
          }
          .feed-content {
            flex: 1;
          }
          .feed-title {
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 6px 0;
          }
          .feed-title a {
            color: #f1f5f9;
            text-decoration: none;
          }
          .feed-title a:hover {
            color: #f59e0b;
          }
          .feed-meta {
            font-size: 12px;
            color: #94a3b8;
            margin-bottom: 8px;
          }
          .feed-desc {
            font-size: 14px;
            color: #cbd5e1;
            line-height: 1.5;
            margin: 0;
          }
          .category-tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            background: rgba(245, 158, 11, 0.15);
            color: #f59e0b;
            margin-right: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Science News Publishing — RSS 2.0 News Feed</h1>
            <p><xsl:value-of select="rss/channel/description"/></p>
            <p style="margin-top: 8px; font-size: 12px; color: #64748b;">
              Last Updated: <xsl:value-of select="rss/channel/lastBuildDate"/> | Total Articles: <strong><xsl:value-of select="count(rss/channel/item)"/></strong>
            </p>
          </header>

          <div class="feed-list">
            <xsl:for-each select="rss/channel/item">
              <div class="feed-item">
                <xsl:if test="media:content/@url">
                  <img class="feed-img" src="{media:content/@url}" alt="{title}" />
                </xsl:if>
                <div class="feed-content">
                  <div class="feed-meta">
                    <span class="category-tag"><xsl:value-of select="category"/></span>
                    <span>Published: <xsl:value-of select="pubDate"/></span> | 
                    <span>By: <xsl:value-of select="dc:creator"/></span>
                  </div>
                  <h2 class="feed-title">
                    <a href="{link}"><xsl:value-of select="title"/></a>
                  </h2>
                  <p class="feed-desc"><xsl:value-of select="description"/></p>
                </div>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
