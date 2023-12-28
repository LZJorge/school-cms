import { BaseRepository } from '@shared/domain/repositories/base.repository';
import { User } from '../entities/user.entity';

export interface IUserRepository extends BaseRepository<User> {
    findByDni(dni: number): Promise<User | null>;

    updateState(data: User): Promise<User | null>;
    updateContact(data: User): Promise<User | null>;
    updatePassword(data: User): Promise<User | null>;
}