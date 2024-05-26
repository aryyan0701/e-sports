const crypto = require('crypto');

function generateSecret() {
    return crypto.randomBytes(64).toString('hex');
}

console.log(generateSecret());
