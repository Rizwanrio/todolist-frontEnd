import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {
    // Retrieve the 'auth_token' cookie using CookieService's get() method
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    /* const jwtToken = this.cookieService.get('auth_token');
    console.log(`this ia the auth_toke:${jwtToken}`);
    console.log(`this is all cookies: ${this.cookieService.getAll()}`);
    console.log(JSON.stringify(this.cookieService.getAll()));*/
    // Check if the JWT token exists in cookies
    if (isLoggedIn) {
      return true; // Allow access if token exists
    } else {
      console.log('not found');
      // Redirect to the login page if the token is not found
      this.router.navigate(['/register']);
      return false;
    }
  }
}
