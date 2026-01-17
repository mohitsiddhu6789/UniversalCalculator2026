import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'Universal - Free EMI & Loan Calculator',
  description = 'Calculate your loan EMI, repayment schedule, and analyze part payment strategies with our free online EMI calculator. Support for personal, home, auto, education, and business loans.',
  keywords = 'EMI calculator, loan calculator, EMI calculation, part payment calculator, home loan EMI, personal loan EMI, auto loan EMI',
  image = 'https://universalcalculator.com/og-image.jpg',
  url = 'https://universalcalculator.com',
  type = 'website',
  author = 'Universal Calculator',
  twitterHandle = '@universalcalc'
}) {
  const canonicalUrl = url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-us" />
      <html lang="en" />

      {/* Open Graph Tags (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Universal Calculator" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* PWA & Mobile */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Universal Calculator" />
      <meta name="format-detection" content="telephone=no" />

      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="en-US" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />

      {/* Prefetch DNS & Resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Icon Links */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Structured Data - Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Universal Calculator',
          'url': canonicalUrl,
          'logo': image,
          'description': description,
          'sameAs': [
            'https://www.facebook.com/universalcalculator',
            'https://twitter.com/universalcalc',
            'https://www.linkedin.com/company/universal-calculator'
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'Support',
            'email': 'support@universalcalculator.com'
          }
        })}
      </script>

      {/* Structured Data - Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'url': canonicalUrl,
          'name': 'Universal Calculator',
          'description': description,
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `${canonicalUrl}?search={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        })}
      </script>

      {/* Structured Data - Software Application Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Universal EMI Calculator',
          'description': description,
          'url': canonicalUrl,
          'applicationCategory': 'FinanceApplication',
          'operatingSystem': 'Web',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'ratingCount': '250'
          }
        })}
      </script>

      {/* Structured Data - FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What is an EMI Calculator?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'An EMI Calculator helps you calculate the monthly EMI, total interest, and repayment schedule for any loan type including personal, home, auto, education, and business loans.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How accurate is the EMI Calculator?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Our calculator uses the standard EMI formula and provides accurate calculations. However, actual EMI may vary slightly based on bank policies, additional charges, and exact interest calculation methods.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I save my calculations?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, all calculations are automatically saved with your email address. You can view your calculation history in the Admin Dashboard.'
              }
            }
          ]
        })}
      </script>

      {/* Google Analytics (if needed) */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
    </Helmet>
  );
}
