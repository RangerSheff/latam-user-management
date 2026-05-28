import { describe, expect, it } from 'vitest';

describe('UserCard', () => {
  it('should expose user card component contract', async () => {
    const { UserCard } = await import('./user-card');

    expect(UserCard).toBeDefined();
  });
});
