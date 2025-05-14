/**
 * SEO optimization module for NammaKendra
 * 
 * This module provides SEO utilities for the NammaKendra platform,
 * including metadata, schema markup, and structured data
 */

/**
 * Base website information
 */
export const siteMetadata = {
  siteName: 'NammaKendra',
  siteUrl: 'https://nammakendra.replit.app',
  siteDescription: 'Legal assistance and government services made accessible for all',
  logoUrl: '/nammakendra-logo.png',
  twitterHandle: '@nammakendra',
  themeColor: '#1a4f8a',
  locale: 'en_IN',
  alternateLocale: 'kn_IN',
  organization: {
    name: 'NammaKendra',
    url: 'https://nammakendra.replit.app',
    logo: '/nammakendra-logo.png',
    contactPoint: {
      telephone: '+91-80-12345678',
      contactType: 'customer service'
    }
  }
};

/**
 * SEO page metadata interface
 */
export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string[];
  structuredData?: any;
}

/**
 * SEO metadata for each page
 * Includes title, description, keywords, and structured data
 */
export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'NammaKendra - Legal Assistance and Government Services Made Simple',
    description: 'Access, understand, and navigate legal information and government services with ease. NammaKendra makes legal help and government procedures simple and accessible for all citizens in Karnataka.',
    ogType: 'website',
    keywords: [
      'legal assistance Karnataka', 
      'government services help', 
      'legal document simplifier', 
      'legal AI assistant', 
      'government procedures Karnataka', 
      'simplified legal jargon', 
      'legal help in Kannada', 
      'Namma Sahayak', 
      'Namma Sarkara', 
      'Namma Vidhana'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'NammaKendra',
      'url': 'https://nammakendra.replit.app',
      'logo': 'https://nammakendra.replit.app/nammakendra-logo.png',
      'description': 'Legal assistance and government services made accessible for all citizens in Karnataka',
      'sameAs': [
        'https://twitter.com/nammakendra',
        'https://facebook.com/nammakendra'
      ]
    }
  },
  
  nammaSahayak: {
    title: 'Namma Sahayak - AI Legal Assistant | Simple Legal Explanations',
    description: 'Get answers to your legal questions in simple, jargon-free language with our AI-powered legal assistant. Available 24/7 in English and Kannada.',
    ogType: 'website',
    keywords: [
      'legal AI chatbot', 
      'legal questions Karnataka', 
      'AI legal assistant', 
      'legal help in simple language', 
      'legal advice in Kannada', 
      'property rights questions', 
      'consumer rights India', 
      'family law assistant', 
      'inheritance law India', 
      'legal voice assistant'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Namma Sahayak',
      'serviceType': 'Legal Information Assistant',
      'provider': {
        '@type': 'Organization',
        'name': 'NammaKendra'
      },
      'description': 'AI-powered legal assistant providing information related to legal rights, procedures, and answers to legal questions in simple language.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'INR'
      }
    }
  },

  nammaSarkara: {
    title: 'Namma Sarkara - Government Services Information | Document Requirements',
    description: 'Get district-specific information about government services, application requirements, and procedure guidance for Karnataka government services and programs.',
    ogType: 'website',
    keywords: [
      'Karnataka government services', 
      'government document checklist', 
      'Aadhaar card application', 
      'voter ID registration Karnataka', 
      'EPIC card application', 
      'property registration Karnataka', 
      'passport application help', 
      'government procedures simplified', 
      'e-Khata certificate', 
      'government schemes Karnataka'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Namma Sarkara',
      'serviceType': 'Government Services Information',
      'provider': {
        '@type': 'Organization',
        'name': 'NammaKendra'
      },
      'description': 'AI-powered assistant providing district-specific information on requirements for government services and applications in Karnataka.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'INR'
      }
    }
  },

  nammaVidhana: {
    title: 'Namma Vidhana - Legal Document Simplifier | Understand Legal Documents',
    description: 'Upload legal documents to get simplified explanations and key points highlighted. Our AI helps you understand complex legal jargon in plain language.',
    ogType: 'website',
    keywords: [
      'legal document simplifier', 
      'document analysis tool', 
      'legal jargon translator', 
      'understand court orders', 
      'legal contract explanation', 
      'government notice help', 
      'property document analysis', 
      'legal document scanner', 
      'document deadlines extraction', 
      'legal document summary'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Namma Vidhana',
      'serviceType': 'Document Simplification Service',
      'provider': {
        '@type': 'Organization',
        'name': 'NammaKendra'
      },
      'description': 'AI-powered tool that analyzes legal documents and translates them into plain language with highlighted key points.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'INR'
      }
    }
  },

  about: {
    title: 'About NammaKendra | Our Mission and Services',
    description: 'Learn about NammaKendra\'s mission to make legal information and government services accessible to all citizens, especially the elderly and underprivileged.',
    ogType: 'website',
    keywords: [
      'about NammaKendra', 
      'legal accessibility mission', 
      'government service accessibility', 
      'legal information platform', 
      'Karnataka legal assistance', 
      'legal services for underprivileged', 
      'government at your home', 
      'legal technology for accessibility', 
      'simplified legal services', 
      'AI legal assistance'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About NammaKendra',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'NammaKendra',
        'description': 'Platform providing legal assistance and government services information in accessible language',
        'foundingDate': '2023'
      }
    }
  },

  contact: {
    title: 'Contact NammaKendra | Get in Touch',
    description: 'Have questions or feedback? Contact the NammaKendra team through our online form or find our contact information here.',
    ogType: 'website',
    keywords: [
      'contact NammaKendra', 
      'legal assistance contact', 
      'feedback form', 
      'help with legal services', 
      'government services help', 
      'contact form Karnataka', 
      'legal assistance questions', 
      'NammaKendra support', 
      'government service questions', 
      'get in touch'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact NammaKendra',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'NammaKendra',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91-80-12345678',
          'contactType': 'customer service',
          'email': 'contact@nammakendra.org',
          'availableLanguage': ['English', 'Kannada']
        }
      }
    }
  }
};

