import { Helmet } from "react-helmet";
import { siteMetadata, PageMetadata } from "@/lib/seo";

interface SEOHeadProps {
  pageMetadata: PageMetadata;
  pagePath: string;
  langAlternates?: {
    lang: string;
    path: string;
  }[];
}

/**
 * SEOHead component 
 * 
 * Renders all necessary SEO tags for a page including:
 * - Title and meta descriptions
 * - Open Graph and Twitter tags
 * - Canonical URLs
 * - JSON-LD structured data
 * - Language alternates
 * 
 * @param pageMetadata - Page-specific metadata
 * @param pagePath - Current page path
 * @param langAlternates - Language alternates for the page
 */
const SEOHead = ({ pageMetadata, pagePath, langAlternates }: SEOHeadProps) => {
  const canonicalUrl = pageMetadata.canonicalUrl || `${siteMetadata.siteUrl}${pagePath}`;
  const ogType = pageMetadata.ogType || 'website';
  const ogImage = pageMetadata.ogImage || `${siteMetadata.siteUrl}/og-image.jpg`;
  
  // Generate JSON-LD structured data script
  const structuredDataScript = pageMetadata.structuredData 
    ? JSON.stringify(pageMetadata.structuredData)
    : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageMetadata.title}</title>
      <meta name="description" content={pageMetadata.description} />
      {pageMetadata.keywords && (
        <meta name="keywords" content={pageMetadata.keywords.join(", ")} />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={pageMetadata.title} />
      <meta property="og:description" content={pageMetadata.description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteMetadata.siteName} />
      <meta property="og:locale" content={siteMetadata.locale} />
      {siteMetadata.alternateLocale && (
        <meta property="og:locale:alternate" content={siteMetadata.alternateLocale} />
      )}

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />
      <meta name="twitter:title" content={pageMetadata.title} />
      <meta name="twitter:description" content={pageMetadata.description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Language Alternates */}
      {langAlternates && langAlternates.map((alternate) => (
        <link 
          key={alternate.lang}
          rel="alternate" 
          hrefLang={alternate.lang} 
          href={`${siteMetadata.siteUrl}${alternate.path}`} 
        />
      ))}

      {/* Structured Data */}
      {structuredDataScript && (
        <script type="application/ld+json">
          {structuredDataScript}
        </script>
      )}
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content={siteMetadata.themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    </Helmet>
  );
};

export default SEOHead;