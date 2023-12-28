import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { UpdateUserResponse } from '@user/application/res/update-user.response';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { User } from '@user/domain/entities/user.entity';
import { UpdateUserStateDto } from '@user/application/dto/update-user-state.dto';

export class UpdateUserStateUsecase implements useCaseBase<UpdateUserResponse, UpdateUserStateDto> {
    constructor(private readonly repository: IUserRepository) {}

    async run(dto: UpdateUserStateDto, current: User): Promise<UpdateUserResponse> {
        const user: User = { ...current, ...dto, updated_at: new Date() };

        const data = await this.repository.updateState(user);

        return {
            success: data != null,
            data
        };
    }
}