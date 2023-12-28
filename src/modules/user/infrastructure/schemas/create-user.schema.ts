import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schemas/base.schema';
import { CreateUserDto } from '@user/application/dto/create-user.dto';
import { userValues } from '@user/domain/values/user.values';

export class CreateUserSchema extends BaseSchema<CreateUserDto> {
    constructor() {
        const schema: z.ZodSchema<CreateUserDto> = z.object({
            dni: z
                .number()
                .min(userValues.dni.min)
                .max(userValues.dni.max),

            firstname: z
                .string()
                .trim()
                .min(userValues.firstName.min)
                .max(userValues.firstName.max)
                .regex(userValues.firstName.regex, {
                    message: 'Invalid characters in firstname'
                }),

            lastname: z
                .string()
                .trim()
                .min(userValues.lastName.min)
                .max(userValues.lastName.max)
                .regex(userValues.lastName.regex, 'Invalid characters in lastname'),

            birthday: z
                .date(),

            password: z
                .string()
                .trim()
                .min(userValues.password.min)
                .max(userValues.password.max)
                .regex(userValues.password.regex, 'Invalid characters in password'),
            
            password_confirm: z.
                string()
                .trim()
                .min(userValues.password.min)
                .max(userValues.password.max)
                .regex(userValues.password.regex, 'Invalid characters in password'),
            
            email: z
                .string()
                .trim()
                .email(),

            phone: z
                .string()
                .trim()
                .regex(userValues.phone.regex),
        
        }).superRefine(({ password, password_confirm }, ctx) => {
            if(password !== password_confirm) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['password_confirm'],
                    message: 'Passwords don\'t match.'
                });
            }
        });

        super(schema);
    }
}