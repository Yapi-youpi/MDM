// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // url: 'https://lk3.variag.ru/central_mdm',
  parseInit: {
    appId: 'MDMSERVER12324990543BSFD93234',
    jsKey: 'U52RUG55222VAJ5478JDE32T3TE223B77YA',
    serverURL: 'http://45.147.176.126:1337/parse',
    lqServerURL: 'ws://45.147.176.126:8189',
  },
  parseClasses: {
    devices: 'K_Device',
  },
  // url: 'http://62.113.111.186:2525',
  // url: 'http://172.24.18.25:2525',
  url: 'http://45.147.176.126:2525',
  serverURL: 'http://45.147.176.126:1337/parse',
  liveQueryServerURL: 'ws://45.147.176.126:8189/live'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
