export interface BioPhotoEntry {
  imageUrl: string;
  caption: string;
}

export interface NewsEntry {
  title: string;
  date: string;
  summary: string;
  pdfUrl: string;
}

export const bioPhotoEntries: BioPhotoEntry[] = [
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/mikeyat4.jpg',
    caption: '3 Year Old Michel',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/Mike-Bike.jpg',
    caption: 'Mike on Bike age 8',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/colorfootball.jpg',
    caption: 'MSU Football 1983',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/bartender.jpg',
    caption: 'Bar Manager 1991',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/At-East-Lansing-Studio.jpg',
    caption: 'East Lansing Studio 1994',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/Interview.jpg',
    caption: '1st Chicago Show',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/wicker02.jpg',
    caption: 'Wicker Park 2004',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/rivernorth.jpg',
    caption: 'River North 2006',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/Prof-Balasis.gif',
    caption: 'Describing the Process',
  },
];

export const newsEntries: NewsEntry[] = [
  {
    title: 'Chicago Pop Artist Michel Balasis - by Jack M Silverstein',
    date: 'July 2010',
    summary:
      'Interview from the "People with Passion" series, conducted at Pop Chicago Gallery.',
    pdfUrl:
      'https://mbpopart.com/assets/Articles/Chicago%20Pop%20Artist%20Michel%20Balasis%20-%20By%20Jack%20M%20Silverstein.pdf',
  },
  {
    title: 'Nada If Not Clever - by Denny Norwood',
    date: 'November 2006',
    summary:
      "A historical look at Pop Art and Michel Balasis' place in the modern art conversation.",
    pdfUrl:
      'https://mbpopart.com/assets/Articles/Nada%20If%20Not%20Clever%20-%20Denny%20Norwood.pdf',
  },
  {
    title: 'I Met Roy - by Michel Balasis',
    date: 'May 2006',
    summary:
      'Michel writes about meeting his mentor and influence, Roy Lichtenstein.',
    pdfUrl: 'https://mbpopart.com/assets/Articles/I%20Met%20Roy%20-%20Michel%20Balasis.pdf',
  },
  {
    title: "What You Poppin' About ? - by Dan Vaillancourt",
    date: 'April 2005',
    summary:
      'Aesthetics and beauty-focused perspective on the details and facets of Michel Balasis paintings.',
    pdfUrl:
      'https://mbpopart.com/assets/Articles/What%20You%20Poppin%20About%20-%20Dan%20Vaillancourt.pdf',
  },
  {
    title: 'Technology vs. Emotion - by Ryan Hallquist',
    date: 'October 2000',
    summary:
      'A review from one of the first journalists to attend a Michel Balasis show in Chicago.',
    pdfUrl:
      'https://mbpopart.com/assets/Articles/Technology%20vs.%20Emotion%20-%20Ryan%20Hallquist.pdf',
  },
];
