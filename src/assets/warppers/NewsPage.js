import styled from "styled-components";

const Warpper = styled.div`

    .container {
        position: relative;
        max-width: 1180px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }

    .page-content .main {
        margin-top: 40px !important;
        padding: 0 15px;
        @media screen and (max-width: 850px){
            margin-top: 20px !important;
        }
    }

    .content {
        /* padding-top: 20px; */
        display: grid;
    }

    .main .head {
        width: 100%;
        text-align: center;
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
        left: 58px;
        bottom: -12px;
        width: 40%;
        height: 4px;
        border-radius: 100px;
        background: var(--color-yellow);
    }

    .sub-content {
    @media screen and (max-width: 850px){
            padding: 0;
            background: none;
            box-shadow: none;
        }
    }

    .news-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 1rem;
        margin-bottom: 60px;
        @media screen and (max-width: 850px){
            grid-template-columns: 1fr;
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

    .sub-image {
        text-align: -webkit-center;
    }

    .sub-image img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        object-position: bottom;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        @media screen and (max-width: 850px){
            width: 100%;
            height: auto;
            object-fit: cover;
            object-position: bottom;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
    }

    .box-news .sub-details {
        text-align-last: left;
        padding-left: 20px;
        padding-top: 14px;
        padding-right: 10px;
        display: flex;
        gap: 7px;
        flex-direction: column;
        position: relative;
    }

    .box-news .sub-details {
        text-align-last: left;
        padding-left: 20px;
        padding-top: 14px;
        padding-right: 10px;
        display: flex;
        gap: 7px;
        flex-direction: column;
        position: relative;
    }

    .news-list .box-news .sub-details:before {
        content: "";
        position: absolute;
        left: 10px;
        bottom: 33px;
        width: 1%;
        height: 36px;
        border-radius: 100px;
        background: var(--color-yellow);
    }

    .box-news .sub-details p:first-child {
        color: #9f9f9f;
        font-size: 12px;
    }

    .box-news .sub-details p:last-child {
        color: #030303;
        font-size: 14px;
        line-height: 19px;
        /* padding: 0.3rem 7px 0; */
        margin: 0;
        width: 100%;
        height: 39px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
    }

    .btn-details {
        float: right;
        padding: 14px;
    }

    .btn-details a {
        font-size: 12px;
        border: 1px solid #f2f2f2;
        border-radius: 26px;
        padding: 10px 25px 10px 15px;
        text-decoration: none;
        color: #2e383c;
        position: relative;
        cursor: pointer;
    }

    .btn-details a img {
        width: 5px;
        position: absolute;
        left: 80px;
        top: 14px;
        height: auto;
    }




`

export default Warpper