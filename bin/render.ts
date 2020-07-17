import path from 'path';
import nunjucks from 'nunjucks';

nunjucks.configure(
  [path.resolve(process.cwd(), 'bin')],
  {
    autoescape: false,
    noCache: true,
    watch: false,
  }
);

export default function promisifiedRender(name: string, context?: object): Promise<string> {
  return new Promise((resolve, reject) => {
    nunjucks.render(name, context, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      if (res == null) {
        reject('no rendered result');
        return;
      }

      resolve(res);
    });
  });
}
