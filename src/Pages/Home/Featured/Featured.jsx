import maki from "../../../assets/maki.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="my-10 featured bg-fixed">
      <div className="bg-black bg-opacity-5">
        <SectionTitle
          heading={"Featured Item"}
          subheading={"Check this out"}
        ></SectionTitle>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 px-14 md:px-20 py-20  mx-auto ">
          <img src={maki} className="w-[300px] md:w-[280px] h-[190px]"></img>
          <div className="space-y-1 text-white ">
            <h1 className="text-2xl font-medium">Where can I find this?</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi consequatur laboriosam ea deserunt similique eum sunt
              esse unde voluptas, cupiditate ratione voluptate quod inventore
              laborum saepe fugit, qui alias architecto.
            </p>
            <button className="btn border-0 border-y-4 btn-outline border-black text-white">
              Normal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
