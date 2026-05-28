import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerService();

    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('should log messages', () => {
    service.log('test log', { value: 1 });

    expect(console.log).toHaveBeenCalled();
  });

  it('should warn messages', () => {
    service.warn('test warn', { value: 1 });

    expect(console.warn).toHaveBeenCalled();
  });

  it('should error messages', () => {
    service.error('test error', { value: 1 });

    expect(console.error).toHaveBeenCalled();
  });
});
