import { resolve } from 'path';

const projectName = 'superyard';

const isProd = process.env.NODE_ENV === 'production';

console.log('NODE_ENV: %s', process.env.NODE_ENV);

const staticPrefix = isProd
  ? `/static/${projectName}/`
  : '/static/';

const jsCssCopyTarget = isProd
  ? `../ft-interact/${projectName}`
  : `../${projectName}/build/public/static`;

const config = {
  production: isProd,
  staticPrefix,
  goViewFile: resolve(process.cwd(), 'dist/templates.go'),
  goTemplate: 'views.go.njk',
  htmlCopyTarget: `../${projectName}/web/views`,
  jsCssCopyTarget,
};

export default config;
