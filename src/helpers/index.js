import {isObject, isFunction} from "lodash";

export const createTableColumns = (array = [], props = {}, callback) => {
    if(!array.length) return array;

    return array.map(el=>{
        const field = el.toLowerCase().replace(/\s/g, "_");
        return {
            title: el,
            field,
            ...(isObject(props) ? props : {}),
            ...(isFunction(callback) ? callback(el) : {})
        }
    })
};
