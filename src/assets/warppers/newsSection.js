import styled from "styled-components";

const Warpper = styled.div`

    .content-news {
        @media screen and (max-width: 1180px){
            padding: 0 20px 0 20px;
        }
    }

    .content-news .main {
        margin-top: 25px;
        @media screen and (max-width: 1180px){
            margin-top: 40px;
        }
    }

    .box-news {
        background: #ffffff;
        box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        /* margin: 10px 10px 10px 5px; */
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .content-news img {
        @media screen and (max-width: 1180px){
            width: 100%;
            height: auto;
        }
    }

    .news-list img {
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .box-news .sub-details {
        text-align: left;
        margin: 10px 20px;
        display: flex;
        gap: 7px;
        flex-direction: column;
    }

    .box-news .sub-details p:first-child {
        color: #9f9f9f;
        font-size: 14px;
    }

    .news-list .box-news .sub-details p:last-child {
        position: relative;
    }

    .box-news .sub-details p:last-child {
        color: #030303;
        font-size: 16px;
        line-height: 22px;
        /* padding: 0.3rem 7px 0; */
        margin: 0;
        width: 100%;
        height: 45px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
    }

    .news-list .box-news .sub-details p:last-child::before {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 15%;
        height: 2px;
        border-radius: 100px;
        background: var(--color-yellow);
    }

    .btn-details {
        float: right;
        padding: 14px;
    }

    .btn-details a {
        font-size: 14px;
        border: 1px solid #f2f2f2;
        border-radius: 26px;
        padding: 10px 25px 10px 15px;
        text-decoration: none;
        color: #2e383c;
        position: relative;
    }

    .btn-details a img {
        width: 5px;
        position: absolute;
        left: 88px;
        top: 17px;
    }

    .news-list .slick-slide > div {
        /* margin-left: 10px; */
        /* margin-right: 10px; */
        margin: 0 10px
    }

    button.pp2-news {
        background: none;
        border: none;
        z-index: 1;
        position: absolute;
        bottom: 210px;
        left: -20px;
        cursor: pointer;
        @media screen and (max-width: 1180px){
            left: 5px;
            width: 40px;
            bottom: 210px;
        }
    }

    .content-news .imgcard {
        @media screen and (max-width: 1180px){
            width: 100%;
            height: auto;
        }
    }

    .content-news img {
        @media screen and (max-width: 1180px) {
            width: 25px;
            height: auto;
        }
    }

    button.nn2-news {
        background: none;
        border: none;
        z-index: 1;
        position: absolute;
        bottom: 210px;
        right: -10px;
        cursor: pointer;
        @media screen and (max-width: 1180px){
            right: 16px;
            width: 40px;
            bottom: 210px;
        }
    }


`

export default Warpper