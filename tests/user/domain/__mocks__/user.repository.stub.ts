import { User } from '../../../../src/modules/user/domain/entities/user.entity';
import { BaseRepository } from '../../../../src/modules/shared/domain/repositories/base.repository';
import { IUserRepository } from '../../../../src/modules/user/domain/repositories/user.repository';
import { generateManyFakeUser } from './user.fake';

export class UserRepositoryStub implements BaseRepository<User>, IUserRepository {
    protected users: User[] = generateManyFakeUser(15);

    async create(data: User): Promise<User | null> {
        this.users.push(data);
        return data;
    }
    
    async findOne(id: string): Promise<User | null> {
        const user = (this.users.filter((user) => user.id === id))[0];
        if(!user) return null;
        return user
    }
    
    async findAll(): Promise<User[] | null> {
        return this.users;
    }
    
    async findAllBy(param: keyof User, value: unknown): Promise<User[] | null> {
        return this.users.filter((user) => user[param] === value);
    }
    
    async delete(id: string): Promise<{ success: boolean; } | null> {
        const index = this.users.findIndex((user) => user.id === id);
        this.users.splice(index, 1);

        return { success: true };
    }
    
    async findByDni(dni: number): Promise<User | null> {
        const user = (this.users.filter((user) => user.dni === dni))[0];
        if(!user) return null;
        return user;
    }

    async update(data: Partial<User>): Promise<User | null> {
        const index = this.users.findIndex((user) => user.id === data.id);
        this.users[index] = { ...this.users[index], ...data };

        return this.users[index];
    }
    
    async updateState(data: User): Promise<User | null> {
        const index = this.users.findIndex((user) => user.id === data.id);
        this.users[index] = { ...this.users[index], ...data };

        return this.users[index];
    }
    
    async updateContact(data: User): Promise<User | null> {
        const index = this.users.findIndex((user) => user.id === data.id);
        this.users[index] = { ...this.users[index], ...data };

        return this.users[index];
    }
    
    async updatePassword(data: User): Promise<User | null> {
        const index = this.users.findIndex((user) => user.id === data.id);
        this.users[index] = { ...this.users[index], ...data };

        return this.users[index];
    }

    public get someUser(): User { return this.users[0] }
}