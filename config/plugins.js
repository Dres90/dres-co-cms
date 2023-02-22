

module.exports = ({ env }) => ({
    'website-builder': {
        enabled: true,
        config: {
        url: 'http://localhost:1337/api/recipes',
        trigger: {
            type: 'manual',
        },
        }
    },
});