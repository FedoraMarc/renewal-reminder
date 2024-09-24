import { Hono } from 'hono';
import { authenticate, isAuthenticated } from '../lib/auth';
import Layout from '../components/Layout';
import * as styles from '../styles';

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (ctx) => {
  if (await isAuthenticated(ctx)) {
    return ctx.redirect("/admin"); // Server-side redirect.
  }

  return ctx.html(
    <Layout class={styles.loginPageLayout} >
      <form hx-post="/auth" hx-swap="afterend">
        <label for="username" > Username </label>
        <input id="username" name="username" />
        <label for="password" > Password </label>
        <input id="password" name="password" type="password" />
        <button>Masuk</button>
      </form>
    </Layout >
  );
});

app.post('/auth', async (ctx) => {
  const data = await ctx.req.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (username === ctx.env.USERNAME && password === ctx.env.PASSWORD) {
    await authenticate(ctx);
    ctx.header("HX-Redirect", "/admin"); // Client-side redirect via HTMX.
    return ctx.body(null, 302);
  }

  return ctx.html(
    <div style="color: red; font-size: 0.75rem;">
      Username atau Password salah.
    </div>
  );
});

export default app;
