module.exports = {
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        metadata: {
          // Used for the title template on pages other than the index site
          siteTitle: `Unform`,
          // Default title of the page
          defaultTitle: `Unform - ReactJS form library`,
          // Used in header, just appear on mobile
          siteTitleShort: `Unform`,
          // Default description, used for SEO
          siteDescription: `ReactJS form library to create uncontrolled form structures with nested fields, validations and much more!`,
          // Will be used to generate absolute URLs for og:image etc...
          siteUrl: `https://unform.dev`,
          // Twitter handle
          siteAuthor: `@rocketseat`,
          // Used for og:image and must be placed inside the `static` folder
          siteImage: `/unform.png`,
          // Will be set on the <html /> tag
          siteLanguage: `en`,
          // Used for (not required)
          themeColor: `#7159c1`,
          footer: `Created with <3`,
        },
      },
    },
  ],
};
