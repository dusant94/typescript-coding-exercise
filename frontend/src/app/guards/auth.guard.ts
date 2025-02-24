import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Define the AuthGuard as a functional route guard
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // Allow access to the route
  } else {
    router.navigate(['/login']);  // Redirect to the login page
    return false;  // Prevent access to the route
  }
};
