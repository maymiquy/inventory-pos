import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function LineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid
          stroke="#8884d8"
          strokeDasharray="4 4"
        />
        <XAxis
          dataKey="month"
          className="lg:text-md text-[9px]"
        />
        <YAxis
          className="lg:text-md text-[10px]"
          domain={[0, 8000]}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#3eae38"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#db9797"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
