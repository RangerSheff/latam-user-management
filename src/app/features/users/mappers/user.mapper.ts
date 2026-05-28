import { UserDto } from '../models/user.dto';
import { User, UserRole } from '../models/user.model';

const VALID_ROLES: UserRole[] = ['admin', 'user', 'guest'];

function resolveRole(role: string | undefined, id: number): UserRole {
  if (role && VALID_ROLES.includes(role as UserRole)) {
    return role as UserRole;
  }

  const roles: UserRole[] = ['admin', 'user', 'guest'];

  return roles[id % roles.length];
}

export class UserMapper {
  static fromDto(dto: UserDto): User {
    const now = new Date().toISOString();

    return {
      id: dto.id,
      username: dto.username.trim(),
      email: dto.email.trim().toLowerCase(),
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      role: resolveRole(dto.role, dto.id),
      createdAt: now,
      updatedAt: now,
      active: dto.id % 5 !== 0,
      image: dto.image,
    };
  }

  static fromDtoList(dtos: UserDto[]): User[] {
    return dtos.map(UserMapper.fromDto);
  }
}
