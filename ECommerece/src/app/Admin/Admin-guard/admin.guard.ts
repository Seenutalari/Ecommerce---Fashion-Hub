import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
 
  if (localStorage.getItem('admintoken') !== null) {
    return true;
  } else {
    router.navigate(['admin/login']);
    return false;
  }
};
