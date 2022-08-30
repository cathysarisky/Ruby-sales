# Ruby-sales
This theme is a fork of the Ruby theme.

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

You need a custom yaml, if you want to let the Ruby theme mostly control how the storefront looks.  




# Copyright & License

Ruby: Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).
Changes: By Cathy Sarisky https://cathy.sarisky.link

