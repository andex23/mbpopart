export type LegacyStatus = 'AVAILABLE' | 'SOLD';

export interface LegacyThumbItem {
  imageUrl: string;
  thumbUrl: string;
  caption: string;
  meta?: string;
  status?: LegacyStatus;
}

export interface LegacyNewsItem {
  title: string;
  date: string;
  summary: string;
  pdfUrl: string;
}

export const legacyPageCopy = {
  available: {
    title: 'Available Paintings',
    paragraphs: [
      'These original Michel paintings are currently available for purchase.',
      'Click on each painting to see a larger photo, size, and price information.',
      'Shipping costs are not included in the price and will be added.',
    ],
  },
  commissions: {
    title: 'Commissions',
    paragraphs: [
      'Michel works on commission for a wide variety of clients. Most projects are initiated by clients who would like to own an original Michel painting and hang it in their home or place of business. Prices vary by size and content.',
      'The process begins with the sketch phase. Clients can submit ideas such as specific quotes, or details of the character they would like to see in their own Pop Art painting. After a down payment is provided, Michel will develop sketches, and make a version of your concept available for approval.',
      'Michel is obsessive about quality and details. Please allow 2 - 3 weeks per painting. Enjoy some examples of recent client commissions in these photos.',
    ],
    scheduleLine: 'Contact Michel to inquire about scheduling',
  },
  prints: {
    title: 'Framed Prints',
    paragraphs: [
      'Selected paintings are available as framed prints. Printed on archival paper with archival inks, these high quality prints are hand signed by Michel. Ready for hanging, they are professionaly printed and framed in Chicago.',
      'Framed prints measure approx 15" x 15" including the frame, and can be shipped in padded boxes via Fedex (please allow 1-2 weeks).',
      'Price for framed prints is currently $125 each. Shipping costs are not included in the price and will be added.',
      'Prints are shipped in padded boxes for safe delivery.',
    ],
    availableTitles: [
      '"Front Door" \u00A92013',
      '"Oh Snap" \u00A92013',
      '"It\'s Not Me" \u00A92013',
      '"Merlot" \u00A92013',
      '"Seriously?" \u00A92012',
      '"Bring It On" \u00A92012',
      '"Lose The Dress" \u00A92012',
      '"Go Figure" \u00A92012',
      '"Extra Dirty" \u00A92012',
      '"I Know Right" \u00A92012',
      '"Ay Dios Mio" \u00A92012',
      '"High Maintenance" \u00A92012',
      '"WTF" \u00A92012',
      '"Drama Queen" \u00A92012',
      '"That Bitch" \u00A92012',
      '"Just Chill" \u00A92012',
      '"Kidding Me" \u00A92012',
      '"Like So Totally" \u00A92012',
      '"Outside Game" \u00A92012',
      '"Pinch Me" \u00A92012',
      '"Word" \u00A92012',
    ],
    shipBoxImageUrl: 'https://mbpopart.com/assets/Print%20Pics/print%20ship%20box.jpg',
  },
  venues: {
    title: 'Venues',
    paragraphs: [
      'Michel is represented by a variety of venues, which includes traditional galleries and business relationships. He is the owner of Pop Chicago Gallery, located in the Flat Iron building in the Wicker Park neighborhood of Chicago. He is also represented in Santa Fe, New Mexico, by Pop Gallery Santa Fe.',
      'Michel has developed business relationships with many local Chicago venues, where he regularly rotates current paintings several times per year. Many of these venues also host an annual opening exhibit to display more recent paintings for collectors and friends.',
      'Please take the opportunity to contact and visit these venues to get a look at Michel\'s work up close.',
      'Many of these venues have a collection of original Michel paintings tagged for sale.',
    ],
  },
  news: {
    title: 'News',
    paragraphs: [
      'Articles and interviews featuring Michel Balasis and his work.',
    ],
  },
  photos: {
    title: 'Photos',
    paragraphs: [
      'Photos from exhibits, commissions, studio moments, and press highlights.',
    ],
  },
  bio: {
    title: 'BIO',
  },
};

