var plugins = [{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[{"resolve":"/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-remark-autolink-headers","id":"df380aaa-460e-51a2-8830-e6712dc1f436","name":"gatsby-remark-autolink-headers","version":"2.1.24","pluginOptions":{"plugins":[]},"nodeAPIs":[],"browserAPIs":["onInitialClientRender","shouldUpdateScroll"],"ssrAPIs":["onRenderBody"]},{"resolve":"/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-remark-images","id":"3626c0e0-58d4-5046-b0e5-cb7731a052f2","name":"gatsby-remark-images","version":"3.1.44","pluginOptions":{"plugins":[]},"nodeAPIs":[],"browserAPIs":["onRouteUpdate"],"ssrAPIs":[]}],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":["gatsby-remark-autolink-headers","gatsby-remark-embedder",{"resolve":"gatsby-remark-images","options":{"maxWidth":960,"withWebp":true,"linkImagesToOriginal":false}},"gatsby-remark-responsive-iframe","gatsby-remark-copy-linked-files"]},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/@rocketseat/gatsby-theme-docs/gatsby-ssr'),
      options: {"plugins":[],"docsPath":"src/docs"},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Unform","short_name":"Unform","start_url":"/","background_color":"#7159c1","display":"standalone","icon":"static/favicon.png"},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-99997611-8"},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-plugin-canonical-urls/gatsby-ssr'),
      options: {"plugins":[],"siteUrl":"https://unform.dev"},
    },{
      plugin: require('/Users/jpedroschmitz/www/github/rocketseat/unform/docs/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
