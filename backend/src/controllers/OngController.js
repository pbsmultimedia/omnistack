const connection = require('../database/connection');
// to create the encrypted id of the ONG
const crypto = require('crypto');

module.exports = {

    async index (request, response) {        
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create (request, response) {        

        const id = crypto.randomBytes(4).toString('HEX');

        //const {id} = request.params; // via GET query string
        //const data = request.body; // via POST
        const {name, email, whatsapp, city} = request.body;
        
        // make the insert and wait for it
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city
        })

        return response.json({        
            id
        });
    }
}
