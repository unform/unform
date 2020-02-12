/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { LiveProvider, LiveEditor } from 'react-live';

import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';
import PropTypes from 'prop-types';

import { mdx } from '@mdx-js/react';
import {
  CopyCode,
  LineNo,
  Pre,
  PreHeader,
  LiveWrapper,
  LivePreview,
  LiveError,
  StyledEditor,
} from '@rocketseat/gatsby-theme-docs/src/components/Code/styles';
import { copyToClipboard } from '@rocketseat/gatsby-theme-docs/src/util/copy-to-clipboard';
import { FormContext, Scope, useField } from '@unform/core';
import { Form } from '@unform/web';

const scope = { mdx, Form, FormContext, Scope, useField };

export default function CodeHighlight({
  children,
  className,
  live,
  title,
  lineNumbers,
}) {
  const [copied, setCopied] = useState(false);
  const codeString = children.trim();
  const language = className.replace(/language-/, '');

  if (live) {
    return (
      <LiveProvider
        code={codeString}
        noInline
        theme={theme}
        transformCode={code => `/** @jsx mdx */${code}`}
        scope={scope}
      >
        <LiveWrapper>
          <StyledEditor>
            <LiveEditor />
          </StyledEditor>
          <LivePreview />
        </LiveWrapper>

        <LiveError />
      </LiveProvider>
    );
  }

  const handleClick = () => {
    setCopied(true);
    copyToClipboard(codeString);
  };

  return (
    <>
      {title && <PreHeader>{title}</PreHeader>}
      <div className="gatsby-highlight">
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({
            className: blockClassName,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <Pre className={blockClassName} style={style} hasTitle={title}>
              <CopyCode onClick={handleClick}>
                {copied ? 'Copied!' : 'Copy'}
              </CopyCode>
              <code>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {lineNumbers && <LineNo>{i + 1}</LineNo>}
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </code>
            </Pre>
          )}
        </Highlight>
      </div>
    </>
  );
}

CodeHighlight.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  live: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string,
  lineNumbers: PropTypes.string,
};

CodeHighlight.defaultProps = {
  live: false,
  title: null,
  lineNumbers: null,
};
