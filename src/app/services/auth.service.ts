import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
//import { SsrCookieService } from 'ngx-cookie-service-ssr';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/users'; // Your backend endpoint URL
  private tokenKey = 'auth_token'; // Key to store token in local storage

  constructor(
    private http: HttpClient,
    private router: Router // private cookieService: SsrCookieService
  ) {}

  // Login method
  // auth.service.ts
  login(username: string, password: string): Observable<string> {
    return this.http
      .post<{ token: string }>(
        `${this.baseUrl}/login`,
        { username, password },
        {
          withCredentials: true, // Ensure cookies are sent with each request
        }
      )

      .pipe(map((response) => response.token));
  }

  register(data: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  // Method to check if the user is authenticated
  /* isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }*/

  // Method to log out the user
  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}).subscribe(() => {
      // Redirect to login or home after logout
      this.router.navigate(['/sign-in']);
    });
  }

  fetchCsrfToken() {
    this.http
      .get(`${this.baseUrl}/csrf`, { withCredentials: true })
      .subscribe();
  }

  // Method to get the JWT token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
