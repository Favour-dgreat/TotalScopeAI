import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

import { https } from 'firebase-functions';
import { default as next } from 'next';

// Determine environment
const isDev = process.env.NODE_ENV !== 'production';

// Initialize Next.js
const app = next({ dev: isDev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

// Log startup info
logger.info('Starting Next.js Firebase Function...');

// Export function to handle all requests
export const nextApp = https.onRequest((req, res) => {
  app.prepare().then(() => handle(req, res));
});
