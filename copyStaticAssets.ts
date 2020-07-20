import * as shell from 'shelljs';

const htmlDir = '../superyard/web/views';
const targetDir = '../ft-interact/superyard';

shell.mkdir('-p', htmlDir);
shell.mkdir('-p', targetDir);

shell.cp('dist/client/*.js', targetDir);
shell.cp('dist/client/*.css', targetDir);
shell.cp('dist/home.html', htmlDir);
