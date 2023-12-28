const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleNameMapper: pathsToModuleNameMapper(
    {
        "@shared/*": ["src/modules/shared/*"],
        "@user/*": ["src/modules/user/*"],
    }
    , { prefix: '<rootDir>' }),
    modulePaths: ["./",],
    "setupFilesAfterEnv": ["<rootDir>/tests/setup.ts"],
}