import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(message: string, data?: unknown): void {
    if (!environment.production) {
      console.log(`[LOG]: ${message}`, data ?? '');
    }
  }

  error(message: string, error?: unknown): void {
    console.error(`[ERROR]: ${message}`, error ?? '');
  }

  warn(message: string, data?: unknown): void {
    console.warn(`[WARN]: ${message}`, data ?? '');
  }
}
