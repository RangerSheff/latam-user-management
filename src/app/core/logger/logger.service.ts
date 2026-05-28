import { Injectable } from '@angular/core';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  feature?: string;
  action?: string;
  correlationId?: string;
  payload?: unknown;
  error?: unknown;
}

interface LogEntry extends LogContext {
  level: LogLevel;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  debug(message: string, context?: LogContext): void {
    this.write('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.write('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.write('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.write('error', message, context);
  }

  log(message: string, payload?: unknown): void {
    this.info(message, { payload });
  }

  private write(level: LogLevel, message: string, context: LogContext = {}): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...context,
    };

    if (level === 'error') {
      console.error(entry);
      return;
    }

    if (level === 'warn') {
      console.warn(entry);
      return;
    }

    console.log(entry);
  }
}
