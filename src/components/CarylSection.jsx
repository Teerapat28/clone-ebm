import React from 'react'
import caryl from "../assets/images/home/caryl.png";

const CarylSection = () => {
  return (
    <>
      <div className="container">
        <div className="main">
          <div className="content-ylline">
            <div className="content-left">
              <div className="head">
                <h1>รถไฟฟ้ามหานคร สายสีเหลือง</h1>
              </div>
              <div className="content">
                <div className="sub-content">
                  <div className="sub-hand">วิสัยทัศน์</div>
                  <div className="details">
                    เป็นผู้นำในการให้บริการระบบรถไฟฟ้าขนส่งมวลชนที่ดีที่สุด
                  </div>
                </div>
                <div className="sub-content">
                  <div className="sub-hand">ภารกิจ</div>
                  <div className="details">
                    มุ่งพัฒนาระบบ การดำเนินการ และบุคลากร ตลอดจนการบริหาร
                    ทรัพยากรอย่างมีประสิทธิภาพ
                    เพื่อให้บริการระบบรถไฟฟ้าขนส่งมวลชนเป็นระบบที่ทันสมัย
                    รวดเร็ว ปลอดภัย มีประสิทธิภาพ และเชื่อถือได้
                    โดยให้ผลตอบแทนที่เหมาะสมแก่ผู้ที่เกี่ยวข้องและสังคม
                  </div>
                </div>
                <div className="sub-content">
                  <div className="sub-hand">ค่านิยมร่วม</div>
                  <div className="details">
                    ยึดมั่นในบรรษัทภิบาล เชื่อมั่นในบุคลากร
                    มุ่งมั่นสู่ความเป็นเลิศในการให้บริการ
                    สร้างความพึงพอใจสูงสุดแก่ผู้โดยสาร
                  </div>
                </div>
              </div>
            </div>
            <div className="content-right">
              <div className="content-img">
                <img src={caryl} className="w-31.188rem h-23.409rem block ml-auto mr-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarylSection