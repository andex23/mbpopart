export interface HappyClient {
  image: string;
  thumb: string;
  caption?: string;
  location?: string;
  note?: string;
  year?: string;
  category?: string;
}

export const PAGE_SIZE = 12;

export const HAPPY_CLIENTS: HappyClient[] = [
  {
    image: 'https://mbpopart.com/assets/photos/uncommon6.jpg',
    thumb: 'https://mbpopart.com/assets/photos/uncommon6.gif',
    caption: 'at Uncommon Ground',
    category: 'exhibit',
  },
  {
    image: 'https://mbpopart.com/assets/photos/jerseyboys.jpg',
    thumb: 'https://mbpopart.com/assets/photos/jerseyboys.gif',
    caption: 'Jersey Boys Commission',
    category: 'commission',
  },
  {
    image: 'https://mbpopart.com/assets/photos/3studio.jpg',
    thumb: 'https://mbpopart.com/assets/photos/3studio.gif',
    caption: 'Cool Triptych',
    category: 'studio',
  },
  {
    image: 'https://mbpopart.com/assets/photos/Tribeca-Trib.jpg',
    thumb: 'https://mbpopart.com/assets/photos/tribectrib.gif',
    caption: 'Tribeca Trib Listing',
    category: 'press',
  },
  {
    image: 'https://mbpopart.com/assets/photos/michelstudio.gif',
    thumb: 'https://mbpopart.com/assets/photos/michelstudio.gif',
    caption: 'Michel in Studio',
    category: 'studio',
  },
  {
    image: 'https://mbpopart.com/assets/photos/9RiverNorth.jpg',
    thumb: 'https://mbpopart.com/assets/photos/9rivernorth.gif',
    caption: 'River North Show',
    category: 'exhibit',
  },
  {
    image: 'https://mbpopart.com/assets/photos/brody.jpg',
    thumb: 'https://mbpopart.com/assets/photos/brody.gif',
    caption: 'Brian Rody Commission',
    category: 'commission',
  },
  {
    image: 'https://mbpopart.com/assets/photos/menus.jpg',
    thumb: 'https://mbpopart.com/assets/photos/menus.gif',
    caption: "Uncommon Menu's",
    category: 'exhibit',
  },
  {
    image: 'https://mbpopart.com/assets/photos/amedeelong.jpg',
    thumb: 'https://mbpopart.com/assets/gallery/NYC-Long-Shot.gif',
    caption: 'NYC Long Shot',
    category: 'studio',
  },
  {
    image: 'https://mbpopart.com/assets/photos/Amichelia.jpg',
    thumb: 'https://mbpopart.com/assets/photos/Amichelia.gif',
    caption: 'Amichelia \u00A91986',
    year: '1986',
    category: 'studio',
  },
];