/**
 * Generate FAQ Schema markup
 * @param faqs Array of question/answer pairs
 * @returns JSON-LD schema markup for FAQs
 */
export function generateFAQSchema(faqs: {question: string, answer: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Generate BreadcrumbList schema
 * @param items Array of breadcrumb items
 * @returns JSON-LD schema markup for breadcrumbs
 */
export function generateBreadcrumbSchema(items: {name: string, url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${siteMetadata.siteUrl}${item.url}`
    }))
  };
}

/**
 * Helper to generate JSON-LD script tag content
 * @param data Structured data object
 * @returns Stringified JSON
 */
export function generateStructuredDataScript(data: any): string {
  return JSON.stringify(data);
}

/**
 * Long-tail keywords and related terms for content optimization
 */
export const longTailKeywords = {
  legalAssistance: [
    'how to understand court notices in Karnataka',
    'legal document explanation service in Kannada',
    'simplify legal jargon for senior citizens',
    'AI legal assistant for rural residents',
    'understand property documents in simple language',
    'legal help without hiring expensive lawyer',
    'translate court orders to simple language',
    'free legal document analysis online',
    'legal document scanner app Karnataka',
    'explain legal terms for non-lawyers',
    'legal assistance for underprivileged citizens',
    'voice legal assistant in Kannada',
    'understand rental agreement clauses',
    'explain inheritance rights in simple terms',
    'consumer rights information in local language'
  ],
  
  governmentServices: [
    'how to apply for voter ID card in Bangalore',
    'Aadhaar card application documents required',
    'property registration procedure in Karnataka',
    'e-Khata application steps Bangalore',
    'passport application checklist Karnataka',
    'how to get caste certificate in Mysore district',
    'government scheme application help',
    'senior citizen card application procedure',
    'income certificate application documents',
    'birth certificate application Karnataka',
    'property tax payment procedure online',
    'pension scheme application for elderly',
    'ration card application form filling guide',
    'marriage registration procedure in Karnataka',
    'district-specific government contact information'
  ]
};

/**
 * Internal linking strategy
 * Maps content topics to relevant internal link suggestions
 */
export const internalLinkStrategy = {
  // Content about legal document understanding
  legalDocuments: [
    { page: '/namma-vidhana', anchorText: 'document simplification service' },
    { page: '/namma-sahayak', anchorText: 'ask our legal assistant' },
    { page: '/about', anchorText: 'learn more about our mission' },
  ],
  
  // Content about government services
  governmentServices: [
    { page: '/namma-sarkara', anchorText: 'government services information' },
    { page: '/namma-vidhana', anchorText: 'document upload tool' },
    { page: '/about', anchorText: 'about our services' },
  ],
  
  // Content about accessibility
  accessibility: [
    { page: '/accessibility', anchorText: 'accessibility features' },
    { page: '/namma-sahayak', anchorText: 'voice-enabled assistant' },
    { page: '/contact', anchorText: 'get support' },
  ]
};

/**
 * Technical SEO audit recommendations
 */
export const technicalSEOChecklist = [
  'Ensure all images have descriptive alt attributes',
  'Set up canonical tags for all pages',
  'Implement responsive design for all screen sizes',
  'Optimize Core Web Vitals (LCP, FID, CLS)',
  'Implement lazy loading for images and videos',
  'Create and submit XML sitemap',
  'Ensure proper heading hierarchy (H1 → H6)',
  'Implement structured data for all main content types',
  'Set up proper meta descriptions for all pages',
  'Enable browser caching for static assets',
  'Minify CSS, JavaScript and HTML',
  'Implement HTTPS across the entire site',
  'Use descriptive URLs with keywords',
  'Optimize images for web (compression, sizing)',
  'Ensure mobile-friendly design'
];

/**
 * Off-page SEO strategy recommendations
 */
export const offPageSEOStrategy = [
  {
    category: 'Local Government Partnerships',
    opportunities: [
      'Karnataka E-Governance Department',
      'Karnataka State Legal Services Authority',
      'Bangalore One centers',
      'District Information Officers',
      'Rural Development and Panchayat Raj Department'
    ]
  },
  {
    category: 'Legal Aid Organizations',
    opportunities: [
      'Legal Aid Societies across Karnataka',
      'Bar Associations in major cities',
      'Law School Legal Aid Clinics',
      'NGOs focused on legal accessibility',
      'Rural legal aid networks'
    ]
  },
  {
    category: 'Community Organizations',
    opportunities: [
      'Senior Citizens Associations',
      'Rural Community Development Organizations',
      'Disability Rights Groups',
      'Women Self-Help Groups',
      'Resident Welfare Associations'
    ]
  },
  {
    category: 'Digital Directories',
    opportunities: [
      'Karnataka Government Service Directory',
      'Legal Services Directories',
      'NGO Partnership Platforms',
      'Community Resource Listings',
      'Senior Citizen Service Catalogs'
    ]
  }
];

/**
 * Google My Business optimization checklist
 */
export const googleMyBusinessChecklist = [
  'Claim and verify the Google My Business listing',
  'Complete all business information fields (name, address, phone, website)',
  'Choose accurate business categories (Legal Service, Government Service)',
  'Add high-quality photos of the service centers or team',
  'Create detailed service descriptions for each main offering',
  'Set accurate business hours and special hours for holidays',
  'Respond to all reviews promptly and professionally',
  'Create Google Posts regularly with service updates',
  'Add Q&A content answering common user questions',
  'Update business attributes (accessibility options, languages spoken)',
  'Add appointment links for in-person assistance if available',
  'Create a messaging protocol for responding to direct messages',
  'Monitor insights and adapt strategy based on user interaction',
  'Set up local service areas for district-specific operations',
  'Maintain consistent NAP (Name, Address, Phone) across all directories'
];

/**
 * SEO performance measurement thresholds
 * Core Web Vitals and SEO score targets
 */
export const seoPerformanceThresholds = {
  lighthouse: {
    performance: 85,
    accessibility: 90,
    bestPractices: 85,
    seo: 95
  },
  coreWebVitals: {
    lcp: 2.5, // seconds
    fid: 100, // milliseconds
    cls: 0.1, // score
    ttfb: 0.8 // seconds
  }
};