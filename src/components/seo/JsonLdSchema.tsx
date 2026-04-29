
import React from 'react';

interface JsonLdSchemaProps {
  type: 'SoftwareApplication' | 'FAQPage' | 'BreadcrumbList';
  data: any;
}

export const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ type, data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const getCalculatorSchema = (year: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": `TaxCalculator365 UK Income Tax Calculator ${year}`,
  "operatingSystem": "Web",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250"
  }
});

export const getFAQSchema = (year: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": `How much is the personal allowance for ${year}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `For the ${year} tax year, the standard Personal Allowance is usually £12,570. This is the amount of income you can have before you start paying Income Tax.`
      }
    },
    {
      "@type": "Question",
      "name": `How much National Insurance will I pay in ${year}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "National Insurance rates depend on your employment status and earnings. For most employees, Class 1 National Insurance is deducted from your salary automatically."
      }
    }
  ]
});
