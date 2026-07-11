import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website', articleData = null }) => {
  const siteName = 'Devlyx Solutions';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Premium Digital Engineering`;
  const defaultDesc = "Devlyx Solutions is a world-class software engineering agency specializing in high-performance web applications, mobile apps, and AI-driven digital transformations.";
  const metaDesc = description || defaultDesc;
  const metaImage = image || '/og-image.jpg';
  const metaUrl = url || 'https://devlyxsolutions.com';

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Devlyx Solutions",
    "image": "https://devlyxsolutions.com/logo.png",
    "url": "https://devlyxsolutions.com",
    "telephone": "+923395129192",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Global Digital Operations",
      "addressLocality": "Dubai / Islamabad",
      "addressCountry": "AE/PK"
    },
    "sameAs": [
      "https://facebook.com/profile.php?id=61586420621668",
      "https://www.instagram.com/devlyx_solutions/"
    ]
  };

  const articleSchema = type === 'article' && articleData ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": [metaImage],
    "datePublished": articleData.publishedTime,
    "dateModified": articleData.modifiedTime || articleData.publishedTime,
    "author": [{
        "@type": "Organization",
        "name": "Devlyx Solutions",
        "url": "https://devlyxsolutions.com"
      }]
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDesc} />
      <meta property="twitter:image" content={metaImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(baseSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
