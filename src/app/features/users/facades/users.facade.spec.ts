import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  const usersStoreMock = {
    users: vi.fn(),
    filteredUsers: vi.fn(),
    loading: vi.fn(),
    error: vi.fn(),
    hasUsers: vi.fn(),
    searchTerm: vi.fn(),
    selectedRole: vi.fn(),
    selectedStatus: vi.fn(),
    loadUsers: vi.fn(),
    setSearchTerm: vi.fn(),
    setRole: vi.fn(),
    setStatus: vi.fn(),
  };

  let facade: UsersFacade;

  beforeEach(() => {
    vi.clearAllMocks();

    facade = new UsersFacade(usersStoreMock as never);
  });

  it('should expose store signals', () => {
    expect(facade.users).toBe(usersStoreMock.users);
    expect(facade.filteredUsers).toBe(usersStoreMock.filteredUsers);
    expect(facade.loading).toBe(usersStoreMock.loading);
    expect(facade.error).toBe(usersStoreMock.error);
    expect(facade.hasUsers).toBe(usersStoreMock.hasUsers);
    expect(facade.searchTerm).toBe(usersStoreMock.searchTerm);
    expect(facade.selectedRole).toBe(usersStoreMock.selectedRole);
    expect(facade.selectedStatus).toBe(usersStoreMock.selectedStatus);
  });

  it('should delegate loadUsers to store', () => {
    facade.loadUsers();

    expect(usersStoreMock.loadUsers).toHaveBeenCalledOnce();
  });

  it('should delegate search term updates to store', () => {
    facade.setSearchTerm('emily');

    expect(usersStoreMock.setSearchTerm).toHaveBeenCalledWith('emily');
  });

  it('should delegate role updates to store', () => {
    facade.setRole('admin');

    expect(usersStoreMock.setRole).toHaveBeenCalledWith('admin');
  });

  it('should delegate status updates to store', () => {
    facade.setStatus('inactive');

    expect(usersStoreMock.setStatus).toHaveBeenCalledWith('inactive');
  });
});
