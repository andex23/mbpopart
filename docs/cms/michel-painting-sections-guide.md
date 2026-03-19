# Michel Painting Sections Guide

This guide covers the image-window sections that need more care:

- `Paintings`
- `Available`
- `Commissions`
- `Happy Clients`

Use this guide when you want to:

- edit the text shown for each image window
- change the order of image windows
- add new items
- remove or hide items

## Before You Start

1. Log in to the CMS at `https://mbpopart.com/studio`
2. Open `Site Preview`
3. Click `Open Site Preview`
4. Keep that preview tab open while you work

After each change:

1. Click `Publish`
2. Wait about 1 minute
3. Refresh the preview tab

## Important Difference Between Sections

Not all image-window sections are controlled the same way.

### `Paintings` and `Available`

These are controlled by individual `Painting` documents, but they now follow one simpler rule:

- create the painting once in `Paintings > 2. Edit One Gallery Painting`
- if that same painting should also appear on the `Available` page, turn on `Show on Available Page`
- only use `Available > 2. Edit Available Page Cards` when the card should appear on the `Available` page but not in the year gallery

Main workflow screens:

- `Paintings > 1. Add / Reorder Year Gallery Paintings`
  - for the main year-by-year gallery, including order, archive, and delete actions
- `Paintings > 2. Edit One Gallery Painting`
  - for opening and editing gallery painting records one by one
- `Available > 1. Reorder Available Page Cards`
  - for ordering, archiving, and deleting cards that are already shown on the `Available` page
- `Available > 2. Edit Available Page Cards`
  - for opening and editing stand-alone Available-page cards one by one

Each painting has its own:

- title
- caption
- year
- image
- dimensions
- price
- status
- order

Important:
- easiest rule: create the painting once in `Paintings > 2. Edit One Gallery Painting`
- if that same painting should also appear on the `Available` page, turn on `Show on Available Page`
- only create a separate card in `Available > 2. Edit Available Page Cards` when it should appear on the `Available` page but not in the year gallery
- this keeps the main gallery separate from stand-alone available cards
- the two order-and-cleanup screens now show a small thumbnail for each item, so it is easier to recognize paintings visually while sorting
- `Year` is selected from a dropdown instead of being typed by hand
- if you choose `2026`, the painting appears in the website section `2026–Current`

### `Commissions`

This section is controlled inside `Commissions Page`, under `Recent Commission Examples`.

Each commission example has its own:

- title
- description
- images
- order
- optional hidden setting

### `Happy Clients`

This section is controlled inside `Happy Clients Page`, under `Photos`.

Each photo item has its own:

- image
- caption
- location
- short note
- featured setting
- order

## Part 1: Edit The Info Shown For Each Painting Or Window

### `Paintings` section

Open:
- `Paintings`
- `2. Edit One Gallery Painting`
- then open the painting you want

Fields that control what shows:

- `Caption (Shown Under Image)`
  - this is the main visible name used on cards
  - if left empty, the site uses `Title`
- `Dimensions`
  - shown in painting details/meta
- `Copyright Year`
  - if empty, the site uses `Year`
- `Main Image`
  - the image shown in the painting window
- `Card Preview Fit`
  - `Fill Window` crops to fill the square card
  - `Show Full Painting` keeps the whole painting visible inside the square card

Important:
- `Price` is not the main text on the regular `Paintings` grid
- `Year` controls which year section the painting belongs to
- choose `Year` from the dropdown list instead of typing it by hand
- a painting with `Year = 2026` shows inside `2026–Current` on the website
- `Show on Available Page` controls whether that same painting also appears on the `Available` page
- if the image sits too high or too low inside the smaller card window, open the `Main Image` editor and adjust the square crop first, then the hotspot if needed

### `Available` section

Open:
- `Available`
- `2. Edit Available Page Cards`
- then open the painting you want

Fields that control what shows:

- `Caption`
  - main line under the image
- `Status`
  - shows as `AVAILABLE`, `SOLD`, or `COMMISSION`
- `Dimensions`
  - shown in the lower info line
- `Price`
  - shown in the lower info line
- `Card Preview Fit`
  - use `Show Full Painting` when a tall or wide painting should stay fully visible inside the square card

