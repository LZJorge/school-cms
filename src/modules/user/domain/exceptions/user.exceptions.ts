export enum UserException {
    DNI_ALREADY_EXISTS = 'User DNI already registered',

    FIRSTNAME_TOO_SHORT = 'Firstname too short, verify',
    FIRSTNAME_TOO_LONG = 'Firstname too long, verify',
    FIRSTNAME_INVALID_CHARACTERS = 'Invalid characters at firstname',

    LASTNAME_TOO_SHORT = 'Lastname too short, verify',
    LASTNAME_TOO_LONG = 'Lastname too long, verify',
    LASTNAME_INVALID_CHARACTERS = 'Invalid characters at lastname',

    PASSWORD_TOO_SHORT = 'Password to short',
    PASSWORD_TOO_LONG = 'Lastname too long, verify',
    PASSWORD_INVALID_CHARACTERS = 'Invalid characters at password',

    INVALID_EMAIL = 'Invalid email address',

    WRONG_PHONE_CODE = 'Invalid phone code, availables are [0412, 0416, 0414, 0424]',
}