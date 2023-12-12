import { inject } from '@angular/core';
import { ClientRoutes } from './../utils/client.routes';
import { CanActivateFn, Router } from '@angular/router';

export const landingPageGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    router.navigateByUrl(ClientRoutes.User.Root);
    return false;
  }
  return true;
};
