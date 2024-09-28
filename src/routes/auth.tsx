import { Hono } from 'hono';
import { authenticate, isAuthenticated } from '../lib/auth';
import Layout from '../components/Layout';
import styles from '../styles/login';

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (ctx) => {
  if (await isAuthenticated(ctx)) {
    return ctx.redirect("/admin"); // Server-side redirect.
  }

  return ctx.html(
    <Layout class={styles}>
      <div>Data Passport/Visa PSG</div>
      <form hx-post="/auth" hx-swap="afterend">
        <input placeholder='Username' id="username" />
        <input placeholder='Password' id="password" type="password" />
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
