import styled from "styled-components";

const Warpper = styled.footer`
    position: relative;
    width: 100%;
    z-index: 4;
    background-color: var(--color-dark-text);
    transition: 0.1s ease;

    user-select: none;

    /* passenger */

    .passenger-con {
        width: 100%;
        height: 55px;
        background: #444b4e;
        transition: 0.1s ease;
        padding: 0 15px;
        @media screen and (max-width: 985px){
            height: auto;
            padding: 15px 15px;
        }
    }

    .passenger-wrap {
        width: 100%;
        height: 100%;
        max-width: 1180px;
        margin: 0 auto;
        transition: 0.1s ease;
        display: grid;
        grid-template-columns: 1fr 360px;
        align-items: center;
        @media screen and (max-width: 985px){
            grid-template-columns: 1fr;
            gap: 12px;
        }
    }

    .passenger-wrap .left {
        display: grid;
        grid-template-columns: 20px 1fr;
        align-items: center;
        gap: 5px;
        @media screen and (max-width: 985px){
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
    }

    .passenger-wrap .left img {
        width: 100%;
        height: auto;
        @media screen and (max-width: 985px){
            width: 20px;
            height: auto;
        }
    }

    .passenger-wrap .left p {
        color: white;
        font-size: 15px;
        font-weight: 400;
    }

    .passenger-wrap .right {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        @media screen and (max-width: 985px){
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .passenger-wrap .right label {
        font-size: 14px;
        font-weight: 200;
        color: white;
        @media screen and (max-width: 985px) {
            margin-bottom: 8px;
        }
    }

    .passenger-wrap .right select {
        cursor: pointer;
        width: 250px;
        height: 35px;
        /* background-color: transparent; */
        border-radius: 4px;
        border: 1px solid white;
        padding: 0 6px;
        outline: none;
        font-size: 14px;
        font-weight: 200;
        color: #666666;
    }


    .footer-top-con {
        width: 100%;
        background: var(--color-dark-text);
        transition: 0.1s ease;
    }

    .footer-top {
        max-width: 1180px;
        width: 100%;
        margin: 0 auto;
        padding: 26px 15px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        transition: 0.1s ease;
        @media screen and (max-width: 679px){
            grid-template-columns: 1fr;
            gap: 20px;
        }
    }

    .footer-top > .left {
        display: grid;
        justify-content: start;
        @media screen and (max-width: 679px){
            display: grid;
            justify-content: center;
        }
    }

    .footer-top > .right {
        @media screen and (max-width: 679px){
            display: grid;
            justify-content: center;
        }
}

    .footer-top .left > h3 {
        color: #fff;
        font-size: 16px;
        @media screen and (max-width: 679px){
            text-align: center;
        }
    }

    .footer-top .right > h3 {
        color: #fff;
        font-size: 16px;
        @media screen and (max-width: 679px){
            text-align: center;
        }
    }

    .footer-top > .left > ul.menus-wrap {
        display: grid;
        grid-template-columns: 240px 120px;
        gap: 6px;
        margin-top: 10px;
        @media screen and (max-width: 679px){
            grid-template-columns: 1fr 1fr;
        }
    }

    .footer-top > .left > ul.menus-wrap > li {
        list-style: none;
        color: white;
        font-size: 14px;
        font-weight: 200;
        cursor: pointer;
        @media screen and (max-width: 679px){
            text-align: center;
        }
    }

    #sub-wrap {
        display: none;
        background: white;
        padding: 10px 0;
        border-radius: 8px 15px;
        position: absolute;
        width: 200px;
        height: auto;
        overflow: hidden;
        box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.15);
    }

    .footer-top > .left > ul.menus-wrap > li > a {
        text-decoration: none;
        color: white;
        font-size: 14px;
        font-weight: 200;
        transition: 0.1s ease;
    }

    .footer-top > .right {
        display: grid;
        justify-content: end;
        @media screen and (max-width: 679px){
            display: grid;
            justify-content: center;
        }
    }

    

    .footer-top > .right > h3 {
        text-align: right;
        @media screen and (max-width: 679px){
            text-align: center;
        }
    }

    .footer-top > .right .app-group {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 89px 89px 89px;
        justify-content: end;
        height: 89px;
        gap: 15px;
        @media screen and (max-width: 1024px){
            grid-template-columns: auto auto auto;
            justify-content: center;
        }
        /* @media screen and (max-width: 930px){
            grid-template-columns: auto auto auto;
            justify-content: center;
        } */
    }
    

        .app-group {
            @media screen and (max-width: 460px){
                gap: 0px !important;
                align-items: center;
            }
        }

    .footer-top > .right .app-group > .left > img {
        width: 100%;
        height: auto;
        @media screen and (max-width: 1024px){
            width: auto;
            height: 86px;
        }
        @media screen and (max-width: 355px){
            height: 66px;
        }
    }

    .app-group .left {
        @media screen and (max-width: 460px){
            margin-right: 15px;
        }
    }

    .footer-top > .right .app-group > .mid, .footer-top > .right .app-group > .right {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        gap: 1rem;
    }

    .app-group .right {
        @media screen and (max-width: 460px){
            display: grid !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 6px !important;
            grid-template-columns: 86px 130px !important;
        }
        @media screen and (max-width: 355px){
            grid-template-columns: 66px 99px !important;
        }
    }

    .app-group .right .s-left img {
        height: 85px;
        @media screen and (max-width: 460px){
            width: 100% !important;
            height: auto !important;
        }
    }

    .app-group .right .s-right {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .app-group .right .s-right img {
        height: 40px;
        @media screen and (max-width: 460px){
            width: auto !important;
            height: 40px !important;
        }
        @media screen and (max-width: 355px){
            width: auto !important;
            height: 30px !important;
        }
    }

    .appdlimg {
        max-width: 130px !important;
        height: auto;
    }


    .footer-under-con {
        width: 100%;
        background: var(--color-yellow);
        transition: 0.1s ease;
    }

    .footer-under {
        width: 100%;
        max-width: 1180px;
        margin: 0 auto;
        padding: 18px 15px;
        display: grid;
        transition: 0.1s ease;
    }

    .footer-under .top {
        display: grid;
        grid-template-columns: 1fr 386px;
        border-bottom: 1px solid #e0bf34;
        padding: 0 20px 20px 20px;
        margin-bottom: 20px;
        @media screen and (max-width: 930px){
            grid-template-columns: 1fr;
            gap: 16px;
        }
    }

    .footer-under .top .left {
        text-align: left;
        @media screen and (max-width: 930px){
            text-align: left;
        }
    }

    .footer-under .top .left p {
        color: var(--color-dark-text);
    }

    .footer-under .top .right {
        text-align: right;
        @media screen and (max-width: 930px){
            text-align: left;
        }
    }

    .footer-under .copyright p {
        text-align: center;
        font-size: 14px;
        font-weight: 200;
        color: #453b00;
    }





`

export default Warpper