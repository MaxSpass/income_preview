import {postUser, postLogin, getLogin} from '../../../api/index';

const INITIAL_STATE = ()=>({
    currentUser: null,
    isAuth: false,
    error: null,
    isLoading: false,
});

const initialState = INITIAL_STATE();

const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";

const loginRequestAC = payload => ({
    type: FETCH_AUTH_REQUEST,
    payload,
});

const loginSuccessAC = payload => ({
    type: FETCH_AUTH_SUCCESS,
    payload,
});

const loginErrorAC = payload => ({
    type: FETCH_AUTH_ERROR,
    payload,
});

export const userPostThunk = props => dispatch => {
    dispatch(loginRequestAC(true));
    return postUser(props)
        .then(({data,error}) => {
            if (error) {
                //@TODO Handle error
                console.log('@TODO Handle error')
            }
            else {
                localStorage.setItem("token", data.token);
                dispatch(loginSuccessAC(data.user))
            }
        })
        .catch(err=>loginErrorAC(err))
};

export const userLoginThunk = props => dispatch => {
    dispatch(loginRequestAC(true));
    return postLogin(props)
        .then(({data,error})=>{
            if (error) {
                //@TODO Handle error
                console.log('@TODO Handle error')
            }
            else {
                localStorage.setItem("token", data.token);
                dispatch(loginSuccessAC(data.user))
            }
        })
        .catch(err=>loginErrorAC(err))
};

export const userProfileThunk = props => dispatch => {
    dispatch(loginRequestAC(true));
    const token = localStorage.getItem("token");
    if(token) {
        return getLogin(token)
            .then((res)=>{
                const {user,error} = res;
                if (error) {
                    //@TODO Handle error
                    localStorage.removeItem("token")
                }
                else {
                    if(user) {
                        localStorage.setItem("token", token);
                        dispatch(loginSuccessAC(user))
                    }
                }
            })
            .catch(err=>loginErrorAC(err))
    }
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case FETCH_AUTH_REQUEST:
            state = {
                ...state,
                isLoading: payload,
            };
            break;
        case FETCH_AUTH_SUCCESS:
            state = {
                ...state,
                currentUser: payload,
                isAuth: true,
                error: null,
                isLoading: false,
            };
            break;
        case FETCH_AUTH_ERROR:
            state = {
                ...state,
                isAuth: false,
                error: payload,
                isLoading: false,
            };
            break;
        case AUTH_LOGOUT:
            localStorage.removeItem('token');
            state = INITIAL_STATE();
            break;
        default:
            break;
    }
    return state;
};