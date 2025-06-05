import React from 'react';
import Banner from './Banner';
import Catagory from './Catagory';
import About from './About';
import Callus from './Callus';
import Menu from './Menu';
import ChefRecommand from './ChefRecommand';
import Featured from './Featured/Featured';
import Testimonials from './Testimonials/Testimonials';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className='max-w-screen-lg mx-auto'>
        <Catagory></Catagory>
        <Menu></Menu>
        <About></About>
        <Callus></Callus>
        <ChefRecommand></ChefRecommand>
        <Featured></Featured>
        <Testimonials></Testimonials>
      </div>
    </div>
  );
};

export default Home;