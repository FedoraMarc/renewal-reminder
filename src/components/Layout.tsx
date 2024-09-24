import { Style, cx } from "hono/css";
import { PropsWithChildren } from "hono/jsx";
import * as styles from "../styles";

const TITLE = "Data Passport/Visa PSG";

type LayoutProps = {
  class?: Promise<string>
};

export default function(props: PropsWithChildren<LayoutProps>) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{TITLE}</title>
        <Style />
      </head>
      <body class={cx(styles.layout, props.class)}>
        {props.children}
      </body>
      <script src="https://unpkg.com/htmx.org@2.0.2"
        integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
        crossorigin="anonymous">
      </script>
    </html>
  );
}
