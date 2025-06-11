import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      // console.log(res);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl m-10">Total Payments: {payments.length}</h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5  m-10">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-400 text-black text-[13px]">
            <tr>
              <th>Transaction Id</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id}>
                <td>{payment.transactionId}</td>
                <td>$ {payment.price}</td>
                <td>{payment.date}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