Important:
- `Available`, `Sold`, and `Commission` can appear on the `Available` page
- `Not For Sale` and `Archive` do not appear on the `Available` page
- most of the time it is easier to use the year-gallery painting and turn on `Show on Available Page`
- use a separate Available-page card only when it should stay off the year gallery
- if a quote bubble or important detail is getting cut off in the small card window, open the `Main Image` editor and move the square crop box first

## Part 1B: Reposition The Image Inside The Small Window

Sometimes the full image is correct, but the smaller card preview crops too high or too low.
Sometimes the better fix is not cropping at all.

To fix that:

1. Open the painting
2. First decide whether the card should show the full painting
3. If yes, set `Card Preview Fit` to `Show Full Painting`
4. If it still needs a crop adjustment, go to `Main Image`
5. Open the image editor
6. Adjust the square crop box so the most important area stays visible in the small preview window
7. If needed, move the hotspot circle too
8. Save the image edit
9. Click `Publish`

Example:
- if a speech bubble is being cut off at the top, move the square crop box upward so more of the upper part of the painting stays visible
- if the whole painting should be visible in the square card, use `Show Full Painting` instead

### `Commissions` section

Open:
- `Commissions Page`
- `Recent Commission Examples`
- then open the example you want

Fields that control what shows:

- `Title`
  - main line under the image
- `Description`
  - smaller line under the title
- `Images`
  - the photo(s) for that commission example

Important:
- the website shows 5 total commission steps
- step 2 is the down payment card
- the other 4 steps are image steps
- the site usually uses the image marked `Final`
- if there is no `Final`, it uses another available image
- only published commission examples show on the page now
- there are no filler placeholder tiles in this section

### `Happy Clients` section

Open:
- `Happy Clients Page`
- `Photos`
- then open the item you want

Fields that control what shows:

- `Caption`
  - main line under the image
- `Location`
  - part of the smaller info line
- `Short Note`
  - part of the smaller info line
- `Image`
  - the photo itself

## Part 2: Change The Order Of Items

### `Paintings` section

Open:
- `Paintings`
- `1. Add / Reorder Year Gallery Paintings`

Then:

1. Choose the year
2. Use `Top`, `Up`, `Down`, or `Bottom`
3. Click `Save This Year Order`

Important:
- this changes order only inside that year
- this screen controls the main `Paintings` gallery only
- the year screens under `Browse by Year` use the same archive/delete controls
- each row now shows a small image thumbnail to help you identify the painting quickly
- if a painting belongs in another year section, change its `Year`
- if a painting should also appear on the `Available` page, turn on `Show on Available Page`
- if a painting is extra and should disappear from the public gallery, click `Archive`
- you can also tick multiple checkboxes and use `Archive Selected`
- archived paintings move to `Paintings > Archived Paintings`
- use `Delete` only when you want the painting record removed permanently from the CMS

### `Available` section

The `Available` page is controlled inside:

- `Available > 1. Reorder Available Page Cards`
- `Available > 2. Edit Available Page Cards`

Order rules are:

1. `1. Reorder Available Page Cards` screen order
2. `Manual Sort Order` is updated automatically when you save
3. `Year` is only a fallback

That means:
- open `Available > 1. Reorder Available Page Cards`
- move the cards with `Top`, `Up`, `Down`, or `Bottom`
- click `Save Available Order`
- use `Manual Sort Order` only if you need a manual fallback
- each row now shows a small image thumbnail to help you identify the painting quickly

### `Commissions` section

Open:
- `Commissions Page`
- `Recent Commission Examples`

Each example has an `Order` field.

How it works:
- lower number shows first
- example: `1`, `2`, `3`, `4`

Important:
- use the numeric `Order` field
- do not rely only on dragging items around in the list

### `Happy Clients` section

Open:
- `Happy Clients Page`
- `Photos`

Each photo has:

- `Feature First`
- `Order`

How it works:
- featured items show before non-featured items
- inside those groups, lower `Order` shows first

Important:
- use `Feature First` only for the items that should stay at the very front
- use the numeric `Order` field for normal sequencing

## Part 3: Add New Items

### Add a new main gallery painting

Open:
- `Paintings`
- `2. Edit One Gallery Painting`

Then:

