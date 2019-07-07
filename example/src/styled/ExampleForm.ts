/* eslint-disable import-helpers/order-imports */
import styled from 'styled-components';

import ExampleForm from '../components/ExampleForm';
import { FileInput, Input, Select } from '../../../lib/styled';
import DatePicker from './DatePicker';
import ReactSelect from './ReactSelect';
import Button from './Button';

export default styled(ExampleForm)`
  padding: 24px;
  background: var(--bg-primary);

  .useShippingAsBilling {
    display: flex;
    flex-flow: row-reverse wrap;
    justify-content: flex-end;
    align-items: center;

    label {
      cursor: pointer;
      color: var(--fg-primary);

    }
    input {
      margin-right: 14px;
      cursor: pointer;
    }
  }

  .section-title {
    color: var(--fg-primary);
    margin-bottom: 14px;
    margin-top: 36px;
    font-weight: bold;
    font-size: 24px;
  }

  ${Input},
  ${Select},
  ${DatePicker},
  ${ReactSelect} {
    --box-shadow: 0px 0px 4px var(--bg-border);
    --background: var(--bg-secondary);
    --error-color: var(--danger);
    --color: var(--fg-primary);
    --label-color: var(--fg-primary);
    --placeholder-color: rgba(var(--fg-primary-rgb), 0.45);
    --border-color: var(--bg-border);
    --border-radius: 3px;
    --border-width: 1px;
  }

  ${Input} input,
  ${Input} textarea,
  ${DatePicker} input,
  ${ReactSelect} [class$=control],
  ${Select} select {
    :hover {
      --border-color: var(--accent);
      --box-shadow: 0px;
    }

    :focus,
    :focus {
      --border-color: var(--accent);
      --box-shadow: 0px 0px 4px 1px var(--accent);
    }

    :disabled {
      --background: var(--bg-tertiary);
      --border-color: var(--bg-border);
      --placeholder-color: rgba(var(--fg-primary-rgb), 0.25);
      --color: rgba(var(--fg-primary-rgb), 0.45);
      --box-shadow: 0px;
    }

    &.has-error {
      --border-color: var(--danger);
      --box-shadow: 0px 0px 4px 1px var(--danger);
    }
  }

  ${Button},
  ${FileInput} button {
    --color: var(--fg-primary);
    --background: var(--accent);
    --border-color: var(--accent);

    :hover {
      --background: var(--accent-light);
      --border-color: var(--accent-light);
    }

    :focus,
    :active {
      --border-color: var(--accent-light);
    }

    :focus:hover,
    :active:hover {
      --border-color: var(--accent);
    }
  }
`;
