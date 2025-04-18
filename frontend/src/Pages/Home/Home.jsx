import React from "react";
import Header from "../../Components/Header/Header";
import Nav_bar from "../../Components/Nav_Bar/Nav_bar";
import Feature from "../../Components/Features/Feature";
import Sign_upsection from "../../Components/Sign_upsection/Sign_upsection";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";



const Home = () => {
  return (
    <div className="home">
      <Nav_bar />
      <hr />
      <Header />
      <Feature />
      <Sign_upsection />
      <hr />
      <Footer />
    </div>
  );
};

export default Home;