export const commonContact = {
  phone: '(312) 405-4595',
  email: 'mbpopart@gmail.com',
};

export const availableItems: LegacyThumbItem[] = [
  {
    imageUrl: 'https://mbpopart.com/assets/Available/omfg24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/omfg%20copy.gif',
    caption: 'OMFG! \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'OMFG! \u00A92014 Acrylic on Canvas 24" x 24" cash price $600',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/tmi.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/tmi%20copy.gif',
    caption: 'TMI \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'TMI \u00A92014 Acrylic on Canvas 24" x 24" cash price $500',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/benefits3024.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/benefits%20copy.gif',
    caption: 'Benefits \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Benefits \u00A92014 Acrylic on Canvas 36" x 24" cash price $550',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/ADM20.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/adm%20copy.gif',
    caption: 'Ay Dios Mio \u00A92015 (SOLD)',
    status: 'SOLD',
    meta: 'Ay Dios Mio \u00A92015 Acrylic on Canvas 20" x 20" cash price $500',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/babysitter4030.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/baby.gif',
    caption: 'Babysitter \u00A92014 (SOLD)',
    status: 'SOLD',
    meta: 'Babysitter \u00A92014 Acrylic on Canvas 40" x 30" cash price SOLD',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/french24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/frenchkiss%20copy.gif',
    caption: 'French Kiss \u00A92011 (available)',
    status: 'AVAILABLE',
    meta: 'French Kiss \u00A92013 Acrylic on Canvas 24" x 24" cash price $395',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/loseR.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/loseR.gif',
    caption: 'Lose The Dress \u00A92016 (SOLD)',
    status: 'SOLD',
    meta: 'Lose The Dress \u00A92016 Acrylic on Canvas 36" x 24" cash price $700',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/bitchplease36.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/bitchplease%20copy.gif',
    caption: 'Bitch Please \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Bitch Please \u00A92014 Acrylic on Canvas 36" x 36" cash price $700',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/hot.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/hotspot%20copy.gif',
    caption: 'Hotspot \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Hotspot \u00A92013 Acrylic on Canvas 40" x 30" cash price $800',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/exactly18.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/exactly%20copy.gif',
    caption: 'Exactly \u00A92011 (available)',
    status: 'AVAILABLE',
    meta: 'Exactly \u00A92011 Acrylic on Canvas 18" x 18" cash price $350',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/F%20kidding24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/kidding%20copy.gif',
    caption: 'Kidding \u00A92015 (SOLD)',
    status: 'SOLD',
    meta: 'Kidding \u00A92015 Acrylic on Canvas 24" x 24" cash price $600',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/Ego24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/Ego%20copy.gif',
    caption: 'Check That Ego \u00A92015 (available)',
    status: 'AVAILABLE',
    meta: 'Check That Ego \u00A92015 Acrylic on Canvas 24" x 24" cash price $500',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/Wait24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/Wait%20copy.gif',
    caption: 'Wait What? \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Wait What? \u00A92014 Acrylic on Canvas 24" x 24" cash price $500',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/someday18.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/someday%20copy.gif',
    caption: 'Someday \u00A92012 (available)',
    status: 'AVAILABLE',
    meta: 'Someday \u00A92012 Acrylic on Canvas 18" x 18" cash price $350',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/overrated24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/over%20copy.gif',
    caption: 'Overrated \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Overrated \u00A92014 Acrylic on Canvas 24" x 24" cash price $395',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/maint.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/maint.gif',
    caption: 'Maintenance \u00A92015 (available)',
    status: 'AVAILABLE',
    meta: 'Maintenance \u00A92015 Acrylic on Canvas 20" x 20" cash price $450',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/nobrainer3024.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/brainer%20copy%203.gif',
    caption: 'No Brainer \u00A92011 (available)',
    status: 'AVAILABLE',
    meta: 'No Brainer \u00A92011 Acrylic on Canvas 30" x 24" cash price $400',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/loseP.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/loseP.gif',
    caption: 'Lose The Dress \u00A92016 (available)',
    status: 'AVAILABLE',
    meta: 'Lose The Dress \u00A92016 Acrylic on Canvas 36" x 24" cash price $700',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/got%20this24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/got%20copy.gif',
    caption: 'I Got This \u00A92015 (available)',
    status: 'AVAILABLE',
    meta: 'I Got This \u00A92015 Acrylic on Canvas 24" x 24" cash price $500',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/realp.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/real%20copy.gif',
    caption: 'Just Got Real \u00A92013 (available)',
    status: 'AVAILABLE',
    meta: 'Just Got Real \u00A92013 Acrylic on Canvas 18" x 18" cash price $350',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/justsayin36.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/sayin%20copy.gif',
    caption: 'Just Sayin\' \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Just Sayin\' \u00A92014 Acrylic on Canvas 36" x 36" cash price $700',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/pay%20for%20itself3024.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/pay%20copy.gif',
    caption: 'Pay For Itself \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Pay For Itself \u00A92014 Acrylic on Canvas 30" x 24" cash price $600',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/Its%20You3624.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/Its%20You%20copy.gif',
    caption: 'It\'s You \u00A92015 (SOLD)',
    status: 'SOLD',
    meta: 'It\'s You \u00A92015 Acrylic on Canvas 36" x 24" cash price $650',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/above18.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/above%20copy.gif',
    caption: 'All Of The Above \u00A92011 (available)',
    status: 'AVAILABLE',
    meta: 'All Of The Above \u00A92011 Acrylic on Canvas 18" x 18" cash price $350',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/asif.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/asif.gif',
    caption: 'As If \u00A92010 (available)',
    status: 'AVAILABLE',
    meta: 'As If \u00A92010 Acrylic on Canvas 24" x 24" cash price $395',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/getme24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/getme%20copy.gif',
    caption: 'Doesn\'t Get Me \u00A92014 (SOLD)',
    status: 'SOLD',
    meta: 'Doesn\'t Get Me \u00A92014 Acrylic on Canvas 24" x 24" cash price $300',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/hitmeup18.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/hitmeup%20copy.gif',
    caption: 'Hit Me Up \u00A92012 (SOLD)',
    status: 'SOLD',
    meta: 'Hit Me Up \u00A92012 Acrylic on Canvas 18" x 18" cash price SOLD',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/ifonly24.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/ifonly%20copy.gif',
    caption: 'If Only \u00A92014 (SOLD)',
    status: 'SOLD',
    meta: 'If Only \u00A92014 Acrylic on Canvas 24" x 24" cash price $500',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/it%27s%20me3624.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/me%20copy.gif',
    caption: 'Not You It\'s Me \u00A92015 (available)',
    status: 'AVAILABLE',
    meta: 'Not You It\'s Me \u00A92015 Acrylic on Canvas 36" x 24" cash price $550',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/je%20ne36.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/jene%20copy.gif',
    caption: 'Je Ne Sais Quoi \u00A92012 (available)',
    status: 'AVAILABLE',
    meta: 'Je Ne Sais Quoi \u00A92012 Acrylic on Canvas 36" x 36" cash price $395',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/zinned.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/zinned%20copy.gif',
    caption: 'Forgive Me Zinned \u00A92014 (available)',
    status: 'AVAILABLE',
    meta: 'Forgive Me Zinned \u00A92014 Acrylic on Canvas 40" x 30" cash price $600',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/Not%20You3024.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/notyou%20copy.gif',
    caption: 'It\'s Not You \u00A92013 (available)',
    status: 'AVAILABLE',
    meta: 'It\'s Not You \u00A92013 Acrylic on Canvas 30" x 24" cash price $450',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Available/noudidnt.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Available/ohno%20copy.gif',
    caption: 'Oh No U Didn\'t \u00A92011 (SOLD)',
    status: 'SOLD',
    meta: 'Oh No U Didn\'t \u00A92011 Acrylic on Canvas 44" x 44" cash price SOLD',
  },
];

