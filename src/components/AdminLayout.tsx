import { PropsWithChildren } from "hono/jsx";
import { cx, css } from "hono/css"
import Layout from "./Layout";

type AdminLayoutProps = {
  class?: Promise<string>
}

export default function(props: PropsWithChildren<AdminLayoutProps>) {
  return (
    <Layout class={cx(styles, props.class)}>
      <header>
        <div>Data Passport dan Visa PSG</div>
        <button hx-post="/admin/logout">Logout</button>
      </header>
      {props.children}
    </Layout>
  );
}

const styles = css`
  header {
    background-color: #000000;
    display: flex;
    justify-content: space-between;
    padding: 1em calc(50vw - 38em);
    margin-bottom: 2em;

    > div:first-child {
      color: #ffffff;
      font-size: 1.5rem;
      font-weight: 700;
    }

    > button {
      background: none;
      border: none;
      color: #ffffff;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
