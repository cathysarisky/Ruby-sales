# Ruby-sales
This theme is a fork of the Ruby theme, adding a sales interface to Ghost.

WORK IN PROGRESS.  Some of what's below is pretty rough still.  You were warned.  PRs welcome.

# From the Ruby readme: 
Styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# Install
yarn

# Run build & watch for changes
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/ruby-sales.zip`, which you can then upload to your site.

```bash
yarn zip
```

# How to configure Ruby-sales

After installing the theme normally (probably by uploading the .zip)...

You need a Stripe account.  Make one, specifically for selling products on your site.  (Don't share with subscriptions - strange things may happen.)  Make a RESTRICTED, READ-ONLY key with only Prices and Products allowed.  That goes into the Ghost admin panel.  You also need to paste in your Stripe public key.

You'll need to create each product in Stripe.  Give it a default price.  
(Only tested with USD.  Non-US folks may need to improve that part of the code.  On the to-do list, but not done yet.)

You need a custom routes.yaml, installed in content/settings (not within the theme), or uploaded from the admin panel.  Find a template in the theme folder, labeled MOVE_routes.yaml.  [Note: depending on future changes, this might change.]

An on-site shopping cart is functional if not yet pretty.  You can open its modal from any Ghost page.  By default, making a navigation entry for "Cart" will do this, or you can edit the class to be altered in the theme customization panel.  (TODO: might currently be hard-coded?)

Two major options for how to show products for purchase:
1) Quick start, poorer SEO:  Create detailed products in Stripe, including an image for each.  In Ghost, create a custom page, using the rapidstorefront template for that page.  Add any text you want to the page.  The product tiles will appear just below it on the rendered page.  

2) Slower, better:  Create each product as a post in Ghost.  Add as many details to each product post as you like, and format it however you like.  Tag each one with "Products" (primary tag) and any desired additional tags.  Create the same product in Stripe.  (At least name and price.)  Adjust the slug of each post to be exactly the product ID from Stripe.  (Capitalization will get messed up, but that's ok.)  Make sure you get the slug adjusted, or it will not work.  Post slugs are how I get pricing out of Stripe.  This layout is controlled by the storefront.hbs file, if you want changes to it.  (See TODO below.)

# TODO
* Clean up spots that are hard-coded and should use the Ghost admin panel settings.  (Some exist but aren't actually read.)
* Fix layout on individual product posts, figure out how to use a product post template, without having to set it for each one. (Hoping for help on Ghost forums.)
* Improve this documentation. :)
* Add non-USD pricing support.
* Consider whether post slugs are the right way to link product posts and Stripe products.  It was easy, it's not hard to do when making a new product, but it'd be better to have the product name as the slug for SEO purposes.  Alternatives?
* Tweak Option 2 to use a page for the storefront, instead of a collection (makes the storefront welcome message editable).
* (Continuation of bullet above) - use the Page's tag(s) to pull the list of products into tags on the storefront page.
* Clean up a variety of bad coding practice, including inline styles and even javascript bits in some .hbs files. (shudder)

# Copyright & License

Ruby: Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).
Ruby-sales additions: Cathy Sarisky https://cathy.sarisky.link.  Still MIT license. :)

