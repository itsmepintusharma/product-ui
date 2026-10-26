import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../../../environments/environment';

import { LoginRequest }
from '../../models/login-request';

import { LoginResponse }
from '../../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

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

  setToken(token: string): void {

    localStorage.setItem(
      'access_token',
      token
    );
  }

  getToken(): string | null {

    return localStorage.getItem(
      'access_token'
    );
  }

  logout(): void {

    localStorage.clear();
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
  }
}