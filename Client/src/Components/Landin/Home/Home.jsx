import React from "react";
import Nav from "../Nav/Nav";
import About from "../About/About";
import Section from "../Section/Section";
import Courses from "../Courses/Courses";
import Footer from "../Footer/Footer";
import ScrollTop from "../ScrollTop/ScrollTop";

const Home = () => {
  return (
    <div className="bg-landing bg-gray-200 select-none dark:bg-gray-800 transition duration-500 ease-in-out">
      <Nav />
      <About />
      <Section />
      <Courses />
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Home;