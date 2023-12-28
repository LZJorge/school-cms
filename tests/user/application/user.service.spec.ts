import { UserService } from '../../../src/modules/user/application/service/user.service';
import { generateFakeUser } from '../domain/__mocks__/user.fake';
import { UserRepositoryStub } from '../domain/__mocks__/user.repository.stub';

describe('User service tests:', function() {
    let repository: UserRepositoryStub;
    let service: UserService;
    const user = generateFakeUser();

    beforeEach( function() {
        repository = new UserRepositoryStub()
        service = new UserService(repository);
    });

    /**
     * @method Create
     */
    describe('Create user', function() {
        it('should create user: ', async function() {
            const createUserDto = { 
                dni: user.dni,
                firstname: user.firstname,
                lastname: user.lastname,
                birthday: user.birthday,
                email: user.email,
                phone: user.phone,
            };

            const passwords = { password: user.password, password_confirm: user.password };

            const result = await service.create({ ...createUserDto, ...passwords });

            expect(result.success).toBeTruthy();
            expect(result.data).toMatchObject(createUserDto);
        });
    });

    /**
     * @method Read
     */
    describe('Find users', function() {
        it('should find all users: ', async function() {
            const result = await service.findAll();

            expect(result.success).toBeTruthy();
            expect(result.data).toHaveLength(15);
        });

        it('should find all users by some param & value: ', async function() {
            let result = await service.findAllBy({
                param: 'firstname',
                value: repository.someUser.firstname
            });

            expect(result.success).toBeTruthy();
            expect(result.data).toContain(repository.someUser);

            result = await service.findAllBy({
                param: 'lastname',
                value: repository.someUser.lastname
            });

            expect(result.success).toBeTruthy();
            expect(result.data).toContain(repository.someUser);

            result = await service.findAllBy({
                param: 'created_at',
                value: repository.someUser.created_at
            });

            expect(result.success).toBeTruthy();
            expect(result.data).toContain(repository.someUser);
        })

        it('should find one user by id: ', async function() {
            const result = await service.findOne(repository.someUser.id);

            expect(result.success).toBeTruthy();
            expect(result.data).toBe(repository.someUser);
        });

        it('should find one user by his personal id: ', async function() {
            const result = await service.findOneByDni(repository.someUser.dni);

            expect(result.success).toBeTruthy();
            expect(result.data).toBe(repository.someUser);
        });
    });

    /**
     * @method Update
     */
    describe('Update Users', function() {
        it('should update user info: ', async function() {
            const updateUserInfoDto = {
                dni: user.dni,
                firstname: user.firstname,
                lastname: user.lastname,
                birthday: user.birthday,
            };

            const result = await service.findAndUpdateUserInfo(updateUserInfoDto, repository.someUser.id);

            expect(result.success).toBeTruthy();
            expect(result.data).toEqual({ ...repository.someUser, ...updateUserInfoDto });
        });

        it('should update user contact: ', async function() {
            const updateUserContactDto = {
                email: user.email,
                phone: user.phone
            };

            const result = await service.findAndUpdateUserContact(updateUserContactDto, repository.someUser.id);

            expect(result.success).toBeTruthy();
            expect(result.data).toEqual({ ...repository.someUser, ...updateUserContactDto });
        });

        it('should update user state: ', async function() {
            const updateUserStateDto = {
                is_active: user.is_active
            };

            const result = await service.findAndUpdateUserState(updateUserStateDto, repository.someUser.id);

            expect(result.success).toBeTruthy();
            expect(result.data).toEqual({ ...repository.someUser, ...updateUserStateDto });
        });

        it('should update user password: ', async function() {
            const updateUserPasswordDto = {
                password: user.password,
                password_confirm: user.password,
                current_password: repository.someUser.password
            };

            const result = await service.findAndUpdateUserPassword(updateUserPasswordDto, repository.someUser.id);

            expect(result.success).toBeTruthy();
            expect(result.data).toEqual({ ...repository.someUser });
            if(result.data) {
                expect(result.data.password).not.toBe(updateUserPasswordDto.current_password);
            }
        });
    });

    /**
     * @method Delete
     */
    describe('Delete user', function() {
        it('should delete user by his id:', async function() {
            const id = repository.someUser.id;
            const result = await service.delete(id);

            expect(result.success).toBeTruthy();
            expect(result.affected).toBe(1);
            expect(await repository.findOne(user.id)).toBeNull();
        });
    });
});