export const commissionItems: LegacyThumbItem[] = [
  {
    imageUrl: 'https://mbpopart.com/assets/commissions/ricky.jpg',
    thumbUrl: 'https://mbpopart.com/assets/commissions/ricky.gif',
    caption: 'Rick from Las Palmas - Chicago',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/commissions/kristina.jpg',
    thumbUrl: 'https://mbpopart.com/assets/commissions/kristina.gif',
    caption: 'Kristina from Chicago',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/commissions/Jenny.jpg',
    thumbUrl: 'https://mbpopart.com/assets/commissions/jenny.gif',
    caption: 'at ETC Chicago',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/commissions/Appiphony-3.jpg',
    thumbUrl: 'https://mbpopart.com/assets/commissions/appiphony3.gif',
    caption: 'at Appiphony Marketing',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/commissions/dan.jpg',
    thumbUrl: 'https://mbpopart.com/assets/commissions/dan.gif',
    caption: 'Tarpey Law offices - Chicago',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/commissions/vandam.jpg',
    thumbUrl: 'https://mbpopart.com/assets/commissions/vandam.gif',
    caption: 'Van Dam residence - Amsterdam',
  },
];

export const printItems: LegacyThumbItem[] = [
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/frontdoor.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/frontdoor.gif',
    caption: 'Shut The Front Door!',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/snap.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/snap.gif',
    caption: 'Oh Snap!',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/notme.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/notme.gif',
    caption: 'It\'s Not Me, It\'s You',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/merlot.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/merlot.gif',
    caption: 'You Had Me At Merlot',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/seriously.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/seriously.gif',
    caption: 'Seriously?',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/outsidegame.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/outsidegame.gif',
    caption: 'Outside Game',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/baby%20copy.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/baby%20copy.gif',
    caption: 'Babysitter',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/breaking%20copy.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/breaking%20copy.gif',
    caption: 'Breaking Up',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/milk%20copy.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/milk%20copy.gif',
    caption: 'Milk Is Free',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/Bring.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/Bring.gif',
    caption: 'Bring It On',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/losethedress.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/losethedress.gif',
    caption: 'Lose The Dress',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/likeso.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/likeso.gif',
    caption: 'Like So Totally',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/smarter.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/smarter.gif',
    caption: 'Look Smarter',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/iknow.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/iknow.gif',
    caption: 'I Know Right?',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/diosmio.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/diosmio.gif',
    caption: 'Ay Dios Mio',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/maintenance.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/maintenance.gif',
    caption: 'High Maintenance',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/word.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/word.gif',
    caption: 'Word',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/dramaqueen.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/dramaqueen.gif',
    caption: 'Drama Queen',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/thatbitch.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/thatbitch.gif',
    caption: 'That Bitch',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/justchill.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/justchill.gif',
    caption: 'Just Chill',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/kiddingme.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/kidding.gif',
    caption: 'Kidding Me',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/forget.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/forget.gif',
    caption: 'You Never Forget Your First',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/wtf.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/wtf.gif',
    caption: 'WTF!',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/Print%20Pics/gofigure.jpg',
    thumbUrl: 'https://mbpopart.com/assets/Print%20Pics/gofigure.gif',
    caption: 'Go Figure',
  },
];

