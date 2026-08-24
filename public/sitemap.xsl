<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap - Daily Science News</title>
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
            max-width: 1200px;
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
            color: #38bdf8;
            margin: 0 0 8px 0;
            font-size: 24px;
          }
          p {
            color: #94a3b8;
            font-size: 14px;
            margin: 0;
            line-height: 1.5;
          }
          .stats {
            margin-top: 12px;
            font-size: 13px;
            color: #cbd5e1;
          }
          .stats strong {
            color: #38bdf8;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #1e293b;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #334155;
          }
          th {
            background: #0f172a;
            color: #38bdf8;
            text-align: left;
            padding: 14px 16px;
            font-size: 13px;
            font-weight: 600;
            border-bottom: 1px solid #334155;
          }
          td {
            padding: 12px 16px;
            font-size: 13px;
            border-bottom: 1px solid #334155;
            color: #cbd5e1;
          }
          tr:hover td {
            background: #283548;
          }
          a {
            color: #38bdf8;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: bold;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Daily Science News — XML Sitemap</h1>
            <p>This is a sitemaps.org compliant XML sitemap generated for search engines including Google, Bing, and Yahoo.</p>
            <div class="stats">
              Total Indexed URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> |
              Compliant with <a href="https://www.sitemaps.org/protocol.html" target="_blank">Sitemaps.org Protocol</a>
            </div>
          </header>
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">URL &amp; Page Title</th>
                <th style="width: 20%;">Last Modified</th>
                <th style="width: 15%;">Change Frequency</th>
                <th style="width: 15%;">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:choose>
                        <xsl:when test="image:image/image:title">
                          <strong><xsl:value-of select="image:image/image:title"/></strong><br/>
                          <small style="color:#64748b;"><xsl:value-of select="sitemap:loc"/></small>
                        </xsl:when>
                        <xsl:when test="news:news/news:title">
                          <strong><xsl:value-of select="news:news/news:title"/></strong><br/>
                          <small style="color:#64748b;"><xsl:value-of select="sitemap:loc"/></small>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </a>
                  </td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                  <td><span class="badge"><xsl:value-of select="sitemap:changefreq"/></span></td>
                  <td><xsl:value-of select="sitemap:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
