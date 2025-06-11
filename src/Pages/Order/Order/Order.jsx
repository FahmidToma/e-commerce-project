import { useState } from "react";
import order from "../../../assets/order.jpg";
import Cover from "../../SharedPages/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useFilteredFood from "../../../hooks/useFilteredFood";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Order = () => {
  const categories = [
    "Pizza",
    "Pasta",
    "Seafood",
    "Salad",
    "Drinks",
    "Dessert",
    "Offer",
  ];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  //console.log(category);
  const [offered, salads, pizzas, pastas, desserts, seafoods, drinks] =
    useFilteredFood();

  return (
    <div className="max-w-screen-lg mx-auto">
      <Helmet>
        <title>Bistro Boss | Our Shop</title>
      </Helmet>
      <Cover
        img={order}
        title={"our shop"}
        subtitle={"Would you like to try a dish?"}
      ></Cover>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList className="space-x-1 overflow-x-auto whitespace-nowrap  md:space-x-3 flex justify-center my-10">
          <Tab>Pizza</Tab>
          <Tab>Pasta</Tab>
          <Tab>Seafood</Tab>
          <Tab>Salad</Tab>
          <Tab>Drinks</Tab>
          <Tab>Dessert</Tab>
          <Tab>Offer</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={pizzas}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pastas}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={seafoods}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={salads}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={desserts}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={offered}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
