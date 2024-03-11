import React from "react";
import newsData from "../data/News";
import { useLoaderData } from "react-router-dom";
import Warpper from "../assets/warppers/News";

//img
import share from "../assets/images/icons/share.png";
import { fb2, line2, tw2 } from "../assets/images/home/icon";

export const loader = ({ params }) => {
  const singleNew = newsData.at(params.id);
  return { singleNew };
};

const NewInfo = () => {
  const { singleNew } = useLoaderData();
  return (
    <Warpper>
      <div className="container page-content">
        <div className="main">
          <div className="content">
            <div className="head">
              <h1>ข่าวสารและกิจกรรม</h1>
            </div>

            <div className="sub-content">
              <div id="news-list" className="news-list">
                <div className="div-image">
                  <img src={singleNew.img} />
                </div>
                <div className="share-wrap">
                  <div className="left"></div>
                  <div className="right">
                    <div className="label">
                      <img src={share} />
                      <span>แชร์ : </span>
                    </div>
                    <div className="group">
                      <button id="share-btn-item" data-url="#" data-type="fb">
                        <img src={fb2} />
                      </button>
                      <button
                        id="share-btn-item"
                        data-url="#"
                        data-type="twitter"
                      >
                        <img src={tw2} />
                      </button>
                      <button id="share-btn-item" data-url="#" data-type="line">
                        <img src={line2} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="div-content">
                  <p>{singleNew.date}</p>
                  <h3>{singleNew.title}</h3>
                </div>
                <div className="div-details">
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{singleNew.details}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Warpper>
  );
};

export default NewInfo;
