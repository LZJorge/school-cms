import { Request, Response } from 'express';
import { HttpException } from '@shared/domain/exceptions/http.exception';

import { UserService } from '@user/application/service/user.service';
import { userSearchParams } from '@user/domain/values/user.values';
import { User } from '@user/domain/entities/user.entity';

import { CreateUserSchema } from '../schemas/create-user.schema';
import { UpdateUserInfoSchema } from '../schemas/update-user-info.schema';
import { UpdateUserContactSchema } from '../schemas/update-user-contact.schema';
import { UpdateUserStateSchema } from '../schemas/update-user-state.schema';
import { UpdateUserPasswordSchema } from '../schemas/update-user-password.schema';

export class Controller {
    constructor(private readonly service: UserService) {}

    /**
     * 
     */
    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
        
            await new CreateUserSchema().validate(data);

            res.status(200).send(await this.service.create(data));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    /**
     * 
     */
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).send(await this.service.findAll());
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    async findAllBy(req: Request, res: Response): Promise<void> {
        try {
            const { param, value } = req.params;

            if(!userSearchParams.includes(param as keyof User)) {
                throw new HttpException(`Param ${param} don't exist on user`, 401);
            }

            res.status(200).send(await this.service.findAllBy({ param: param as keyof User, value }));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    async findOne(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            res.status(200).send(await this.service.findOne(id));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    async findByPersonalId(req: Request, res: Response): Promise<void> {
        try {
            const dni = parseInt(req.params.dni);

            res.status(200).send(await this.service.findOneByDni(dni));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    /**
     * 
     */
    async updateUserInfo(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;

            await new UpdateUserInfoSchema().validate(data);

            res.status(200).send(await this.service.findAndUpdateUserInfo(data, id));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    async updateUserState(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;

            await new UpdateUserStateSchema().validate(data);

            res.status(200).send(await this.service.findAndUpdateUserState(data, id));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    async updateUserContact(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;

            await new UpdateUserContactSchema().validate(data);

            res.status(200).send(await this.service.findAndUpdateUserContact(data, id));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    async updateUserPassword(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const data = req.body;

            await new UpdateUserPasswordSchema().validate(data);

            res.status(200).send(await this.service.findAndUpdateUserPassword(data, id));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }

    /**
     * 
     */
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;

            res.status(200).send(await this.service.delete(id));
        } catch(err: unknown) {
            if(err instanceof HttpException) {
                res.status(err.statusCode).send({ ...err });
            }
        }
    }
}