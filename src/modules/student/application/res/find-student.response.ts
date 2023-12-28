import { BaseResponse } from '@shared/domain/responses/base.response';
import { Student, StudentWithUser } from '@student/domain/entities/student.entity';

export interface FindOneStudentResponse extends BaseResponse {
    data: Student | StudentWithUser | null;
}