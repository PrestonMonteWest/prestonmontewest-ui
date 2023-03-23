// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const createPostScope = 'create:post';

export const environment = {
  production: false,
  title: 'Preston Monte West Dev',
  auth0: {
    domain: 'prestonmontewest-blog-dev.us.auth0.com',
    clientId: 'V33UhhDJpDAbYnY8fZsLBNktt3gZOHHk',
    audience: 'http://localhost:3000',
    createPostScope,
    scope: `openid profile email ${createPostScope}`,
  },
  disqus: {
    shortname: 'prestonmontewest-dev',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
