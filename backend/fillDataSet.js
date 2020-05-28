const axios = require('axios');
const RouteObject = require('./routes');
const mochData = require('./moch/dateSet');

const fillDataSet = () => {
    for(let RouteItem in RouteObject) {
        // console.log(`========================${RouteItem}===========================`);
        // console.log(mochData[RouteItem]);
        // console.log(`========================END===========================`);
        if(mochData[RouteItem]) {
            axios.post(`http://localhost:5000${RouteItem}/add`, mochData[RouteItem]).catch(el=>el);
        }
    }
};

fillDataSet();