import { resolve } from 'path';

class CLIParser {
  readonly args: Map<string, string> = new Map();

  parse() {
    process.argv
      .slice(2)
      .forEach(arg => {
        const parts = arg.split('=');

        const key = parts[0];
        const value = parts[1] || 'true';

        this.args.set(key, value);
      });
  }

  get isProd(): boolean {
    return this.args.has('--prod');
  }

  display() {
    console.log('%o', this.args);
  }
}

const cli = new CLIParser();
cli.parse();

console.log(`Mode: ${cli.isProd ? 'production' : 'development'}`);

const serverProjectName = 'superyard';
const clientDistName = 'superyard';

const staticPrefix = `/static/${clientDistName}/`;

const jsCssCopyTarget = cli.isProd
  ? `../ft-interact/${clientDistName}`
  : `../${serverProjectName}/build/public/static/${clientDistName}`;

const config = {
  production: cli.isProd,
  staticPrefix,
  goOutFile: resolve(process.cwd(), 'dist/templates.go'),
  goTemplate: 'views.go.njk',
  htmlCopyTarget: `../${serverProjectName}/web/views`,
  jsCssCopyTarget,
};

export default config;
