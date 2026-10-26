import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { environment }
from '../../../environments/environment';

import { LoginRequest }
from '../../models/login-request';

import { LoginResponse }
from '../../models/login-response';

import { RefreshRequest }
from '../../models/refresh-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      request
    );
  }

  register(data: any) {

    return this.http.post(
      `${environment.apiUrl}/auth/register`,
      data
    );
  }

  saveToken(
    token: string
  ): void {

    localStorage.setItem(
      'access_token',
      token
    );
  }

  getToken():
  string | null {

    return localStorage.getItem(
      'access_token'
    );
  }

  logout(): void {

    localStorage.removeItem(
        'access_token'
      );

      localStorage.removeItem(
        'refresh_token'
      );
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
  }

  getRole(): string {

    const token =
      this.getToken();

    if (!token) {

      return '';
    }

    try {

      const decoded: any =
        jwtDecode(token);

      return (
        decoded.role ||
        decoded[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] ||
        ''
      );
    }
    catch {

      return '';
    }
  }

  isAdmin(): boolean {

    return this.getRole()
      === 'Admin';
  }

  isUser(): boolean {

    return this.getRole()
      === 'User';
  }

  saveRefreshToken(
    refreshToken: string
    ): void {

      localStorage.setItem(
        'refresh_token',
        refreshToken
      );
  }

  getRefreshToken():
    string | null {

      return localStorage.getItem(
        'refresh_token'
      );
    }

  refreshToken() {

  const request: RefreshRequest = {

    refreshToken:
      this.getRefreshToken() || ''
      };

      return this.http.post<any>(
        `${environment.apiUrl}/auth/refresh`,
        request
      );
  }


}