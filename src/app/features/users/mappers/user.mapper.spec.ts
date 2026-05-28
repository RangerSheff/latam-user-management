import { describe, expect, it } from 'vitest';

import { UserMapper } from './user.mapper';
import { UserDto } from '../models/user.dto';

describe('UserMapper', () => {
  it('should map dto to domain user and normalize text fields', () => {
    const dto: UserDto = {
      id: 1,
      username: ' emilys ',
      email: ' EMILY@MAIL.COM ',
      firstName: ' Emily ',
      lastName: ' Johnson ',
      role: 'admin',
      image: 'avatar.png',
    };

    const user = UserMapper.fromDto(dto);

    expect(user).toEqual(
      expect.objectContaining({
        id: 1,
        username: 'emilys',
        email: 'emily@mail.com',
        firstName: 'Emily',
        lastName: 'Johnson',
        role: 'admin',
        active: true,
        image: 'avatar.png',
      }),
    );
  });

  it('should fallback to a valid role when dto role is invalid', () => {
    const dto: UserDto = {
      id: 2,
      username: 'michaelw',
      email: 'michael@mail.com',
      firstName: 'Michael',
      lastName: 'Williams',
      role: 'invalid-role',
      image: 'avatar.png',
    };

    const user = UserMapper.fromDto(dto);

    expect(['admin', 'user', 'guest']).toContain(user.role);
  });

  it('should mark every fifth user as inactive', () => {
    const dto: UserDto = {
      id: 5,
      username: 'emmaj',
      email: 'emma@mail.com',
      firstName: 'Emma',
      lastName: 'Miller',
      role: 'user',
      image: 'avatar.png',
    };

    const user = UserMapper.fromDto(dto);

    expect(user.active).toBe(false);
  });

  it('should map dto list to domain user list', () => {
    const dtos: UserDto[] = [
      {
        id: 1,
        username: 'emilys',
        email: 'emily@mail.com',
        firstName: 'Emily',
        lastName: 'Johnson',
        role: 'admin',
        image: 'avatar.png',
      },
    ];

    const users = UserMapper.fromDtoList(dtos);

    expect(users).toHaveLength(1);
    expect(users[0].username).toBe('emilys');
  });
});
