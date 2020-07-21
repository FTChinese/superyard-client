import * as shell from 'shelljs';

import config from './bin/config';

shell.mkdir('-p', config.htmlCopyTarget);
shell.mkdir('-p', config.jsCssCopyTarget);

shell.cp('dist/superyard-client/*.js', config.jsCssCopyTarget);

if (config.production) {
  shell.cp('dist/superyard-client/*.css', config.jsCssCopyTarget);
} else {
  shell.cp('dist/superyard-client/*.map', config.jsCssCopyTarget);
}

shell.cp(config.goViewFile, config.htmlCopyTarget);
