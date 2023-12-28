import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schemas/base.schema';
import { UpdateUserContactDto } from '@user/application/dto/update-user-contact.dto';
import { userValues } from '@user/domain/values/user.values';

export class UpdateUserContactSchema extends BaseSchema<UpdateUserContactDto> {
    constructor() {
        const schema: z.ZodSchema<UpdateUserContactDto> = z.object({
            email: z
                .string()
                .trim()
                .email(),

            phone: z
                .string()
                .trim()
                .regex(userValues.phone.regex),
        });

        super(schema);
    }
}