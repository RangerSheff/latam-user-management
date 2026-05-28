import { describe, expect, it } from 'vitest';

describe('UsersList', () => {
  it('should expose users list component contract', async () => {
    const { UsersList } = await import('./users-list');

    expect(UsersList).toBeDefined();
  });
});
