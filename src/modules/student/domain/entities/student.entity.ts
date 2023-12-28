import { User } from '@user/domain/entities/user.entity';
export interface Student {
    id: string;
    courses_completed: number;
    user_id: string;
}
export interface StudentWithUser extends Student {
    user: User;
}