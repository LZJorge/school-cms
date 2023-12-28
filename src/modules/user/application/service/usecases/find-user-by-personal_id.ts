import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { FindUserResponse } from '@user/application/res/find-user.response';

export class FindUserByDniUsecase implements useCaseBase<FindUserResponse, number> {
    constructor(private readonly repository: IUserRepository) {}

    async run(dni: number): Promise<FindUserResponse> {
        const user = await this.repository.findByDni(dni);

        return {
            success: user != null,
            data: user
        };
    }
}