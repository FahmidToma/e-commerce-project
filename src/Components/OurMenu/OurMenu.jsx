import img from "../../assets/cat4.jpg";

const OurMenu = ({ item }) => {
  const { price, recipe } = item;

  return (
    <div className=" p-2 flex justify-between gap-2 ">
      <div className="">
        <img
          src={img}
          className="w-[80px] h-[70px] rounded-tr-full rounded-bl-full rounded-br-full "
        ></img>
      </div>
      <div className=" w-full">
        <h1 className="uppercase">{item.name}-----------</h1>
        <p>{recipe}</p>
      </div>
      <p className="text-amber-500">${price}</p>
    </div>
  );
};

export default OurMenu;
