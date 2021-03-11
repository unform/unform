module.exports = {
  siteMetadata: {
    siteTitle: `Unform`,
    defaultTitle: `Unform | Performance-focused API for React forms`,
    siteTitleShort: `Unform`,
    siteDescription: `Unform is a performance-focused API for creating powerful forms experiences for both React and React Native`,
    siteUrl: `https://unform.dev`,
    siteAuthor: `@rocketseat`,
    siteImage: `/og/banner.png`,
    siteLanguage: `en`,
    basePath: `/`,
    themeColor: `#8257E6`,
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        docsPath: `src/docs`,
        repositoryUrl: `https://github.com/unform/unform`,
        baseDir: `docs/`,
        branch: `develop`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Unform`,
        short_name: `Unform`,
        start_url: `/`,
        background_color: `#8257E6`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-99997611-8`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://unform.dev`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
