import { useCaseBase } from '@shared/domain/usecases/base.usecase';
import { UpdateStudentResponse } from '@student/application/res/update-student.response';
import { Student } from '@student/domain/entities/student.entity';
import { IStudentRepository } from '@student/domain/repositories/student.repository';

export class UpdateStudentCoursesUsecase implements useCaseBase<UpdateStudentResponse, number> {
    constructor(private readonly repository: IStudentRepository) {}
    
    async run(courses_completed: number, current: Student): Promise<UpdateStudentResponse> {
        const updatedStudent: Student = { ...current, courses_completed }
        const data = await this.repository.update(updatedStudent);

        return {
            success: data !== null,
            data
        };
    }
}