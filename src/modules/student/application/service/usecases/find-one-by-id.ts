import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { FindOneStudentResponse } from '@student/application/res/find-student.response';
import { IStudentRepository } from '@student/domain/repositories/student.repository';

export class FindOneStudentUsecase implements useCaseBase<FindOneStudentResponse, string> {
    constructor(private readonly repository: IStudentRepository) {}
    
    async run(id: string): Promise<FindOneStudentResponse> {
        const data = await this.repository.findOne(id);

        return {
            success: data !== null,
            data
        };
    }
}