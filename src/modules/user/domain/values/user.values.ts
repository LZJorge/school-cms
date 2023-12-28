import { User } from '../entities/user.entity';

export const userValues = {
    dni: {
        min: 7,
        max: 9
    },

    firstName: {
        min: 3,
        max: 64,
        regex: /^[A-Za-záéíóúñAÉÍÓÚ\s]+$/
    },

    lastName: {
        min: 3,
        max: 64,
        regex: /^[A-Za-záéíóúñAÉÍÓÚ\s]+$/
    },

    password: {
        min: 8,
        max: 64,
        regex: /^(?=.*\d)[a-zA-Z0-9\d@$!%*?&]{8,}$/
    },

    phone: {
        regex: new RegExp(/^(0412|0414|0416|0424)-\d{7}$/)
    }
};

export const userSearchParams: Array<keyof User> = [
    'id',
    'dni',
    'firstname', 
    'lastname', 
    'email', 
    'is_active', 
    'created_at'
];