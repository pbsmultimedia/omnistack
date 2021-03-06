/**
 * "The major difference between require and import, is that require will automatically scan node_modules to find modules, but import, which comes from ES6, won't."
 * https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x
 * 
 */
const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');
const cors = require('cors');

const app = express();

// accept POST request as JSON
app.use(express.json());

// CORS
app.use(cors());

// use the routes
app.use(routes);

app.use(errors());

/**
 * Route to a resource
 * 
 * HTTP methods:
 * 
 * GET: get data
 * POST: create data
 * PUT: edit data
 * DELETE: delete data
 * 
 * Param types:
 * Query: on the URL followed by ?
 * Route: identify resources like /resource/id
 * 
 */

//app.listen(3333); // to run tests export the app instead
module.exports = app;
