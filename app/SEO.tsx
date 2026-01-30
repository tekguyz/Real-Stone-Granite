
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_KB } from '../entities/company/knowledge';
import { MEDIA } from '../shared/assets';

export const SEO: React.FC = () => {
  // Brand Identity Data
  const TITLE = "Real Stone & Granite | Custom Fabrication & Monuments";
  const DESCRIPTION = "Est. 1993. The Treasure Coast's premier stone fabricator. Specializing in Italian Marble, Exotic Granite, and Federal Monuments.";
  const KEYWORDS = "Granite Fort Pierce, Marble Countertops, Navy SEAL Museum, Stone Fabrication, Industrial Luxury, Architectural Surfaces";
  const THEME_COLOR = "#2f2f2f"; // Matches primary oklch converted approx

  // Custom Monogram Favicon (SVG as Data URI)
  // Gold square with dark 'R'
  const faviconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="%23d4af37"/>
      <text x="50%" y="55%" font-family="monospace" font-weight="bold" font-size="350" fill="%232f2f2f" text-anchor="middle" dy=".1em">R</text>
    </svg>
  `.trim().replace(/\s+/g, ' ');
  
  const faviconUrl = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`;

  // Structured Data (JSON-LD) for Local Business Authority
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": COMPANY_KB.identity.name,
    "image": MEDIA.IMG_TRIDENT,
    "telephone": COMPANY_KB.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fort Pierce",
      "addressRegion": "FL",
      "postalCode": "34946",
      "addressCountry": "US"
    },
    "foundingDate": "1993",
    "description": DESCRIPTION,
    "url": window.location.origin
  };

  return (
    <Helmet>
      {/* --- Basic --- */}
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="theme-color" content={THEME_COLOR} />
      <link rel="icon" type="image/svg+xml" href={faviconUrl} />

      {/* --- Open Graph / Facebook / LinkedIn --- */}
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={MEDIA.IMG_TRIDENT} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content={COMPANY_KB.identity.name} />

      {/* --- Twitter --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={MEDIA.IMG_TRIDENT} />

      {/* --- JSON-LD Structured Data --- */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};
