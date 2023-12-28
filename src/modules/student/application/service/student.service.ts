import { CreateStudentDto } from '@student/application/dto/create-student.dto';
import { CreateStudentUsecase } from '@student/application/service/usecases/create-student';
import { FindManyStudentUsecase } from '@student/application/service/usecases/find-all-students';
import { FindManyByUserParamUsecase } from '@student/application/service/usecases/find-all-students-by';
import { FindOneStudentByDniUsecase } from '@student/application/service/usecases/find-one-by-dni';
import { FindOneStudentUsecase } from '@student/application/service/usecases/find-one-by-id';
import { IStudentRepository } from '@student/domain/repositories/student.repository';
import { FindAllByDto } from '@user/application/dto/find-all-by.dto';
import { UpdateUserContactDto } from '@user/application/dto/update-user-contact.dto';
import { UpdateUserPasswordDto } from '@user/application/dto/update-user-password.dto';
import { UpdateUserStateDto } from '@user/application/dto/update-user-state.dto';
import { UpdateUserDto } from '@user/application/dto/update-user.dto';
import { UserService } from '@user/application/service/user.service';

export class StudentService {
    constructor(
        private readonly repository: IStudentRepository,
        private readonly usersService: UserService
    ) {}

    /**
     * @method Create
     */
    async create(dto: CreateStudentDto) {
        return await new CreateStudentUsecase(this.repository, this.usersService).run(dto);
    }

    /**
     * @method Create
     */
    async findOneById(id: string) {
        return await new FindOneStudentUsecase(this.repository).run(id);
    }

    async findOneByDni(dni: number) {
        return await new FindOneStudentByDniUsecase(this.repository).run(dni);
    }

    async findAll() {
        return await new FindManyStudentUsecase(this.repository).run();
    }

    async findAllByUserParam(dto: FindAllByDto) {
        return await new FindManyByUserParamUsecase(this.repository).run(dto);
    }

    /**
     * @method Update
     */
    async findAndUpdateUserInfo(dto: UpdateUserDto, id: string) {
        return await this.usersService.findAndUpdateUserInfo(dto, id);
    }

    async findAndUpdateUserContact(dto: UpdateUserContactDto, id: string) {
        return await this.usersService.findAndUpdateUserContact(dto, id);
    }

    async findAndUpdateUserPassword(dto: UpdateUserPasswordDto, id: string) {
        return await this.usersService.findAndUpdateUserPassword(dto, id);
    }

    async findAndUpdateUserState(dto: UpdateUserStateDto, id: string) {
        return await this.usersService.findAndUpdateUserState(dto, id);
    }
}