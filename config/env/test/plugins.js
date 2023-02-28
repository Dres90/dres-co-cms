const crypto = require('crypto');

module.exports = () => ({
    "users-permissions": {
      config: {
        jwtSecret: crypto.randomBytes(16).toString('base64'),
      },
    },
  });