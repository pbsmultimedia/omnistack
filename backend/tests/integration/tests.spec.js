const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Tests', () => {
    
    let id = '';

    beforeAll(async () => {
        await connection.migrate.rollback(); // delete
        await connection.migrate.latest(); //build
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            "name": "TEST",
            "email": "info@test.pt",
            "city": "Peniche",
            "whatsapp": "999999999"
        });

        //console.log(response.status);

        // should check status code?
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

        id = response.body.id;

    }),

    it('should be able to create a new incident', async () => {
        const response = await request(app)
        .post('/incidents')
        .set({ 'Authorization': id }) // id created above ^
        .send({
            "title": "Case 02",
            "description": "Details..",
            "value": "150"
        });

        console.log(response.text);

    })

    it('should be able to list all the incidents', async () => {
        const response = await request(app)
        .get('/incidents')
        //.set({ 'Authorization': id }) // should be a real id? how to use the one created on the tests?
        /*
        .send({
            "title": "Case 02",
            "description": "Details..",
            "value": "150"
        });
        */

        console.log(response.body);

    })

    // disconnect from DB
    afterAll(async () => {
        await connection.destroy();
    })

})