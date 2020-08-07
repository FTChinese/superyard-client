export type AlertType = 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';

export class Alert {
  type: AlertType = 'success';
  message: string;
  dismissible = true;

  constructor(m: string) {
    this.message = m;
  }

  static info(m: string): Alert {
    return (new Alert(m))
      .setType('info');
  }

  static warning(m: string): Alert {
    return (new Alert(m))
      .setType('warning');
  }

  static danger(m: string): Alert {
    return (new Alert(m))
      .setType('danger');
  }

  static primary(m: string): Alert {
    return (new Alert(m))
      .setType('primary');
  }

  static secondary(m: string): Alert {
    return (new Alert(m))
      .setType('secondary');
  }

  static light(m: string): Alert {
    return (new Alert(m))
      .setType('light');
  }

  static dark(m: string): Alert {
    return (new Alert(m))
      .setType('dark');
  }

  setDismissible(d: boolean): Alert {
    this.dismissible = d;
    return this;
  }

  setType(t: AlertType): Alert {
    this.type = t;
    return this;
  }
}
