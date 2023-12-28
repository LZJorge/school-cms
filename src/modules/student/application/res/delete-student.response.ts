import { BaseResponse } from '@shared/domain/responses/base.response';

export interface DeleteStudentResponse extends BaseResponse {
    data: 1 | 0;
}