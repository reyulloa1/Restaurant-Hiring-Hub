import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { applicantsRouter } from './routes/applicants.js';

const app = express();
app.use(cors({ origin: env.appOrigin }));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'ok' });
});

app.use('/api/applicants', applicantsRouter);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
