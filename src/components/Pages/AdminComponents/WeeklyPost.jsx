import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function WeeklyPostUploadsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/weeklyPost')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeeklyPostUploadsChart;
