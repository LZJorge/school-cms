import { BaseResponse } from '@shared/domain/responses/base.response';
import { User } from '@user/domain/entities/user.entity';

export interface FindUserResponse extends BaseResponse {
    data: User | null;
}