import { Injectable } from '@angular/core';

import { UserRoleFilter, UserStatusFilter, UsersStore } from '../store/users.store';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  readonly users;
  readonly filteredUsers;

  readonly loading;
  readonly error;
  readonly hasUsers;

  readonly searchTerm;
  readonly selectedRole;
  readonly selectedStatus;

  constructor(private readonly usersStore: UsersStore) {
    this.users = this.usersStore.users;
    this.filteredUsers = this.usersStore.filteredUsers;

    this.loading = this.usersStore.loading;
    this.error = this.usersStore.error;
    this.hasUsers = this.usersStore.hasUsers;

    this.searchTerm = this.usersStore.searchTerm;
    this.selectedRole = this.usersStore.selectedRole;
    this.selectedStatus = this.usersStore.selectedStatus;
  }

  loadUsers(): void {
    this.usersStore.loadUsers();
  }

  setSearchTerm(term: string): void {
    this.usersStore.setSearchTerm(term);
  }

  setRole(role: UserRoleFilter): void {
    this.usersStore.setRole(role);
  }

  setStatus(status: UserStatusFilter): void {
    this.usersStore.setStatus(status);
  }
}
