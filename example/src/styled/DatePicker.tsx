/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';

import DatePicker from '../components/DatePicker';

export default styled(DatePicker)`
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

  [class$='wrapper'] {
    flex-grow: 1;
    min-height: 0;
    height: var(--height, 48px);
    width: var(--width, 100%);
  }

  [class$='input-container'],
  input {
    height: 100%;
    width: 100%;
  }

  input {
    transition: all 400ms;
    color: var(--color, #333333);
    box-shadow: var(--box-shadow, 0px);
    background: var(--background, #ffffff);
    border-width: var(--border-width, 1px);
    border-style: var(--border-style, solid);
    border-color: var(--border-color, #dcdcdc);
    border-radius: var(--border-radius, 0px);
    padding: var(--pading, 8px);

    :hover {
      border-color: var(--border-color, #bfbfbf);
    }

    :focus,
    :active {
      border-color: var(--border-color, #2196f3);
    }
  }
`;
