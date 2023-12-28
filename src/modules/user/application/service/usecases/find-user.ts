import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { FindUserResponse } from '@user/application/res/find-user.response';

export class FindOneUserUsecase implements useCaseBase<FindUserResponse, string> {
    constructor(private readonly repository: IUserRepository) {}

    async run(id: string): Promise<FindUserResponse> {
        const user = await this.repository.findOne(id);

        return {
            success: user != null,
            data: user
        };
    }
}