import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import FoodCard from "../../Components/FoodCard/FoodCard";
import useFilteredFood from "../../hooks/useFilteredFood";

const ChefRecommand = () => {
  const [offered, salads] = useFilteredFood();
  //console.log(salads,drinks);

  return (
    <section className="mb-10">
      <SectionTitle
        heading={"CHEF RECOMMANDS"}
        subheading={"Should Try"}
      ></SectionTitle>
      <div className="flex flex-col md:flex-row gap-3  items-center">
        {salads.map(salad => (
          <FoodCard key={salad._id} item={salad}></FoodCard>
        ))}
      </div>
    </section>
  );
};

export default ChefRecommand;
