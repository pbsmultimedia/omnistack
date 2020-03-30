// to create the encrypted id of the ONG
const crypto = require('crypto');

module.exports = function generateUniqueId () {
    return crypto.randomBytes(4).toString('HEX');
}
