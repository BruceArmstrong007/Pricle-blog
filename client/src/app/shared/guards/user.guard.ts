import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientRoutes } from '../utils/client.routes';

export const userGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    return true;
  }
  router.navigateByUrl(ClientRoutes.Auth.Root);
  return false;
};
