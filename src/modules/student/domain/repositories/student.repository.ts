import { BaseRepository } from '@shared/domain/repositories/base.repository';
import { User } from '@user/domain/entities/user.entity';
import { Student } from '../entities/student.entity';

export interface IStudentRepository extends BaseRepository<Student> {
    findOneByDni(dni: number): Promise<Student | null>;
    findAllByUserParam(param: keyof User, value: unknown): Promise<Student[] | null>;
}