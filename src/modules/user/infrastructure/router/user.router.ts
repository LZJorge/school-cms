import { Router } from 'express';
import { PrismaUserRepository } from '../repositories/user.repository';
import { UserService } from '@user/application/service/user.service';
import { Controller } from '../controller/user.controller';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
const repository = new PrismaUserRepository(client);
const service = new UserService(repository);

export class UserRouter {
    private router: Router;
    private controller: Controller;

    constructor() {
        this.router = Router();
        this.controller = new Controller(service);

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/find', this.controller.findAll);
        this.router.get('/find/:id', this.controller.findOne);
        this.router.get('/find/:param/:value', this.controller.findAllBy);
        this.router.get('/find/personal_id', this.controller.findByPersonalId);

        /**
         * @swagger
         * /create:
         *      post:
         *          summary: Creates User
         *          tags:
         *              - Users
         *          description: Register a new user in the application
         *          requestBody:
         *              required: true
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              responseText:
         *                                  type: object
         *                                  properties:
         *                                      sucess: 
         *                                          type: boolean
         *                                      data: 
         *                                          
         *                                      message: 
         *                                          type: string
         *          responses:
         *              201:
         *                  description: Success
         *                  content:
         *                      application/json:
         *                          schema:
         *                              type: object
         *                              properties:
         *                                  text:
         *                                      type: string
         *                                      example: This is some example string!
         *              404:
         *                  description: Not found
         *              500:
         *                  description: Internal server error
         */
        this.router.post('/create', this.controller.create);

        this.router.patch('/update/:id/info', this.controller.updateUserInfo);
        this.router.patch('/update/:id/state', this.controller.updateUserState);
        this.router.patch('/update/:id/password', this.controller.updateUserPassword);
        this.router.patch('/update/:id/contact', this.controller.updateUserContact);

        this.router.delete('/delete/:id', this.controller.delete);
    }

    public get Router(): Router {
        return this.router;
    }
}