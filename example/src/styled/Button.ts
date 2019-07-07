import styled from 'styled-components';

export default styled.button`
  transition: background 400ms;
  background: var(--background, #7159c1);
  border-width: var(--border-width, 1px);
  border-style: var(--border-style, solid);
  border-color: var(--border-color, #7159c1);
  height: var(--height, 48px);
  width: var(--width, 100%);
  color: var(--color, #ffffff);
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  :hover {
    --background: #4d369c;
  }

  :focus {
    box-shadow: inset 0px 0px 0px 3px var(--border-color, #4d369c);
  }

  :active {
    transform: scale(0.98);
  }

  :-moz-focusring,
  ::-moz-focus-inner {
    border: 0px;
  }
`;
