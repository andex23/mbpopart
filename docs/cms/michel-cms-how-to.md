# Michel CMS How-To

This is the simple guide for updating the website content.

Detailed painting-sections guide:
- see `docs/cms/michel-painting-sections-guide.md`

CMS login:
- `https://mbpopart.com/studio`

Live website:
- `https://mbpopart.com`

Preview without construction banner:
- open `Site Preview` inside the CMS
- click `Open Site Preview`
- the real website opens in a new tab for that browser

## Basic Rule

After making any change:
1. Click `Publish`
2. Wait about 1 minute
3. Refresh the live website

## What You Can Edit

### Site Settings

Use this for:
- contact email
- phone number
- footer copyright text
- footer portrait

### Navigation

Use this for:
- menu labels
- menu order
- hiding menu items

Important:
- Do not change the `Route Key`
- Only change the visible label

### Landing Page

Use this for:
- homepage hero images
- homepage intro text

### Bio Page

Use this for:
- `Intro Bio` page title
- bio text
- bio photos

### Paintings Page

Use this for:
- gallery page title
- gallery intro text
- the message shown in empty painting sections

Important:
- this is only for the page heading and intro copy
- the actual painting records are in `Paintings > Gallery Paintings`

### Paintings

Use this area for:
- `Page Settings`
- `Painting Order & Cleanup`
- `Gallery Paintings`
- `Archived`
- `Browse by Year`

Important:
- add normal website paintings inside `Paintings > Gallery Paintings`
- those paintings appear in the main `Paintings` page year sections
- this area does not control the `Available` inventory cards
- `Painting Order & Cleanup` is the fastest place to reorder a year and hide extra paintings

### Available

Use this area for:
- `Page Settings`
- `Available Order`
- `Paintings Shown on Available Page`
- `Available Only`
- `Sold Items Still Showing Here`

Important:
- add available or sold inventory cards from inside the `Available` section
- those records are kept separate from the main `Paintings` year gallery
- this is the correct place to manage the cards shown on the `Available` page

### Painting Record

Use this for each individual painting or inventory card:
- title
- caption
- year
- image
- availability
- price
- dimensions

Important:
- `Status` controls the visible tag such as `Available` or `Sold`
- records created from the `Available` section are already tagged correctly for that page
- records created from `Paintings > Gallery Paintings` are normal gallery paintings

### Painting Order

Use this for:
- changing the order of paintings inside one year section
- moving a painting up or down without editing sort numbers by hand

Important:
- this only changes order for the main `Paintings` gallery
- this only changes order within the same year
- if a painting should appear in a different section, change that painting's `Year`

### Available Order

Use this for:
- changing the order of cards on the `Available` page
- moving available or sold paintings up or down without editing numbers by hand

Important:
- this controls the `Available` page only
- use this instead of editing `Manual Sort Order` directly

### Commissions Page

Use this for:
- page title
- intro text
- commission process text
- down payment card label
- down payment text
- commission examples

### Happy Clients Page

Use this for:
- page title
- intro text
- client photos

## Most Common Tasks

### Change contact info

1. Open `Site Settings`
2. Edit email or phone
3. Click `Publish`

### Add a new painting

1. Open the correct section
2. Use `Paintings > Gallery Paintings` for normal gallery paintings
3. Use `Available > Paintings Shown on Available Page` for available or sold inventory cards
4. Create a new painting there
5. Add title, year, image, and status
6. Click `Publish`

### Reposition a painting inside the small window

1. Open the painting
2. If you want the whole painting to stay visible in the small card, set `Card Preview Fit` to `Show Full Painting`
3. If you still need a crop adjustment, go to the `Main Image`
4. Open the image editor
5. Adjust the square crop box first until the important part of the image sits correctly in the smaller preview window
6. If needed, move the hotspot circle too
7. Save the image edit
8. Click `Publish`

### Put a painting on the Available page

1. Open `Available > Paintings Shown on Available Page`
2. Add or edit the painting there
3. Set `Status` to `Available` or `Sold`
4. Click `Publish`

### Change painting order inside a year

1. Open `Paintings`
2. Open `Painting Order & Cleanup`
3. Choose the year
4. Use `Up`, `Down`, `Top`, or `Bottom`
5. Click `Save This Year Order`

### Hide an extra painting from the main gallery

1. Open `Paintings`
2. Open `Painting Order & Cleanup`
3. Choose the year
4. Click `Hide` on the extra painting

Important:
- `Hide` moves that painting to `Archived`
- it removes it from the public `Paintings` page without deleting the record

### Change the order on the Available page

1. Open `Available`
2. Open `Available Order`
3. Use `Up`, `Down`, `Top`, or `Bottom`
4. Click `Save Available Order`

### Change the menu text

1. Open `Navigation`
2. Find the menu item
3. Change the label
4. Click `Publish`

### Change homepage images

1. Open `Landing Page`
2. Replace or reorder hero images
3. Click `Publish`

## If Something Does Not Update

1. Make sure you clicked `Publish`
2. Wait 1 minute
3. Refresh the website
4. If it still does not change, send a message to the developer

## If You Cannot Log In

If the CMS login does not work, ask the developer to check your Sanity access for:
- project `jwkflhwo`
- production dataset
