import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
import { UsersStore } from './users.store';

describe('UsersStore', () => {
  let store: UsersStore;

  const usersServiceMock = {
    getUsers: vi.fn(),
  };

  const mockUsersResponse = {
    users: [
      {
        id: 1,
        username: 'emilys',
        email: 'emily@mail.com',
        firstName: 'Emily',
        lastName: 'Johnson',
        role: 'admin',
        image: 'avatar.png',
      },
      {
        id: 5,
        username: 'emmaj',
        email: 'emma@mail.com',
        firstName: 'Emma',
        lastName: 'Miller',
        role: 'user',
        image: 'avatar.png',
      },
    ],
    total: 2,
    skip: 0,
    limit: 30,
  };

  beforeEach(() => {
    usersServiceMock.getUsers.mockReturnValue(of(mockUsersResponse));
    store = new UsersStore(usersServiceMock as never);
  });

  it('should load users', () => {
    store.loadUsers();

    expect(store.users()).toHaveLength(2);
    expect(store.hasUsers()).toBe(true);
  });

  it('should filter users by search term', () => {
    store.loadUsers();
    store.setSearchTerm('emma');

    expect(store.filteredUsers()).toHaveLength(1);
    expect(store.filteredUsers()[0].username).toBe('emmaj');
  });

  it('should filter users by role', () => {
    store.loadUsers();
    store.setRole('admin');

    expect(store.filteredUsers()).toHaveLength(1);
    expect(store.filteredUsers()[0].role).toBe('admin');
  });

  it('should filter users by inactive status', () => {
    store.loadUsers();
    store.setStatus('inactive');

    expect(store.filteredUsers()).toHaveLength(1);
    expect(store.filteredUsers()[0].active).toBe(false);
  });

  it('should return empty list when no users match filters', () => {
    store.loadUsers();
    store.setSearchTerm('not-found-user');

    expect(store.filteredUsers()).toEqual([]);
  });

  it('should expose loading state', () => {
    expect(store.loading()).toBe(false);

    store.loadUsers();

    expect(store.loading()).toBe(false);
  });

  it('should expose null error by default', () => {
    expect(store.error()).toBeNull();
  });

  it('should handle service error', () => {
    const errorResponse = new Error('Network error');

    usersServiceMock.getUsers.mockReturnValue(throwError(() => errorResponse));

    store.loadUsers();

    expect(store.error()).toBe('No se pudieron cargar los usuarios.');
    expect(store.loading()).toBe(false);
  });
});
