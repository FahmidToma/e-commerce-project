import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcApproval } from "react-icons/fc";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { SkeletonCard } from "@/Components/ui/skeleton";

const socket = io("https://e-commerce-project-server-demz.onrender.com");

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("newReservation", () => {
      //when new reservation is made by the user this part tells the get 'reservation' route that fetch the newbie
      queryClient.invalidateQueries(["reservation"]);
      toast.warn("You've got new request for reservation");
    });

    socket.on("reservationUpdated", data => {
      console.log("Reservation Updated:", data);
      //when admin updates reservation  this part tells the get 'reservation' route that it has changed
      queryClient.invalidateQueries(["reservation"]);
    });

    return () => {
      socket.off("newReservation");
      socket.off("reservationUpdated");
    };
  }, [queryClient]);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reservation");
      return res.data;
    },
  });

  const handleCancel = async id => {
    try {
      const res = await axiosSecure.patch(`/reservation/${id}`, {
        status: "cancelled",
      });

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

      console.log(res);
    } catch (error) {
      console.error("Cancellation failed", error);
    }
  };

  const handleApprove = async id => {
    try {
      const res = await axiosSecure.patch(`/reservation/${id}`, {
        status: "confirmed!",
      });
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        {" "}
        <SkeletonCard></SkeletonCard>
      </div>
    );

  return (
    <div className="bg-gray-200 min-h-screen p-2 text-black">
      <SectionTitle
        heading={"MANAGE ALL BOOKINGS"}
        subheading={"At a Glance!"}
      ></SectionTitle>

      {bookings.length == 0 ? (
        <h1 className="text-3xl font-medium text-center text-red-500 mt-3">
          No booking for you to process
        </h1>
      ) : (
        <>
          {" "}
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
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageBookings;
