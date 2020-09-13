const InstanceController= require('./InstanceController');
const express = require('express');
const {
    declension,
} = require('../../helpers/helpers');

const {
    isObject
} = require('lodash');

const PAGINATION_LABELS = {
    docs: 'items'
};

class ApiInstance {
    constructor({model, props}) {
        this.router = express.Router();
        this.model = model;
        this.props = Object.assign({
            declensions: ['Item','Items','Items'],
            transform: el=>el,
        }, props);

        this.controller = new InstanceController({
            model: this.model,
        });

        this.getInstance();
        this.addInstance();
        this.updateInstance();
        this.deleteInstance();

        return this.router;
    }
    getInstance() {
        let status;
        let promise;
        this.router.route(`/:id?`).get(async (req,res)=>{
            const user_id = req.params.id;
            // let transform = (el)=>el;
            if(user_id) {
                promise = () => this.controller.findById(user_id);
                console.log('promise',promise);
            } else {
                const isQuery = Object.keys(req.query).length;

                if(isQuery) {
                    promise = () => this.controller.paginate.call(this.controller, {}, {
                        ...req.query,
                        customLabels: PAGINATION_LABELS,
                    });
                } else {
                    promise = () => this.controller.find.call(this.controller);
                }
            }

            //@TODO
            try{
                const data = await promise();
                status = 200;
                res.status(status).json({
                    data,
                    status,
                })
            } catch(err) {
                status = 400;
                res.status(status).json({
                    error: {
                        messages: [`Error: ${err}`]
                    },
                    status,
                })
            }
        });
    };
    addInstance(){
        const { declensions, transform } = this.props;
        let status;
        let promise;
        this.router.route(`/add`).post(async (req, res)=>{
            let body = req.body;
            if(!body) res.status(400);
            const isBodyArray = Array.isArray(body);
            const itemsCount = isBodyArray ? body.length : 1;

            if(isObject(body) && !isBodyArray) {
                console.log('isObject',isObject);
                body = transform(body);
                promise = this.controller.create(body);
            } else if(isBodyArray) {
                body = body.map(el=>transform(el));
                promise = this.controller.insertMany(body);
            }

            try{
                const response = await promise;
                status = 200;
                res.status(status).json({
                    data: {
                        items: response,
                    },
                    message: `${declension(itemsCount, declensions)} added!`,
                    status,
                })
            } catch(err) {
                status = 400;
                res.status(status).json({
                    error: {
                        messages: [`Error: ${err}`]
                    },
                    status,
                })
            }
        });

    };
    updateInstance() {
        const { declensions, transform } = this.props;
        let status;
        let promise;
        this.router.route(`/update`).post(async(req, res)=>{
            let body = req.body;
            if(!body) res.status(400);
            const isBodyArray = Array.isArray(body);
            const itemsCount = isBodyArray ? body.length : 1;

            if(isObject(body) && !isBodyArray) {
                body = transform(body);
                const neededItem = {_id: body.id};
                promise = this.controller.findOneAndUpdate(neededItem, body.data);

            } else if(isBodyArray) {
                body = body.map(el=>{
                    el.data = transform(el.data);
                    return el;
                });
                promise = Promise.all(body.map((el)=>{
                    return this.controller.findOneAndUpdate({_id: el.id}, el.data);
                }))
            }

            try{
                const response = await promise;
                status = 200;
                res.status(status).json({
                    data: {
                        items: Array.isArray(response) ? response : [response],
                    },
                    message: `${declension(itemsCount, declensions)} updated!`,
                    status,
                })
            } catch(err) {
                status = 400;
                res.status(status).json({
                    error: {
                        messages: [`Error: ${err}`]
                    },
                    status,
                })
            }
        });

    };
    deleteInstance(){
        const { declensions, transform } = this.props;
        let status;
        let promise;
        this.router.route(`/delete`).post(async(req, res)=>{
            let body = req.body;
            if(!body) res.status(400);
            const isBodyArray = Array.isArray(body);
            const itemsCount = isBodyArray ? body.length : 1;

            if(isObject(body) && !isBodyArray) {
                body = transform(body);
                const neededItem = {_id: body.id};
                promise = this.controller.deleteOne(neededItem); //returns NULL
            } else if(isBodyArray) {
                body = body.map(el=>{
                    el.data = transform(el.data);
                    return el;
                });
                promise = Promise.all(body.map((el)=>{
                    return this.controller.deleteOne({_id: el.id}); //returns NULL
                }))
            }
            try{
                await promise;
                status = 200;
                res.status(status).json({
                    message: `${declension(itemsCount, declensions)} deleted!`,
                    status,
                })
            } catch(err) {
                status = 400;
                res.status(status).json({
                    error: {
                        messages: [`Error: ${err}`]
                    },
                    status,
                })
            }
        });
    };
};

module.exports = ApiInstance;