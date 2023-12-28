import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schemas/base.schema';
import { UpdateUserDto } from '@user/application/dto/update-user.dto';
import { userValues } from '@user/domain/values/user.values';

export class UpdateUserInfoSchema extends BaseSchema<UpdateUserDto> {
    constructor() {
        const schema: z.ZodSchema<UpdateUserDto> = z.object({
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

        });

        super(schema);
    }
}