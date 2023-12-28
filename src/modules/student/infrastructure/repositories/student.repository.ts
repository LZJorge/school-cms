import { PrismaClient } from '@prisma/client';
import { User } from '@user/domain/entities/user.entity';
import { Student } from '@student/domain/entities/student.entity';
import { IStudentRepository } from '@student/domain/repositories/student.repository';

export class StudentRepository implements IStudentRepository {
    constructor(private readonly client: PrismaClient) {}

    async create(data: Student): Promise<Student | null> {
        return await this.client.student.create({
            data: data
        });
    }

    async findOne(id: string): Promise<Student | null> {
        return await this.client.student.findUnique({
            where: { id },
            include: { user: true }
        });
    }

    async findOneByDni(dni: number): Promise<Student | null> {
        return await this.client.student.findFirst({
            where: { user: { dni } },
            include: { user: true }
        });
    }

    async findAll(): Promise<Student[] | null> {
        return await this.client.student.findMany({
            include: { user: true }
        });
    }

    async findAllBy(param: keyof Student, value: unknown): Promise<Student[] | null> {
        return await this.client.student.findMany({
            where: { [param]: value },
            include: { user: true }
        });
    }

    async findAllByUserParam(param: keyof User, value: unknown): Promise<Student[] | null> {
        return await this.client.student.findMany({
            where: { user: { [param]: value } },
            include: { user: true }
        });
    }

    async update(data: Partial<Student>): Promise<Student | null> {
        return await this.client.student.update({
            where: { id: data.id },
            data: { courses_completed: data.courses_completed }
        });
    }

    async delete(id: string): Promise<{ success: boolean; } | null> {
        await this.client.student.delete({
            where: { id }
        });

        const student = await this.client.student.findUnique({
            where: { id }
        });

        if(student) {
            return { success: false }
        }

        return { success: true };
    }
}