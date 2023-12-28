import { User } from '../../domain/__mocks__/user.fake';
import { PrismaUserRepository } from '../../../../src/modules/user/infrastructure/repositories/user.repository';
import { generateFakeUser, generateManyFakeUser } from '../../domain/__mocks__/user.fake';
import { prismaMock } from '../../../setup';

import { UpdateUserDto } from '../../../../src/modules/user/application/dto/update-user.dto';
import { UpdateUserContactDto } from '../../../../src/modules/user/application/dto/update-user-contact.dto';
import { UpdateUserPasswordDto } from '../../../../src/modules/user/application/dto/update-user-password.dto';
import { UpdateUserStateDto } from '../../../../src/modules/user/application/dto/update-user-state.dto';

describe('User repository tests', function() {
    let repository: PrismaUserRepository;
    const client = prismaMock;
    const user = generateFakeUser();

    beforeEach( function() {
        repository = new PrismaUserRepository(client);
    });

    /**
     * @method Create
     */
    describe('Insert User into database', function() {
        it('should create user: ', async function() {
            client.user.create.mockResolvedValue(user);

            const result = await repository.create(user);

            expect(result).toEqual(user);
            expect(client.user.create).toHaveBeenCalledWith({
                data: user
            });
        });
    });

    /**
     * @method Find
     */
    describe('Find User onto database', function() {
        let someUser: User;
        let users: User[];

        beforeEach( function() {
            users = generateManyFakeUser(10);
            someUser = users[1];

            client.user.findUnique.mockResolvedValue(someUser);
            client.user.findMany.mockResolvedValue(users);
        });

        it('should find one user by his id: ', async function() {
            const result = await repository.findOne(someUser.id);

            expect(result).toBe(someUser);
            expect(client.user.findUnique).toHaveBeenCalledWith({
                where: { id: someUser.id }
            });
        });

        it('should find one user by his dni: ', async function() {
            const result = await repository.findByDni(someUser.dni);

            expect(result).toBe(someUser);
            expect(client.user.findUnique).toHaveBeenCalledWith({
                where: { dni: someUser.dni }
            });
        });

        it('should find all users: ', async function() {
            const result = await repository.findAll();

            expect(result).toBe(users);
            expect(client.user.findMany).toHaveBeenCalled();
        });

        it('should find all users by some param and value: ', async function() {
            let result = await repository.findAllBy('firstname', someUser.firstname);

            expect(result).toContainEqual(someUser);
            expect(client.user.findMany).toHaveBeenCalledWith({
                where: { firstname: someUser.firstname }
            });

            result = await repository.findAllBy('lastname', someUser.lastname);

            expect(result).toContainEqual(someUser);
            expect(client.user.findMany).toHaveBeenCalledWith({
                where: { lastname: someUser.lastname }
            });

            result = await repository.findAllBy('created_at', someUser.created_at);

            expect(result).toContainEqual(someUser);
            expect(client.user.findMany).toHaveBeenCalledWith({
                where: { created_at: someUser.created_at }
            });
        });
    });

    /**
     * @method Update
     */
    describe('Update User into database', function() {
        let userToUpdate: User;

        beforeEach( function() {
            userToUpdate = generateFakeUser();
        })

        it('should update user basic info: ', async function() {
            const dto: UpdateUserDto = {
                dni: userToUpdate.dni,
                firstname: userToUpdate.firstname,
                lastname: userToUpdate.lastname,
                birthday: userToUpdate.birthday
            };

            client.user.update.mockResolvedValue({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            const result = await repository.update({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            expect(result).toEqual({ ...user, ...dto, updated_at: userToUpdate.updated_at });
            expect(client.user.update).toHaveBeenCalledWith({
                where: {
                    id: user.id
                },
                data: {
                    dni: userToUpdate.dni,
                    firstname: userToUpdate.firstname,
                    lastname: userToUpdate.lastname,
                    birthday: userToUpdate.birthday,
                    updated_at: userToUpdate.updated_at
                }
            });
        });

        it('should update user contact info: ', async function() {
            const dto: UpdateUserContactDto = {
                phone: userToUpdate.phone,
                email: userToUpdate.email
            };

            client.user.update.mockResolvedValue({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            const result = await repository.updateContact({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            expect(result).toEqual({ ...user, ...dto, updated_at: userToUpdate.updated_at });
            expect(client.user.update).toHaveBeenCalledWith({
                where: {
                    id: user.id
                },
                data: {
                    email: userToUpdate.email,
                    phone: userToUpdate.phone,
                    updated_at: userToUpdate.updated_at
                }
            });
        });

        it('should update user password: ', async function() {
            const dto: UpdateUserPasswordDto = {
                current_password: user.password,
                password: userToUpdate.password,
                password_confirm: userToUpdate.password,
            };

            client.user.update.mockResolvedValue({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            const result = await repository.updatePassword({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            expect(result).toEqual({ ...user, ...dto, updated_at: userToUpdate.updated_at });
            expect(client.user.update).toHaveBeenCalledWith({
                where: {
                    id: user.id
                },
                data: {
                    password: userToUpdate.password,
                    updated_at: userToUpdate.updated_at
                }
            });
        });

        it('should update user state info: ', async function() {
            const dto: UpdateUserStateDto = {
                is_active: userToUpdate.is_active,
            };

            client.user.update.mockResolvedValue({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            const result = await repository.updateState({ ...user, ...dto, updated_at: userToUpdate.updated_at });

            expect(result).toEqual({ ...user, ...dto, updated_at: userToUpdate.updated_at });
            expect(client.user.update).toHaveBeenCalledWith({
                where: {
                    id: user.id
                },
                data: {
                    is_active: userToUpdate.is_active,
                    updated_at: userToUpdate.updated_at
                }
            });
        });
    });

    describe('Delete User into database', function() {
        it('should delete user: ', async function() {
            const result = await repository.delete(user.id);

            expect(result).toEqual({ success: true });
            expect(client.user.delete).toHaveBeenCalledWith({
                where: { id: user.id }
            });
        });
    });
});