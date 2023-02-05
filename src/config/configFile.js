module.exports = {
    development: {
        port: process.env.PORT || 1000,
        db: 'mongodb://127.0.0.1:27017/cubicle',
        SECRET: '23456782fawawd232345534543'
    },
    production: {}
};