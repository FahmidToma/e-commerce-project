import { Helmet } from "react-helmet";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Cover from "../../SharedPages/Cover/Cover";
import cover from "../../../assets/table.jpg";
import cover1 from "../../../assets/cover1.jpg";
import cover2 from "../../../assets/cover2.jpg";
import cover3 from "../../../assets/cover3.jpg";
import cover4 from "../../../assets/cover4.jpg";
import cover5 from "../../../assets/cover5.jpg";
import useFilteredFood from "../../../hooks/useFilteredFood";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [offered, salads, pizzas, pastas, desserts, seafoods] =
    useFilteredFood();

  return (
    <div>
      <Helmet>
        <title>Al Dente | Menu</title>
      </Helmet>
      <Cover
        img={cover}
        title={"Our Menu"}
        subtitle={"Would you like to order something?"}
      ></Cover>

      <div className="max-w-screen-lg mx-auto">
        <SectionTitle
          heading={"TODAY'S OFFER"}
          subheading={"Don't miss"}
        ></SectionTitle>
        <MenuCategory items={offered} title={"Offer"}></MenuCategory>

        <Cover
          img={cover1}
          title={"PIZZAS"}
          subtitle={
            "Pizza that is made using layers of meat,cheese, sauce, capsicum and other stuffs"
          }
        ></Cover>
        <MenuCategory items={pizzas} title={"Pizza"}></MenuCategory>

        <Cover
          img={cover2}
          title={"PASTAS"}
          subtitle={
            "Pizza that is made using layers of meat,cheese, sauce, capsicum and other stuffs"
          }
        ></Cover>
        <MenuCategory items={pastas} title={"Pasta"}></MenuCategory>

        <Cover
          img={cover3}
          title={"DESSERTS"}
          subtitle={
            "Pizza that is made using layers of meat,cheese, sauce, capsicum and other stuffs"
          }
        ></Cover>
        <MenuCategory items={desserts} title={"Dessert"}></MenuCategory>

        <Cover
          img={cover4}
          title={"SALADS"}
          subtitle={
            "Pizza that is made using layers of meat,cheese, sauce, capsicum and other stuffs"
          }
        ></Cover>
        <MenuCategory items={salads} title={"Salad"}></MenuCategory>

        <Cover
          img={cover5}
          title={"SEAFOODS"}
          subtitle={
            "Pizza that is made using layers of meat,cheese, sauce, capsicum and other stuffs"
          }
        ></Cover>
        <MenuCategory items={seafoods} title={"Seafood"}></MenuCategory>
      </div>
    </div>
  );
};

export default Menu;
