import { config } from './config';
import type { ApplicationPayload } from '../types';

export async function submitApplication(payload: ApplicationPayload) {
  const response = await fetch(`${config.apiBaseUrl}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Application submission failed.');
  }

  return response.json();
}
