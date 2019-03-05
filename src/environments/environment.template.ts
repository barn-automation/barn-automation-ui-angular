// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Endpoint} from '../app/model/endpoint';

export const environment = {
  production: false,
  endpoints: [
    new Endpoint('Name (Displayed in UI)', 'http://<server>:<port>', 'http://<server>:<port>/barn/stream'),
  ],
  objectStorageBaseUrl: 'https://objectstorage.us-phoenix-1.oraclecloud.com/path/to/',
};
