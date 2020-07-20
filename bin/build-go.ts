import { resolve } from 'path';
import { promises } from 'fs';
import render from './lib/render';
import { Assets, parse } from './lib/parser';
import { HTMLTag } from './lib/html-tag';

const { writeFile } = promises;

interface CtxIndex {
  iconUrl: string;
  styles: string; // HTML link tags
  scripts: string; // HTML script tags.
}

interface Template {
  name: string;
  content: string;
}

interface CtxGo {
  data: Template[];
}

const pathPrefix = 'http://interactive.ftchinese.com/superyard/';
// The index.html generated by ng build.
const inputFile = resolve(process.cwd(), 'dist/superyard-client/index.html');
// The go file containing the built HTML file.
const outDir = resolve(process.cwd(), 'dist');

async function build(assets: Assets): Promise<void> {

  // Build HTML links elememt
  const styles = assets.styles.map(attrs => {
    return (new HTMLTag('link'))
      .withPathPrefix(pathPrefix)
      .withSelfClosing()
      .withAttributes(attrs)
      .render();
  })
  .join('');

  // Build HTML script element
  const scripts = assets.scripts.map(attrs => {
    return (new HTMLTag('script'))
      .withPathPrefix(pathPrefix)
      .withAttributes(attrs)
      .render();
  })
  .join('');


  const ctxIndex: CtxIndex = {
    iconUrl: 'http://interactive.ftchinese.com/favicons',
    styles,
    scripts,
  };

  const rendered = await render('index.html', ctxIndex);

  const ctxGo: CtxGo = {
    data: [
      {
        name: 'home',
        content: rendered,
      }
    ]
  };

  const goTmpl = await render('views.go.njk', ctxGo);

  await writeFile(`${outDir}/templates.go`, goTmpl, { encoding: 'utf8' });
}

parse(inputFile)
  .then(assets => {
    build(assets);
  })
  .catch(err => console.log(err));

