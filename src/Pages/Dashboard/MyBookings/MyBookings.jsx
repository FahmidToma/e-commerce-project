import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { data: bookings = [] } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reservation");
      console.log(res);
      return res.data;
    },
  });

  console.log(bookings);
  return (
    <div>
      <SectionTitle
        heading={"MY BOOKINGS"}
        subheading={"Excellent Ambience"}
      ></SectionTitle>
      <div className="m-4">
        <h1 className="text-2xl text-white font-medium mb-5">
          Total Bookings: {bookings.length}{" "}
        </h1>

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-xs">
            {/* head */}
            <thead className="bg-orange-400 text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <th>{index + 1}</th>
                    <td>{booking.name}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.guests}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button className="btn btn-error btn-xs text-white rounded-none">
                        cancel
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
