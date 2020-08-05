type BtnType = 'button' | 'submit';
type BtnStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
type BtnSize = 'sm' | 'lg' | 'block';

// export interface Button {
//   disabled: boolean;
//   type: BtnType;
//   style: BtnStyle;
//   size: BtnSize;
//   outline: boolean;
//   name: string;
// }

/**
 * @description Build a button's appearance.
 * Using Bootstrap class: btn btn-primary/btn-outline-primary btn-block
 */
export class Button {

  inProgress = false;
  type: BtnType = 'submit';
  name: string;

  private style: BtnStyle = 'primary';
  private size: BtnSize = null;
  private outline = false;

  static primary(): Button {
    return new Button()
      .setStyle('primary');
  }

  static secondary(): Button {
    return new Button()
      .setStyle('secondary');
  }

  static menu(): Button {
    return new Button()
      .setStyle('light');
  }

  constructor() {}

  setName(s: string): Button {
    this.name = s;
    return this;
  }

  setType(t: BtnType): Button {
    this.type = t;
    return this;
  }

  setOutline(): Button {
    this.outline = true;
    return this;
  }

  setStyle(s: BtnStyle): Button {
    this.style = s;
    return this;
  }

  setSize(s: BtnSize): Button {
    this.size = s;
    return this;
  }

  setBlock(): Button {
    this.size = 'block';
    return this;
  }

  isBlock(): boolean {
    return this.size === 'block';
  }

  start() {
    this.inProgress = true;
  }

  stop() {
    this.inProgress = false;
  }

  get classNames(): string[] {
    const c = ['btn'];
    if (this.style) {
      c.push(`btn${this.outline ? '-outline' : '-'}${this.style}`);
    }

    if (this.size) {
      c.push(`btn-${this.size}`);
    }

    return c;
  }
}
