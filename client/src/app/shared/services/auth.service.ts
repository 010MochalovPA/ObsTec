import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  private username = '';
  constructor(private http: HttpClient) {}
  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        this.setUsername(user.username);
        this.setToken(token);
      })
    );
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }

  setUsername(username: string) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    if (localStorage.getItem('username')) {
      return localStorage.getItem('username');
    } else {
      return this.username;
    }
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setUsername('');
    this.setToken('');
    localStorage.clear();
  }

  reset() {}
}
