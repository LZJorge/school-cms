import { BaseResponse } from '@shared/domain/responses/base.response';
import { User } from '@user/domain/entities/user.entity';

export interface FindAllUserResponse extends BaseResponse {
    data: User[] | null;
}