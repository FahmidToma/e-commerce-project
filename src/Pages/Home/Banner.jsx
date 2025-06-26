import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img from "../../assets/asset.jpg";
import img1 from "../../assets/asset1.jpg";
import img2 from "../../assets/asset2.jpg";
import img3 from "../../assets/asset3.jpg";
import img4 from "../../assets/asset4.jpg";

const Banner = () => {
  return (
    <Carousel>
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img3} />
      </div>
      <div>
        <img src={img4} />
      </div>
    </Carousel>
  );
};

export default Banner;
