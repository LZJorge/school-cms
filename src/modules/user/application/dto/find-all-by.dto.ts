import { User } from '@user/domain/entities/user.entity';

export interface FindAllByDto {
    param: keyof User;
    value: unknown;
}