import { css } from 'hono/css';

export default css`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:first-child {
    background-color: #000000;
    border-radius: 1.5em;
    margin-top: 2em;
    padding: 0.5em 1.5em;
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 700;
  }

  form {
    background: #ffffff;
    border-radius: 0.5em;
    margin-top: 2em;
    padding: 1.5em;

    > input {
      display: block;
      background-color: #efefef;
      border: none;
      border-radius: 1.5em;
      margin-bottom: 1em;
      padding: 0.5em 1em;

      &:focus {
        outline: none;
      }
    }

    > button {
      display: block;
      background-color: #1098f7;
      border: none;
      border-radius: 1.5em;
      margin: 0 auto;
      padding: 0.5em 1em;
      color: #ffffff;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
