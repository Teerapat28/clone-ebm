import arrowDown from "../assets/images/icons/arrow-down-black.png";
import caretDouble from "../assets/images/icons/CaretDoubleRight.png";
import Globe from "../assets/images/icons/Globe.png";

const data = [
    {
        "title": "เกี่ยวกับเรา",
        "icon": arrowDown,
        "childrens": [
            {
                "title": "ประวัติความเป็นมา",
                "path": "#",
            },
            {
                "title": "วิสัยทัศน์ภารกิจและค่านิยมร่วม",
                "path": "#",
            },
            {
                "title": "คณะกรรมการบริษัท",
                "path": "#",
            },
            {
                "title": "ความรับผิดชอบต่อสังคม",
                "path": "#",
            },
            {
                "title": "นโยบายการคุ้มครองข้อมูลส่วนบุคคล",
                "icon": caretDouble,
                "childrens": [
                    {
                        "title": "สำหรับลูกค้า",
                        "path": "#",
                    },
                    {
                        "title": "สำหรับการใช้คุกกี้",
                        "path": "#",
                    },
                    {
                        "title": "สำหรับลานจอดรถยนต์",
                        "path": "#",
                    },
                ]
            },
        ]
    },
    {
        "title": "ข้อมูลบัตรโดยสาร",
        "icon": arrowDown,
        "childrens": [
            {
                "title": "บัตรโดยสารเที่ยวเดียว",
                "path": "#",
            },
            {
                "title": "บัตรแรบบิท",
                "icon": caretDouble,
                "childrens": [
                    {
                        "title": "บัตรแรบบิท",
                        "path": "#",
                    },
                    {
                        "title": "ข้อมูลการซื้อบัตรโดยสาร/การเติมเที่ยว",
                        "path": "#",
                    },
                    {
                        "title": "วิธีใช้บัตรผ่านประตูอัตโนมัติ",
                        "path": "#",
                    },
                ]
            },
            {
                "title": "บัตร EMV Contactless",
                "icon": caretDouble,
                "childrens": [
                    {
                        "title": "การใช้บัตร EMV",
                        "path": "#",
                    },
                    {
                        "title": "ประกาศเงื่อนไขการใช้ EMV",
                        "path": "#",
                    },
                ]
            },
            {
                "title": "เงื่อนไขการออกบัตร",
                "icon": caretDouble,
                "childrens": [
                    {
                        "title": "ประกาศเงื่อนไขการออกตั๋วโดยสาร",
                        "path": "#",
                    },
                    {
                        "title": "ประกาศเงื่อนไขการใช้สิทธิ์สวัสดิการแห่งรัฐ",
                        "path": "#",
                    },
                ]
            },
        ]
    },
    {
        "title": "ข้อมูลการใช้บริการ",
        "icon": arrowDown,
        "childrens": [
            {
                "title": "เส้นทางและอัตราค่าโดยสาร",
                "path": "#",
            },
            {
                "title": "แผนที่บริเวณสถานี",
                "path": "#",
            },
            {
                "title": "เวลาและความถี่การเดินรถ",
                "path": "#",
            },
            {
                "title": "ที่จอดรถ",
                "path": "#",
            },
            {
                "title": "วิธีการแจ้งทรัพย์สินสูญหาย",
                "path": "#",
            },
            {
                "title": "ประกาศและระเบียบข้อบังคับในการใช้บริการ",
                "path": "#",
            },
        ]
    },
    {
        "title": "ธุรกิจและบริการ",
        "icon": arrowDown,
        "childrens": [
            {
                "title": "บัตรแรบบิทประเภทต่างๆ",
                "path": "#",
            },
            {
                "title": "โปรโมชันบัตรแรบบิท",
                "path": "#",
            },
            {
                "title": "ร้านค้า/บริการ ที่สามารถใช้แรบบิทและจุดเติมเงิน",
                "path": "#",
            },
            {
                "title": "ข้อมูล/ติดต่อสอบถาม",
                "path": "#",
            },
            {
                "title": "My Rabbit",
                "path": "#",
            },
        ]
    },
    {
        "title": "ข่าวสารและกิจกรรม",
        "path": "/news"
    },
    {
        "title": "โปรโมชั่น",
        "path": "#"
    },
    {
        "title": "คำถามที่พบบ่อย",
        "path": "#"
    }
]

const topdata = [
    {
        "title": "E-Library",
        "path": "#"
    },
    {
        "title": "ข้อแนะนำเพื่อความปลอดภัย",
        "path": "#"
    },
    {
        "title": "ร่วมงานกับเรา",
        "path": "#"
    },
    {
        "title": "ติดต่อเรา",
        "path": "#"
    }
]

const changelang = [
    {
        "titleIcon" : Globe,
        "title": "เปลี่ยนภาษา",
        "icon": arrowDown,
        "childrens": [
            {
                "title": "ไทย (TH)",
                "badge": "ใช้งานอยู่",
            },
            {
                "title": "อังกฤษ (EN)",
                "badge": "ใช้งานอยู่",
            },
        ]
    }
]

export { data, topdata, changelang }
