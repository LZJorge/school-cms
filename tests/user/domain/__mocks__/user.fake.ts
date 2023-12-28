import { faker } from '@faker-js/faker';
import { User } from '../../../../src/modules/user/domain/entities/user.entity';

const operators = ['0412', '0416', '0414', '0424'];
function generatePhoneNumber() {
    const index = Math.floor(Math.random() * operators.length);
    return operators[index] + '-' + faker.string.numeric({ length: 7 });
}
export function generateFakeUser(): User {
    return {
        id: faker.string.uuid(),
        dni: faker.number.int({ min: 15000000, max: 99999999 }),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: faker.internet.password(),
        is_active: faker.datatype.boolean(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        phone: generatePhoneNumber(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent()
    }
}
export function generateManyFakeUser(amount: number): User[] {
    const users: User[] = [];
    for(let i = 1; i <= amount; i++) {
        users.push(generateFakeUser());
    }
    return users;
}
export * from '../../../../src/modules/user/domain/entities/user.entity';
export * from '../../../../src/modules/user/domain/repositories/user.repository';