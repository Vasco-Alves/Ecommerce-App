
const request = require('supertest');
const app = require('../server')

describe('users', () => {

    var token = "";
    var id = "";

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                "type": "user",
                "username": "Menganito",
                "email": "user25@test.com",
                "password": "test123456",
                "age": 21,
                "gender": "male",
                "city": "Madrid",
                "interests": [],
                "enableOffers": true
            })
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body.user.type).toEqual('user');
        expect(response.body.user.username).toEqual('Menganito');
        expect(response.body.user.email).toEqual('user25@test.com');

        token = response.body.token;
        id = response.body.user;
    });
    /*
        it('should get a Unauthorized error', async () => {
            const response = await request(app)
                .get('/api/auth/users')
                .set('Accept', 'application/json')
                .expect(401)
        });
    */

    it('should get the users', async () => {
        const response = await request(app)
            .get('/api/auth/users')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body.pop().username).toEqual('Menganito');
    });

    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/auth/users/' + id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body.acknowledged).toEqual(true);
    });
})