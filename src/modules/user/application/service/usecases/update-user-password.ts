import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { UpdateUserResponse } from '@user/application/res/update-user.response';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { UpdateUserPasswordDto } from '@user/application/dto/update-user-password.dto';
import { Password } from '@shared/infrastructure/helpers/password.helper';
import { User } from '@user/domain/entities/user.entity';

export class UpdateUserPasswordUsecase implements useCaseBase<UpdateUserResponse, UpdateUserPasswordDto> {
    constructor(private readonly repository: IUserRepository) {}

    async run(dto: UpdateUserPasswordDto, current: User): Promise<UpdateUserResponse> {
        const user: User = { ...current, password: await Password.hash(dto.password), updated_at: new Date() };

        const data = await this.repository.updatePassword(user);

        return {
            success: data != null,
            data
        };
    }
}