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
      <button id="modal-button">Tambah Data</button>
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
      <dialog id="form-modal">
        <form method='dialog'>
          <input placeholder="Nama Staff" id="name" />
          <div>Data Passport</div>
          <input placeholder="Terakhir Diperpanjang" id="passport-last" type="date" />
          <input placeholder="Masa Valid" id="passport-lifetime" type="number" />
          <div>Data Visa</div>
          <input placeholder="Terakhir Diperpanjang" id="visa-last" type="date" />
          <input placeholder="Masa Valid" id="visa-lifetime" type="number" />
          <button>Selesai</button>
        </form>
      </dialog>
      <script dangerouslySetInnerHTML={{
        __html: `
          const modal = document.querySelector("form-modal");
          const modalButton = document.querySelector("modal-button");
          modalButton.onclick = modal.showModal;
        `}} />
    </AdminLayout>
  );
});

app.post('/logout', async (ctx) => {
  deleteCookie(ctx, "token", { secure: true });
  ctx.header("HX-Redirect", "/"); // Client-side redirect via HTMX.
  return ctx.body(null, 302);
});

export default app;
