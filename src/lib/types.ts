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