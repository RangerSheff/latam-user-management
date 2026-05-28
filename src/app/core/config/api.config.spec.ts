import { describe, expect, it } from 'vitest';

import { API_CONFIG } from './api.config';
import { environment } from '../../../environments/environment';

describe('API_CONFIG', () => {
  it('should expose environment api url', () => {
    expect(API_CONFIG.baseUrl).toBe(environment.apiUrl);
  });

  it('should expose users endpoint', () => {
    expect(API_CONFIG.endpoints.users).toBe('/users');
  });
});
