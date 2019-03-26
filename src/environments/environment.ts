// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    apiEndpoint: 'https://api.hecta.vn',
  serverImage: 'https://static.hecta.vn/',
  staticImageSize: 'https://static.hecta.vn/images/using/',
  staticImageDemo: 'https://static.hecta.vn/images/temps/demo/',
  googleMapToken: 'AIzaSyDXhBHQ1rH3LFcCws4A0p7WQAr3p2by9qw', // from Project Hecta
  googleCaptchaToken: '6LcbcFcUAAAAAHNteL6XXbeOuEHIB-1E0Va6Isqv',
  apiStatic: 'https://static.hecta.vn'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
