import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '../../models/user.model';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-users-list',
  imports: [UserCard],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersList {
  @Input({ required: true })
  users: User[] = [];
}
