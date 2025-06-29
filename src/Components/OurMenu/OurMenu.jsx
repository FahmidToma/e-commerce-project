const OurMenu = ({ item }) => {
  const { price, recipe, image } = item;

  return (
    <div className=" p-2 flex justify-between gap-2 ">
      <div className="">
        <img
          src={image}
          className="w-[80px] h-[70px] rounded-tr-full rounded-bl-full rounded-br-full "
        ></img>
      </div>
      <div className=" w-full">
        <h1 className="uppercase font-medium">{item.name}</h1>
        <p className="text-gray-500">{recipe}</p>
      </div>
      <p className="text-amber-500">${price}</p>
    </div>
  );
};

export default OurMenu;
