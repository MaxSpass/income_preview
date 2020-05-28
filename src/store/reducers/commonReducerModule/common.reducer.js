import {upperFirst, snakeCase, isFunction, findIndex} from 'lodash';

import API from "../../../api/index";

export default function(type, props) {
    const TYPE = upperFirst(type);
    const keyFetchLoadingAction = `fetch${TYPE}Loading`;
    const keyFetchSuccessAction = `fetch${TYPE}Success`;
    const keyFetchErrorAction = `fetch${TYPE}Error`;

    const keyAddLoadingAction = `add${TYPE}Loading`;
    const keyAddSuccessAction = `add${TYPE}Success`;
    const keyAddErrorAction = `add${TYPE}Error`;

    const keyUpdateLoadingAction = `update${TYPE}Loading`;
    const keyUpdateSuccessAction = `update${TYPE}Success`;
    const keyUpdateErrorAction = `update${TYPE}Error`;

    const keyDeleteLoadingAction = `delete${TYPE}Loading`;
    const keyDeleteSuccessAction = `delete${TYPE}Success`;
    const keyDeleteErrorAction = `delete${TYPE}Error`;

    const initialState = {
        items: [],
        error: null,
        isLoading: false,
    };

    const actions = {
        FETCH_LOADING: snakeCase(keyFetchLoadingAction).toUpperCase(),
        FETCH_SUCCESS: snakeCase(keyFetchSuccessAction).toUpperCase(),
        FETCH_ERROR: snakeCase(keyFetchErrorAction).toUpperCase(),

        ADD_LOADING: snakeCase(keyAddLoadingAction).toUpperCase(),
        ADD_SUCCESS: snakeCase(keyAddSuccessAction).toUpperCase(),
        ADD_ERROR: snakeCase(keyAddErrorAction).toUpperCase(),

        UPDATE_LOADING: snakeCase(keyUpdateLoadingAction).toUpperCase(),
        UPDATE_SUCCESS: snakeCase(keyUpdateSuccessAction).toUpperCase(),
        UPDATE_ERROR: snakeCase(keyUpdateErrorAction).toUpperCase(),

        DELETE_LOADING: snakeCase(keyDeleteLoadingAction).toUpperCase(),
        DELETE_SUCCESS: snakeCase(keyDeleteSuccessAction).toUpperCase(),
        DELETE_ERROR: snakeCase(keyDeleteErrorAction).toUpperCase(),
    };

    const api = API;

    const {
        FETCH_LOADING,
        FETCH_SUCCESS,
        FETCH_ERROR,

        ADD_LOADING,
        ADD_SUCCESS,
        ADD_ERROR,

        UPDATE_LOADING,
        UPDATE_SUCCESS,
        UPDATE_ERROR,

        DELETE_LOADING,
        DELETE_SUCCESS,
        DELETE_ERROR,
    } = actions;

    const creators = {
        //GET
        [keyFetchLoadingAction]: (data) => {
            return {
                type: FETCH_LOADING,
                payload: data,
            }
        },
        [keyFetchSuccessAction]: (data) => {
            return {
                type: FETCH_SUCCESS,
                payload: data,
            }
        },
        [keyFetchErrorAction]: (data) => {
            return {
                type: FETCH_ERROR,
                payload: data,
            }
        },
        //ADD
        [keyAddLoadingAction]: (data) => {
            return {
                type: ADD_LOADING,
                payload: data,
            }
        },
        [keyAddSuccessAction]: (data) => {
            return {
                type: ADD_SUCCESS,
                payload: data,
            }
        },
        [keyAddErrorAction]: (data) => {
            return {
                type: ADD_ERROR,
                payload: data,
            }
        },
        //UPDATE
        [keyUpdateLoadingAction]: (data) => {
            return {
                type: UPDATE_LOADING,
                payload: data,
            }
        },
        [keyUpdateSuccessAction]: (data) => {
            return {
                type: UPDATE_SUCCESS,
                payload: data,
            }
        },
        [keyUpdateErrorAction]: (data) => {
            return {
                type: UPDATE_ERROR,
                payload: data,
            }
        },
        //REMOVE
        [keyDeleteLoadingAction]: (data) => {
            return {
                type: DELETE_LOADING,
                payload: data,
            }
        },
        [keyDeleteSuccessAction]: (data) => {
            return {
                type: DELETE_SUCCESS,
                payload: data,
            }
        },
        [keyDeleteErrorAction]: (data) => {
            return {
                type: DELETE_ERROR,
                payload: data,
            }
        },
    };

    const thunks = {
        [`get${TYPE}Thunk`]: (props = {}) => async (dispatch) => {
            const creatorGetType = props.paged ? `get${TYPE}Paged` : `get${TYPE}`;
            const getInstance = api[creatorGetType];

            //Actions
            const funcLoadingAC = isFunction(creators[keyFetchLoadingAction]) ? creators[keyFetchLoadingAction] : ()=>({});
            const funcSuccessAC = isFunction(creators[keyFetchSuccessAction]) ? creators[keyFetchSuccessAction] : ()=>({});
            const funcErrorAC = isFunction(creators[keyFetchSuccessAction]) ? creators[keyFetchSuccessAction] : ()=>({});

            dispatch(funcLoadingAC(true));

            if (isFunction(getInstance)) {
                try{
                    //@TODO: BIG CRUTCH
                    const response = await getInstance(props);
                    const payload = props.paged ? response : response.data;
                    dispatch(funcSuccessAC(payload));
                } catch (err) {
                    dispatch(funcErrorAC(err))
                }

            } else {
                throw new Error(`commonReducerModule: api[${creatorGetType}] is not a function`)
            }
        },
        [`post${TYPE}Thunk`]: (data = {}) => async (dispatch) => {
            const creatorGetType = `post${TYPE}`;
            const postInstance = api[creatorGetType];

            //Actions
            const funcLoadingAC = isFunction(creators[keyAddLoadingAction]) ? creators[keyAddLoadingAction] : ()=>({});
            const funcSuccessAC = isFunction(creators[keyAddSuccessAction]) ? creators[keyAddSuccessAction] : ()=>({});
            const funcErrorAC = isFunction(creators[keyAddErrorAction]) ? creators[keyAddErrorAction] : ()=>({});

            dispatch(funcLoadingAC(true));

            if (isFunction(postInstance)) {
                try{
                    const payload = await postInstance(data);
                    dispatch(funcSuccessAC(payload));
                } catch (err) {
                    dispatch(funcErrorAC(err))
                }

            } else {
                throw new Error(`commonReducerModule: api[${creatorGetType}] is not a function`)
            }
        },
        [`update${TYPE}Thunk`]: (data = {}) => async (dispatch) => {
            const creatorGetType = `update${TYPE}`;
            const updateInstance = api[creatorGetType];

            //Actions
            const funcLoadingAC = isFunction(creators[keyUpdateLoadingAction]) ? creators[keyUpdateLoadingAction] : ()=>({});
            const funcSuccessAC = isFunction(creators[keyUpdateSuccessAction]) ? creators[keyUpdateSuccessAction] : ()=>({});
            const funcErrorAC = isFunction(creators[keyUpdateErrorAction]) ? creators[keyUpdateErrorAction] : ()=>({});

            dispatch(funcLoadingAC(true));

            if (isFunction(updateInstance)) {
                try{
                    const payload = await updateInstance(data);
                    dispatch(funcSuccessAC(payload));
                } catch (err) {
                    dispatch(funcErrorAC(err))
                }

            } else {
                throw new Error(`commonReducerModule: api[${creatorGetType}] is not a function`)
            }
        },
        [`remove${TYPE}Thunk`]: (data = {}) => async (dispatch) => {
            const creatorGetType = `remove${TYPE}`;
            const deleteInstance = api[creatorGetType];

            //Actions
            const funcLoadingAC = isFunction(creators[keyDeleteLoadingAction]) ? creators[keyDeleteLoadingAction] : ()=>({});
            const funcSuccessAC = isFunction(creators[keyDeleteSuccessAction]) ? creators[keyDeleteSuccessAction] : ()=>({});
            const funcErrorAC = isFunction(creators[keyDeleteErrorAction]) ? creators[keyDeleteErrorAction] : ()=>({});

            dispatch(funcLoadingAC(true));

            if (isFunction(deleteInstance)) {
                try{
                    const payload = await deleteInstance(data);
                    dispatch(funcSuccessAC({
                        response: payload,
                        oldData: data,
                    }));
                } catch (err) {
                    dispatch(funcErrorAC(err))
                }

            } else {
                throw new Error(`commonReducerModule: api[${creatorGetType}] is not a function`)
            }
        },
    };

    const reducer = (state = initialState, {type, payload}) => {
        switch(type) {
            case FETCH_LOADING:
            case ADD_LOADING:
            case UPDATE_LOADING:
            case DELETE_LOADING:
                state = {
                    ...state,
                    isLoading: payload,
                };
                break;
            case FETCH_SUCCESS:
                state = {
                    ...state,
                    items: payload,
                    error: null,
                    isLoading: false,
                };
                break;
            case ADD_SUCCESS:
                console.log('ADD_SUCCESS', payload);
                state = {
                    ...state,
                    items: [...state.items, ...payload.data.items],
                    error: null,
                    isLoading: false,
                };
                break;
            case UPDATE_SUCCESS:
                console.log('UPDATE_SUCCESS', payload);
                payload.data.items.forEach(el=>{
                    const updatedIndex = findIndex(state.items, (sub)=>sub._id === el._id);
                    if(updatedIndex > -1) {
                        state.items.splice(Object.assign(updatedIndex, el),1,el);
                    }
                });
                state = {
                    ...state,
                    items: [...state.items],
                    error: null,
                    isLoading: false,
                };
                break;
            case DELETE_SUCCESS:
                console.log('DELETE_SUCCESS', payload);
                const oldData = payload.oldData;
                const removedIndex = findIndex(state.items, (sub)=>sub._id === oldData.id);
                if(removedIndex > -1) {
                    state.items.splice(removedIndex,1);
                }
                state = {
                    ...state,
                    items: [...state.items],
                    error: null,
                    isLoading: false,
                };
                break;
            case FETCH_ERROR:
            case ADD_ERROR:
            case UPDATE_ERROR:
            case DELETE_ERROR:
                state = {
                    ...state,
                    error: payload,
                    isLoading: false,
                };
                break;
            default:
                break;
        }
        return state;
    };

    return {
        actions,
        creators,
        thunks,
        reducer,
    }
};