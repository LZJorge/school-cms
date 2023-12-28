import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export abstract class BaseSchema<T> {
    protected _schema: z.ZodSchema<T>;

    constructor(schema: z.ZodSchema<T>) {
        this._schema = schema;
    }

    public async validate(data: unknown): Promise<T> {
        return await this._schema.parseAsync(data);
    }

    public get schema() {
        return zodToJsonSchema(this._schema);
    }
}