import { css } from 'hono/css';

export default css`
  > button {
    background-color: #1098f7;
    border: none;
    border-radius: 1.5em;
    padding: 0.5em 1em;
    margin-left: calc(50vw + 38em);
    margin-bottom: 1em;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  main { 
    background-color: #ffffff;
    border-radius: 0.5em;
    margin: 0 auto;
    padding: 1em;
    width: fit-content;

    table {
      border-collapse: collapse;
      font-size: 0.95rem;

      > thead > tr:first-child > th:first-child {
        min-width: 16em;
      }
    
      th, td {
        padding: 0.25em 1em;
      }
    }
  }
`;
