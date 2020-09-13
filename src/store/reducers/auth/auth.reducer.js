import {postUser, postLogin, getLogin} from '../../../api/index';

const INITIAL_STATE = ()=> {
    // const token = localStorage.getItem("token");
    return {
        currentUser: null,
        isAuth: !!localStorage.getItem("token"),
        error: null,
        isLoading: false,
    }
};

const initialState = INITIAL_STATE();

const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";

const SET_TOKEN = "SET_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";

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

const logoutAC = payload => ({
   type: AUTH_LOGOUT,
   payload,
});

const setTokenAC = payload => ({
    type: SET_TOKEN,
    payload,
});

const removeTokenAC = payload => ({
    type: REMOVE_TOKEN,
    payload,
});

const setToken = obj => {
    localStorage.setItem("token", obj.token);
    localStorage.setItem('token_exp', obj.exp * 1000);
};

const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_exp');
};

export const userPostThunk = props => dispatch => {
    dispatch(loginRequestAC(true));
    return postUser(props)
        .then(({data,error}) => {
            if (error) {
                dispatch(removeTokenAC())
                dispatch(logoutAC())
            }
            else {
                dispatch(setTokenAC({
                    token: data.token,
                    exp: data.user.exp,
                }))
                dispatch(loginSuccessAC(data.user))
            }
        })
        .catch(err=>loginErrorAC(err))
};

export const userLoginThunk = props => dispatch => {
    dispatch(loginRequestAC(true));
    return postLogin(props)
        .then(res=>{
            const token = res.data.token;
            const user = res.data.user;
            const exp = user.exp;
            if (res.error) {
                dispatch(removeTokenAC())
                dispatch(logoutAC())
            }
            else {
                // localStorage.setItem("token", data.token);
                dispatch(setTokenAC({
                    token,
                    exp,
                }))
                dispatch(loginSuccessAC({
                    user,
                }))
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
                    dispatch(removeTokenAC())
                    dispatch(logoutAC())
                }
                else {
                    if(user) {
                        console.log('user',user);
                        dispatch(loginSuccessAC({
                            user,
                        }))
                    }
                }
            })
            .catch(err=>loginErrorAC(err))
    }
};

export const userLogoutThunk = props => dispatch => {
    dispatch(removeTokenAC());
    dispatch(logoutAC());
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
            state = INITIAL_STATE();
            break;
        case SET_TOKEN:
            setToken({
                token: payload.token,
                exp: payload.exp,
            })
            break;
        case REMOVE_TOKEN:
            removeToken();
            break;
        default:
            break;
    }
    return state;
};