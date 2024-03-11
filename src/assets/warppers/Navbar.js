import styled from "styled-components";

const Warpper = styled.header`

@media screen and (max-width: 1180px) 
        {
                display: none !important;
        }

            position: fixed;
            top: 0;
            left: 0;

            width: 100%;
            height: 90px;
            /* display: flex;
        align-items: center;
        justify-content: center; */
            background: var(--color-yellow);
            color: #fff;
            z-index: 5;
            box-sizing: border-box;

            box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.32);
        
        nav.nav-top {
            width: 100%;
            height: 30px;
            background-color: var(--color-darkyellow);
        }
        #nav-top-wrap {
            max-width: 1180px;
            width: 100%;
            height: 100%;
            margin: 0 auto;

            display: grid;
            align-items: center;
            grid-template-columns: 260px 1fr 216px;
        }

        nav.nav-top div .left {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        nav.nav-top div .right {
            width: 100%;
            display: grid;
            align-items: center;
            justify-content: end;
            grid-template-columns: 1fr 1fr 1fr;
            text-align: center;
        }

        nav.nav-top div a:hover {
            text-decoration: underline solid var(--color-dark-text) 1px;
        }

        nav.nav-top div a,
        nav.nav-top div span {
            color: var(--color-dark-text);
            font-weight: 300;
            font-size: 12px;
            text-decoration: none;
            transition: .1s ease;
        }

        nav.nav-top div .left a:nth-child(2),
        nav.nav-top div .right a:nth-child(2) {
            border-left: 1px solid var(--color-dark-text);
            border-right: 1px solid var(--color-dark-text);
            padding: 0 5px;
            margin: 0 5px;
        }

        nav.nav-top div .right .chng-lang {
            position: relative;
            cursor: pointer;
        }

        nav.nav-top div .right .chng-lang .btn-wrap {
            display: grid;
            align-items: center;
            grid-template-columns: 15px 56px 10px;
            text-align: center;
        }

        nav.nav-top div .right .chng-lang .dd {
            display: none;
            position: absolute;
            top: 24px;
            left: 0;
            background: white;
            width: 100%;
            border-radius: 6px;
            text-align: center;
            overflow: hidden;
        }

        nav.nav-top div .right .chng-lang .dd>li {
            list-style: none;
            font-size: 14px;
            color: var(--color-dark-text);
            height: 30px;
            padding: 5px 0;
        }

        nav.nav-top div .right .chng-lang .dd>li:hover {
            background: #f3f3f3;
        }

        nav.nav-top div .right .chng-lang img {
            width: 100%;
            height: auto;
        }

        nav.nav-under {
            max-width: 1180px;
            width: 100%;
            height: 60px;
            margin: 0 auto;

            display: grid;
            grid-template-columns: 60px 1fr;
            gap: 80px;
            box-sizing: border-box;
        }

        nav.nav-under .logo {
            width: 100%;
            height: 60px;
            cursor: pointer;
        }

        nav.nav-under .logo img {
            width: auto;
            height: 60px;
        }

        nav.nav-under .nav-items {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
        }

        nav.nav-under .nav-items li {
            height: 100%;
            list-style: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: .1s ease;
        }

        nav.nav-under .nav-items span {
            font-size: 15px;
            font-weight: 500;
            color: var(--color-dark-text);
        }

        nav.nav-under .nav-items li #icon {
            margin-left: .4rem;
            width: 10px;
            height: auto;
        }

        nav.nav-under .nav-items li:not(:last-child) {
            margin-right: 1.5rem;
        }

        .navmenu-detail-wrap {
            width: 100%;
            height: 300px;
            overflow: hidden;
            background-color: white;
            transition: height .1s ease-in-out;
            position: fixed;
            top: 90px;
            left: 0;
        }

        .navmenu-detail-wrap .arrowi {
            opacity: 0;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;

            border-top: 8px solid white;
            transform: rotate(180deg);

            position: fixed;
            left: 0px;
            bottom: 0px;
            transition: .1 ease;
        }

        .navmenu-detail-wrap .arrowi.active {
            opacity: 1;
        }

        .navmenu-detail-wrap .navmenu-item-detail {
            position: absolute;
            padding: 25px 0px 30px 0px;
            max-width: 400px;
            width: 100%;

            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
        }

        .navmenu-detail-wrap .navmenu-item-detail li {
            list-style: none;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.head {
            position: relative;
            color: var(--color-dark-text);
            height: 25px;
            font-size: 16px;
            font-weight: 400;

            display: flex;
            align-items: center;
            padding-left: .4rem;
            margin-bottom: .3rem;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.head::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            background-color: var(--color-yellow);
            border-radius: 100px;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link {
            margin-left: 1rem;
            padding: 0 12px;
            height: 35px;
            display: grid;
            grid-template-columns: 1fr 12px;
            align-items: center;
            transition: .1s ease;
            cursor: pointer;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link:hover {
            background: var(--color-yellow);
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link:hover a {
            color: var(--color-dark-text);
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link:hover .icons img[data-color="yellow"] {
            opacity: 0;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link:hover .icons img[data-color="white"] {
            opacity: 1;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link a {
            text-decoration: none;
            font-size: 15px;
            font-weight: 300;
            color: #7E7E7E;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link img {
            width: 100%;
            height: auto;
            cursor: pointer;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link .icons {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link .icons img {
            position: absolute;
            width: 100%;
            height: auto;
            transition: .1s ease
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link .icons img[data-color="yellow"] {
            opacity: 1;
        }

        .navmenu-detail-wrap .navmenu-item-detail li.link .icons img[data-color="white"] {
            opacity: 0;
        }


`
export default Warpper



