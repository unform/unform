/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');

// eslint-disable-next-line import/no-unresolved
const CompLibrary = require('../../core/CompLibrary.js');

const { MarkdownBlock, Container, GridBlock } = CompLibrary;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        {/* <Logo img_src={`${baseUrl}img/undraw_monitor.svg`} /> */}
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          {/* <PromoSection /> */}
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Unform is a performance focused library that helps you creating beautiful forms in React with the power of uncontrolled components performance and React Hooks.',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'Overview',
          },
          {
            content: 
            ' Beautiful syntax; </br>' + 
            'React Hooks 😍; </br>' +
            ' Performance focused; </br>' + 
            ' Use of uncontrolled components; </br>' + 
            ' Integration with pickers, dropdowns and other libraries;',
            image: `${baseUrl}img/undraw_operating_system.svg`,
            imageAlign: 'top',
            title: 'Key Features',
          },
        ]}
      </Block>
    );

    const WhyUnform = () => (
      <Block background="light">
        {[
          {
            content:
              'Formik/Redux Form has a really great syntax while it has a really poor support to uncontrolled components and deep nested data structures. With unform it\'s easy to create forms with complex relationships without losing performance.',
            image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
            imageAlign: 'right',
            title: 'Why not Formik, Redux Form or another library?',
          },
        ]}
      </Block>
    );

    const RoadMap = () => (
      <Block id="try">
        {[
          {
            content:
              'Native checkbox/radio support; </br>' +
              'React Native support (should we?); </br>' +
              'Better docs;',
            image: `${baseUrl}img/undraw_code_review.svg`,
            imageAlign: 'left',
            title: 'Road Map',
          },
        ]}
      </Block>
    );

    const License = () => (
      <Block background="dark">
        {[
          {
            content:
              'MIT © [Rocketseat](https://github.com/Rocketseat)',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'License',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <Features />
        <WhyUnform />
        <RoadMap />
        <License />
        <Showcase />
      </div>
    );
  }
}

module.exports = Index;
