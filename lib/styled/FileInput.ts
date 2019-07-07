import styled from 'styled-components';

import UnformFileInput from '../components/FileInput';

export default styled(UnformFileInput)`
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
    margin-top: 2px;
  }

  button {
    transition: color 400ms, border-color 400ms;
    color: var(--color, #7159c1);
    background: var(--background, #ffffff);
    border-width: var(--border-width, 2px);
    border-style: var(--border-style, solid);
    border-color: var(--border-color, #7159c1);
    font-size: var(--font-size, 14px);
    height: var(--height, 48px);
    width: var(--width, 100%);
    font-weight: bold;
    cursor: pointer;
  }

  button::-moz-focusring,
  button::-moz-focus-inner {
    border: 0px;
    outline: none;
  }

  button:hover {
    --color: #4d369c;
    --border-color: #4d369c;
  }

  button:focus {
    --border-width: 4px;
  }

  button:active {
    transform: scale(0.98);
  }

  svg {
    transition: fill 400ms;
    fill: var(--color, #7159c1);
    width: calc(var(--font-size, 14px) + 3px);
    height: calc(var(--font-size, 14px) + 3px);
    margin-right: 8px;
  }
`;
