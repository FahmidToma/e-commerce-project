import AddToBtn from "../AddToBtn/AddToBtn";

const FoodCard = ({ item }) => {
  const { name, recipe, price, image } = item;

  return (
    <div className=" bg-slate-200 w-80 shadow-xl mb-4 ">
      <img src={image} alt="food" className="w-full h-1/3 object-cover" />
      <p className="bg-black px-2 absolute text-white">${price}</p>

      <div className="card-body items-center text-center min-h-28 text-black">
        <h2 className="card-title">{name}</h2>
        <div className="overflow-y-auto max-h-[110px] mb-2 w-full">
          <p className="text-gray-700 text-left px-2">{recipe}</p>
        </div>
        <AddToBtn btntext={"Add to cart"} item={item}></AddToBtn>
      </div>
    </div>
  );
};

export default FoodCard;
