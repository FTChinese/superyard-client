// Test if an attribute is a link.
function isLink(name: string): boolean {
  return ['href', 'src'].includes(name);
}

export class HTMLTag {
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
