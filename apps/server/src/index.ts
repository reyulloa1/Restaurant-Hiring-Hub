import express from 'express';
import cors from 'cors';
import { config } from './lib/config.js';
import { applicationsRouter } from './routes/applications.js';

const app = express();
app.use(cors({ origin: config.appUrl }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/applications', applicationsRouter);

app.listen(config.port, () => {
  console.log(`API listening on :${config.port}`);
});
