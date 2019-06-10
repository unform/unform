const users = [
  {
    caption: 'Unform',
    image: '/img/logo.png',
    infoLink: 'https://unform.github.io',
    pinned: true,
  },
];

const siteConfig = {
  title: 'unform', // Title for your website.
  tagline: 'A reactjs library to create uncontrolled form structures with nested fields, validations and much more!',
  url: 'https://rocketseat.github.io', // Your website URL
  baseUrl: '/unform/',
  projectName: 'unform',
  organizationName: 'rocketseat',
  headerLinks: [
    { doc: 'installation', label: 'Docs' },
    // { doc: 'contributing', label: 'Contributing' },
    // { page: 'community', label: 'Community' },
  ],
  users,
  headerIcon: 'img/logo.png',
  footerIcon: 'img/logo.png',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#ee5253',
    secondaryColor: '#ff6b6b',
  },
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Noto+Sans:400,700',
    // 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
  ],
  copyright: `Copyright © ${new Date().getFullYear()} Rocketseat`,
  highlight: {
    theme: 'github',
  },
  usePrism: ['jsx', 'js'],
  scripts: ['https://buttons.github.io/buttons.js'],
  onPageNav: 'separate',
  cleanUrl: true,
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
  // translationRecruitingLink: true,
};

module.exports = siteConfig;
