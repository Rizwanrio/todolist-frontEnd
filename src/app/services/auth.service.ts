import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
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
  private baseUrl = environment.apiUrl + '/api/users'; // Your backend endpoint URL
  private tokenKey = 'auth_token'; // Key to store token in local storage

  constructor(
    private http: HttpClient,
    private router: Router, // private cookieService: SsrCookieService
    private cookieService: CookieService
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

      .pipe(
        map((response) => response.token),
        catchError((error) => {
          // Extract and throw the error message from the response
          const errorMessage =
            error.error?.error || 'An error occurred during login';
          return throwError(() => new Error(errorMessage));
        })
      );
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
    return this.http
      .post(`${this.baseUrl}/logout`, { withCredentials: true })
      .subscribe({
        next: () => {
          // Redirect to login or home after logout
          // this.cookieService.delete('auth_token');
          this.cookieService.deleteAll('auth_token');
          this.router.navigate(['/register']);
        },
        error: () => {
          console.log('logout failed');
        },
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
