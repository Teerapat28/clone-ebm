import React from "react";
import banner from "../data/Carousel";
import Carousel from "react-bootstrap/Carousel";
import CarouselWarpper from "../assets/warppers/Carousel";

const Carouselslide = () => {

  return (
    <CarouselWarpper>
      <Carousel>
        {banner.map((item, index) => {
          return (
            <Carousel.Item>
                {/* min-h-31.438rem */}
              <div className="inline-block w-full">
              <img key={index} className="imgCard bg-top bg-contain d-block w-full min-h-px " src={item} />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </CarouselWarpper>
  );
};

export default Carouselslide;
