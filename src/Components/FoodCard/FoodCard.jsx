import AddToBtn from "../AddToBtn/AddToBtn";
import foodcard from "../../assets/foodcard.jpg";

const FoodCard = ({ item }) => {
  const { name, recipe, price } = item;

  //console.log(item);
  return (
    <div className=" bg-slate-200 w-80 shadow-xl mb-4 ">
      <img src={foodcard} alt="food" />
      <p className="bg-black px-2 absolute ">${price}</p>

      <div className="card-body items-center text-center min-h-80 text-black">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <AddToBtn btntext={"Add to cart"} item={item}></AddToBtn>
      </div>
    </div>
  );
};

export default FoodCard;
