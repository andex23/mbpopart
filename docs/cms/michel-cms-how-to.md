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

### Painting

Use this for each individual painting:
- title
- caption
- year
- image
- availability
- price
- dimensions

Important:
- If `Status` is `Available`, it will also show on the `Available` page automatically

### Painting Order

Use this for:
- changing the order of paintings inside one year section
- moving a painting up or down without editing sort numbers by hand

Important:
- this only changes order within the same year
- if a painting should appear in a different section, change that painting's `Year`

### Available Page

Use this for:
- page title
- intro text

### Commissions Page

Use this for:
- page title
- intro text
- commission process text
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

1. Open `Painting`
2. Create a new item
3. Add title, year, and image
4. Set the status
5. Click `Publish`

### Put a painting on the Available page

1. Open that painting
2. Set `Status` to `Available`
3. Click `Publish`

### Change painting order inside a year

1. Open `Paintings`
2. Open `Painting Order`
3. Choose the year
4. Use `Up`, `Down`, `Top`, or `Bottom`
5. Click `Save This Year Order`

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