export const photoItems: LegacyThumbItem[] = [
  {
    imageUrl: 'https://mbpopart.com/assets/photos/uncommon6.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/uncommon6.gif',
    caption: 'at Uncommon Ground',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/jerseyboys.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/jerseyboys.gif',
    caption: 'Jersey Boys Commission',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/3studio.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/3studio.gif',
    caption: 'Cool Triptych',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/Tribeca-Trib.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/tribectrib.gif',
    caption: 'Tribeca Trib Listing',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/michelstudio.gif',
    thumbUrl: 'https://mbpopart.com/assets/photos/michelstudio.gif',
    caption: 'Michel in Studio',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/9RiverNorth.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/9rivernorth.gif',
    caption: 'River North Show',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/brody.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/brody.gif',
    caption: 'Brian Rody Commission',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/menus.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/menus.gif',
    caption: 'Uncommon Menu\'s',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/amedeelong.jpg',
    thumbUrl: 'https://mbpopart.com/assets/gallery/NYC-Long-Shot.gif',
    caption: 'NYC Long Shot',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/photos/Amichelia.jpg',
    thumbUrl: 'https://mbpopart.com/assets/photos/Amichelia.gif',
    caption: 'Amichelia \u00A91986',
  },
];

export const bioItems: LegacyThumbItem[] = [
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/mikeyat4.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/mikey4.gif',
    caption: '3 Year Old Michel',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/Mike-Bike.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/mikebike.gif',
    caption: 'Mike on Bike age 8',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/colorfootball.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/colorfootball.gif',
    caption: 'MSU Football 1983',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/bartender.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/bartend.gif',
    caption: 'Bar Manager 1991',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/At-East-Lansing-Studio.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/elstudio.gif',
    caption: 'East Lansing Studio 1994',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/Interview.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/interview.gif',
    caption: '1st Chicago Show',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/wicker02.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/wicker02.gif',
    caption: 'Wicker Park 2004',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/rivernorth.jpg',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/rivernorth.gif',
    caption: 'River North 2006',
  },
  {
    imageUrl: 'https://mbpopart.com/assets/BioPhotos/Prof-Balasis.gif',
    thumbUrl: 'https://mbpopart.com/assets/BioPhotos/Prof-Balasis.gif',
    caption: 'Describing the Process',
  },
];

