import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarSubItem = ({ item }) => {
  const [subOpen, setsubOpen] = useState(false);
  if (item.childrens) {
    return (
      <>
            <li 
            onClick={() => setsubOpen(!subOpen)} 
            className={item.childrens ? "more" : null}
            >
              <Link to={item.path}>{item.title}</Link>
              <img src={item.icon} />
            </li>
          <ul
            className={
              subOpen ? "secondsubmenu-wrap open" : "secondsubmenu-wrap"
            }
          >
            {item.childrens.map((child, index)=> {
                return <li key={index}>
                    <Link to={child.path}>{child.title}</Link>
                </li>
            })}
          </ul>
      </>
    );
  }
  if(item.badge){
    return (
        <>
        <li>
          <Link to={item.path}>{item.title}</Link>
          <p class="badge">{item.badge}</p>
        </li>
      </>
    )
  }
   else {
    return (
        <>
        <li>
          <Link to={item.path}>{item.title}</Link>
        </li>
      </>
    )
  }
};

export default SidebarSubItem;
