import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { FcApproval } from "react-icons/fc";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reservation");
      //console.log(res);
      return res.data;
    },
  });

  const handleCancel = async id => {
    console.log("please cancel");
    try {
      const res = await axiosSecure.patch(`/reservation/${id}`, {
        status: "cancelled",
      });
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
      console.log(res);
    } catch (error) {
      console.error("Cancellation failed", error);
    }
  };

  const handleApprove = async id => {
    // console.log("please approve");
    try {
      const res = await axiosSecure.patch(`/reservation/${id}`, {
        status: "confirmed!",
      });
      if (res.data.modifiedCount > 0) {
        refetch();
        queryClient.invalidateQueries({ queryKey: ["reservation"] });
        if (bookings.email) {
          queryClient.invalidateQueries({
            queryKey: ["reservation", bookings.email],
          });
        }
      }
      //console.log(res);
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-2 text-black">
      <SectionTitle
        heading={"MANAGE ALL BOOKINGS"}
        subheading={"At a Glance!"}
      ></SectionTitle>

      <h1 className="m-5 text-2xl font-medium">
        Total Requests for Reservation: {bookings.length}
      </h1>
      <div className="overflow-x-auto rounded-none bg-base-100 m-4">
        <table className="table table-xs ">
          {/* head */}
          <thead className="bg-orange-400 text-white">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                  <td>
                    {booking.status === "confirmed!" ? (
                      <FcApproval className="text-2xl text-green-400"></FcApproval>
                    ) : (
                      <button
                        onClick={() => handleApprove(booking._id)}
                        className="btn btn-xs btn-success text-white font-thin rounded-none"
                      >
                        approve
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-xs btn-error  text-white font-thin rounded-none"
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
  );
};

export default ManageBookings;
