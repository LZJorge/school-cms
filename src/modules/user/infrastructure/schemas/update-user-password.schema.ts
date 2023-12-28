import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schemas/base.schema';
import { UpdateUserPasswordDto } from '@user/application/dto/update-user-password.dto';
import { userValues } from '@user/domain/values/user.values';

export class UpdateUserPasswordSchema extends BaseSchema<UpdateUserPasswordDto> {
    constructor() {
        const schema: z.ZodSchema<UpdateUserPasswordDto> = z.object({
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
            
            current_password: z.
                string()
                .trim()
                .min(userValues.password.min)
                .max(userValues.password.max)
                .regex(userValues.password.regex, 'Invalid characters in password'),
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