import React from "react";
import { useLocation, Link } from "wouter";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { Helmet } from "react-helmet";

interface BreadcrumbsProps {
  items: {
    name: string;
    path: string;
  }[];
}

/**
 * Breadcrumbs navigation component
 * 
 * Displays a breadcrumb trail and adds JSON-LD structured data for SEO
 */
const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  // Convert path property to url property for schema generator
  const schemaItems = items.map(item => ({
    name: item.name,
    url: item.path
  }));
  
  // Generate structured data for schema markup
  const breadcrumbData = generateBreadcrumbSchema(schemaItems);
  const jsonLd = JSON.stringify(breadcrumbData);
  
  return (
    <>
      {/* Add Schema.org markup for breadcrumbs */}
      <Helmet>
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>
      
      {/* Visible breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="py-2 mb-4">
        <ol className="flex flex-wrap items-center text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              )}
              
              {index === items.length - 1 ? (
                <span className="font-medium text-primary" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-primary hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;