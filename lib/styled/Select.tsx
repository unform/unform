import styled from 'styled-components';

import UnformSelect from '../components/Select';

const Select = styled(UnformSelect)`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 24px;

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

  select {
    transition: all 400ms;
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
    appearance: none;

    background-image: var(
      --arrow,
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 255" height="255px" width="255px" x="0px" y="0px" ><g><g fill="rgba(0, 0, 0, 0.65)"><polygon points="0, 63.75 127.5, 191.25 255, 63.75"/></g></g></svg>')
    );
    background-position: calc(100% - 12px) center;
    background-repeat: no-repeat;
    background-size: 10px;

    &.is-empty:not(:focus) {
      color: var(--placeholder-color, #999999);
    }

    &.has-error,
    &.has-error:focus,
    &.has-error:active,
    &.has-error:hover {
      border-color: var(--border-color, #ff0000);
    }

    &:-moz-focusring,
    &::-moz-focus-inner {
      transition: none;
      color: transparent;
      text-shadow: 0 0 0 var(--color, #333333);
      border-width: var(--border-width, 1px);
      border-style: var(--border-style, solid);
      border-color: var(--border-color, #dcdcdc);
    }

    &:hover {
      border-color: var(--border-color, #bfbfbf);
    }

    &:focus,
    &:active {
      border-color: var(--border-color, #2196f3);
    }
  }
`;

export default Select;
