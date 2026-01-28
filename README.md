# Headless Platform Blueprint Portfolio

This repository contains a starter Blueprint to get you up and running quickly on [WP Engine's Headless Platform](https://wpengine.com/atlas/) with a WordPress site complete with a blog, portfolio and testimonials.

## How it works
Headless wordpress separates the backend and the frontend unlike traditional WordPress where these two are closely tied together. We have a our normal WordPress install, where we manage the backend and content. Additionally we have another environment exclusively to run the front end. This uses graphql, to connect and pull data from the backend and display it on the front end.

### GraphQL
This is our new way to query anything from the wordpress admin. When the GQL plugin is installed, ACF fields need to be displayed within GQL so they can be accessible

### Components
Components are reusable elements. Think of our includes files, template-parts, or sometimes a function in functions-content-generation.php. Few custom components listed below:

#### Custom Components 
- Banner
- BannerAttorney
- AttorneyResultsWrapper
- AttorneyBox
- Accordion
- Column
- Row
- PracticeBox
- RelatedPractices

#### Templates
Templates need to be added to wp-templates/index.js

### Important Files
- `pages/_document.js` Optional file, whatever is added in here will be added to each page such as the <head>

## Todo
Fix children menu items not appearing in a dropdown. May just need to bring over HTML structure and CSS

## For more information

For more information on this Blueprint please check out the following sources:

- [WP Engine's Headless Platform](https://wpengine.com/atlas/)
- [Faust.js](https://faustjs.org)
- [WPGraphQL](https://www.wpgraphql.com)
- [Atlas Content Modeler](https://wordpress.org/plugins/atlas-content-modeler/)
- [WP Engine's Headless Platform developer community](https://developers.wpengine.com)

### Contributor License Agreement

All external contributors to WP Engine products must have a signed Contributor License Agreement (CLA) in place before the contribution may be accepted into any WP Engine codebase.

1. [Submit your name and email](https://wpeng.in/cla/)
2. 📝 Sign the CLA emailed to you
3. 📥 Receive copy of signed CLA

❤️ Thank you for helping us fulfill our legal obligations in order to continue empowering builders through headless WordPress.
