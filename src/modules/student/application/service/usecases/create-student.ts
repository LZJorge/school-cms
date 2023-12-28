import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { Id } from '@shared/infrastructure/helpers/id.helper';
import { HttpException } from '@shared/domain/exceptions/http.exception';
import { HttpStatus } from '@shared/domain/exceptions/http.statusCodes';
import { UserService } from '@user/application/service/user.service';
import { Student } from '@student/domain/entities/student.entity';
import { CreateStudentResponse } from '@student/application/res/create-student.response';
import { CreateStudentDto } from '@student/application/dto/create-student.dto';
import { IStudentRepository } from '@student/domain/repositories/student.repository';

export class CreateStudentUsecase implements useCaseBase<CreateStudentResponse, CreateStudentDto> {
    constructor(
        private readonly repository: IStudentRepository,
        private readonly usersService: UserService
    ) {}
    
    async run(dto: CreateStudentDto): Promise<CreateStudentResponse> {
        const user = await this.usersService.create(dto.user);
        if(!user.success || !user.data) {
            throw new HttpException('', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const student: Student = {
            id: Id.generate(),
            courses_completed: 0,
            user_id: user.data.id
        }

        const data = await this.repository.create(student);
        if(!data) {
            throw new HttpException('', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return {
            success: data !== null,
            data
        }
    }
}