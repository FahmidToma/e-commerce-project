import useMenu from "./useMenu";

const useFilteredFood = () => {
  const [menu] = useMenu();
  const offered = menu.filter(item => item.category == "Offered");
  const salads = menu.filter(item => item.category == "Salad");
  const pizzas = menu.filter(item => item.category == "Pizza");
  const pastas = menu.filter(
    item => item.category == "Pasta" || item.category == "Indian"
  );
  const desserts = menu.filter(item => item.category == "Dessert");
  const drinks = menu.filter(item => item.category == "Beverages");
  const seafoods = menu.filter(
    item => item.category == "Seafood" || item.category == "Tacos"
  );

  return [offered, salads, pizzas, pastas, desserts, seafoods, drinks];
};

export default useFilteredFood;
