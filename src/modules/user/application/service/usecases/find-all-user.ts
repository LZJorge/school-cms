import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { FindAllUserResponse } from '@user/application/res/find-all-user.response';

export class FindAllUsersUsecase implements useCaseBase<FindAllUserResponse> {
    constructor(private readonly repository: IUserRepository) {}

    async run(): Promise<FindAllUserResponse> {
        const users = await this.repository.findAll();

        return {
            success: users != null,
            data: users
        };
    }
}