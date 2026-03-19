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

Important:
- this is only for the page heading and intro copy
- the actual painting records are in `Paintings > 2. Edit One Gallery Painting`

### Paintings

Use this area for:
- `Page Settings & Intro`
- `1. Add / Reorder Year Gallery Paintings`
- `2. Edit One Gallery Painting`
- `3. Hidden Gallery Paintings (Archived)`
- `4. Review One Year At A Time`

Important:
- add normal website paintings inside `Paintings > 2. Edit One Gallery Painting`
- those paintings appear in the main `Paintings` page year sections
- easiest rule: create the painting once in `Paintings`, then turn on `Show on Available Page` only if that same record should also appear on the `Available` page
- this area is the main place to manage paintings that belong in year sections
- `1. Add / Reorder Year Gallery Paintings` is the fastest place to reorder a year and archive or delete extra paintings
- it now shows a small image thumbnail for each painting, so you can identify paintings visually while sorting
- use `2. Edit One Gallery Painting` when you want to open and edit painting records one by one
- use `4. Review One Year At A Time` when you want to clean up one year at a time

### Available

Use this area for:
- `Page Settings & Intro`
- `1. Reorder Available Page Cards`
- `2. Edit Available Page Cards`
- `3. Available Cards Only`
- `4. Sold / Commission Cards Still Showing`

Important:
- most of the time you do not need a second record here
- easiest method: open the year-gallery painting and turn on `Show on Available Page`
- only create a separate record in `Available` when the card should appear on the `Available` page but not in the year gallery
- `Available Page Only (Hide From Year Gallery)` is the switch for those stand-alone cards
- use `1. Reorder Available Page Cards` to reorder, archive, or delete cards
- it also shows a small image thumbnail for each card so you can recognize paintings visually
- use `2. Edit Available Page Cards` when you want to open and edit available-page records one by one

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
- `Status` controls the visible tag such as `Available`, `Sold`, or `Commission`
- `Status` does not decide page placement by itself
- `Show on Available Page` decides whether the painting also appears on the `Available` page
- records created from `Paintings > 2. Edit One Gallery Painting` are normal gallery paintings
- records created from `Available > 2. Edit Available Page Cards` are stand-alone Available-page cards
- `Year` is selected from a dropdown instead of being typed by hand
- if you choose `2026`, the painting appears in the website section `2026–Current`

### Painting Order & Cleanup

Use this for:
- changing the order of paintings inside one year section
- moving a painting up or down without editing sort numbers by hand
- visually identifying paintings by their thumbnail while you sort

Important:
- this only changes order for the main `Paintings` gallery
- this only changes order within the same year
- if a painting should appear in a different section, change that painting's `Year`
- if a painting should also appear on the `Available` page, turn on `Show on Available Page`

### Available Page Management

Use this for:
- changing the order of cards on the `Available` page
- archiving or deleting extra available or sold cards
- moving available or sold paintings up or down without editing numbers by hand

Important:
- open `Available > 1. Reorder Available Page Cards`
- use this instead of editing `Manual Sort Order` directly
- each row shows a small image thumbnail so it is easier to recognize the painting while sorting

### Commissions Page

Use this for:
- page title
- intro text
- commission process text
- step 2 down payment label
- step 2 down payment text
- commission examples

Important:
- the website shows 5 commission steps total
- step 2 is the down payment card
- the other 4 step items are the image steps

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
2. Use `Paintings > 2. Edit One Gallery Painting` for normal gallery paintings
3. Turn on `Show on Available Page` only if that same painting should also appear on the `Available` page
4. Use `Available > 2. Edit Available Page Cards` only when the card should exist on the `Available` page without appearing in the year gallery
4. Create a new painting there
5. Add title, choose the exact `Year` from the dropdown, then add the image and status
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

1. Open the painting record
2. If it is a normal year painting, use `Paintings > 2. Edit One Gallery Painting`
3. Turn on `Show on Available Page`
4. Set `Status` to `Available`, `Sold`, or `Commission`
5. Click `Publish`

Important:
- this does not remove the painting from its year section
- use `Available > 2. Edit Available Page Cards` only when you want a separate Available-page-only card

### Change painting order inside a year

1. Open `Paintings`
2. Open `1. Add / Reorder Year Gallery Paintings`
3. Choose the year
4. Use `Up`, `Down`, `Top`, or `Bottom`
5. Click `Save This Year Order`

### Archive or delete an extra painting from the main gallery

1. Open `Paintings`
2. Open `1. Add / Reorder Year Gallery Paintings`
3. Choose the year
4. Use the checkbox if you want to select more than one
5. Click `Archive`, `Archive Selected`, `Delete`, or `Delete Selected`

Important:
- `Archive` moves that painting to `Archived Paintings`
- `Archive Selected` moves all selected paintings to `Archived Paintings`
- `Delete` removes the painting from the CMS permanently
- use `Archive` if you may need the record again later

### Change the order on the Available page

1. Open `Available`
2. Open `1. Reorder Available Page Cards`
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
