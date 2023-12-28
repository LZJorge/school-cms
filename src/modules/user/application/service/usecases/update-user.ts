import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { UpdateUserDto } from '@user/application/dto/update-user.dto';
import { UpdateUserResponse } from '@user/application/res/update-user.response';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { User } from '@user/domain/entities/user.entity';

export class UpdateUserUsecase implements useCaseBase<UpdateUserResponse, UpdateUserDto> {
    constructor(private readonly repository: IUserRepository) {}

    async run(dto: UpdateUserDto, current: User): Promise<UpdateUserResponse> {
        const user: User = { ...current, ...dto, updated_at: new Date() };

        const result = await this.repository.update(user);

        return {
            success: result != null,
            data: result
        };
    }
}