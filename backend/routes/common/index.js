const {entitiesModel} = require('../../modules/models/index');
const ApiInstance = require('./ApiInstance');

const api = entitiesModel.map(model=>{
    return {
        root: model.root,
        routes: new ApiInstance(model),
    }
});

module.exports = api;