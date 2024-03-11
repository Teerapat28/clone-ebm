import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Slider from "react-slick";
import Warpper from "../assets/warppers/newsSection";

//img
import next from "../assets/images/next.png";
import prev from "../assets/images/prev.png";
import vector from "../assets/images/Vector.png";

const NewsCard = () => {
  const { newData } = useLoaderData();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // initialSlide: 0,
    // <img className="nn2-elib" src={next} />
    nextArrow: <img src={next} />,
    prevArrow: <img src={prev} />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
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
    <Warpper>
      <div className="container content-news">
        <div className="main">
          <div className="head">
            <h1>ข่าวสารและกิจกรรม</h1>
          </div>

          <Slider
            className="news-list w-full inline-block pt-10 text-center"
            {...settings}
          >
            {newData.map((item, index) => {
              return (
                <div key={index} className="box-news w-full inline-block">
                  <div className="sub-image">
                    <img className="imgcard" src={item.img} />
                  </div>
                  <div className="sub-details">
                    <p>{item.date}</p>
                    <p>{item.title}</p>
                  </div>
                  <div className="btn-details">
                    <Link to={`/news/${index}`}>
                      อ่านเพิ่มเติม
                      <img src={vector} />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* {elibrarydata.map((item, index) => {
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
            })} */}
          </Slider>

          <div className="view-details">
            <Link href="#" className="sub-btn">
              ดูเพิ่มเติม
              <img src={vector} alt=">" width="3" height="7" />
            </Link>
          </div>
        </div>
      </div>
    </Warpper>
  );
};

export default NewsCard;
