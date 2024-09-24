import { css } from 'hono/css';

export const layout = css`
  margin: 0;
  font-family: Arial, sans-serif;
`;

export const loginPageLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    box-shadow: 0 0 4px #000;
    border-radius: 8px;
    margin-top: 100px;
    padding: 20px;

    > label,
    > input {
      display: block;
    }
    
    > label {
      font-size: 0.75rem;
    }

    > input {
      margin-bottom: 10px;

      &:focus {
        outline: none;
      }
    }
  }
`;
