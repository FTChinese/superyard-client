import * as shell from 'shelljs';

import config from './bin/config';

shell.mkdir('-p', config.htmlCopyTarget);
shell.mkdir('-p', config.jsCssCopyTarget);

console.log('Copying JS file to %s', config.jsCssCopyTarget);
shell.cp('dist/superyard-client/*.js', config.jsCssCopyTarget);

if (config.production) {
  console.log('Copying CSS file to %s', config.jsCssCopyTarget)
  shell.cp('dist/superyard-client/*.css', config.jsCssCopyTarget);
} else {
  shell.cp('dist/superyard-client/*.map', config.jsCssCopyTarget);
}

console.log('Copying HTML template to %s', config.htmlCopyTarget);
shell.cp(config.goOutFile, config.htmlCopyTarget);
