import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../data/RoadMapIcon";

const RoadMap = () => {
  const [select, setSelect] = useState("");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <div id="route-map" className="content-route-map">
      <div className="container">
        <div className="main">
          <div className="content-route">
            <div className="content-left">
              <div className="head text-white">
                <h1>เส้นทางและอัตราค่าโดยสาร</h1>
              </div>
              <div className="content-search-route">
                <div className="sub-head">ค้นหาสถานีและสถานที่</div>
                <div className="input-origin top" id="input-searchorigin-elem">
                  <label htmlFor="searchst-origin" id="islineselected">
                    ต้นทาง
                  </label>
                  <input
                    type="text"
                    name="searchst-origin"
                    id="searchst-origin"
                    placeholder="เลือกสถานีต้นทาง"
                  />
                  <ul
                    className="suggest-station-lists station-top"
                    data-type="origin"
                  ></ul>
                </div>
                <div
                  className="input-destination bottom"
                  id="input-searchdest-elem"
                >
                  <label htmlFor="searchst-destination" id="islineselected">
                    ปลายทาง
                  </label>
                  <input
                    type="text"
                    name="searchst-destination"
                    id="searchst-destination"
                    placeholder="เลือกสถานีปลายทาง"
                  />
                  <ul
                    className="suggest-station-lists station-bottom"
                    data-type="destination"
                  ></ul>
                </div>
                <div className="submit">
                  {/* <!-- <Link href="/th/routemap/" className="btn-submit">เส้นทาง</Link> --> */}
                  <input
                    type="button"
                    id="goToRouteMap"
                    value="เส้นทาง"
                    className="btn-submit"
                  />
                </div>
              </div>
            </div>
            <div className="content-right">
              <div className="content-bt route1" id="route1">
                {Icon.map((item, index) => {
                  return (
                    <div key={index} className="bt-content">
                      <Link
                        href=""
                        rel="noopener noreferrer"
                        className="no-underline text-bem-underline"
                      >
                        <div className="sub-bt-content">
                          <img
                            src={item}
                            alt="button1"
                            width="40"
                            height="40"
                          />
                          <p>เส้นทางและอัตราค่าโดยสาร</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
                {/* <div className="bt-content">
                  <Link
                    href=""
                    rel="noopener noreferrer"
                    className="no-underline text-bem-underline"
                  >
                    <div className="sub-bt-content">
                      <img
                        src="/assets/images/home/button/bt1.png"
                        alt="button1"
                        width="40"
                        height="40"
                      />
                      <p>เส้นทางและอัตราค่าโดยสาร</p>
                    </div>
                  </Link>
                </div>
                <div className="bt-content">
                  <Link
                    href=""
                    rel="noopener noreferrer"
                    className="no-underline text-bem-underline"
                  >
                    <div className="sub-bt-content">
                      <img
                        src="/assets/images/home/button/bt2.png"
                        alt="button2"
                        width="40"
                        height="40"
                      />
                      <p>แผนที่บริเวณสถานี</p>
                    </div>
                  </Link>
                </div>
                <div className="bt-content">
                  <Link
                    href=""
                    rel="noopener noreferrer"
                    className="no-underline text-bem-underline"
                  >
                    <div className="sub-bt-content">
                      <img
                        src="/assets/images/home/button/bt3.png"
                        alt="button3"
                        width="40"
                        height="40"
                      />
                      <p>เวลาและความถี่การเดินทาง</p>
                    </div>
                  </Link>
                </div>
                <div className="bt-content">
                  <Link
                    href=""
                    rel="noopener noreferrer"
                    className="no-underline text-bem-underline"
                  >
                    <div className="sub-bt-content">
                      <img
                        src="/assets/images/home/button/bt6.png"
                        alt="button5"
                        width="40"
                        height="40"
                      />
                      <p>ทรัพย์สินสูญหาย</p>
                    </div>
                  </Link>
                </div>
                <div className="bt-content">
                  <Link
                    href=""
                    rel="noopener noreferrer"
                    className="no-underline text-bem-underline"
                  >
                    <div className="sub-bt-content">
                      <img
                        src="/assets/images/home/button/bt5.png"
                        alt="button4"
                        width="40"
                        height="40"
                      />
                      <p>ที่จอดรถ</p>
                    </div>
                  </Link>
                </div> */}
              </div>
              <div className="content-bt route2" id="route2">
                <select
                  value={select}
                  onChange={handleChange}
                  name="routemap"
                  className=" w-full px-2 py-2 border border-solid border-bem-borderMapColor border-r-8"
                >
                  <option disabled={true} value="">
                    เลือกเมนู
                  </option>
                  <option value="เส้นทางและอัตราค่าโดยสาร">
                    เส้นทางและอัตราค่าโดยสาร
                  </option>
                  <option value="แผนที่บริเวณสถานี">แผนที่บริเวณสถานี</option>
                  <option value="เวลาและความถี่การเดินทาง">
                    เวลาและความถี่การเดินทาง
                  </option>
                  <option value="ทรัพย์สินสูญหาย">ทรัพย์สินสูญหาย</option>
                  <option value="ที่จอดรถ">ที่จอดรถ</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
