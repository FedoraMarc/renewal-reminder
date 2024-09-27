import { Hono } from "hono";
import { deleteCookie } from "hono/cookie";
import { isAuthenticated } from "../lib/auth";
import AdminLayout from "../components/AdminLayout";
import styles from "../styles/dashboard";

const app = new Hono<{ Bindings: Env }>();

// TODO:
// A <dialog> element with a small form to create new entries.
// The 'Tambah Data' button should show the form.
// Render a list of rows from the data.
// Render a message if there is no data.
// Each table cell should be of an <input> element.
// There is a hidden save button on every row.
// Use a mutation observer to show the button if any of the fields in that row is edited.
// The button sends an hx-post to the server to update the entry.

// TODO:
// Create another page for Telegram / Email settings.

// Email API suggestions: SendGrid

app.use(async (ctx, next) => {
  const ok = await isAuthenticated(ctx);
  if (!ok) return ctx.redirect("/"); // Server-side redirect.
  await next();
});

app.get('/', async (ctx) => {
  return ctx.html(
    <AdminLayout class={styles}>
      <button onClick={() => { /* TODO */ }}>Tambah Data</button>
      <main>
        <table>
          <thead>
            <tr>
              <th rowspan={2}>Nama</th>
              <th colspan={3}>Passport</th>
              <th colspan={3}>Visa</th>
            </tr>
            <tr>
              <th>Terakhir Perpanjang</th>
              <th>Masa Valid</th>
              <th>Tanggal Kedeluarsa</th>
              <th>Terakhir Perpanjang</th>
              <th>Masa Valid</th>
              <th>Tanggal Kedeluarsa</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO */}
          </tbody>
        </table>
      </main>
      <dialog id="new-form">
        {/* TODO */}
      </dialog>
    </AdminLayout>
  );
});

app.post('/logout', async (ctx) => {
  deleteCookie(ctx, "token", { secure: true });
  ctx.header("HX-Redirect", "/"); // Client-side redirect via HTMX.
  return ctx.body(null, 302);
});

export default app;
