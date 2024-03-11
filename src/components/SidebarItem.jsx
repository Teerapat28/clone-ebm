import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarSubItem from "./SidebarSubItem";

const SidebarItem = ({ item }) => {
  //   console.log(item.childrens);
  const [open, setOpen] = useState(false);
  if(item.titleIcon) {
    return (
        <>
          <li
            className={open ? "more-sub  open" : "more-sub"}
            onClick={() => setOpen(!open)}
          >
            {/* <img src={item.titleIcon} /> */}
            <Link to={item.path}>{item.title}</Link>
            <img src={item.icon} />
          </li>
          <ul className={open ? "submenuwrap open" : "submenuwrap"}>
            {item.childrens.map((child, index) => {
              return <SidebarSubItem key={index} item={child} />;
            })}
          </ul>
        </>
      );
  }
  if (item.childrens) {
    return (
      <>
        <li
          className={open ? "more-sub open" : "more-sub"}
          onClick={() => setOpen(!open)}
        >
          <Link to={item.path}>{item.title}</Link>
          <img src={item.icon} />
        </li>
        <ul className={open ? "submenuwrap open" : "submenuwrap"}>
          {item.childrens.map((child, index) => {
            return <SidebarSubItem key={index} item={child} />;
          })}
        </ul>
      </>
    );
  }
  else {
    return (
      <>
        <li className="more-sub">
          <Link to={item.path}>{item.title}</Link>
        </li>
      </>
    );
  }
};

export default SidebarItem;

// {item.childrens.map((child, index) => {
//     return <SidebarItem key={index} item={child}/>
// })}
