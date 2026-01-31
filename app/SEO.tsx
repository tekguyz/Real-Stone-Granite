
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_KB } from '../entities/company/knowledge';
import { MEDIA } from '../shared/assets';

/**
 * SEO Architecture
 * Standardizes metadata across the digital twin.
 * Synchronized with Authoritative Knowledge Base (COMPANY_KB).
 */
export const SEO: React.FC = () => {
  // Brand Identity Source Mapping
  const NAME = COMPANY_KB.identity.name;
  const MOTTO = COMPANY_KB.identity.motto;
  const MISSION = COMPANY_KB.identity.mission;
  const PHONE = COMPANY_KB.contact.phone;
  
  // SEO Specific Constructs
  const TITLE = `${NAME} | ${MOTTO}`;
  const DESCRIPTION = MISSION;
  const KEYWORDS = "Granite Fort Pierce, Marble Countertops, Navy SEAL Museum, Stone Fabrication, Industrial Luxury, Architectural Surfaces, Bahamas Export, Treasure Coast Masonry";
  const THEME_COLOR = "#1a1a1a"; // Deep Onyx approximate

  // Custom Monogram Favicon (SVG as Data URI)
  // Gold square with dark 'R' - Brand Color Synchronized
  const faviconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="%23d4af37"/>
      <text x="50%" y="55%" font-family="monospace" font-weight="bold" font-size="350" fill="%232f2f2f" text-anchor="middle" dy=".1em">R</text>
    </svg>
  `.trim().replace(/\s+/g, ' ');
  
  const faviconUrl = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`;

  // Structured Data (JSON-LD) - Enhanced Local Business Authority
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": NAME,
    "image": MEDIA.IMG_TRIDENT,
    "telephone": PHONE,
    "priceRange": "$$$",
    "url": window.location.origin,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "427 South Market Avenue",
      "addressLocality": "Fort Pierce",
      "addressRegion": "FL",
      "postalCode": "34982",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.424,
      "longitude": -80.325
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "areaServed": [
      {
        "@type": "State",
        "name": "Florida"
      },
      {
        "@type": "Place",
        "name": "Treasure Coast"
      },
      {
        "@type": "Country",
        "name": "Bahamas"
      }
    ],
    "description": DESCRIPTION,
    "foundingDate": COMPANY_KB.identity.established.toString(),
    "knowsAbout": ["Stone Fabrication", "Monument Design", "Architectural Surfaces", "Italian Marble", "Exotic Granite"]
  };

  return (
    <Helmet>
      {/* --- Essential Meta Tags --- */}
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="theme-color" content={THEME_COLOR} />
      <link rel="icon" type="image/svg+xml" href={faviconUrl} />

      {/* --- Open Graph Configuration (Social Signals) --- */}
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={MEDIA.IMG_TRIDENT} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content={NAME} />

      {/* --- Twitter Architecture --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={MEDIA.IMG_TRIDENT} />

      {/* --- Local Business Data Protocol --- */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};
