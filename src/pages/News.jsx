import React from "react";
import newsData from "../data/News";
import { Link, useLoaderData } from "react-router-dom";
import Warpper from "../assets/warppers/NewsPage";

import vector from "../assets/images/Vector.png";

export const loader = () => {
  const newData = newsData;
  return { newData };
};

const News = () => {
  const { newData } = useLoaderData();
  console.log(newData);

  return (
    <Warpper>
      <div className="container page-content">
        <div className="main">
          <div className="content">
            <div className="head">
              <h1>ข่าวสารและกิจกรรม</h1>
            </div>

            <div className="sub-content">
              <div id="news-list" className="news-list w-full pt-30px">
                {newData.map((item, index) => {
                  return (
                    <div className="box-news">
                      <div className="sub-image">
                        <img src={item.img} height="200" />
                      </div>
                      <div className="sub-details">
                        <p>{item.date}</p>
                        <p>{item.title}</p>
                      </div>
                      <div className="btn-details">
                        <Link to={`/news/${index}`}>
                          อ่านเพิ่มเติม
                          <img src={vector} width="3" height="7" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Warpper>
  );
};

export default News;
