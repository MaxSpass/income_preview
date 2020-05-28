import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import React from "react";
import {groupBy, reduce, upperFirst} from "lodash";

const generateRandomRGB = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x}
              y={y}
              fill="white"
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const getLabelWrapperBGStyle = background => ({
    background: `linear-gradient(to right, #fff, ${background} 75%)`,
});

const getLabelStyle = () => ({
    color: 'inherit',
    fontSize: '13px',
    borderRadius: '10px',
    padding: '2px 10px',
});

function PieGraph(props) {
    const colors = props.colors || props.data.map(generateRandomRGB);
    const radius = props.radius || 175;
    const dataset = props.data;
    const sideValue = Math.round(radius * 2.5);
    return (
        <div style={{ height: sideValue,flexBasis: sideValue }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={dataset}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={radius}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            dataset.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function PieChartExtended(props) {
    const [data, setData] = React.useState([]);
    const [colors, setColors] = React.useState([]);
    const [labels, setLabels] = React.useState([]);

    React.useEffect(()=>{
        let grouped = groupBy(props.array, el=>el[props.groupedBy]);
        let data = reduce(grouped, ((acc, value, key)=>{
            acc.push(props.transform(key,value));
            return acc;
        }),[]);

        const dataLabels = Object.keys(grouped);
        const generatedColors = dataLabels.map(generateRandomRGB);

        setData(data);
        setColors(generatedColors);
        setLabels(dataLabels);
    },// eslint-disable-next-line react-hooks/exhaustive-deps
     []);

    return(
        <div className="d-flex align-items-center justify-content-center flex-wrap">
            {
                data.length && <PieGraph data={data} colors={colors} radius={175} />
            }
            <div className="h-100 flex-grow-1">
                {
                    labels.map((el,i)=>{
                        return <p
                            key={`label-${el}`}
                            style={getLabelWrapperBGStyle(colors[i])}
                            className="p-1 mb-1"
                        ><span style={getLabelStyle(colors[i])} className="font-weight-bold">{upperFirst(el)}</span></p>
                    })
                }
            </div>
        </div>
    )
}