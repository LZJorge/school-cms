export interface CreateUserDto {
    dni: number;
    firstname: string;
    lastname: string;
    birthday: Date;

    email: string;
    phone: string;

    password: string;
    password_confirm: string;
}