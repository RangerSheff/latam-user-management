import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { LoggerService } from '../../../core/logger/logger.service';

import { UserDto } from '../models/user.dto';

export interface UsersResponseDto {
  users: UserDto[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService,
  ) {}

  getUsers(): Observable<UsersResponseDto> {
    return this.http.get<UsersResponseDto>('/users').pipe(
      tap((response) => {
        this.logger.log('Users fetched successfully', response);
      }),
    );
  }
}
