import * as shell from 'shelljs';

const targetDir = '../server/dist/public/static';
shell.mkdir('-p', targetDir);
shell.cp('dist/client/*.js', targetDir);
shell.cp('dist/client/*.css', targetDir);
shell.cp('dist/*.html', '../server/views/assets');
