import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/v1/auth`;

  login(data: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, data, { withCredentials: true });
  }

  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, data, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`, { withCredentials: true });
  }
}
