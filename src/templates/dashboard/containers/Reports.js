import React from 'react';
import {connect} from 'react-redux';
import {groupBy, reduce} from 'lodash';
import moment from 'moment';
import Title from '../../../components/common/Title';
import PieChartExtended from '../../../components/common/PieChartExtended';
import {thunks as incomeThunks} from "../../../store/reducers/entities/income.reducer";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    BarChart,
    Legend,
    Bar,
    ResponsiveContainer,
} from 'recharts';
import {
    Card,
    Grid,
} from "@material-ui/core";

class Reports extends React.Component {
    componentDidMount() {
        this.props.getIncomesPaged({
            paged: true,
        });
    }
    render() {
        const incomes = (this.props || {}).incomes || [];

        const groupedByTitle = groupBy(incomes, (el)=>el.title);
        const groupedByTest = groupBy(incomes, (result) => {
            return moment(result['date'], 'MM/DD/YYYY').startOf("months")
        });

        const getDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            // return dateString;
        };

        let resultArea = reduce(groupedByTest, ((acc, value, key)=>{
            acc.push({
                name: getDate(key),
                uv: value.reduce((acc,el)=>acc + el.price,0),
            });
            return acc;
        }),[]);

        let resultBar = reduce(groupedByTitle, ((acc, value, key)=>{
            acc.push({
                name: key,
                pv: value.reduce((acc,el)=>acc + el.price,0),
                uv: value.length,
            });
            return acc;
        }),[]);

        return (

            <Grid container spacing={3} className="d-flex">

                <Grid item sm={12} md={6}>
                    <Card className="p-4 mb-2">
                        <Title children="PieChart: Incomes by Price" />
                        {
                            incomes.length && <PieChartExtended
                                array={incomes}
                                groupedBy="title"
                                transform={(key, item)=>{
                                    const value = item.reduce((acc,el)=>acc + el.price,0);
                                    return {
                                        name: key,
                                        value,
                                        pv: value
                                    }
                                }}
                            />
                        }
                    </Card>
                </Grid>

                <Grid item sm={12} md={6}>
                    <Card className="p-4 mb-2">
                        <Title children="PieChart: Incomes by Genre" />
                        {
                            incomes.length && <PieChartExtended
                                array={incomes}
                                groupedBy="source"
                                transform={(key, item)=>({
                                    name: key,
                                    value: item.length,
                                })}
                            />
                        }
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className="p-4 mb-2">
                        <Title children="AreaChart: Incomes per months" />
                        {
                            incomes.length && <div style={{ height: '400px',flexBasis: '100%' }}>
                                <ResponsiveContainer>
                                    <AreaChart
                                        height={400}
                                        data={resultArea}
                                        margin={{
                                            top: 10, right: 30, left: 0, bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="2 2" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="uv" stroke="#3f51b6" fill="#3f51b6" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    </Card>
                </Grid>

                <Grid item sm={12} md={6}>
                    <Card className="p-4 mb-2">
                        <Title children="BarChart: Incomes quantity by sources title" />
                        {
                            resultBar.length && <div style={{ height: '400px',flexBasis: '100%' }}>
                                <ResponsiveContainer>
                                    <BarChart
                                        height={400}
                                        data={resultBar}
                                        margin={{
                                            top: 5, right: 30, left: 20, bottom: 5,
                                        }}
                                        barSize={20}
                                    >
                                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="pv" fill="#3f51b6" background={{ fill: '#8884d8' }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        }
                    </Card>
                </Grid>


            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        incomes: state.incomes.items
    }
};

export default connect(mapStateToProps,{
    getIncomesPaged: (props)=>incomeThunks["getIncomesThunk"](props),
})(Reports);