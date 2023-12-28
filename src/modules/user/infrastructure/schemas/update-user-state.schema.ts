import { z } from 'zod';
import { BaseSchema } from '@shared/infrastructure/schemas/base.schema';
import { UpdateUserStateDto } from '@user/application/dto/update-user-state.dto';

export class UpdateUserStateSchema extends BaseSchema<UpdateUserStateDto> {
    constructor() {
        const schema: z.ZodSchema<UpdateUserStateDto> = z.object({
            is_active: z
                .boolean()
        });

        super(schema);
    }
}