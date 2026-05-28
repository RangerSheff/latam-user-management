import { describe, expect, it, vi, beforeEach } from 'vitest';

import { of } from 'rxjs';

import { UsersService, UsersResponseDto } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const httpMock = {
    get: vi.fn(),
  };

  const loggerMock = {
    log: vi.fn(),
  };

  const mockResponse: UsersResponseDto = {
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
    ],
    total: 1,
    skip: 0,
    limit: 30,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    httpMock.get.mockReturnValue(of(mockResponse));

    service = new UsersService(httpMock as never, loggerMock as never);
  });

  it('should request users endpoint', () => {
    service.getUsers().subscribe();

    expect(httpMock.get).toHaveBeenCalledWith('/users');
  });

  it('should return users response', () => {
    service.getUsers().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should log successful response', () => {
    service.getUsers().subscribe();

    expect(loggerMock.log).toHaveBeenCalledWith('Users fetched successfully', mockResponse);
  });
});
