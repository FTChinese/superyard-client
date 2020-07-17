// This file is used to extract the attributes of link and script tag
// from the index.html generated by ng build.
// The attributes are rebuilt to two separate files containg the HTML
// link and script tags, with appropriate modifications made such as
// chaning the default resource url.
// These files are then copies to server's views directory so that they
// could be included in server-side template engine.

import { JSDOM } from 'jsdom';
import { resolve } from 'path';
import { promises } from 'fs';

const writeFile = promises.writeFile;

const pathPrefix = '/static/';
// The index.html generated by ng build.
const inputFile = resolve(process.cwd(), 'dist/superyard-client/index.html');
const outDir = resolve(process.cwd(), 'dist');

interface Assets {
  styles: Array<Map<string, string>>;
  scripts: Array<Map<string, string>>;
}

/**
 * @description Collect all the attributes of an Element into a map.
 */
function listAttributes(elem: Element): Map<string, string> {
  const result: Map<string, string> = new Map();

  if (elem.hasAttributes()) {
    const attrs = elem.attributes;

    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i];
      result.set(attr.name, attr.value);
    }
  }

  return result;
}

/**
 * @description Extract all attributes of all link and script tags.
 */
async function parse(fileName: string): Promise<Assets> {
  const assets: Assets = {
    styles: [],
    scripts: []
  };

  const dom = await JSDOM.fromFile(fileName);

  const document = dom.window.document;

  document.querySelectorAll('link')
    .forEach(link => {
      // Ignore link tags with href starting with external link and favicon.
      const href = link.getAttribute('href');
      if (href.startsWith('https') || href.startsWith('favicon')) {
        return;
      }

      assets.styles.push(listAttributes(link));
    });

  document.querySelectorAll('script')
    .forEach(script => {
      assets.scripts.push(listAttributes(script));
    });

  return assets;
}

// Test if an attribute is a link.
function isLink(name: string): boolean {
  return ['href', 'src'].includes(name);
}

class HTMLTag {
  private selfClosing = false;
  private attrs: Map<string, string>;
  private pathPrefix: string;

  constructor(readonly name: string) {}

  withSelfClosing(): HTMLTag {
    this.selfClosing = true;
    return this;
  }

  withPathPrefix(prefix: string): HTMLTag {
    this.pathPrefix = prefix;
    return this;
  }

  withAttributes(attrs: Map<string, string>): HTMLTag {
    this.attrs = attrs;
    return this;
  }

  private buildAttributes(): string {
    return Array.from(this.attrs.entries())
      .map(([name, value]) => {
        // Turn each key-value pair to `key="value"`
        // or key if value if empty.
        if (isLink(name) && this.pathPrefix) {
          value = this.pathPrefix + value;
        }

        return value ? `${name}="${value}"` : name;
      })
      .join(' ');
  }

  render(): string {
    let str = `<${this.name}`;
    if (this.attrs.size > 0) {
      str += ' ';
      str += this.buildAttributes();
    }
    if (this.selfClosing) {
      str += '/>';
      return str;
    }

    str += `></${this.name}>`;

    return str;
  }
}

async function render(assets: Assets): Promise<void> {

  const links = assets.styles.map(attrs => {
    return (new HTMLTag('link'))
      .withPathPrefix(pathPrefix)
      .withSelfClosing()
      .withAttributes(attrs)
      .render();
  })
  .join('');

  const scripts = assets.scripts.map(attrs => {
    return (new HTMLTag('script'))
      .withPathPrefix(pathPrefix)
      .withAttributes(attrs)
      .render();
  })
  .join('');

  // Write result file to dist directory.
  await Promise.all([
    writeFile(`${outDir}/styles.html`, links, { encoding: 'utf8' }),
    writeFile(`${outDir}/scripts.html`, scripts, { encoding: 'utf8' })
  ]);
}

parse(inputFile)
  .then(assets => {
    render(assets);
  })
  .catch(err => console.log(err));
