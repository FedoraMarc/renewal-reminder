import { Hono } from 'hono';
import cron from './cron';
import auth from './routes/auth';
import admin from './routes/admin';

const app = new Hono<{ Bindings: Env }>();

app.route('/', auth);
app.route('/admin', admin);

export default {
  fetch: app.fetch,
  scheduled: cron
};
