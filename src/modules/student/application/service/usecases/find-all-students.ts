import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { FindManyStudentsResponse } from '@student/application/res/find-all-student.response';
import { IStudentRepository } from '@student/domain/repositories/student.repository';

export class FindManyStudentUsecase implements useCaseBase<FindManyStudentsResponse> {
    constructor(private readonly repository: IStudentRepository) {}
    
    async run(): Promise<FindManyStudentsResponse> {
        const data = await this.repository.findAll();

        return {
            success: data !== null,
            data
        };
    }
}