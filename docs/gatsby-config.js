module.exports = {
  pathPrefix: '/unform',
  siteMetadata: {
    siteTitle: `Unform`,
    defaultTitle: `Unform | Easy peasy forms in React`,
    siteTitleShort: `unform`,
    siteDescription: `Unform is a performance focused library that helps you creating beautiful forms in React with the power of uncontrolled components performance and React Hooks.`,
    siteUrl: `https://unform.dev`,
    siteAuthor: `@rocketseat`,
    siteImage: `/banner.png`,
    siteLanguage: `en`,
    themeColor: `#7159c1`,
    footer: `Made with 💜 by Rocketseat`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Unform`,
        short_name: `Unform`,
        start_url: `/`,
        background_color: `#7159c1`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `UA-99997611-9`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://rocketdocs.netlify.com`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