export const newsItems: LegacyNewsItem[] = [
  {
    title: 'Chicago Pop Artist Michel Balasis - by Jack M Silverstein',
    date: 'July, 2010',
    summary: 'This article from the Jack M Silverstein series, "People with Passion" is an interview with Michel conducted at Pop Chicago Gallery.',
    pdfUrl: 'https://mbpopart.com/assets/Articles/Chicago%20Pop%20Artist%20Michel%20Balasis%20-%20By%20Jack%20M%20Silverstein.pdf',
  },
  {
    title: 'Nada If Not Clever - by Denny Norwood',
    date: 'November, 2006',
    summary: 'In this article, Denny Norwood (of Harper\'s Bazaar fame) takes an historical look at Pop Art, and then attempts to define where Michel Balasis fits in to the grand scheme of the modern art world.',
    pdfUrl: 'https://mbpopart.com/assets/Articles/Nada%20If%20Not%20Clever%20-%20Denny%20Norwood.pdf',
  },
  {
    title: 'I Met Roy - by Michel Balasis',
    date: 'May, 2006',
    summary: 'The artist himself takes a crack at writing about his chance meeting with his mentor and obvious influence, Roy Lichtenstein.',
    pdfUrl: 'https://mbpopart.com/assets/Articles/I%20Met%20Roy%20-%20Michel%20Balasis.pdf',
  },
  {
    title: 'What You Poppin\' About ? - by Dan Vaillancourt',
    date: 'April, 2005',
    summary: 'Philosopher and author Dan Vaillancourt is known for his research on aesthetics and beauty. Here is an article on the many details and facets of Michel Balasis paintings.',
    pdfUrl: 'https://mbpopart.com/assets/Articles/What%20You%20Poppin%20About%20-%20Dan%20Vaillancourt.pdf',
  },
  {
    title: 'Technology vs. Emotion - by Ryan Hallquist',
    date: 'October, 2000',
    summary: 'Ryan Hallquist was the first journalist to attend a Michel Balasis show in Chicago. Here is his reaction and review.',
    pdfUrl: 'https://mbpopart.com/assets/Articles/Technology%20vs.%20Emotion%20-%20Ryan%20Hallquist.pdf',
  },
];
