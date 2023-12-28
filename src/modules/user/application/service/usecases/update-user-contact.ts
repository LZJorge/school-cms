import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { UpdateUserResponse } from '@user/application/res/update-user.response';
import { IUserRepository } from '@user/domain/repositories/user.repository';
import { UpdateUserContactDto } from '@user/application/dto/update-user-contact.dto';
import { User } from '@user/domain/entities/user.entity';

export class UpdateUserContactUsecase implements useCaseBase<UpdateUserResponse, UpdateUserContactDto> {
    constructor(private readonly repository: IUserRepository) {}

    async run(dto: UpdateUserContactDto, current: User): Promise<UpdateUserResponse> {
        const user: User = { ...current, ...dto, updated_at: new Date() };

        const data = await this.repository.updateContact(user);

        return {
            success: data != null,
            data
        };
    }
}