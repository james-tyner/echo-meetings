# **echo**

#### Created by
James Tyner, Angella Qian, Katlyn Lee, Mars Tan, Mayank Gwalani, and Jessica Jones

## Modification instructions
1. Pull/Fetch from develop branch
2. Branch off develop onto one for your feature or page set
3. Make changes
4. Create pull request back into develop

After all pages are merged back into develop, we will push develop to release and then master

## Where to find and add things
### Sass docs and folder structure
*Find documentation for Sass here: https://sass-lang.com*

Changes to styles that reflect only one page of the site should be made on that page's Sass partial in `/css/pages`.

`styles.scss` imports all of the Sass partials from the `/css` and `/css/pages` folders. As you make changes to the Sass partials, you should save and re-export `styles.scss` to `styles.min.css` in order to preview those changes.

You can set up Scout-App to automatically compile and export Sass to CSS as you code: https://scout-app.io/.

### Mixins
Many Sass mixins and variables have been created for common site elements. For fonts, those are in `_fonts.scss`. Color variables are in `_colors.scss`. And some styles for buttons, cards, and inputs are in `_elements.scss`.

## FontAwesome
*Search for icons at https://fontawesome.com*

FontAwesome allows us to import and use icons throughout the site as a font. You can see this in action on the card template in `/templates`.

## Assets
All images are in the `/assets` folder. Included in this folder already are favicons and logos. You can use SVG logos in a website just like you would use any other image format, but SVGs can be scaled perfectly to any size.

## Components
The `/components` folder includes pieces of the site that are imported to multiple pages. Included here already are `metadata.php`, which includes common metadata and stylesheet for all pages, and `nav.php`, which includes the code for the sidebar nav that's on all pages.
