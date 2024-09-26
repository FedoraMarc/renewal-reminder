import { Style, cx } from "hono/css";
import { PropsWithChildren } from "hono/jsx";
import styles from "../styles";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
        <Style />
      </head>
      <body class={cx(styles, props.class)}>
        {props.children}
      </body>
      <script src="https://unpkg.com/htmx.org@2.0.2"
        integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
        crossorigin="anonymous">
      </script>
    </html>
  );
}
