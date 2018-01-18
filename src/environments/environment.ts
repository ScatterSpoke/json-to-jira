// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import shared from './shared';

export const environment = {
  ...shared,
  production: false,
  trelloApiKey: '82c68aad94509ad24c1a7be8e5fed97c5edae61a328394b3d7a052a13241ec94'
};
