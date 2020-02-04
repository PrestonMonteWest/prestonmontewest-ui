import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, Observable, of, combineLatest } from 'rxjs';
import { tap, concatMap, shareReplay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: environment.auth0.domain,
      client_id: environment.auth0.clientId,
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1) // Every subscription receives the same shared value
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$: Observable<boolean> = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap((isAuthenticated) => this.loggedIn = isAuthenticated)
  );
  handleRedirectCallback$: Observable<RedirectLoginResult> = this.auth0Client$
    .pipe(
      concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
    );
  loggedIn: boolean = false;
  userProfile: any = undefined;

  constructor(private router: Router) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.getUser$().subscribe();
      }
    });
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  private handleAuthCallback(): void {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string = '/'; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap((cbRes: RedirectLoginResult) => {
          // Get and set target redirect route from callback result
          if (cbRes.appState && cbRes.appState.target) {
            targetRoute = cbRes.appState.target;
          }
        }),
        concatMap(() => {
          return combineLatest([ this.isAuthenticated$, this.getUser$() ]);
        })
      );
      // Subscribe to authentication completion observable
      authComplete$.subscribe(() => {
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]);
      });
    }
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?: GetUserOptions): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap((user) => this.userProfile = user)
    );
  }

  get isAdmin(): boolean {
    const adminEmail: string = 'prestonmontewest@gmail.com';
    return this.userProfile && this.userProfile.email === adminEmail;
  }

  login(redirectPath: string = '/'): void {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath }
      });
    });
  }

  logout(returnToPath: string = '/'): void {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: environment.auth0.clientId,
        returnTo: `${window.location.origin}${returnToPath}`
      });
    });
  }
}
