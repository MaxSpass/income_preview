import axios from "axios";
import qs from "qs";
import {upperFirst} from "lodash";
import {notifySuccessThunk, notifyErrorThunk} from '../store/reducers/notify/notify.reducer';

const BASE_URL = "http://localhost:5000";

const paramsSerializer = params =>
    qs.stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true
    });


const api = axios.create({
    baseURL: BASE_URL,
    paramsSerializer,
    transformResponse: [
        (data) => {
            try{
                const response = JSON.parse(data);

                if (response.status === 200) {
                    if(response.message) {
                        window.store.dispatch(notifySuccessThunk(response.message));
                    }
                    return response;
                } else {
                    if(response.error && response.error.messages.length) {
                        window.store.dispatch(notifyErrorThunk(response.error.messages))
                    }
                    // throw Error(`[requestClient] Request failed with reason -  ${data}`)
                }

            } catch (error) {
                //@TODO Should be a notify, if it's a dev bundle
                console.warn(error);
                throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`)
            }

        }
    ]
});

// Token managing functions
export const alterAuthTokenInHeader = token => {
    api.defaults.headers.common['Authorization'] = encodeURIComponent(token);
};

export const deleteAuthTokenInHeader = () => {
    delete api.defaults.headers.common['Authorization'];
};

//======================= POST - AUTH REQUESTS ====================
export const simplePostRequest = url => (payload, params, clearToken) => {
    if (clearToken) {
        alterAuthTokenInHeader(null);
    }
    return api.post(url, payload, params);
};

export const authorizedPostRequest = url => (token, payload = null, params = {}) => {
    alterAuthTokenInHeader(token);
    return simplePostRequest(url)(payload, params);
};

//======================= GET - AUTH REQUESTS ====================
export const simpleGetRequest = url => (params, clearToken = false) => {
    if (clearToken) {
        alterAuthTokenInHeader(null);
    }
    return api.get(url, params)
};

export const authorizedGetRequest = url => (token, params = {}) => {
    alterAuthTokenInHeader(token);
    return simpleGetRequest(url)(params);
};

// GET - common instance
const getInstance = (instance) => {
    return (params) => {
        return api.get(instance, params).then((res)=>res.data)
    }
};

// POST - add instance
const postInstance = (instance) => {
    return (data) => {
        return api.post(instance, Array.isArray(data) ? data : [data]).then((res)=>res.data)
    }
};

// POST - update instance
const updateInstance = (instance) => {
    return (data) => {
        return api.post(instance, Array.isArray(data) ? data : [data]).then((res)=>res.data)
    }
};

// POST - remove instance
const removeInstance = (instance) => {
    return (data) => {
        console.log('data',data);
        return api.post(instance, Array.isArray(data) ? data : [data]).then((res)=>res.data)
    }
};

//GET PAGED
export const getPagedItems = async (
    promise,
    options = {},
    array = []
) => {

    return promise({params: options})
        .then(res => {
            console.log('res',res);
            const {items,nextPage: page,hasNextPage} = res.data;
            array = array.concat(items);

            const params = {
                ...options,
                page,
            };

            if (hasNextPage) {
                return getPagedItems(promise, params, array)
            } else {
                return Promise.resolve(array)
            }
        })
        .catch(Promise.reject)
};

const PAGED_OPTIONS = (props) => ({
    ...{limit: 100},
    ...props,
});

// GET - Get Instance by ID
export const getIncome = (id, params) => getInstance(`/incomes/${id}`)(params);
export const getSource = (id, params) => getInstance(`/sources/${id}`)(params);
export const getTag = (id, params) => getInstance(`/tags/${id}`)(params);
export const getGenre = (id, params) => getInstance(`/genres/${id}`)(params);
export const getCurrency = (id, params) => getInstance(`/currencies/${id}`)(params);
export const getUser = (id, params) => getInstance(`/users/${id}`)(params);

// GET - Get Instances
export const getAny = (type, thunk) => thunk[`get${upperFirst(type)}Thunk`];
export const getIncomes = (params) => getInstance('/incomes')(params);
export const getTags = (params) => getInstance('/tags')(params);
export const getSources = (params) => getInstance('/sources')(params);
export const getGenres = (params) => getInstance('/genres')(params);
export const getCurrencies = (params) => getInstance('/currencies')(params);
export const getUsers = (params) => getInstance('/users')(params);

// POST - Add Instance by data[array || object]
export const postAny = (type, thunk) => thunk[`post${upperFirst(type)}Thunk`];
export const postIncomes = (data) => postInstance('/incomes/add')(data);
export const postSources = (data) => postInstance('/sources/add')(data);
export const postTags = (data) => postInstance('/tags/add')(data);
export const postGenres = (data) => postInstance('/genres/add')(data);
export const postCurrencies = (data) => postInstance('/currencies/add')(data);
export const postUsers = (data) => postInstance('/users/add')(data);

// POST - Update Instance by data[array || object]
export const updateAny = (type, thunk) => thunk[`update${upperFirst(type)}Thunk`];
export const updateIncomes = (data) => updateInstance('/incomes/update')(data);
export const updateSources = (data) => updateInstance('/sources/update')(data);
export const updateTags = (data) => updateInstance('/tags/update')(data);
export const updateGenres = (data) => updateInstance('/genres/update')(data);
export const updateCurrencies = (data) => updateInstance('/currencies/update')(data);

// DELETE - Delete Instances by ids array
export const removeAny = (type, thunk) => thunk[`remove${upperFirst(type)}Thunk`];
export const removeIncomes = (data) => removeInstance('/incomes/delete')(data);
export const removeSources = (data) => removeInstance('/sources/delete')(data);
export const removeTags = (data) => removeInstance('/tags/delete')(data);
export const removeGenres = (data) => removeInstance('/genres/delete')(data);
export const removeCurrencies = (data) => removeInstance('/currencies/delete')(data);


// GET - Get paged Instances
export const getIncomesPaged = (options) => getPagedItems(getInstance('/incomes'), PAGED_OPTIONS(options));
export const getTagsPaged = (options) => getPagedItems(getInstance('/tags'), PAGED_OPTIONS(options));
export const getUsersPaged = (options) => getPagedItems(getInstance('/users'), PAGED_OPTIONS(options));
export const getSourcesPaged = (options) => getPagedItems(getInstance('/sources'), PAGED_OPTIONS(options));
export const getGenresPaged = (options) => getPagedItems(getInstance('/genres'), PAGED_OPTIONS(options));
export const getCurrenciesPaged = (options) => getPagedItems(getInstance('/currencies'), PAGED_OPTIONS(options));


// export const getUsers = (params) => getInstance('/users')(params);
// export const getSources = (params) => getInstance('/sources')(params);
// export const getTags = (params) => getInstance('/tags')(params);
// export const getGenres = (params) => getInstance('/genres')(params);
// export const getCurrencies = (params) => getInstance('/currencies')(params);


// AUTH
export const postUser = params => {
    return simplePostRequest('/auth/registration')(params)
        .then(res=>res.data)
        .catch(err=>err);
};

export const postLogin = params => {
    return simplePostRequest('/auth/login')(params)
        .then(res=>{
            console.log('postLogin',res.data);
            return res.data;
        })
        .catch(err=>err);
};

export const getLogin = params => {
    return authorizedGetRequest('/auth/profile')(params)
        .then(res=>{
            console.log('res.data.user.exp',res.data.user.exp)
            return res.data;
        })
        .catch(err=>err);
};

export default {
    getIncome,
    getTag,
    getGenre,
    getCurrency,
    getSource,
    getUser,

    postIncomes,
    postTags,
    postGenres,
    postCurrencies,
    postSources,
    postUsers,

    updateIncomes,
    updateTags,
    updateGenres,
    updateCurrencies,
    updateSources,

    removeIncomes,
    removeTags,
    removeGenres,
    removeCurrencies,
    removeSources,

    getIncomes,
    getTags,
    getGenres,
    getCurrencies,
    getUsers,
    getSources,

    getIncomesPaged,
    getTagsPaged,
    getUsersPaged,
    getSourcesPaged,
    getGenresPaged,
    getCurrenciesPaged,
}