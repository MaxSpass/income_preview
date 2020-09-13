const {authModel} = require('../../modules/models/index');
const ApiAuth = require('./ApiAuth');

const api = authModel.map(model=>{
    return {
        root: model.root,
        routes: new ApiAuth(model),
    }
});

module.exports = api;