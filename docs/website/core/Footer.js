/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const { config: { baseUrl, docsUrl } } = this.props;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const { config: { baseUrl } } = this.props;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    const {
      config: {
        baseUrl, footerIcon, title, repoUrl, copyright, 
      }, 
      language 
    } = this.props;

    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={baseUrl} className="nav-home">
            {footerIcon && (
              <img
                src={`${baseUrl}${footerIcon}` }
                alt={title}
                width="136"
                height="58"
                style={{ objectFit: 'contain' }}
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('installation', language)}>
              Getting Started
            </a>
            <a href={'contributing'}>
              Contributing
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="http://stackoverflow.com/questions/tagged/unform"
              target="_blank"
              rel="noreferrer noopener"
            >
              Stack Overflow
            </a>
            <a
              href="https://twitter.com/rocketseat"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${baseUrl}blog`}>Blog</a>
            <a href="https://github.com/Rocketseat/unform">GitHub</a>
            <a
              className="github-button"
              href={repoUrl}
              data-icon="octicon-star"
              data-count-href="/Rocketseat/unform/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>

        <a
          href="https://opensource.facebook.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource"
        >
          <img
            src={`${baseUrl}img/oss_logo.png`}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
