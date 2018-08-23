// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC4cu4CiPvXz7hXl0kDmx5O8OBd1bg_WhE',
    authDomain: 'tenantcloud-6c80e.firebaseapp.com',
    databaseURL: 'https://tenantcloud-6c80e.firebaseio.com',
    projectId: 'tenantcloud-6c80e',
    storageBucket: 'tenantcloud-6c80e.appspot.com',
    messagingSenderId: '129270668288'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
