import React from 'react'
import { Link } from 'react-router-dom'
import { fb1, fb2, line1, line2, tw1, tw2, yt1, yt2 } from '../assets/images/home/icon'

const Contact = () => {
  return (
    <div className="container contact-css">
      <div className="main">
        <div className="content-contact">
          <div className="content-left">
            <div className="head">
              <h1>
                ติดต่อสอบถาม <br />
                และติดตามข่าวสาร
              </h1>
            </div>
            <div className="content">
              <div className="sub-content">
                <div className="sub-hand">ศูนย์ลูกค้าสัมพันธ์</div>
                <div className="details">
                  ติดต่อ 0 2617 6111 ทุกวันเวลา : 06.00 - 24.00 น.
                </div>
              </div>
            </div>
          </div>
          <div
            className="content-right contentflex"
          >
            <div className="content-img sub-image-contact">
              <div className="sub-contact figure" id="link-fb">
                <Link
                  href="#"
                  rel="noopener noreferrer" 
                  className=' no-underline text-bem-underline'
                >
                  <img
                    className="Sirv image-main"
                    src={fb1}
                    alt="facebook"
                    width="63"
                    onMouseOver={e => (e.currentTarget.src = fb2)}
                    onMouseOut={e => (e.currentTarget.src = fb1)}
                  />
                </Link>
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className=' no-underline text-bem-underline text-center'
                >
                  รถไฟฟ้ามหานคร สายสีเหลือง
                </Link>
              </div>
              <div className="sub-contact figure" id="link-line">
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className=' no-underline text-bem-underline'
                >
                  <img
                    className="Sirv image-main"
                    src={line1}
                    alt="line"
                    width="63"
                    onMouseOver={e => (e.currentTarget.src = line2)}
                    onMouseOut={e => (e.currentTarget.src = line1)}
                  />
                </Link>
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className=' no-underline text-bem-underline text-center'
                  >Pinkyellowline</Link
                >
              </div>
              <div className="sub-contact figure" id="link-yt">
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className=' no-underline text-bem-underline'
                >
                  <img
                    className="Sirv image-main"
                    src={yt1}
                    alt="yt"
                    width="63"
                    onMouseOver={e => (e.currentTarget.src = yt2)}
                    onMouseOut={e => (e.currentTarget.src = yt1)}
                  />
                </Link>
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className=' no-underline text-bem-underline text-center' 
                  >YellowLineofficial</Link
                >
              </div>
              <div className="sub-contact figure" id="link-tw">
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className=' no-underline text-bem-underline'
                >
                  <img
                    className="Sirv image-main"
                    src={tw1}
                    alt="tw"
                    width="63"
                    onMouseOver={e => (e.currentTarget.src = tw2)}
                    onMouseOut={e => (e.currentTarget.src = tw1)}
                  />
                </Link>
                <Link
                  href="#"
                  rel="noopener noreferrer"
                  className=' no-underline text-bem-underline text-center'
                  >@YellowLine_ebm</Link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact