import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-project-server-demz.onrender.com/reviews")
      .then(res => res.json())
      .then(data => setReview(data));
  }, []);

  return (
    <div>
      <SectionTitle
        heading={"TESTIMONIALS"}
        subheading={"What Our Client Say"}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map(review => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center mx-10 my-5 p-5 gap-y-3">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <FaQuoteLeft className="text-5xl text-black mt-3"></FaQuoteLeft>
              <p className="">{review.comment}</p>
              <h1 className="text-xl text-amber-600 font-medium ">
                {review.name}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
