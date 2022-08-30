# Ruby-sales
This theme is a fork of the Ruby theme, adding a sales interface to Ghost.

WORK IN PROGRESS.  Some of what's below is current vapor-ware/planned.  You were warned.

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

# How to configure

You need a Stripe account.  Make a RESTRICTED, READ-ONLY key with only Prices and Products allowed.  That goes into the Ghost admin panel.  You also need to paste in your public key.

You'll need to create each product in Stripe.  Give it a default price.  
(Only tested with USD.  Non-US folks may need to improve that part of the code.  On the to-do list, but not done yet.)

You need a custom routes.yaml, installed in content/settings (not within the theme), or uploaded from the admin panel.  Find a template in the theme route, labeled MOVE_routes.yaml.

An on-site shopping cart is working although currently needs more styling.  You can open its modal from any Ghost page.  By default, making a navigation entry for "Cart" will do this, or you can edit the class to be altered in the theme customization panel.

Two major options for how to show products for purchase:
1) Quick start, poorer SEO:  Create detailed products in Stripe, including an image for each.  In Ghost, create a custom page, using the FastStorefront template.  Add any text you want to the page.  The storefront will appear just below it on the rendered page.  [Work in progress, done soon.]

2) Slower, better:  Create each product as a post in Ghost.  Add as many details as you like, and format it however you like.  Tag each one with Products (primary tag) and any desired additional tags.  Create the same product in Stripe.  (At least name and price.)  Adjust the slug of each post to be exactly the product ID from Stripe.  (Capitalization will get messed up, but that's ok.)  [This is presently working, although the UI needs work.]  Make sure you get the slug adjusted, or it will not work.  The post slug links the 

# TODO
* Finish option 1.
* Clean up spots that are hard-coded and should use the Ghost admin panel settings.
* Fix layout on individual pages, figure out how to use a product template only on product posts, without having to set it for each one.
* Improve this documentation. :)


# Copyright & License

Ruby: Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).
Ruby-sales additions: Cathy Sarisky https://cathy.sarisky.link.  Still MIT license. :)

