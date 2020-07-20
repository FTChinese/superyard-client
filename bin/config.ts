import { resolve } from 'path';

const projectName = 'superyard';

const config = {
  staticPrefix: `http://interactive.ftchinese.com/${projectName}/`,
  goViewFile: resolve(process.cwd(), 'dist/templates.go'),
  goTemplate: 'views.go.njk',
  htmlCopyTarget: `../${projectName}/web/views`,
  jsCssCopyTarget: `../ft-interact/${projectName}`,
};

export default config;
