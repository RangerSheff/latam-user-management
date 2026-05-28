import { computed, Injectable, signal } from '@angular/core';

import { User, UserRole } from '../models/user.model';
import { UserMapper } from '../mappers/user.mapper';
import { UsersService } from '../services/users.service';

export type UserRoleFilter = UserRole | 'all';
export type UserStatusFilter = 'all' | 'active' | 'inactive';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private readonly usersSignal = signal<User[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  private readonly searchTermSignal = signal('');
  private readonly selectedRoleSignal = signal<UserRoleFilter>('all');
  private readonly selectedStatusSignal = signal<UserStatusFilter>('all');

  constructor(private readonly usersService: UsersService) {}

  readonly users = this.usersSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly searchTerm = this.searchTermSignal.asReadonly();
  readonly selectedRole = this.selectedRoleSignal.asReadonly();
  readonly selectedStatus = this.selectedStatusSignal.asReadonly();

  readonly filteredUsers = computed(() => {
    const search = this.searchTermSignal().toLowerCase().trim();
    const role = this.selectedRoleSignal();
    const status = this.selectedStatusSignal();

    return this.usersSignal().filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search);

      const matchesRole = role === 'all' || user.role === role;

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && user.active) ||
        (status === 'inactive' && !user.active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  });

  readonly hasUsers = computed(() => this.filteredUsers().length > 0);

  loadUsers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.usersService.getUsers().subscribe({
      next: (response) => {
        const users = UserMapper.fromDtoList(response.users);

        this.usersSignal.set(users);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudieron cargar los usuarios.');
        this.loadingSignal.set(false);
      },
    });
  }

  setSearchTerm(term: string): void {
    this.searchTermSignal.set(term);
  }

  setRole(role: UserRoleFilter): void {
    this.selectedRoleSignal.set(role);
  }

  setStatus(status: UserStatusFilter): void {
    this.selectedStatusSignal.set(status);
  }
}
