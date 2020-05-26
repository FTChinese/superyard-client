import { resolve } from 'path';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export async function parse() {
  const fileName = resolve(process.cwd(), 'dist/superyard-client/index.html')
  const dom = await JSDOM.fromFile(fileName);

  const document = dom.window.document;

  const links = document.querySelectorAll('link');

  links.forEach(link => {
    console.log(link.getAttribute('href'));
  });

  const scripts = document.querySelectorAll('script');

  scripts.forEach(script => {
    console.log(script.getAttribute('src'));
  });
}

parse().catch(err => console.log(err));
