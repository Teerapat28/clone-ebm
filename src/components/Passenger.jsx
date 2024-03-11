import React, { useState } from "react";
import passengerIcon from '../assets/images/icons/passendger-char.png'


const Passenger = () => {
    const [select, setSelect] = useState("");

    const handleChange = (event) => {
      setSelect(event.target.value);
    };

  return (
    <div className="passenger-con">
      <div className="passenger-wrap">
        <div className="left">
            <img src={passengerIcon}/>
            <p>รายงานสถิติผู้โดยสารตั้งแต่ 03/06/2023 - 07/03/2024 จำนวน 11,652,097 เที่ยวคน</p>
        </div>
        <div className="right">
            <label htmlFor="sitemap-all">ค้นหาเมนูเว็บไซต์</label>
            <select
                  value={select}
                  onChange={handleChange}
                  name="sitemap-all"
                >
                  <option disabled={true} value="">
                    เลือกเมนู
                  </option>
                  <option value="tast">
                    tast
                  </option>
                </select>
        </div>
      </div>
    </div>
  );
};

export default Passenger;
