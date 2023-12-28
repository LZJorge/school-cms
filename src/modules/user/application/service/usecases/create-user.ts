import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { User } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { CreateUserDto } from '@user/application/dto/create-user.dto';
import { CreateUserResponse } from '@user/application/res/create-user.response';

import { Id } from '@shared/infrastructure/helpers/id.helper';
import { Password } from '@shared/infrastructure/helpers/password.helper';

export class CreateUserUsecase implements useCaseBase<CreateUserResponse, CreateUserDto> {
    constructor(private readonly repository: IUserRepository) {}

    async run(dto: CreateUserDto): Promise<CreateUserResponse> {
        const user: User = {
            id: Id.generate(),
            dni: dto.dni,
            firstname: dto.firstname,
            lastname: dto.lastname,
            password: await Password.hash(dto.password),
            birthday: dto.birthday,
            is_active: true,
            email: dto.email,
            phone: dto.phone,
            created_at: new Date(),
            updated_at: new Date()
        };

        const data = await this.repository.create(user);

        const success = data != null ? true : false;

        return {
            success,
            data
        };
    }
}