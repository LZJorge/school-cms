import { v4 } from 'uuid';

export class Id {
    static generate(): string {
        return v4();
    }
}