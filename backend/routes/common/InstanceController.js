const MANAGING_PROPS = {
    returnOriginal: false,
    useFindAndModify: false,
};

class InstanceController {
    constructor({model}) {
        this.model = model;
    }
    findById(user_id) {
        return this.model.findById(user_id);
    }
    paginate(options = {}, props = {}) {
        return this.model.paginate(options, props);
    }
    find(options = {}) {
        return this.model.find(options);
    }
    create(props = {}) {
        return this.model.create(props);
    }
    insertMany(props = {}) {
        return this.model.insertMany(props);
    }
    findOneAndUpdate(finded, data) {
        return this.model.findOneAndUpdate(finded, data, MANAGING_PROPS);
    }
    deleteOne(props = {}) {
        return this.model.deleteOne(props);
    }
};

module.exports = InstanceController;