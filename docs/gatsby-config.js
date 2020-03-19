module.exports = {
  siteMetadata: {
    siteTitle: `Unform`,
    defaultTitle: `Unform | Easy peasy forms in React`,
    siteTitleShort: `Unform`,
    siteDescription: `Unform is a performance focused library that helps you creating beautiful forms in React with the power of uncontrolled components performance and React Hooks.`,
    siteUrl: `https://unform.dev`,
    siteAuthor: `@rocketseat`,
    siteImage: `/banner.png`,
    siteLanguage: `en`,
    basePath: `/`,
    themeColor: `#7159c1`,
    footer: `Made with 💜 by Rocketseat`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        docsPath: `src/docs`,
        githubUrl: `https://github.com/Rocketseat/unform`,
        baseDir: `docs/`,
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
};
