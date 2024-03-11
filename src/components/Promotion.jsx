import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import bannerPromotion from "../assets/images/Promotion/Thumbnail_Promotion1.jpg"
import vector from "../assets/images/Vector.png"
import { Link } from 'react-router-dom';

const Promotion = () => {
  return (
    <div className="container content-promo">
      <div className="main">
        <div className="head">
          <h1>โปรโมชัน</h1>
        </div>

        <Carousel>
            {/* {banner.map((item, index) => {
            return ( */}
                <Carousel.Item>
                    {/* min-h-31.438rem */}
                <div className="inline-block w-full pt-10">
                <img className="d-block w-full min-h-px" src={bannerPromotion} />
                </div>
                </Carousel.Item>
            {/* );
            })} */}
        </Carousel>

        <div className="view-details">
          <Link href="#" className="sub-btn"
            >ดูเพิ่มเติม
            <img src={vector} alt=">" width="3" height="7"
          /></Link>
        </div>
      </div>
    </div>
  )
}

export default Promotion