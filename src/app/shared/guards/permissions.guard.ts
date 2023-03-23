import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export interface PermissionsGuardConfig {
  redirect?: boolean;
}

export const permissionsGuard = (
  config?: PermissionsGuardConfig
): CanActivateFn => {
  return (route) => {
    const auth = inject(AuthService);

    return auth
      .hasPermissions(route.data['permissions'])
      .pipe(
        tap(
          (hasPermissions) =>
            !hasPermissions &&
            config?.redirect &&
            auth.auth0.loginWithRedirect()
        )
      );
  };
};
