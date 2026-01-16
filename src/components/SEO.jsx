import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'Universal - Free EMI & Loan Calculator',
  description = 'Calculate EMI, interest, and loan repayment schedules. Use our free online loan calculator for personal loans, home loans, auto loans and more.',
  keywords = 'EMI calculator, loan calculator, personal loan, home loan calculator, auto loan, interest calculator, EMI calculation',
  canonical = 'https://universalemi.com',
  ogTitle,
  ogDescription,
  ogImage = 'https://universalemi.com/og-image.jpg',
  ogType = 'website',
  ogUrl,
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="charset" content="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl || canonical} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Universal" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl || canonical} />
      <meta property="twitter:title" content={ogTitle || title} />
      <meta property="twitter:description" content={ogDescription || description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="Universal" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Universal',
          'description': description,
          'url': canonical,
          'applicationCategory': 'FinanceApplication',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'INR'
          }
        })}
      </script>
    </Helmet>
  );
}
