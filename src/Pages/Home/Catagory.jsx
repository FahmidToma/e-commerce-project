import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slide1 from "../../assets/cat1.jpg";
import slide2 from "../../assets/cat2.jpg";
import slide3 from "../../assets/cat3.jpg";
import slide4 from "../../assets/cat4.jpg";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Catagory = () => {
  return (
    <section>
      <SectionTitle
        heading={"ORDER ONLINE"}
        subheading={"from 11:00 am to 10:00 pm"}
      ></SectionTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-10"
      >
        <SwiperSlide>
          <img src={slide1} />
          <h1 className="text-center font-semibold text-3xl md:text-4xl -mt-12 text-gray-500 pb-2">
            SOUP
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} />
          <h1 className="text-center font-semibold text-2xl md:text-4xl -mt-12 text-gray-500 pb-2">
            SALAD
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} />
          <h1 className="text-center font-semibold text-2xl md:text-4xl -mt-12 text-gray-500 pb-2">
            DESSERT
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} />
          <h1 className="text-center font-semibold text-2xl md:text-4xl -mt-12 text-gray-500 pb-2">
            PIZZA
          </h1>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Catagory;
