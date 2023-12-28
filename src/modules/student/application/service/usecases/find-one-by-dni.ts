import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { FindOneStudentResponse } from '@student/application/res/find-student.response';
import { IStudentRepository } from '@student/domain/repositories/student.repository';

export class FindOneStudentByDniUsecase implements useCaseBase<FindOneStudentResponse, number> {
    constructor(private readonly repository: IStudentRepository) {}
    
    async run(dni: number): Promise<FindOneStudentResponse> {
        const data = await this.repository.findOneByDni(dni)

        return {
            success: data !== null,
            data
        };
    }
}