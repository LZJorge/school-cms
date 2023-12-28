import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { DeleteUserResponse } from '@user/application/res/delete-user.response';

export class DeleteUserUsecase implements useCaseBase<DeleteUserResponse, string> {
    constructor(private readonly repository: IUserRepository) {}

    async run(id: string): Promise<DeleteUserResponse> {
        const result = await this.repository.delete(id);

        return {
            success: result?.success === true,
            affected: result?.success === true ? 1 : 0
        };
    }
}