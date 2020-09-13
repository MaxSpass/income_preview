import React from 'react';
import TableMaterial from 'material-table'; // https://material-table.com/#/docs/all-props
import {pick, isFunction} from 'lodash';

export default function MaterialTable(props) {
    const data = props ? props.data : {};
    const [state, setState] = React.useState(data);
    const [items, setItems] = React.useState([]);

    const fields = state.columns.map(el=>el.field);
    const transform = isFunction(props.transform) ? props.transform : el=>el;

    React.useEffect((props)=>{
        const newItems = state.data.map(el=>{
            const picked = pick(el, fields);
            return transform(picked);
        });
        setState(data);
        setItems(newItems);
        },// eslint-disable-next-line react-hooks/exhaustive-deps
        [data]);

    return (
        <TableMaterial
            title={state.title}
            columns={state.columns}
            data={items}
            options={{
                exportButton: true,
            }}
            editable={{
                isEditable: ()=>true, //default: true
                isDeletable: ()=>true, //default: true
                onRowAdd: (newData) => new Promise(async (resolve, reject)=>{
                    try{
                        const res = await props.onRowAdd(newData);
                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                }),
                onRowUpdate: ((fields)=>{
                    return (newData, oldData) => {
                       return new Promise(async (resolve, reject)=>{
                           try{
                               const res = await props.onRowUpdate({
                                   id: newData._id,
                                   data: pick(newData, fields) //Pick by scheme keys
                               });
                               resolve(res);
                           } catch (e) {
                               reject(e);
                           }
                       })
                    }
                })(fields),
                onRowDelete: (oldData) => new Promise(async (resolve, reject)=>{
                    try{
                        const res = await props.onRowDelete({
                            id: oldData._id,
                            data: oldData
                        });
                        resolve(res)
                    } catch (e) {
                        reject(e);
                    }
                }),
            }}
            {...state}
        />
    );
};