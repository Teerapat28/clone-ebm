import React from "react";
import Passenger from "./Passenger";
import Warpper from "../assets/warppers/Footer";
import { Link } from "react-router-dom";

//img
import iconfooter from "../assets/images/logo/Frame 329-60@2x.png";
import qrdl from "../assets/images/download/qr_ios.jpg";
import appSt from "../assets/images/download/appstore-icon.png";
import playSt from "../assets/images/download/googleplay-icon.png";

const Footer = () => {
  return (
    <Warpper>
      <Passenger />

      <div className="footer-top-con">
        <div className="footer-top">
          <div className="left">
            <h3 className="t-2">รถไฟฟ้ามหานคร สายสีเหลือง</h3>
            <ul className="menus-wrap">
              <li>
                <Link to="#" className="a-1">
                  เกี่ยวกับเรา
                </Link>
              </li>

              <li id="more-sub" data-index="1" className="a-2">
                รถไฟฟ้าที่เกี่ยวข้อง
              </li>
              <ul id="sub-wrap" data-index="1">
                <li>
                  <Link className="a-3" to="#">
                    รฟม.
                  </Link>
                </li>
                <li>
                  <Link className="a-4" to="#">
                    รถไฟฟ้าสายสีเขียว
                  </Link>
                </li>
                <li>
                  <Link className="a-5" to="#">
                    รถไฟฟ้าสายสีทอง
                  </Link>
                </li>
                <li>
                  <Link className="a-19" to="#">
                    รถไฟฟ้าสายสีชมพู
                  </Link>
                </li>
              </ul>

              <li id="more-sub" data-index="2" className="a-6">
                ข้อมูลบัตรโดยสาร
              </li>
              <ul id="sub-wrap" data-index="2">
                <li>
                  <Link to="#" className="a-7">
                    บัตรโดยสารเที่ยวเดียว
                  </Link>
                </li>
                <li>
                  <Link to="#" className="a-8">
                    บัตรแรบบิท
                  </Link>
                </li>
                <li id="more-secsub" secsub-index="2-1">
                  <Link className="a-9" id="more-secsub">
                    บัตร EMV Contactless
                  </Link>
                </li>
                <ul secsub-index="2-1" id="secsub-more">
                  <li>
                    <Link className="a-10" to="#">
                      การใช้บัตร EMV
                    </Link>
                  </li>
                  <li>
                    <Link className="a-11" to="#">
                      ประกาศเงื่อนไขการใช้ EMV
                    </Link>
                  </li>
                </ul>
                <li id="more-secsub" secsub-index="2-2">
                  <Link id="more-secsub" className="a-12">
                    เงื่อนไขการออกบัตร
                  </Link>
                </li>
                <ul secsub-index="2-2" id="secsub-more">
                  <li>
                    <Link className="a-13" to="#">
                      ประกาศเงื่อนไขการออกตั๋วโดยสาร
                    </Link>
                  </li>
                  <li>
                    <Link className="a-14" to="#">
                      ประกาศเงื่อนไขการใช้สิทธิ์สวัสดิการแห่งรัฐ
                    </Link>
                  </li>
                </ul>
              </ul>

              <li>
                <Link className="a-15" to="#">
                  โปรโมชัน
                </Link>
              </li>

              <li id="more-sub" data-index="3" className="a-16">
                การเติมเงินบัตรแรบบิท
              </li>
              <ul id="sub-wrap" data-index="3">
                <li>
                  <Link to="#">My Rabbit</Link>
                </li>
                <li>
                  <Link to="#">Rabbit LINE Pay</Link>
                </li>
              </ul>

              <li>
                <Link to="#" className="a-17">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link to="#" className="a-18">
                  เส้นทางและอัตราค่าโดยสาร
                </Link>
              </li>
              <li>
                <Link to="#" id="angle-sitemap">
                  Sitemap
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="right">
            <h3 className="t-3">ดาวน์โหลดแอปพลิเคชัน THE SKYTRAINs ได้ที่</h3>
            <div className="app-group">
              <div className="left">
                <img src={iconfooter} />
              </div>
              <div className="right">
                <div className="s-left">
                  <img src={qrdl} className="appdlimg text-end"/>
                </div>
                <div className="s-right">
                  <img src={appSt} className="appdlimg"/>
                  <img src={playSt} className="appdlimg"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-under-con">
        <div className="footer-under">
          <div className="top">
            <div className="left">
              <p className="t-4">บริษัท อีสเทิร์น บางกอกโมโนเรล จำกัด</p>
              <p className="t-5 font-extralight text-sm">
                เลขที่21 ซอยเฉยพ่วง ถนนวิภาวดี-รังสิต แขวงจอมพลเขตจตุจักร
                กรุงเทพมหานคร 10900 ประเทศไทย
              </p>
              <p className="t-6 font-extralight text-sm">เบอร์ติดต่อ: 0 2617 6111</p>
            </div>
            <div className="right text-sm text-bem-footerfontColor">
              <p className="t-8">
                เว็บไซต์นี้แสดงผลได้ดีใน Chrome(43) : Safari(9) : Firefox(16)
              </p>
              <p className="t-9">รองรับระบบสำหรับผู้พิการทางสายตา</p>
            </div>
          </div>
          <div className="copyright">
            <p className="t-7">
              ขอสงวนสิทธิ์ 2566 บริษัท อีสเทิร์น บางกอกโมโนเรล จำกัด
            </p>
          </div>
        </div>
      </div>
    </Warpper>

    
  );
};

export default Footer;
