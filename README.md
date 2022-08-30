# Ruby-sales
This theme is a fork of the Ruby theme, adding a sales interface to Ghost.

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

# How to configure

You need a Stripe account.  Make a RESTRICTED, READ-ONLY key with only Prices and Products allowed.  That goes into the Ghost admin panel.

You'll need to create each product in Stripe.  Give it a default price.  Only tested with USD.  Non-US folks may need to improve that part of the code.

You need a custom routes.yaml, installed in content/settings (not within the theme).

Two major options:
1) Quick start, poorer SEO:  Create detailed products in Stripe, including an image for each.  In Ghost, create a custom page, using the FastStorefront template.  Add any text you want to the page.  The storefront will appear just below it on the rendered page.

2) Slower, better:  Create each product as a post in Ghost.  Add as many details as you like, and format it however you like.  Tag each one with Products (primary tag) and any desired additional tags.  Create the same product in Stripe.  (At least name and price.)  Adjust the slug of each post to be exactly the product ID from Stripe.  (Capitalization will get messed up, but that's ok.)  


# Copyright & License

Ruby: Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).
Changes: By Cathy Sarisky https://cathy.sarisky.link