1. Create a new `Painting`
2. Fill in:
   - `Title`
   - `Caption`
   - `Year`
   - `Main Image`
   - `Dimensions`
   - `Price`
   - `Status`
3. Click `Publish`

After that:

- it appears in the main `Paintings` year gallery
- it will not appear on the `Available` page unless you intentionally turn on `Show on Available Page`

If you need to place it correctly inside the year:

1. go to `Paintings > 1. Add / Reorder Year Gallery Paintings`
2. choose the year
3. move it into position
4. save

### Put that same painting on the `Available` page

Open:
- the painting you already created in `Paintings > 2. Edit One Gallery Painting`

Then:

1. Turn on `Show on Available Page`
2. Use `Status = Available`, `Status = Sold`, or `Status = Commission`
3. Click `Publish`

Important:
- this keeps one painting record doing both jobs
- the painting stays in its year section and also appears on the `Available` page
- if you want to place it in a different sequence, use `Available > 1. Reorder Available Page Cards`

### Add a stand-alone Available-page-only card

Open:
- `Available`
- `2. Edit Available Page Cards`

Then:

1. Create a new `Painting`
2. Fill in:
   - `Title`
   - `Caption`
   - `Year`
   - `Main Image`
   - `Dimensions`
   - `Price`
   - `Status`
3. Turn on `Available Page Only (Hide From Year Gallery)`
4. Make sure `Show on Available Page` is on
5. Click `Publish`

Important:
- use this only when the card should not appear in the year gallery
- this is less common than using the same gallery painting record

### Add a new commission example

Open:
- `Commissions Page`
- `Recent Commission Examples`

Then:

1. Add a new example
2. Fill in:
   - `Title`
   - `Description`
   - `Order`
3. Add one or more images
4. Set image roles if helpful:
   - `Client Photo`
   - `Sketch`
   - `Progress`
   - `Final`
   - `Happy Client`
5. Click `Publish`

### Add a new happy client photo

Open:
- `Happy Clients Page`
- `Photos`

Then:

1. Add a new photo item
2. Fill in:
   - `Image`
   - `Caption`
   - `Location`
   - `Short Note`
   - `Order`
3. Turn on `Feature First` only if it should stay near the front
4. Click `Publish`

## Part 4: Remove Or Archive Items

### Remove a painting

You have 2 choices:

#### Safer option: hide it but keep the record

Fastest method:

1. Open `Paintings > 1. Add / Reorder Year Gallery Paintings`
2. Choose the year
3. Click `Archive` on one item, or select several and click `Archive Selected`

Or open the painting and set:
- `Status = Archive`

This removes it from the public site while keeping it in the CMS.

#### Full removal

Open `Paintings > 1. Add / Reorder Year Gallery Paintings`, then use `Delete` on one item or `Delete Selected` for several.

Use this only if you are sure you no longer need that record.

### Remove a commission example

You have 2 choices:

- turn on `Hide This Example`
- or delete the example

Safer option:
- use `Hide This Example` first

### Remove a happy client photo

You can:

- delete the photo item from the `Photos` list

## Quick Field Reference

### If you want to change the visible name under a painting

Edit:
- `Caption`

### If you want to change title for records/admin use

Edit:
- `Title`

### If you want to change size

Edit:
- `Dimensions`

### If you want to change price

Edit:
- `Price`

### If you want to show `AVAILABLE`, `SOLD`, or `COMMISSION`

Edit:
- `Status`

### If you want to move a painting to another section/year

Edit:
- `Year`

### If you want to change the order inside one year

Use:
- `Paintings > 1. Add / Reorder Year Gallery Paintings`

### If you want a painting to show on `Available`

Set:
- `Show on Available Page = On`

Then set:
- `Status = Available`, `Status = Sold`, or `Status = Commission`

### If you want to change the order on `Available`

Use:
- `Available > 1. Reorder Available Page Cards`

### If you want a painting hidden from the public site but still saved in CMS

Use:
- `Paintings > 1. Add / Reorder Year Gallery Paintings > Archive`

Or set:
- `Status = Archive`

## Best Practice

When making a lot of painting changes:

1. edit one item
2. publish
3. refresh `Site Preview`
4. confirm it looks right
5. move to the next item

That is the safest way to keep titles, sizes, prices, and statuses accurate.
