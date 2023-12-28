import { BaseResponse } from '@shared/domain/responses/base.response';

export interface DeleteUserResponse extends BaseResponse {
    affected: 1 | 0;
}