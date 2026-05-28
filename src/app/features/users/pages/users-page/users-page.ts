import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UsersList } from '../../components/users-list/users-list';
import { UsersFacade } from '../../facades/users.facade';
import { UserRoleFilter, UserStatusFilter } from '../../store/users.store';
import { UsersSkeleton } from '../../components/users-skeleton/users-skeleton';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, UsersList, UsersSkeleton],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage implements OnInit {
  private readonly usersFacade = inject(UsersFacade);

  private searchTimeout?: ReturnType<typeof setTimeout>;

  readonly users = this.usersFacade.users;
  readonly filteredUsers = this.usersFacade.filteredUsers;

  readonly loading = this.usersFacade.loading;
  readonly error = this.usersFacade.error;
  readonly hasUsers = this.usersFacade.hasUsers;

  readonly searchTerm = this.usersFacade.searchTerm;
  readonly selectedRole = this.usersFacade.selectedRole;
  readonly selectedStatus = this.usersFacade.selectedStatus;

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.usersFacade.setSearchTerm(value);
    }, 300);
  }

  onRoleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as UserRoleFilter;

    this.usersFacade.setRole(value);
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as UserStatusFilter;

    this.usersFacade.setStatus(value);
  }
}
