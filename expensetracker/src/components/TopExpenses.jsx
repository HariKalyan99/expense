import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

const TopExpenses = () => {
  
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          
          width={500}
          height={400}
          data={data}
          margin={{
            top: 40,
            right: 20,
            bottom: 60,
            left: 20,
          }}
        >
          <XAxis type="number" />
          <YAxis type='name'>
          <Label  offset={0} position="left" />
          </YAxis>
          <Tooltip />
          <Bar dataKey="amt" barSize={20} fill="#413ea0" layout="horizontal"/>
        </ComposedChart>
      </ResponsiveContainer>
    );
}

export default TopExpenses;