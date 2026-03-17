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

These are controlled by individual `Painting` documents, but they now live in 2 different workflows:

- `Paintings > Gallery Paintings`
  - for the main year-by-year gallery
- `Available > Paintings Shown on Available Page`
  - for the available/sold inventory cards

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
- a normal gallery painting should be created from `Paintings > Gallery Paintings`
- an available or sold inventory card should be created from `Available > Paintings Shown on Available Page`
- this keeps the main gallery separate from the available inventory

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
- `Gallery Paintings`
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
- `Show "Coming Soon" Placeholder`
  - use this if the real image is not ready yet

Important:
- `Price` is not the main text on the regular `Paintings` grid
- `Year` controls which year section the painting belongs to

### `Available` section

Open:
- `Available`
- `Paintings Shown on Available Page`
- then open the painting you want

Fields that control what shows:

- `Caption`
  - main line under the image
- `Status`
  - shows as `AVAILABLE` or `SOLD`
- `Dimensions`
  - shown in the lower info line
- `Price`
  - shown in the lower info line

Important:
- `Available` and `Sold` paintings appear on the `Available` page
- `Not For Sale` and `Archive` do not appear on the `Available` page
- these inventory cards are separate from the main year gallery on the `Paintings` page

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
- the site usually uses the image marked `Final`
- if there is no `Final`, it uses another available image

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
- `Painting Order`

Then:

1. Choose the year
2. Use `Top`, `Up`, `Down`, or `Bottom`
3. Click `Save This Year Order`

Important:
- this changes order only inside that year
- this screen controls the main `Paintings` gallery only
- if a painting belongs in another year section, change its `Year`

### `Available` section

The `Available` page uses painting inventory records inside:

- `Available > Paintings Shown on Available Page`

Order rules are:

1. `Manual Sort Order` lowest number first
2. `Year` as a fallback

That means:
- open the painting inventory record
- set `Manual Sort Order`
- lower number shows first
- good example numbers are `10`, `20`, `30`

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

### Add a new painting to `Paintings` and `Available`

There are now 2 correct places to add new painting records.

### Add a new main gallery painting

Open:
- `Paintings`
- `Gallery Paintings`

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
- it will not appear in the `Available` inventory unless you intentionally move it into that workflow

If you need to place it correctly inside the year:

1. go to `Paintings > Painting Order`
2. choose the year
3. move it into position
4. save

### Add a new available or sold inventory painting

Open:
- `Available`
- `Paintings Shown on Available Page`

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
3. Use `Status = Available` or `Status = Sold`
4. Set `Manual Sort Order`
5. Click `Publish`

Important:
- add these records from inside the `Available` section so they stay in the right workflow
- these cards appear on the `Available` page and do not enter the main year gallery

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

## Part 4: Remove Or Hide Items

### Remove a painting

You have 2 choices:

#### Safer option: hide it but keep the record

Open the painting and set:

- `Status = Archive`

This removes it from the public site while keeping it in the CMS.

#### Full removal

Open the painting and delete it.

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

### If you want to show `AVAILABLE` or `SOLD`

Edit:
- `Status`

### If you want to move a painting to another section/year

Edit:
- `Year`

### If you want to change the order inside one year

Use:
- `Paintings > Painting Order`

### If you want a painting to show on `Available`

Set:
- `Status = Available` or `Status = Sold`

### If you want a painting hidden from the public site but still saved in CMS

Set:
- `Status = Archive`

## Best Practice

When making a lot of painting changes:

1. edit one item
2. publish
3. refresh `Site Preview`
4. confirm it looks right
5. move to the next item

That is the safest way to keep titles, sizes, prices, and statuses accurate.
