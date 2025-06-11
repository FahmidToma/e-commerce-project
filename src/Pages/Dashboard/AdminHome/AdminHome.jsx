import { useQuery } from "@tanstack/react-query";
//import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  //const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      //console.log(res.data);
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      // console.log("Response of order-stats", res.data);
      return res.data;
    },
  });

  //console.log("I am chart Data", chartData);
  // bar graph info
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = props => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //pie chart custom shape
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data => {
    return { name: data.category, value: data.revenue };
  });
  //console.log("pieChart data", pieChartData);

  //if (isLoading || !chartData) {
  //  return <div className="text-center mt-10">Loading stats...</div>;
  //}

  const { data: paymentData = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      //console.log("Response of payments", res.data);
      return res.data;
    },
  });
  //console.log("I am paymentData", paymentData);

  return (
    <div className="bg-gray-200 min-h-screen p-2 text-black">
      <div className="stats stats-vertical  lg:stats-horizontal shadow gap-5 bg-gray-200 m-10">
        <div className="stat bg-purple-500 text-white">
          <div className="stat-value">$ {stats.revenue}</div>

          <div className="stat-title text-white">Revenue</div>
        </div>

        <div className="stat bg-yellow-300 text-white">
          <div className="stat-value">{stats.users}</div>

          <div className="stat-title text-white">Customers</div>
        </div>

        <div className="stat bg-pink-500 text-white">
          <div className="stat-value">{stats.foodItems}</div>
          {/*<div className="stat-desc">↘︎ 90 (14%)</div>*/}
          <div className="stat-title text-white">Food Item</div>
        </div>

        <div className="stat bg-blue-400 text-white">
          <div className="stat-value">{stats.orders}</div>

          <div className="stat-title text-white">Orders</div>
        </div>
      </div>
      <div className="flex justify-center">
        {/* barchart */}
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Bar
            dataKey="quantity"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </div>
      {/*  pieChart*/}
      <div className="flex justify-center">
        <PieChart width={400} height={400}>
          <Legend></Legend>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* pending order table */}
      <div className="mt-7">
        <h1 className=" text-2xl text-center  mb-5">
          Your pending orders ({paymentData.length})
        </h1>

        <div className="overflow-x-auto  bg-base-100 m-4">
          <table className="table">
            {/* head */}
            <thead className="bg-orange-400 text-white">
              <tr>
                <th>Email</th>
                <th>TransactionId</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {paymentData &&
                paymentData.map(payment => (
                  <tr key={payment._id}>
                    <th>{payment.email}</th>
                    <td>{payment.transactionId}</td>
                    <td>{payment.date}</td>
                    <td>{payment.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
