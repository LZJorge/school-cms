import { HttpStatus } from './http.statusCodes';

export class HttpException<Entity = never> extends Error {
    sucess: boolean = false;
    statusCode: HttpStatus;
    field?: Entity | keyof Entity

    constructor(message: string, statusCode: HttpStatus, field?: Entity | keyof Entity) {
        super(message);
        this.statusCode = statusCode;
        this.field = field;
    }
}