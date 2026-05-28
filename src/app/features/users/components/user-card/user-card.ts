import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCard {
  @Input({ required: true })
  user!: User;
}