// nav.nav-under .navmenu-detail-wrap {
//     width: 100%;
//     /* height: 0px; */
//     height: 300px;
//     overflow: hidden;
//     background-color: white;
//     transition: height .1s ease-in-out;
//     position: fixed;
//     top: 90px;
//     left: 0;
// }

// nav.nav-under .navmenu-detail-wrap .arrowi.active {
//     opacity: 1;
// }

// nav.nav-under .navmenu-detail-wrap .arrowi {
//     opacity: 0;
//     width: 0;
//     height: 0;
//     border-left: 8px solid transparent;
//     border-right: 8px solid transparent;
//     border-top: 8px solid white;
//     transform: rotate(180deg);
//     position: fixed;
//     left: 0px;
//     bottom: 0px;
//     transition: .1 ease;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail {
//     position: absolute;
//     padding: 25px 0px 30px 0px;
//     max-width: 400px;
//     width: 100%;
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 0;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li.head {
//     position: relative;
//     color: var(--color-dark-text);
//     height: 25px;
//     font-size: 16px;
//     font-weight: 400;
//     display: flex;
//     align-items: center;
//     padding-left: .4rem;
//     margin-bottom: .3rem;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li {
//     list-style: none;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li.link {
//     margin-left: 1rem;
//     padding: 0 12px;
//     height: 35px;
//     display: grid;
//     grid-template-columns: 1fr 12px;
//     align-items: center;
//     transition: .1s ease;
//     cursor: pointer;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li.link a {
//     text-decoration: none;
//     font-size: 15px;
//     font-weight: 300;
//     color: #7E7E7E;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li.link .icons {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li.link .icons img[data-color="yellow"] {
//     opacity: 1;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li.link .icons img {
//     position: absolute;
//     width: 100%;
//     height: auto;
//     transition: .1s ease;
// }

// nav.nav-under .navmenu-detail-wrap .navmenu-item-detail li.link img {
//     width: 100%;
//     height: auto;
//     cursor: pointer;
// }

// nav.nav-under .navmenu-subitem-detail-wrap {
//     display: none;
//     position: absolute;
//     padding: 20px 0px 30px 10px;
//     max-width: 350px;
//     width: 100%;
//     border-left: 1px solid #F3F3F3;
//     margin-left: 10px;
// }

// .navmenu-subitem-detail {
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 0;
// }

// .navmenu-subitem-detail li {
//     position: relative;
//     list-style: none;
//     color: var(--color-dark-text);
//     padding: 0 12px 0 5px;
//     min-height: 35px;
//     display: grid;
//     grid-template-columns: 1fr;
//     align-items: center;
//     transition: .1s ease;
//     cursor: pointer;
//     border-bottom: 1px solid #F4F4F4;
//     padding-top: 5px;
//     padding-bottom: 5px;
// }

// .navmenu-subitem-detail li::before {
//     content: '';
//     position: absolute;
//     transition: .2s ease;
//     width: 3px;
//     height: 0%;
//     background: var(--color-yellow);
// }

// .navmenu-subitem-detail li a {
//     text-decoration: none;
//     font-size: 15px;
//     font-weight: 300;
//     color: #7E7E7E;
// }