import { groq } from 'next-sanity';

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    contactEmail,
    contactPhone,
    locationLabel,
    sandsDisplayMessage,
    socialLinks[]{
      label,
      url
    },
    footerPortrait,
    footerText,
    footerLinks[]{
      label,
      url
    },
    defaultSEO{
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"][0]{
    items[]{
      key,
      label,
      enabled,
      order
    }
  }
`;

export const LANDING_PAGE_QUERY = groq`
  *[_type == "landingPage"][0]{
    heroImages[]{
      image,
      alt,
      caption,
      order
    },
    introHeading,
    introBody,
    smallLabels[]{
      key,
      label
    }
  }
`;

export const BIO_PAGE_QUERY = groq`
  *[_type == "bioPage"][0]{
    title,
    portraitImage,
    body,
    galleryImages[]{
      image,
      alt,
      caption,
      order,
      featured
    }
  }
`;

export const PAINTINGS_PAGE_QUERY = groq`
  *[_type == "paintingsPage"][0]{
    title,
    introText,
    yearGroupingMode
  }
`;

export const PAINTINGS_QUERY = groq`
  *[_type == "painting" && (!defined(status) || status != "archive") && (!defined(inventoryOnly) || inventoryOnly != true)]
  | order(year desc, sortOrder asc, _updatedAt desc){
    _id,
    title,
    caption,
    year,
    copyrightYear,
    description,
    mainImage,
    mainImageAlt,
    cardImageFit,
    galleryImages[]{
      image,
      alt,
      caption,
      order,
      featured
    },
    status,
    inventoryOnly,
    featured,
    sortOrder,
    dimensions,
    price,
    medium
  }
`;

export const AVAILABLE_PAGE_QUERY = groq`
  *[_type == "availablePage"][0]{
    title,
    introText
  }
`;

export const AVAILABLE_PAINTINGS_QUERY = groq`
  *[_type == "painting" && status in ["available", "sold"]]
  | order(sortOrder asc, year desc, _updatedAt desc){
    _id,
    title,
    caption,
    year,
    copyrightYear,
    description,
    mainImage,
    mainImageAlt,
    cardImageFit,
    galleryImages[]{
      image,
      alt,
      caption,
      order,
      featured
    },
    status,
    inventoryOnly,
    featured,
    sortOrder,
    dimensions,
    price,
    medium
  }
`;

export const COMMISSIONS_PAGE_QUERY = groq`
  *[_type == "commissionsPage"][0]{
    title,
    introText,
    howItWorksTitle,
    howItWorksSubtitle,
    downPaymentLabel,
    downPaymentRule,
    examplesTitle,
    steps[]{
      title,
      description,
      image,
      order
    },
    examples[]{
      title,
      description,
      privacyHidden,
      order,
      images[]{
        image,
        caption,
        role,
        order
      }
    }
  }
`;

export const HAPPY_CLIENTS_PAGE_QUERY = groq`
  *[_type == "happyClientsPage"][0]{
    title,
    introText,
    photos[]{
      image,
      caption,
      location,
      note,
      featured,
      order
    }
  }
`;

export const NEWS_PAGE_QUERY = groq`
  *[_type == "newsPage"][0]{
    title,
    introText,
    items[]{
      title,
      date,
      summary,
      pdfUrl,
      order
    }
  }
`;

export const PRINTS_PAGE_QUERY = groq`
  *[_type == "printsPage"][0]{
    title,
    introText,
    shipBoxImage,
    shipBoxImageAlt,
    availableTitles,
    galleryImages[]{
      image,
      alt,
      caption,
      order,
      featured
    }
  }
`;

export const VENUES_PAGE_QUERY = groq`
  *[_type == "venuesPage"][0]{
    title,
    introText,
    venues[]{
      name,
      address,
      phone,
      email,
      website,
      image,
      order
    }
  }
`;
