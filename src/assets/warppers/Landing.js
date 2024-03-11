import styled from "styled-components";
import roadmap from '../images/home/routemap.jpg'
import elib from '../images/home/elib.png'
import elib1 from '../images/home/elib1.jpg'


const Warpper = styled.div`
    .container {
        position: relative;
        max-width: 1180px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    
    .main {
        margin-top: 60px;
        padding: 0 15px;

        @media screen and (max-width: 1180px){
        margin-top: 25px;
    }
    }

    /* CarylSection */
    
    .content-ylline {
        display: grid;
        grid-template-columns: 1fr 1fr;
        @media screen and (max-width: 1180px) {
            grid-template-columns: 1fr;
            padding: 0 20px;
            }

            @media screen and (max-width: 850px)  {
                grid-template-columns: 1fr;
                }
    }

    .content-ylline img {
        @media screen and (max-width: 1180px) {
            width: 100%;
            height: auto;
            padding-top: 15px;
        }
    }
    
    .main .head {
        width: 100%;
        text-align: center;
    }

    .main .text-white h1 {
        color: var(--color-white-text) !important;
    }

    .main h1 {
        color: var(--color-dark-text);
        font-size: 26px;
        text-align: center;
        position: relative;
        display: inline-block;
        margin: 0 auto;
    }

    .main h1::before {
    content: "";
    position: absolute;
    left: 24px;
    bottom: -12px;
    width: 80%;
    height: 4px;
    border-radius: 100px;
    background: var(--color-yellow);
    }
    
    .content {
    padding-top: 30px;
    display: grid;
    gap: 1rem;
    }

    .sub-content .sub-hand {
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
    color: #2e383c;
    padding-bottom: 8px;
    }

    .sub-content .details {
    font-size: 16px;
    font-weight: 300;
    line-height: 23px;
    color: #3f3f3f;
    }

    .content-img {
    text-align-last: center;
    }

    /* RoadMap */
    .content-route-map {
        background-image: url(${roadmap});
        background-color: rgba(46, 56, 60, 0.42);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .content-route {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 40px;
    padding-bottom: 40px;
    @media screen and (max-width: 1180px){
        grid-template-columns: 1fr;
        padding: 20px 0 20px 0;
    }
    }

    .content-search-route {
        background-color: var(--color-yellow);
        margin: 30px 20px 0 20px;
        padding: 24px;
        box-shadow: 0px -1px 16px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }

    .content-search-route .sub-head {
        font-size: 18px;
        font-weight: 400;
        padding: 0 10px 10px 0;
    }

    .content-search-route .input-origin {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.1rem;
        justify-items: flex-start;
    }

    .content-search-route .input-origin label {
        font-size: 16px;
        font-weight: 300;
        color: #4e4e4e;
    }

    .content-search-route .input-origin input[type="text"] {
        position: relative;
        width: 100%;
        height: 37px;
        border-radius: 4px;
        outline: none;
        border: 1px solid #E0E0E0;
        font-size: 14px;
        color: var(--color-dark-text);
        padding: 8px 10px;
        transition: .2s ease;
    }

    .suggest-station-lists {
        position: absolute;
        top: 40%;
        left: 0;
        width: 100%;
        max-height: 255px;
        height: 0px;
        transition: height .1s ease;
        z-index: 5;
        overflow-y: auto;
        border-radius: 4px;
        background-color: white;
        box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.15);
    }

    .content-search-route .input-destination {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.1rem;
        justify-items: flex-start;
    }
    
    .content-search-route .input-destination label {
        font-size: 16px;
        font-weight: 300;
        color: #4e4e4e;
    }

    .content-search-route .input-destination input[type="text"] {
        position: relative;
        width: 100%;
        height: 37px;
        border-radius: 4px;
        outline: none;
        border: 1px solid #E0E0E0;
        font-size: 14px;
        color: var(--color-dark-text);
        padding: 8px 10px;
        transition: .2s ease;
    }

    .content-search-route .submit {
        text-align: -webkit-center;
        padding: 4px;
        width: 100%;
        margin-top: 20px;
    }

    .content-search-route .submit .btn-submit {
        width: 100%;
        background: #2e383c;
        color: var(--color-white-text);
        padding: 10px;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        text-decoration: none;
    }

    .content-route .content-right {
        align-self: center;
        text-align: -webkit-center;
        padding: 20px;
        width: 100%;
        margin-top: 45px;
        @media screen and (max-width: 1180px){
            margin-top: 0 !important;
        }
    }

        .content-bt {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        gap: 1rem;
    }

    .bt-content {
        width: 100%;
    }

    .sub-bt-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.12);
        border-radius: 10px;
        padding: 10px;
        gap: 5px;
    }
    
    .sub-bt-content img {
        width: 100%;
        height: 100%;
        max-width: 60px;
    }

    .sub-bt-content p {
        font-size: 14px;
        font-weight: 300;
    }

    /* #route */

        .route1 {
        @media screen and (max-width: 1180px){
            display: none;
        }
    }

        .route2 {
        display: none;
        @media screen and (max-width: 1180px){
            display: block;
        }
    }

    /* Promotion */
    .content-promo .main .head h1 {
        color: var(--color-dark-text);
        font-size: 26px;
        text-align: center;
        position: relative;
        display: inline-block;
        margin: 0 auto;
    }

    .content-promo .main .head h1::before {
        content: "";
        position: absolute;
        left: 9px;
        bottom: -14px;
        width: 80%;
        height: 4px;
        border-radius: 100px;
        background: var(--color-yellow);
    }

    .view-details {
        text-align: -webkit-center;
        padding-bottom: 20px;
        padding-top: 20px;
    }

    .view-details .sub-btn {
        position: relative;
        text-decoration: none;
    }

    .view-details .sub-btn img {
        width: 6px;
        position: absolute;
        left: 64px;
        top: 9px;
    }  


    /* Article */
    
    .content-article {
        background-color: #fffbea;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .content-article .container .main {
        margin-top: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .content-article .main .head h1 {
        color: var(--color-dark-text);
        font-size: 26px;
        text-align: center;
        position: relative;
        display: inline-block;
        margin: 0 auto;
    }

    .content-article .main .head h1::before {
        content: "";
        position: absolute;
        left: 9px;
        bottom: -14px;
        width: 80%;
        height: 4px;
        border-radius: 100px;
        background: var(--color-yellow);
    }

    .article-list {
        gap: 1rem;
        width: 100%;
        display: inline-block;
        text-align: -webkit-center;
        padding-top: 20px;
    }

    /* Elibrary */

    .content-elibrary {
        background-image: url(${elib});
        background-color: #fad53d;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .content-elibrary .container .main {
        margin-top: 0px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .content-elibrary .main .head h1::before {
        content: "";
        position: absolute;
        left: 7px;
        bottom: -14px;
        width: 80%;
        height: 4px;
        border-radius: 100px;
        background: var(--color-dark-text);
    }

    .elibrary-list {
        height: 226px;
    }

    .elibrary-list .slick-slide > div {
        margin: 0 10px;
    }   

    .elibrary-list .box-elib {
        text-align: -webkit-left;
        padding: 20px;
        height: 162px;
        width: 343px;
        background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.92) 0%,
        rgba(0, 0, 0, 0.47) 80.33%
        ),
        url(${elib1}) no-repeat center center/cover;
        border-radius: 10px;
    }

    .elibrary-list .box-elib .title {
        font-size: 24px;
        color: var(--color-yellow);
        font-weight: 200;
        line-height: 26px;
        letter-spacing: 0.118182px;
    }

    .elibrary-list .box-elib .details {
        font-size: 16px;
        color: var(--color-white-text);
        font-weight: 200;
        line-height: 17px;
        letter-spacing: 0.118182px;
        height: 68px;
    }

    .elibrary-list .box-elib .btn-elib a {
        font-size: 14px;
        color: var(--color-dark-text);
        font-weight: 200;
        line-height: 17px;
        letter-spacing: 0.118182px;
        background: #ffffff;
        border-radius: 6px;
        padding: 5px 10px 5px 10px;
        text-decoration: none;
        border: none;
    }

    .slick-dots {
        display: none !important;
        list-style: none !important;
        margin: 0 !important;
        /* padding: 0 !important; */
        position: absolute !important;
        bottom: 15px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        @media screen and (max-width: 765px){
            display:none !important;
        }
    }

    .slick-dots li {
        margin: 0 4px !important;
        position: revert !important;
        width: auto !important;
    }

    .slick-dots li button {
        background: gray;
        height: 10px !important;
        width: 10px !important;
        overflow: hidden !important;
        color: gray;
        border: 1px solid #ffffff5c !important;
        border-radius: 10px !important;
    }

    .slick-dots li button:before {
        display: none;
    }

    .slick-active button {
        background: var(--color-yellow) !important;
        color: var(--color-yellow) !important;
    }

    /* .slick-prev, .slick-next {
        font-size: 0;
        line-height: 0;
        position: absolute;
        top: 50%;
        display: block;
        width: 20px;
        height: 20px;
        padding: 0;
        transform: translate(0, -50%);
        cursor: pointer;
        color: transparent;
        border: none;
        outline: none;
        background: transparent;
    } */

    .slick-prev {
        background: none;
        border: none;
        z-index: 1;
        position: absolute;
        bottom: 160px;
        left: -20px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        @media screen and (max-width: 1180px){
            left: 5px;
            width: 25px;
            height: auto;
            bottom: 160px;
        }
    }

    .slick-next {
        background: none;
        border: none;
        z-index: 1;
        position: absolute;
        bottom: 160px;
        right: -10px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        @media screen and (max-width: 1180px){
            right: 5px;
            width: 25px;
            height: auto;
            bottom: 160px;
        }
    }

    /* content */
    .contact-css .main {
        margin-top: 5px !important;
        padding-top: 5px !important;
        padding-bottom: 60px;
    }

    .content-contact {
        display: grid;
        grid-template-columns: 40% 60%;
        @media screen and (max-width: 1180px){
            grid-template-columns: 1fr;
            padding: 0 20px 0 20px;
        }
    }

    .content-contact .content-left .head {
        width: 100%;
        text-align: left !important;
    }

    .content-contact .content-left .head h1 {
        color: var(--color-dark-text);
        font-size: 32px;
        text-align: left !important;
        position: relative;
        display: inline-block;
        margin: 0 auto;
    }

    .content {
        padding-top: 30px;
        display: grid;
        gap: 1rem;
    }

    .sub-content .sub-hand {
        font-size: 18px;
        font-weight: 600;
        line-height: 25px;
        color: #2e383c;
        padding-bottom: 8px;
    }

    .contact-css .details {
        color: #3f3f3f;
        font-weight: 300;
    }

    .sub-image-contact {
        display: grid;
        gap: 0rem;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        @media screen and (max-width: 1180px){
            grid-template-columns: 1fr 1fr;
            gap: 0;
        }
    }

    .content-img {
        text-align-last: center;
    }

    .figure {
        position: relative;
        width: 190px;
        max-width: 100%;
        @media screen and (max-width: 1180px){
            position: relative;
            width: auto;
            max-width: 100%;
        }
    }

    .sub-contact {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .content-img img {
        /* max-width: 400px; */
    }

    .sub-image-contact img {
        max-width: 60px !important;
        @media screen and (max-width: 1180px){
            grid-template-columns: 1fr 1fr;
            gap: 0;
        }
    }

    .content-right {
    @media screen and (max-width: 1180px){
        margin-top: 20px !important;
    }
    }

    .contentflex {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 30px;
    }

`
export default Warpper