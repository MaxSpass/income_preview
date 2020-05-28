import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import tagReducer from './entities/tag.reducer';
import genreReducer from './entities/genre.reducer';
import userReducer from './entities/user.reducer';
import incomeReducer from './entities/income.reducer';
import sourceReducer from './entities/source.reducer';
import currencyReducer from './entities/currency.reducer';
import notifyReducer from './notify/notify.reducer';

export default combineReducers({
    auth: authReducer,
    tags: tagReducer,
    genres: genreReducer,
    users: userReducer,
    incomes: incomeReducer,
    sources: sourceReducer,
    currencies: currencyReducer,
    notify: notifyReducer,
})
