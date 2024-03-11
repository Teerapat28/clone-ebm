import React from "react";
import Slider from "react-slick";
import banner from "../data/Carousel";
import CarouselWarpper from "../assets/warppers/Carousel";

//img
import next from "../assets/images/next.png";
import prev from "../assets/images/prev.png";

const TopCarousal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <img className="nn2" src={next} />,
    prevArrow: <img className="pp2" src={prev} />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <CarouselWarpper>
      <Slider className="banner-homepage" {...settings}>
        {banner.map((item, i) => {
          return (
            <div key={i}>
              <div className="w-full inline-block">
                <img src={item} />
              </div>
            </div>
          );
        })}
      </Slider>
    </CarouselWarpper>
  );
};

export default TopCarousal;
