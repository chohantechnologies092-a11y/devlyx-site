import { blogService } from './blogService';
import { projectService } from './projectService';

export const sitemapService = {
  async generateSitemap() {
    const baseUrl = 'https://devlyxsolutions.com';
    const staticPages = [
      '',
      '/about',
      '/services',
      '/blog',
      '/contact',
      '/projects',
      '/start-project'
    ];

    try {
      const [posts, projects] = await Promise.all([
        blogService.getAllPosts(),
        projectService.getAllProjects()
      ]);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      // Static Pages
      staticPages.forEach(page => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${page}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
      });

      // Blog Posts
      posts.forEach(post => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.updatedAt?.seconds ? new Date(post.updatedAt.seconds * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      });

      // Projects
      projects.forEach(proj => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/projects/${proj.slug}</loc>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;
      return xml;
    } catch (error) {
      console.error("Sitemap generation error:", error);
      throw error;
    }
  }
};
