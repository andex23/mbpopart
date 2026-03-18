import type { Artwork, YearGroup } from '@/data/artworks';
import type { NavKey, PortableTextValue } from './sanity.types';

export type LegacyStatus = 'AVAILABLE' | 'SOLD';

export interface LegacyThumbItem {
  imageUrl: string;
  thumbUrl: string;
  caption: string;
  meta?: string;
  status?: LegacyStatus;
  imageFit?: 'cover' | 'contain';
}

export interface NavigationViewItem {
  key: NavKey;
  label: string;
  enabled: boolean;
  order: number;
  href: string;
}

export interface SiteSettingsView {
  siteTitle: string;
  tagline?: string;
  contactEmail: string;
  contactPhone: string;
  locationLabel: string;
  sandsDisplayMessage: string;
  footerText: string;
  footerPortraitUrl?: string;
  socialLinks: Array<{ label: string; url: string }>;
  footerLinks: Array<{ label: string; url: string }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
  };
}

export interface LandingPageView {
  heroImages: Array<{
    imageUrl: string;
    alt: string;
    caption?: string;
    order: number;
  }>;
  introHeading?: string;
  introBody: PortableTextValue;
}

export interface BioPageView {
  title: string;
  portraitImageUrl?: string;
  body: PortableTextValue;
  galleryItems: LegacyThumbItem[];
}

export interface PaintingsPageView {
  title: string;
  introText: PortableTextValue;
  emptySectionPlaceholderText: string;
  yearGroups: YearGroup[];
}

export interface AvailablePageView {
  title: string;
  introText: PortableTextValue;
  items: LegacyThumbItem[];
}

export interface CommissionProcessStepView {
  id: string;
  label: string;
  images: string[];
  caption?: string;
}

export interface CommissionsPageView {
  title: string;
  introText: PortableTextValue;
  processTitle: string;
  processSubtitle: string;
  downPaymentRule: string;
  processSteps: CommissionProcessStepView[];
  examplesTitle: string;
  exampleItems: LegacyThumbItem[];
}

export interface HappyClientPhotoView {
  image: string;
  thumb: string;
  caption?: string;
  location?: string;
  note?: string;
  featured?: boolean;
  order?: number;
}

export interface HappyClientsPageView {
  title: string;
  introText: PortableTextValue;
  photos: HappyClientPhotoView[];
}

export interface NewsItemView {
  title: string;
  date: string;
  summary: string;
  pdfUrl: string;
}

export interface NewsPageView {
  title: string;
  introText: PortableTextValue;
  items: NewsItemView[];
}

export interface PrintsPageView {
  title: string;
  introText: PortableTextValue;
  shipBoxImageUrl?: string;
  shipBoxImageAlt: string;
  availableTitles: string[];
  galleryItems: LegacyThumbItem[];
}

export interface VenueItemView {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
}

export interface VenuesPageView {
  title: string;
  introText: PortableTextValue;
  venues: VenueItemView[];
}

export interface GlobalContentView {
  siteSettings: SiteSettingsView;
  navigation: NavigationViewItem[];
}

export interface GalleryContentView {
  title: string;
  introText: PortableTextValue;
  yearGroups: YearGroup[];
}

export interface PaintingsSourceView {
  artworks: Artwork[];
}
