const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// ongs
routes.get('/ongs', OngController.index );

// add validation middleware
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().integer().integer().min(100000000).max(999999999),
        city: Joi.string().required()
    })
}), OngController.create);

// login / session - must receive id via body
routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()     
    })
}), SessionController.create);

// incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index );

// must receive the id of the ONG (headers) and the content (body)
routes.post('/incidents', celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required()
        }),
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown() // accept other headers
    }    
    ), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()     
    })
}), IncidentController.delete);

// profile / ongs incidents
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown() // accept other headers
}), ProfileController.index );

// tell to node what is exported from this file
module.exports = routes;