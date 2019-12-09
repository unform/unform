const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---node-modules-rocketseat-gatsby-theme-docs-core-src-templates-homepage-query-js": hot(preferDefault(require("/Users/diegofernandes/www/unform/docs/node_modules/@rocketseat/gatsby-theme-docs-core/src/templates/homepage-query.js"))),
  "component---node-modules-rocketseat-gatsby-theme-docs-core-src-templates-docs-query-js": hot(preferDefault(require("/Users/diegofernandes/www/unform/docs/node_modules/@rocketseat/gatsby-theme-docs-core/src/templates/docs-query.js"))),
  "component---node-modules-gatsby-plugin-offline-app-shell-js": hot(preferDefault(require("/Users/diegofernandes/www/unform/docs/node_modules/gatsby-plugin-offline/app-shell.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/diegofernandes/www/unform/docs/src/pages/404.js")))
}

