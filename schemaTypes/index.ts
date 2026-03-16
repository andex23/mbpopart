import type { SchemaTypeDefinition } from 'sanity';
import { siteSettings } from './documents/siteSettings';
import { navigation } from './documents/navigation';
import { landingPage } from './documents/landingPage';
import { bioPage } from './documents/bioPage';
import { painting } from './documents/painting';
import { paintingsPage } from './documents/paintingsPage';
import { availablePage } from './documents/availablePage';
import { commissionsPage } from './documents/commissionsPage';
import { happyClientsPage } from './documents/happyClientsPage';
import { linkItem } from './objects/linkItem';
import { navigationItem } from './objects/navigationItem';
import { heroImageItem } from './objects/heroImageItem';
import { galleryImageItem } from './objects/galleryImageItem';
import { commissionStepItem } from './objects/commissionStepItem';
import { commissionExampleImageItem } from './objects/commissionExampleImageItem';
import { commissionExampleItem } from './objects/commissionExampleItem';
import { happyClientPhotoItem } from './objects/happyClientPhotoItem';

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  navigation,
  landingPage,
  bioPage,
  painting,
  paintingsPage,
  availablePage,
  commissionsPage,
  happyClientsPage,
  linkItem,
  navigationItem,
  heroImageItem,
  galleryImageItem,
  commissionStepItem,
  commissionExampleImageItem,
  commissionExampleItem,
  happyClientPhotoItem,
];
