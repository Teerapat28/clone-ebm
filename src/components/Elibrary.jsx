import React from "react";
import elibrarydata from "../data/Elibrary";
import { Link } from "react-router-dom";
import Slider from "react-slick";

//img
import next from "../assets/images/next.png";
import prev from "../assets/images/prev.png";
import vector from "../assets/images/Vector.png";


const Elibrary = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // initialSlide: 0,
    // <img className="nn2-elib" src={next} />
    nextArrow: <img src={next} />,
    prevArrow: <img src={prev} />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="elibrary" className="content-elibrary">
      <div className="container">
        <div className="main">
          <div className="head">
            <h1>E-Library</h1>
          </div>

          <Slider
            className="elibrary-list w-full inline-block text-center pt-10"
            {...settings}
          >
            {elibrarydata.map((item, index) => {
              const { title, details } = item;
              return (
                <div key={index} className="box-elib w-full inline-block">
                  <div>
                    <div className="title">{title}</div>
                    <div className="details">{details}</div>
                    <div className="btn-elib">
                      <Link to="#">เพิ่มเติม</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          <div className="view-details">
            <Link href="/th/system-structuer/" className="sub-btn">
              ดูเพิ่มเติม
              <img src={vector} alt=">" width="3" height="7" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elibrary;
