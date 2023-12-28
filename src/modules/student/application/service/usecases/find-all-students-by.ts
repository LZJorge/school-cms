import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { FindManyStudentsResponse } from '@student/application/res/find-all-student.response';
import { IStudentRepository } from '@student/domain/repositories/student.repository';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';

export class FindManyByUserParamUsecase implements useCaseBase<FindManyStudentsResponse, FindAllByDto> {
    constructor(private readonly repository: IStudentRepository) {}
    
    async run(dto: FindAllByDto): Promise<FindManyStudentsResponse> {
        const data = await this.repository.findAllByUserParam(dto.param, dto.value);

        return {
            success: data !== null,
            data
        };
    }
}