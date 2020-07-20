import * as shell from 'shelljs';

const htmlDir = '../superyard/web/views';
const targetDir = '../ft-interact/superyard';

shell.mkdir('-p', htmlDir);
shell.mkdir('-p', targetDir);

shell.cp('dist/superyard-client/*.js', targetDir);
shell.cp('dist/superyard-client/*.css', targetDir);
shell.cp('dist/templates.go', htmlDir);
