import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import OurMenu from "../../Components/OurMenu/OurMenu";
import useMenu from "../../hooks/useMenu";
import { useState } from "react";

const Menu = () => {
  const [menu] = useMenu();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayMenu = isExpanded ? menu : menu.slice(0, 6);
  // console.log(displayMenu);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="mb-10 flex flex-col items-center">
      <SectionTitle
        heading={"FROM OUR MENU"}
        subheading={"Check it out"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7 ">
        {displayMenu.map(item => (
          <OurMenu item={item} key={item._id}></OurMenu>
        ))}
      </div>
      <div>
        <button
          className="btn border-0 border-b-4 border-black bg-slate-400 text-amber-600"
          onClick={handleExpand}
        >
          {isExpanded ? "Show Less" : "View Full Menu"}
        </button>
      </div>
    </section>
  );
};

export default Menu;
