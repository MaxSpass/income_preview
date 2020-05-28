const authM = require('./auth');
const commonM = require('./common');

const routes = [
    ...authM,
    ...commonM,
];

module.exports = routes;