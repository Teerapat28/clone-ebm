import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
//css
import SideWarpper from "../assets/warppers/SideNavbar";
import Warpper from "../assets/warppers/SmNavbar";
import Drawer from "@mui/material/Drawer";

//img
import hamburger from "../assets/images/icons/hamburger.png";
import logo from "../assets/images/logo/BEM.png";
import { data, topdata, changelang } from "../data/Navbar";

//data

const SideNavbar = () => {
  const [open, setOpen] = useState(false);
  const [supOpen, setSupOpen] = useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (supOpen === true) {
      setSupOpen(!supOpen);
    }
  };

  const handleClick = () => {
    setSupOpen(!supOpen);
  };

  const DrawerList = (
    <SideWarpper>
      <nav className="navmb-sidebar">
        <div onClick={toggleDrawer(false)} className="logo">
          <img src={logo} />
        </div>
        <ul className="menuwrap">
          {data.map((item, index) => {
            return <SidebarItem key={index} item={item} />;
          })}
          <div className="line-space"></div>
          {topdata.map((item, index) => {
            return <SidebarItem key={index} item={item} />;
          })}
          <div className="line-space"></div>
          {changelang.map((item, index) => {
            return <SidebarItem key={index} item={item} />;
          })}
        </ul>
      </nav>
    </SideWarpper>
  );

  return (
    <Warpper>
      <nav className="navmb">
        <div className="left">
          <div onClick={toggleDrawer(true)}>
            <img src={hamburger} />
          </div>
        </div>
        <div className="mid">
          <div>
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>
        </div>
        <div className="right"></div>
      </nav>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Warpper>
  );
};

export default SideNavbar;
