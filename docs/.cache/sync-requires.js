const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---node-modules-rocketseat-gatsby-theme-docs-core-src-templates-homepage-query-js": hot(preferDefault(require("/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/@rocketseat/gatsby-theme-docs-core/src/templates/homepage-query.js"))),
  "component---node-modules-rocketseat-gatsby-theme-docs-core-src-templates-docs-query-js": hot(preferDefault(require("/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/@rocketseat/gatsby-theme-docs-core/src/templates/docs-query.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/jpedroschmitz/www/github/rocketseat/unform/docs/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/jpedroschmitz/www/github/rocketseat/unform/docs/src/pages/404.js")))
}

