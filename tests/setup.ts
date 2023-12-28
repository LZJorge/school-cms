import supertest from 'supertest';
import { App } from '../src/app';

const app = new App();
export const request = supertest(app.server);

const PORT = process.env.PORT;
export const HTTP = `http://localhost:${PORT}`;

/**
 * @prisma
 */
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from './prisma.client';

jest.mock('./prisma.client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;