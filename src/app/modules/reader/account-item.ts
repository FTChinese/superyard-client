import { AccountKind } from 'src/app/data/schema/enums';


export interface AccountItem {
  id: string;
  name: string;
  kind: AccountKind;
}

export interface TableRow {
  head: string;
  data: string;
}
