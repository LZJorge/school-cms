export interface UpdateUserPasswordDto {
    password: string;
    password_confirm: string;
    current_password: string;
}