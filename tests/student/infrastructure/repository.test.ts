import { prismaMock } from '../../setup';
import { StudentRepository } from '../../../src/modules/student/infrastructure/repositories/student.repository';
import { generateFakeUser, generateManyFakeUser } from '../../user/domain/__mocks__/user.fake';
import { StudentWithUser } from '../../../src/modules/student/domain/entities/student.entity';

describe('Student repository tests', function() {
    let repository: StudentRepository;
    const client = prismaMock;

    const user = generateFakeUser();
    const student_id = generateFakeUser().id

    const student = {
        id: student_id,
        courses_completed: 0,
        user_id: user.id
    }

    beforeEach( function() {
        repository = new StudentRepository(client);
    });

    describe('Create student', function() {
        it('should create student after create user', async function() {
            client.student.create.mockResolvedValue({
                ...student
            });

            const result = await repository.create(student);

            expect(result).toEqual(student);
            expect(client.student.create).toHaveBeenCalledWith({
                data: student
            });
        });
    });

    describe('Find student', function() {
        let someStudent: StudentWithUser;
        const students: StudentWithUser[] = []

        beforeEach( function() {
            generateManyFakeUser(10).forEach((user) => {
                students.push({
                    id: generateFakeUser().id,
                    courses_completed: 0,
                    user_id: user.id,
                    user
                });
            });

            someStudent = students[0];
        });

        it('should find created student with his user', async function() {
            client.student.findUnique.mockResolvedValue({ ...student, user } as StudentWithUser);

            const result = await repository.findOne(student_id);

            expect(result).toMatchObject({ ...student, user });
            expect(client.student.findUnique).toHaveBeenCalledWith({
                where: { id: student_id },
                include: { user: true }
            });
        });

        it('should find all student with his user', async function() {
            client.student.findMany.mockResolvedValue(students);

            const result = await repository.findAll();

            expect(result).toMatchObject({ ...student, user: { ...user } });
            expect(client.student.findMany).toHaveBeenCalledWith({
                include: { user: true }
            });
        });
    });
});