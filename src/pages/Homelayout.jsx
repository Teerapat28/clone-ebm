import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Loading, Navbar, SideNavbar,  TopCarousal, Carouselslide, Footer } from "../components";

const Homelayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      <SideNavbar/>
      {/* <Carouselslide/> */}
      <TopCarousal /> 
      {isPageLoading ? (
        <Loading />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
      <Footer/>
    </>
  );
};

export default Homelayout;
