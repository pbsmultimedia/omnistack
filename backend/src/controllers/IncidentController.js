const connection = require('../database/connection');
// to create the encrypted id of the ONG
const crypto = require('crypto');

module.exports = {
    
    async index (request, response) {    
        
        // get total - is there no other way?
        const [count] = await connection('incidents').count(); 
        // send it on the header
        response.header('X-Total-Count', count['count(*)']); // Object {count(*): 11}

        const {page = 1} = request.query; // pagination
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', 'incidents.ong_id')// where is the M in MVC..?
        .limit(2)
        .offset((page - 1) * 2)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
        ]);
        return response.json(incidents);
    },

    async create (request, response) {        
    
        //const {id} = request.params; // via GET query string
        //const data = request.body; // via POST
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        // make the insert and wait for it
        // get the id of the first item of the result array
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        
        return response.json({        
            id
        });
        
    },
    async delete (request, response) {        
        const {id} = request.params;
        // verify if incident belongs to the ONG
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({
                error: 'Operation not permitted'
            })
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // 204: success without content - does not work ok on IE11 and some smart TV´s

    }
}
