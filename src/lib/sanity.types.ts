export type PortableTextValue = Array<{
  _type: string;
  [key: string]: unknown;
}>;

export type NavKey = 'bio' | 'paintings' | 'available' | 'commissions' | 'happyClients';

export interface CmsSiteSettings {
  siteTitle?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  locationLabel?: string;
  sandsDisplayMessage?: string;
  footerText?: string;
  footerPortrait?: unknown;
  socialLinks?: Array<{ label?: string; url?: string }>;
  footerLinks?: Array<{ label?: string; url?: string }>;
  defaultSEO?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: unknown;
  };
}

export interface CmsNavigationItem {
  key?: NavKey;
  label?: string;
  enabled?: boolean;
  order?: number;
}

export interface CmsNavigation {
  items?: CmsNavigationItem[];
}

export interface CmsImageItem {
  image?: unknown;
  alt?: string;
  caption?: string;
  location?: string;
  note?: string;
  order?: number;
  featured?: boolean;
  labels?: string[];
}

export interface CmsLandingPage {
  heroImages?: CmsImageItem[];
  introHeading?: string;
  introBody?: PortableTextValue;
  smallLabels?: Array<{ key?: string; label?: string }>;
}

export interface CmsBioPage {
  title?: string;
  portraitImage?: unknown;
  body?: PortableTextValue;
  galleryImages?: CmsImageItem[];
}

export type PaintingStatus = 'available' | 'sold' | 'notForSale' | 'archive';

export interface CmsPainting {
  _id: string;
  title?: string;
  caption?: string;
  year?: number;
  copyrightYear?: number;
  description?: PortableTextValue;
  comingSoon?: boolean;
  mainImage?: unknown;
  mainImageAlt?: string;
  galleryImages?: CmsImageItem[];
  status?: PaintingStatus;
  featured?: boolean;
  sortOrder?: number;
  dimensions?: string;
  price?: string;
  medium?: string;
}

export interface CmsPaintingsPage {
  title?: string;
  introText?: PortableTextValue;
  emptySectionPlaceholderText?: string;
  yearGroupingMode?: string;
}

export interface CmsAvailablePage {
  title?: string;
  introText?: PortableTextValue;
}

export interface CmsCommissionStep {
  title?: string;
  description?: string;
  image?: unknown;
  order?: number;
}

export interface CmsCommissionExampleImage {
  image?: unknown;
  caption?: string;
  role?: string;
  order?: number;
}

export interface CmsCommissionExample {
  title?: string;
  description?: string;
  images?: CmsCommissionExampleImage[];
  order?: number;
  privacyHidden?: boolean;
}

export interface CmsCommissionsPage {
  title?: string;
  introText?: PortableTextValue;
  howItWorksTitle?: string;
  howItWorksSubtitle?: string;
  downPaymentRule?: string;
  examplesTitle?: string;
  steps?: CmsCommissionStep[];
  examples?: CmsCommissionExample[];
}

export interface CmsHappyClientsPage {
  title?: string;
  introText?: PortableTextValue;
  photos?: CmsImageItem[];
}

export interface CmsNewsItem {
  title?: string;
  date?: string;
  summary?: string;
  pdfUrl?: string;
  order?: number;
}

export interface CmsNewsPage {
  title?: string;
  introText?: PortableTextValue;
  items?: CmsNewsItem[];
}

export interface CmsPrintsPage {
  title?: string;
  introText?: PortableTextValue;
  shipBoxImage?: unknown;
  shipBoxImageAlt?: string;
  availableTitles?: string[];
  galleryImages?: CmsImageItem[];
}

export interface CmsVenueItem {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  image?: unknown;
  order?: number;
}

export interface CmsVenuesPage {
  title?: string;
  introText?: PortableTextValue;
  venues?: CmsVenueItem[];
}
