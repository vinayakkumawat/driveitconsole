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