const AuthModel = require('../../modules/models/auth/index.model');
const CurrencyModel = require('../../modules/models/entities/currency.model');
const GenreModel = require('../../modules/models/entities/genre.model');
const IncomeModel = require('../../modules/models/entities/income.model');
const SourceModel = require('../../modules/models/entities/source.model');
const TagModel = require('../../modules/models/entities/tag.model');
const UserModel = require('../../modules/models/entities/user.model');

const authModel = [
    {
        root: '/auth',
        model: AuthModel
    }
];

const entitiesModel = [
    {
        root: '/currencies',
        model: CurrencyModel,
        props: {
            declensions: ['Currency','Currencies','Currencies'],
        },
    },
    {
        root: '/genres',
        model: GenreModel,
        props: {
            declensions: ['Genre','Genres','Genres'],
        },
    },
    {
        root: '/incomes',
        model: IncomeModel,
        props: {
            declensions: ['Income','Incomes','Incomes'],
        },
    },
    {
        root: '/sources',
        model: SourceModel,
        props: {
            declensions: ['Source','Sources','Sources'],
        },
    },
    {
        root: '/tags',
        model: TagModel,
        props: {
            declensions: ['Tag','Tags','Tags'],
        },
    },
    {
        root: '/users',
        model: UserModel,
        props: {
            declensions: ['User','Users','Users'],
        },
    },
];

module.exports = {
    authModel,
    entitiesModel,
};