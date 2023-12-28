import { User } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { HttpException } from '@shared/domain/exceptions/http.exception';
import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';

import { CreateUserUsecase } from './usecases/create-user';
import { FindOneUserUsecase } from './usecases/find-user';
import { FindUserByDniUsecase } from './usecases/find-user-by-personal_id';
import { FindAllUsersUsecase } from './usecases/find-all-user';
import { FindAllUsersByUsecase } from './usecases/find-all-users-by';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserUsecase } from './usecases/update-user';
import { UpdateUserStateUsecase } from './usecases/update-user-state';
import { UpdateUserContactUsecase } from './usecases/update-user-contact';
import { UpdateUserPasswordUsecase } from './usecases/update-user-password';

import { CreateUserDto } from '../dto/create-user.dto';
import { FindAllByDto } from '../dto/find-all-by.dto';
import { DeleteUserUsecase } from './usecases/delete-user';
import { UpdateUserStateDto } from '../dto/update-user-state.dto';
import { UpdateUserContactDto } from '../dto/update-user-contact.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';

export class UserService {
    constructor(private readonly repository: IUserRepository) {}

    /**
     * Insert method
     */
    async create(dto: CreateUserDto) {
        const user = (await this.findOneByDni(dto.dni)).data;
        if(user) {
            throw new HttpException<User>('User dni already exists', HttpStatus.BAD_REQUEST, 'dni');
        }

        return await new CreateUserUsecase(this.repository).run(dto);
    }

    /**
     * Find methods
     */
    async findOne(id: string) {
        return await new FindOneUserUsecase(this.repository).run(id);
    }

    async findOneByDni(dni: number) {
        return await new FindUserByDniUsecase(this.repository).run(dni);
    }

    async findAll() {
        return await new FindAllUsersUsecase(this.repository).run();
    }

    async findAllBy(dto: FindAllByDto) {
        return await new FindAllUsersByUsecase(this.repository).run(dto);
    }

    /**
     * Update methods
     */
    async findAndUpdateUserInfo(dto: UpdateUserDto, id: string) {
        const current = (await this.findOne(id)).data;
        if(!current) {
            throw new HttpException('User don\'t exist', HttpStatus.BAD_REQUEST);
        }

        return await new UpdateUserUsecase(this.repository).run(dto, current);
    }

    async findAndUpdateUserState(dto: UpdateUserStateDto, id: string) {
        const current = (await this.findOne(id)).data;
        if(!current) {
            throw new HttpException('User don\'t exist', HttpStatus.BAD_REQUEST);
        }

        return await new UpdateUserStateUsecase(this.repository).run(dto, current);
    }

    async findAndUpdateUserContact(dto: UpdateUserContactDto, id: string) {
        const current = (await this.findOne(id)).data;
        if(!current) {
            throw new HttpException('User don\'t exist', HttpStatus.BAD_REQUEST);
        }

        return await new UpdateUserContactUsecase(this.repository).run(dto, current);
    }

    async findAndUpdateUserPassword(dto: UpdateUserPasswordDto, id: string) {
        const current = (await this.findOne(id)).data;
        if(!current) {
            throw new HttpException('User don\'t exist', HttpStatus.BAD_REQUEST);
        }

        return await new UpdateUserPasswordUsecase(this.repository).run(dto, current);
    }

    /**
     * Delete Method
     */
    async delete(id: string) {
        return new DeleteUserUsecase(this.repository).run(id);
    }
}