import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["reservation", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reservation/${user.email}`);
      // console.log(res);
      return res.data;
    },
  });

  const handleDeleteBooking = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reservation/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // console.log(bookings);
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
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="btn btn-error btn-xs text-white rounded-none"
                      >
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
