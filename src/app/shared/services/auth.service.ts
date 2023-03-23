import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import jwtDecode from 'jwt-decode';
import { catchError, filter, map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isReady$ = this.auth0.isLoading$.pipe(
    filter((loading) => !loading),
    take(1)
  );

  constructor(public readonly auth0: Auth0Service) {}

  hasPermissions(permissions: string[]) {
    return this.isReady$.pipe(
      switchMap(() => this.auth0.getAccessTokenSilently()),
      map((token) => {
        const tokenPermissions = jwtDecode<{ permissions: string[] }>(
          token
        ).permissions;
        const permissionMap = new Map<string, boolean>();
        tokenPermissions.forEach((permission) =>
          permissionMap.set(permission, true)
        );
        if (permissions.every((permission) => permissionMap.has(permission))) {
          return true;
        }

        return false;
      }),
      catchError(() => of(false))
    );
  }
}
