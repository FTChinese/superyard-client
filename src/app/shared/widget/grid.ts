type ColumnPrefix = 'col' | 'col-' | 'col-sm-' | 'col-md-' | 'col-lg-';

export interface ColumnOptions {
  prefix: ColumnPrefix;
  cols?: number;
}

export function buildColClassName(opts: ColumnOptions): string {
  return opts.cols ? `${opts.prefix}${opts.cols}` : opts.prefix;
}
