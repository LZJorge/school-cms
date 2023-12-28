import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { FindAllUserResponse } from '@user/application/res/find-all-user.response';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';

export class FindAllUsersByUsecase implements useCaseBase<FindAllUserResponse, FindAllByDto> {
    constructor(private readonly repository: IUserRepository) {}

    async run(dto: FindAllByDto): Promise<FindAllUserResponse> {
        const users = await this.repository.findAllBy(dto.param, dto.value);

        return {
            success: users != null,
            data: users
        };
    }
}