import reducerModule from '../commonReducerModule/common.reducer';

const reducerFacade = reducerModule('currencies');
const reducer = reducerFacade.reducer;

export const actions = reducerFacade.actions;
export const creators = reducerFacade.creators;
export const thunks = reducerFacade.thunks;

export default reducer;

