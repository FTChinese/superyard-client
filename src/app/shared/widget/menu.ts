export interface MenuItem {
  id?: string; // Used to identify a menu item.
  name: string; // Human-readable text.
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface SelectedItem {
  sectionIndex: number;
  cellIndex: number;
}
