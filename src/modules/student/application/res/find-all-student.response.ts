import { BaseResponse } from '@shared/domain/responses/base.response';
import { StudentWithUser } from '@student/domain/entities/student.entity';

export interface FindManyStudentsResponse extends BaseResponse {
    data: StudentWithUser[] | null;
}