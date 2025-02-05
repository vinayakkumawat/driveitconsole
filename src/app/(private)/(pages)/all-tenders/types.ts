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