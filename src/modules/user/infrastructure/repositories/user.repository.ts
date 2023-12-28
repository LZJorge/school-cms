import { PrismaClient } from '@prisma/client';
import { User } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/repositories/user.repository';

export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly client: PrismaClient) {}

    async create(data: User): Promise<User | null> {
        const user = await this.client.user.create({
            data: data
        });

        if(!user) {return null;}

        return user;
    }

    async findOne(id: string): Promise<User | null> {
        const user = await this.client.user.findUnique({
            where: { id }
        });

        if(!user) {return null;}

        return user;
    }

    async findByDni(dni: number): Promise<User | null> {
        const user = await this.client.user.findUnique({
            where: { dni }
        });

        if(!user) {return null;}

        return user;
    }

    async findAll(): Promise<User[] | null> {
        const user = await this.client.user.findMany();

        if(!user) {return null;}

        return user;
    }
    
    async findAllBy(param: keyof User, value: unknown): Promise<User[] | null> {
        const user = await this.client.user.findMany({
            where: {
                [param]: value
            }
        });

        if(!user) { return null; }

        return user;
    }

    async update(data: User): Promise<User | null> {
        const user = await this.client.user.update({
            where: {
                id: data.id
            },
            data: {
                dni: data.dni,
                firstname: data.firstname,
                lastname: data.lastname,
                birthday: data.birthday,
                updated_at: data.updated_at
            }
        });

        if(!user) { return null; }

        return user;
    }

    async updateState(data: User): Promise<User | null> {
        const user = await this.client.user.update({
            where: {
                id: data.id
            },
            data: {
                is_active: data.is_active,
                updated_at: data.updated_at
            }
        });

        if(!user) { return null; }

        return user;
    }

    async updateContact(data: User): Promise<User | null> {
        const user = await this.client.user.update({
            where: {
                id: data.id
            },
            data: {
                email: data.email,
                phone: data.phone,
                updated_at: data.updated_at
            }
        });

        if(!user) {return null;}

        return user;
    }

    async updatePassword(data: User): Promise<User | null> {
        const user = await this.client.user.update({
            where: {
                id: data.id
            },
            data: {
                password: data.password,
                updated_at: data.updated_at
            }
        });

        if(!user) { return null; }

        return user;
    }

    async delete(id: string): Promise<{ success: boolean } | null> {
        await this.client.user.delete({
            where: { id }
        });

        const user = await this.client.user.findUnique({
            where: { id }
        });

        if(user) {
            return { success: false };
        }

        return { success: true };
    }
}