export interface DropdownItem {
    title: string;
    link: string;
  }
  
  export interface NavItem {
    id: number;
    title: string;
    link: string;
    icon: string;
    isDropdown: boolean;
    dropdownItems?: DropdownItem[];
  }