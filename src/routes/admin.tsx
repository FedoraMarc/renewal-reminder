import { Hono } from "hono";
import { deleteCookie } from "hono/cookie";
import { isAuthenticated } from "../lib/auth";
import Layout from "../components/Layout";

const app = new Hono<{ Bindings: Env }>();

app.use(async (ctx, next) => {
  const ok = await isAuthenticated(ctx);
  if (!ok) return ctx.redirect("/"); // Server-side redirect.
  await next();
});

app.get('/', async (ctx) => {
  // TODO: CRUD panel for staff data.
  return ctx.html(
    <Layout>
      <h1>welcome</h1>
      <button hx-post="/admin/logout">Logout</button>
    </Layout>
  );
});

app.post('/logout', async (ctx) => {
  deleteCookie(ctx, "token", { secure: true });
  ctx.header("HX-Redirect", "/"); // Client-side redirect via HTMX.
  return ctx.body(null, 302);
});

export default app;
