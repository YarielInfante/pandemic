module.exports = {
    development: {
        username: 'prometheus',
        password: '',
        database: 'pandemic',
        host: 'localhost',
        dialect: 'postgres'
    },
    test: {},
    production: process.env.DATABASE_URL
};
