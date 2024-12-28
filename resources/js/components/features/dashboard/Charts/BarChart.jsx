import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function BarChart({ data, xDataKey, yDataKey }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          className="lg:text-md text-[10px]"
          dataKey={xDataKey}
        />
        <YAxis
          domain={
            yDataKey === 'total_spent' ? [0, 5000] : [0, 5]
          }
          className="lg:text-md text-[10px]"
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={yDataKey}
          fill={
            yDataKey !== 'total_spent'
              ? '#0088FE'
              : '#00C49F'
          }
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
