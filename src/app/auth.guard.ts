/*import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private platformLocation: PlatformLocation
  ) {
  
  }

  private getCookie(name: string): string | undefined {
    const cookies =
      (this.platformLocation as any).location?.cookie.split('; ') || [];
    console.log(cookies);
    const cookie = cookies.find((row: string) => row.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : undefined;
  }

  canActivate(): boolean {
    const jwtToken = this.getCookie('auth_token');
    if (jwtToken) {
      return true;
    } else {
      // Redirect to login if auth_token is not found
      console.log(jwtToken);
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
*/
/*
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {
    const jwtToken = this.cookieService.get('auth_token'); // Directly get the 'auth_token' cookie
    if (jwtToken) {
      return true;
    } else {
      // Redirect to login if 'auth_token' is not found
      console.log(jwtToken); // Log the token value (undefined if not found)
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}*/

/*import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export const authguard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const jwtToken = cookieService.get('auth_token');

  if (jwtToken) {
    return true; // Allow access if token is present
  } else {
    // Redirect to sign-in if token is missing
    router.navigate(['/sign-in']);
    return false;
  }
};
*/
