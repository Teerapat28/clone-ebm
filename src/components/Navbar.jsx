import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { data, topdata } from "../data/Navbar";
//css
import Warpper from "../assets/warppers/Navbar";

//img
import Globe from "../assets/images/icons/Globe.png";
import arrowDown from "../assets/images/icons/arrow-down-black.png";
import logo from "../assets/images/logo/BEM.png";
import ylCDR from "../assets/images/icons/CaretDoubleRight.png";
import wiCDR from "../assets/images/icons/CaretDoubleRight-white.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [supmenu, setSubmenu] = useState([]);

  return (
    <Warpper>
      <nav className="nav-top">
        <div id="nav-top-wrap">
          <div className="left">
            <Link to="/">หน้าแรก</Link>
            <Link to="#">E-Library</Link>
            <Link to="#">ข้อแนะนำเพื่อความปลอดภัย</Link>
          </div>
          <div className="mid"></div>
          <div className="right">
            <Link to="#">ร่วมงานกับเรา</Link>
            <Link to="#">ติดต่อเรา</Link>
            <div className="chng-lang">
              <div className="btn-wrap">
                <img src={Globe} alt="bts the skytrain language thai english" />
                <span>ภาษาไทย</span>
                <img
                  src={arrowDown}
                  alt="bts the skytrain language thai english"
                />
              </div>

              {/* drop down */}
            </div>
          </div>
        </div>
      </nav>

      <nav className="nav-under">
        <div className="logo ">
          <NavLink to="/">
            <img src={logo} alt="bts the skytrain logo EBM" />
          </NavLink>
        </div>
        <ul className="nav-items">
          {data.map((item, index) => {
            if (item.childrens) {
              return (
                <>
                  <li
                    key={index}
                    onMouseEnter={() => {
                      setOpen(true);
                      setTitle(item.title);
                      setSubmenu(item.childrens);
                    }}
                    onMouseLeave={() => {
                      // setOpen(false);
                      // setTitle("");
                      // setSubmenu([]);
                    }}
                  >
                    <span>{item.title}</span>
                    <img id="icon" src={arrowDown} />
                  </li>

                  {open && (
                    <div
                      className=""
                      onMouseLeave={() => {
                        setOpen(false);
                      }}
                    >
                      <NavUnder name={title} item={supmenu} />
                    </div>
                  )}
                </>
              );
            } else
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="decoration-0 text-bem-dark-text"
                  >
                    {item.title}
                  </Link>
                </li>
              );
          })}
        </ul>
      </nav>
    </Warpper>
  );
};

const NavUnder = ({ name, item }) => {
  console.log(name);
  console.log(item);

  return (
      <div
        className="navmenu-detail-wrap"
        // style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
      >
        <div className="arrowi active left-72 top-20"></div>

        <ul className="navmenu-item-detail">
          <li className="head">{name}</li>
          {item.map((supmenu, index) => {
            if (supmenu.childrens) {
              <li key={index} className="link more-sub">
                <Link to={supmenu.path}>{supmenu.title}</Link>
                <div className="icons">
                  <img
                    src={ylCDR}
                    onMouseOver={(e) => (e.currentTarget.src = wiCDR)}
                    onMouseOut={(e) => (e.currentTarget.src = ylCDR)}
                  />
                </div>
              </li>;
            }
            return (
              <li key={index} className="link">
                <Link to={supmenu.path}>{supmenu.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
  );
};

export default Navbar;

{
  /* <div
      style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
      className="navmenu-detail-wrap"
      
    >
      <div
        className="arrowi active left-72 top-20"
      ></div>

      <ul className="navmenu-item-detail">
        <li className="head">{name}</li>
        {item.map((supmenu, index) => {
          if (supmenu.childrens) {
            <li key={index} className="link more-sub">
              <Link to={supmenu.path}>{supmenu.title}</Link>
              <div className="icons">
                <img
                  src={ylCDR}
                  onMouseOver={(e) => (e.currentTarget.src = wiCDR)}
                  onMouseOut={(e) => (e.currentTarget.src = ylCDR)}
                />
              </div>
            </li>;
          }
          return (
            <li key={index} className="link">
              <Link to={supmenu.path}>{supmenu.title}</Link>
            </li>
          );
        })}
      </ul>
    </div> */
}

{
  /* <div
      class="navmenu-detail-wrap"
      // style="height: 259.797px;"
    >
      <div
        class="arrowi active"
        // style="left: 296.117px; top: 82px;"
      ></div>

      <ul
        class="navmenu-item-detail"
        // style="left: 270px;"
      >
        <li class="head">เกี่ยวกับเรา</li>
        <li class="link">
          <a href="#">ประวัติความเป็นมา</a>
        </li>
        <li class="link">
          <a href="#">วิสัยทัศน์ ภารกิจ และค่านิยมร่วม</a>
        </li>
        <li class="link">
          <a href="#">คณะกรรมการบริษัท</a>
        </li>
        <li class="link">
          <a href="#">ความรับผิดชอบต่อสังคม</a>
        </li>
        <li class="link" id="more-sub" data-subindex="2">
          <a href="#">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a>
          <div id="more-sub" data-subindex="2" class="icons">
            <img
              data-color="yellow"
              src="/assets/images/icons/CaretDoubleRight.png"
              alt="bts the skytrain ประวัติความเป็นมา"
            />
            <img
              data-color="white"
              src="/assets/images/icons/CaretDoubleRight-white.png"
              alt="bts the skytrain ประวัติความเป็นมา"
            />
          </div>
        </li>
      </ul>
      <div
        class="navmenu-subitem-detail-wrap"
        // style="display: none;"
      >
        <ul class="navmenu-subitem-detail"></ul>
      </div>
    </div> */
}
