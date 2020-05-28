import { toast, Slide } from 'react-toastify';
import { uniqueId } from 'lodash';

// EXAMPLE: https://fkhadra.github.io/react-toastify/
// DOC: https://github.com/fkhadra/react-toastify#pause-toast-timer-when-the-window-loses-focus

const NOTIFY_ADD = "NOTIFY_ADD";
const NOTIFY_REMOVE = "NOTIFY_REMOVE";
const NOTIFY_DEFAULT = "NOTIFY_DEFAULT";
const NOTIFY_SUCCESS = "NOTIFY_SUCCESS";
const NOTIFY_WARNING = "NOTIFY_WARNING";
const NOTIFY_ERROR = "NOTIFY_ERROR";

export const NOTIFY_CONTAINER_PROPS = {
    containerId: 'A',
    position: 'bottom-right',
    transition: Slide,
};

export const NOTIFY_PROPS = {
    autoClose: 4000,
    containerId: NOTIFY_CONTAINER_PROPS.containerId,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
};

const INITIAL_STATE = ()=>({
    type: null,
    text: null,
    activeNotifies: [],
});

const initialState = INITIAL_STATE();

export const addNotifyAC = () => ({
    type: NOTIFY_ADD,
});

export const removeNotifyAC = (toastId) => ({
    type: NOTIFY_REMOVE,
    payload: toastId,
});

export const notifyDefaultAC = payload => ({
    type: NOTIFY_DEFAULT,
    payload: {
        type: toast.TYPE.DEFAULT,
        text: payload,
    },
});

export const notifySuccessAC = payload => ({
    type: NOTIFY_SUCCESS,
    payload: {
        type: toast.TYPE.SUCCESS,
        text: payload,
    },
});

export const notifyWarningAC = payload => ({
    type: NOTIFY_WARNING,
    payload: {
        type: toast.TYPE.WARNING,
        text: payload,
    },
});

export const notifyErrorAC = payload => ({
    type: NOTIFY_ERROR,
    payload: {
        type: toast.TYPE.ERROR,
        text: payload,
    },
});


export const removeNotifyThunk = toastId => dispatch => {
    dispatch(removeNotifyAC(toastId));
};

export const notifyDefaultThunk = text => dispatch => {
    text = Array.isArray(text) ? text.join("\r\n") : text;
    dispatch(notifyDefaultAC(text));
    dispatch(addNotifyAC());
    setTimeout(()=>{
        dispatch(removeNotifyAC());
    }, NOTIFY_PROPS.autoClose)
};

export const notifySuccessThunk = text => dispatch => {
    text = Array.isArray(text) ? text.join("\r\n") : text;
    dispatch(notifySuccessAC(text));
    dispatch(addNotifyAC());
    setTimeout(()=>{
        dispatch(removeNotifyAC());
    }, NOTIFY_PROPS.autoClose)
};

export const notifyWarningThunk = text => dispatch => {
    text = Array.isArray(text) ? text.join("\r\n") : text;
    dispatch(notifyWarningAC(text));
    dispatch(addNotifyAC());
    setTimeout(()=>{
        dispatch(removeNotifyAC());
    }, NOTIFY_PROPS.autoClose)
};

export const notifyErrorThunk = text => dispatch => {
    text = Array.isArray(text) ? text.join("\r\n") : text;
    dispatch(notifyErrorAC(text));
    dispatch(addNotifyAC());
    setTimeout(()=>{
        dispatch(removeNotifyAC());
    }, NOTIFY_PROPS.autoClose)
};

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case NOTIFY_DEFAULT:
        case NOTIFY_SUCCESS:
        case NOTIFY_WARNING:
        case NOTIFY_ERROR:
            state = {
                ...state,
                type: payload.type,
                text: payload.text,
            };
            //@TODO
            break;
        case NOTIFY_ADD:
            const customToastId = uniqueId();
            const newActiveCopy = state.activeNotifies.slice();
            newActiveCopy.push(customToastId);

            toast(state.text, {
                ...NOTIFY_PROPS,
                toastId: customToastId,
                type: state.type,
            });

            state = {
                ...state,
                activeNotifies: [...newActiveCopy],
                type: null,
                text: null,
            };
            break;
        case NOTIFY_REMOVE:
            const removedIndex = state.activeNotifies.indexOf(payload);
            state.activeNotifies.splice(removedIndex, 1);
            state = {
                ...state,
                activeNotifies: [...state.activeNotifies],
                type: null,
                text: null,
            };
            break;
        default:
            break;
    }
    return state;
};