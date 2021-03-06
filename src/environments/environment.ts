// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Preston Monte West Dev',
  auth0: {
    domain: 'prestonmontewest-dev.auth0.com',
    clientId: 'OH9Lt0jLeIB976nwpxs5Czh9Isyl10IC',
    audience: 'http://localhost:3000'
  },
  disqus: {
    shortname: 'prestonmontewest'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
