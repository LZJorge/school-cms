import { request, HTTP } from '../../../setup';

const Prefix = '/user'

enum Endpoints {
    CREATE_USER = '/create',

}

describe('User Router tests:', function() {

    it('Should create new User: ', async function() {
        await request.post(HTTP + Prefix + Endpoints.CREATE_USER)
                     .send({})
    })

});