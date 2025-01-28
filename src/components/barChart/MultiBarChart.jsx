import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

const data = [
  { name: 'Monday', todo: 16, inProgress: 40, completed: 24 },
  { name: 'Tuesday', todo: 8, inProgress: 24, completed: 16 },
  { name: 'Wednesday', todo: 24, inProgress: 56, completed: 32 },
  { name: 'Thursday', todo: 0, inProgress: 24, completed: 8 },
  { name: 'Friday', todo: 24, inProgress: 40, completed: 32 },
  { name: 'Saturday', todo: 32, inProgress: 64, completed: 40 },
  { name: 'Sunday', todo: 24, inProgress: 56, completed: 32 },
]

const MultiBarChart = () => {
  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend />
          <Bar dataKey="todo" fill="#F5CBA7" name="To do" />
          <Bar dataKey="inProgress" fill="#AED6F1" name="In progress" />
          <Bar dataKey="completed" fill="#ABEBC6" name="Completed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MultiBarChart
