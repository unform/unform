import styled from 'styled-components';

import UnformInput from '../components/Input';

const Input = styled(UnformInput)`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 24px;

  input,
  textarea {
    transition: all 250ms;
    color: var(--color, #333333);
    font-size: var(--font-size, 14px);
    background: var(--background, #ffffff);
    border-width: var(--border-width, 1px);
    border-style: var(--border-style, solid);
    border-color: var(--border-color, #dcdcdc);
    border-radius: var(--border-radius, 0px);
    box-shadow: var(--box-shadow, 0px);
    height: var(--height, 48px);
    width: var(--width, 100%);
    padding: var(--pading, 8px);

    &.has-error,
    &.has-error:focus,
    &.has-error:active,
    &.has-error:hover {
      border-color: var(--border-color, #ff0000);
    }

    ::-webkit-input-placeholder {
      color: var(--placeholder-color, #999999);
    }
    ::-moz-placeholder,
    :-moz-placeholder {
      color: var(--placeholder-color, #999999);
      opacity: 1;
    }

    ::placeholder {
      color: var(--placeholder-color, #999999);
    }

    :hover {
      border-color: var(--border-color, #bfbfbf);
    }

    :focus,
    :active {
      border-color: var(--border-color, #2196f3);
    }

    :disabled {
      border-color: var(--border-color, #dcdcdc);
      background: var(--background, #efefef);
      cursor: no-drop;
    }
  }

  label {
    color: var(--label-color, #333333);
    font-size: var(--label-font-size, 14px);
    font-weight: bold;
    margin-bottom: 6px;
  }

  span {
    color: var(--error-color, #ff0000);
    font-size: var(--error-font-size, 12px);
    margin-top: 6px;
  }
`;

export default Input;
