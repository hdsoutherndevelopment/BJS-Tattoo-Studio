import { site, faqs } from './site';

const openDays = site.hours.filter((h) => h.opens);

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TattooParlor', 'HealthAndBeautyBusiness', 'LocalBusiness'],
        '@id': `${site.url}/#studio`,
        name: site.name,
        description:
          'Custom tattoo studio in Southampton offering black & grey, fine line, traditional, blackwork, neo-traditional and fully custom tattoo work.',
        url: site.url,
        telephone: site.phone.e164,
        priceRange: '££',
        image: `${site.url}/og.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          postalCode: site.address.postcode,
          addressCountry: site.address.country
        },
        areaServed: site.areasServed.map((name) => ({ '@type': 'Place', name })),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: openDays.filter((d) => d.closes === '18:00').map((d) => d.day),
            opens: '09:30',
            closes: '18:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:30',
            closes: '17:00'
          }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Tattoo styles',
          itemListElement: [
            'Black & grey tattoos', 'Fine line tattoos', 'Traditional tattoos',
            'Blackwork tattoos', 'Neo-traditional tattoos', 'Custom tattoo design',
            'Cover-up tattoos'
          ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } }))
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: 'en-GB',
        publisher: { '@id': `${site.url}/#studio` }
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };
}
