import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function AreaChart({ data, xDataKey, yDataKey }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xDataKey}
          className="lg:text-md text-[10px]"
        />
        <YAxis
          className="lg:text-md text-[10px]"
          domain={[0, 5000]}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={yDataKey}
          stroke="#3eae38"
          fill="#8884d8"
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
