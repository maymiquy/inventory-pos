import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = [
  '#e52f2f',
  '#FFBB28',
  '#FF8042',
  '#00C49F',
  '#8884D8',
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-white p-2 shadow-lg">
        <p className="font-semibold">{data.name}</p>
        <p className="text-sm">
          Quantity: {data.quantity}
          <span className="ml-2 text-gray-500">
            (
            {((data.quantity / data.total) * 100).toFixed(
              1
            )}
            %)
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <ul className="mt-2">
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          className="mr-4 flex items-center"
        >
          <div
            className="mr-2 h-3 w-3"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span style={{ fontSize: '12px' }}>
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export function PieChart({ data, dataKey, nameKey }) {
  const total = data.reduce(
    (sum, item) => sum + item[dataKey],
    0
  );
  const dataWithTotal = data.map((item) => ({
    ...item,
    total,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={90}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          content={<CustomLegend />}
        />
        <Tooltip content={<CustomTooltip />} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
