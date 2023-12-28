import { BaseResponse } from '@shared/domain/responses/base.response';
import { User } from '@user/domain/entities/user.entity';

export interface UpdateUserResponse extends BaseResponse {
    data: User | null;
}