import React, {Component} from "react";
import {connect} from 'react-redux';
import {Grid, /*Paper*/} from "@material-ui/core";
import MaterialTable from "../../../components/common/MaterialTable";
import {upperFirst} from 'lodash';
import {getAny,postAny,updateAny,removeAny} from '../../../api/index';
import {thunks as incomeThunks} from '../../../store/reducers/entities/income.reducer';
import {thunks as tagThunks} from '../../../store/reducers/entities/tag.reducer';
import {thunks as genreThunks} from '../../../store/reducers/entities/genre.reducer';
import {thunks as userThunks} from '../../../store/reducers/entities/user.reducer';
import {thunks as sourceThunks} from '../../../store/reducers/entities/source.reducer';
// import {thunks as currencyThunks} from '../../../store/reducers/entities/currency.reducer';

import {createTableColumns} from "../../../helpers";

const actionTypes = ['get','post','update','remove'];
const instanceTypes = ['incomes','tags','genres','users','sources'];

class Dashboard extends Component {
    componentDidMount() {
        this.asyncAnyAction('get', 'incomes')();
        this.asyncAnyAction('get', 'tags')();
        this.asyncAnyAction('get', 'genres')();
        this.asyncAnyAction('get', 'users')();
        this.asyncAnyAction('get', 'sources')();
    }
    asyncAnyAction(actionType, instanceType) {
        if(!actionTypes.some(el=>el === actionType) || !instanceTypes.some(el=>el === instanceType)) {
            throw new Error('Invalid actionType or instanceType');
        }
        const methodName = `${actionType}${upperFirst(instanceType)}`;
        return this.props[methodName];
    }
    render() {
        // onRowAdd - args: (newData);
        // onRowUpdate - args: (newData, oldData)
        // onRowDelete - args: (oldData);

        return(
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MaterialTable
                            data={this.props.incomesTableData}
                            onRowAdd={this.asyncAnyAction('post', 'incomes')}
                            onRowUpdate={this.asyncAnyAction('update', 'incomes')}
                            onRowDelete={this.asyncAnyAction('remove', 'incomes')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MaterialTable
                            data={this.props.sourcesTableData}
                            onRowAdd={this.asyncAnyAction('post', 'sources')}
                            onRowUpdate={this.asyncAnyAction('update', 'sources')}
                            onRowDelete={this.asyncAnyAction('remove', 'sources')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MaterialTable
                            data={this.props.tagsTableData}
                            onRowAdd={this.asyncAnyAction('post', 'tags')}
                            onRowUpdate={this.asyncAnyAction('update', 'tags')}
                            onRowDelete={this.asyncAnyAction('remove', 'tags')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MaterialTable
                            data={this.props.genresTableData}
                            onRowAdd={this.asyncAnyAction('post', 'genres')}
                            onRowUpdate={this.asyncAnyAction('update', 'genres')}
                            onRowDelete={this.asyncAnyAction('remove', 'genres')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MaterialTable
                            data={this.props.usersTableData}
                            onRowAdd={this.asyncAnyAction('post', 'users')}
                            onRowUpdate={this.asyncAnyAction('update', 'users')}
                            onRowDelete={this.asyncAnyAction('remove', 'users')}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        tags: state.tags.items,
        genres: state.genres.items,
        users: state.users.items,
        incomes: state.incomes.items,
        sources: state.sources.items,
        currencies: state.currencies.items,

        tagsTableData: ()=>{
            const columns = createTableColumns(['Title']);
            const title = 'All Tags';
            return {
                data: state.tags.items,
                columns,
                title,
                isLoading: state.tags.isLoading,
            }
        },
        genresTableData: ()=>{
            const columns = createTableColumns(['Title']);
            const title = 'All Genres';
            return {
                data: state.genres.items,
                columns,
                title,
                isLoading: state.genres.isLoading,
            }
        },

        usersTableData: ()=>{
            const columns = createTableColumns(['Username']);
            const title = 'All Users';
            return {
                data: state.users.items,
                columns,
                title,
                isLoading: state.users.isLoading,
            }
        },

        incomesTableData: ()=>{
            const columns = createTableColumns(
                ['Date','Title','Genre','Source', 'Price'],
                null,
                (el)=>{
                    const field = el.toLowerCase();
                    if(field === "price") {
                        return {
                            title: "Price (usd)"
                        }
                    }
                }
            );
            const title = 'All Incomes';
            return {
                data: state.incomes.items, // incomes
                columns,
                title,
                isLoading: state.incomes.isLoading,
                isConsole: true,
            }
        },

        sourcesTableData: ()=>{
            const columns = createTableColumns(['Title', 'Url']);
            const title = 'All Sources';
            return {
                data: state.sources.items,
                columns,
                title,
                isLoading: state.sources.isLoading,
            }
        },

        // currenciesTableData: ()=>{
        //     const columns = createTableColumns(['Title']);
        //     const title = 'All Currencies';
        //     return {
        //         data: state.currencies.items,
        //         columns,
        //         title,
        //         isLoading: state.currencies.isLoading,
        //     }
        // }
    }
};


export default connect(mapStateToProps, {
    getIncomes: getAny('incomes', incomeThunks),
    postIncomes: postAny('incomes', incomeThunks),
    updateIncomes: updateAny('incomes', incomeThunks),
    removeIncomes: removeAny('incomes', incomeThunks),
    getTags: getAny('tags', tagThunks),
    postTags: postAny('tags', tagThunks),
    updateTags: updateAny('tags', tagThunks),
    removeTags: removeAny('tags', tagThunks),
    getGenres: getAny('genres', genreThunks),
    postGenres: postAny('genres', genreThunks),
    updateGenres: updateAny('genres', genreThunks),
    removeGenres: removeAny('genres', genreThunks),
    getUsers: getAny('users', userThunks),
    postUsers: postAny('users', userThunks),
    updateUsers: updateAny('users', userThunks),
    removeUsers: removeAny('users', userThunks),
    getSources: getAny('sources', sourceThunks),
    postSources: postAny('sources', sourceThunks),
    updateSources: updateAny('sources', sourceThunks),
    removeSources: removeAny('sources', sourceThunks),
})(Dashboard);