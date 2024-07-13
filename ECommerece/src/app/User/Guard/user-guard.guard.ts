import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
 
  if (localStorage.getItem('token') !== null) {
    return true;
  } else {
    router.navigate(['user/login']);
    return false;
  }
};
