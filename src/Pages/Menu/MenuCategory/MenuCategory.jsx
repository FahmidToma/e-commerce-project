import OurMenu from "../../../Components/OurMenu/OurMenu";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-7 ">
        {items.map(item => (
          <OurMenu item={item} key={item._id}></OurMenu>
        ))}
      </div>
      <div className="flex flex-col items-center my-7">
        <Link to={`/shop/${title}`}>
          <button className=" btn border border-b-2 border-x-0 border-t-0 bg-slate-300 border-black text-yellow-600">
            Order Your Favourite Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
