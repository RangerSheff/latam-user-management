import { describe, expect, it } from 'vitest';

describe('UsersSkeleton', () => {
  it('should expose users skeleton component contract', async () => {
    const { UsersSkeleton } = await import('./users-skeleton');

    expect(UsersSkeleton).toBeDefined();
  });
});
