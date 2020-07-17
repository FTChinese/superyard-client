import * as shell from 'shelljs';

const htmlDir = '../superyard/web/views';
shell.mkdir('-p', htmlDir);
// shell.cp('dist/client/*.js', targetDir);
// shell.cp('dist/client/*.css', targetDir);
shell.cp('dist/home.html', htmlDir);
