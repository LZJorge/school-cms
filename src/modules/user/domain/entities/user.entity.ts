export interface User {
    id: string;
    dni: number;
    firstname: string;
    lastname: string;
    birthday: Date;
    is_active: boolean;

    password: string;

    email: string;
    phone: string;

    created_at: Date;
    updated_at: Date;
}  