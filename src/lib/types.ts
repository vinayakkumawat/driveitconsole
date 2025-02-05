export interface User {
    id: string;
    company_id: string;
    alphaid: string;
    username: string;
    email: string;
    phone: string;
    additional_phone?: string;
    comments?: string;
    created_date: string;
    updated_date: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface TenderData {
    id: string | number;
    tenderName: string;
    serviceType: string;
    publicationTime: string;
    publicationDate: string;
    status: 'תפוס' | 'פנוי';
    driverName: string;
}

export interface ApiTenderData {
    id: number;
    company_id: number;
    driver_id: number | null;
    tender: string | null;
    service_type: string;
    publish_time: string;
    status: string;
    selected_driver: string;
}

export interface Column<T> {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: string;
}

export interface Action<T> {
    icon: string;
    alt: string;
    onClick: (row: T) => void;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    showCheckbox?: boolean;
    title?: string;
    subtitle?: string;
    showSearch?: boolean;
    showFilter?: boolean;
    onSearch?: (query: string) => void;
    onFilter?: () => void;
  }