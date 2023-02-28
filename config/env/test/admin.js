const crypto = require('crypto');

module.exports = () => ({
  auth: {
    secret: crypto.randomBytes(16).toString('base64'),
  },
  apiToken: {
    salt: crypto.randomBytes(16).toString('base64'),
  },
});
