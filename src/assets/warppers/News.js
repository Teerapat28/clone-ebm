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
        margin-top: 40px;
        margin-bottom: 40px;
        /* padding: 40px; */
        background: #ffffff;
        box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        @media screen and (max-width: 1180px){
            box-shadow: none;
        }
    }

    .news-list {
        width: 100%;
        height: auto;
        padding-bottom: 40px;
    }

    .news-list .div-image {
        @media screen and (max-width: 850px){
            width: 100%;
            /* height: 200px; */
            object-fit: cover;
            object-position: bottom;
        }
    }

    .news-list .div-image img {
        width: 100%;
        height: auto;
        object-fit: cover;
        object-position: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .share-wrap {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        margin-top: 15px;
        padding: 0 40px;
        @media screen and (max-width: 850px){
            padding: 0 !important;
        }
    }

    .share-wrap .right {
        display: grid;
        grid-template-columns: 68px 100px;
        align-items: center;
        justify-content: end;
    }

    .share-wrap .right .label {
        display: grid;
        grid-template-columns: 20px 1fr;
        gap: 5px;
        align-items: center;
    }

    .share-wrap .right .label img {
        width: 20px;
        height: auto;
    }

    .share-wrap .right .label span {
        font-size: 15px;
        font-weight: 300;
    }

    .share-wrap .right .group {
        display: grid;
        grid-template-columns: 30px 30px 30px;
        gap: 5px;
    }

    .share-wrap .right button {
        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .share-wrap .right .group img {
        width: 100%;
        height: auto;
    }

    .news-list .div-content {
        display: grid;
        grid-template-columns: 10% 90%;
        margin-top: 20px;
        padding: 0 40px;
        @media screen and (max-width: 850px){
            padding: 0;
            margin-top: 0px;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }

    .news-list .div-content h3 {
        padding-left: 30px;
        position: relative;
        font-weight: 500;
        font-size: 20px;
        line-height: 29px;
        letter-spacing: 0.118182px;
        color: #3F3F3F;
        @media screen and (max-width: 850px) {
            padding-left: 10px;
        }
    }

    .news-list .div-content h3::before {
        position: absolute;
        content: "";
        left: 10px;
        bottom: 4px;
        width: 3px;
        height: 36px;
        border-radius: 100px;
        background: var(--color-yellow);
        @media screen and (max-width: 850px){
            position: absolute;
            content: "";
            left: 0px;
            top: 0;
            width: 3px;
            height: 36px;
            border-radius: 100px;
            background: var(--color-yellow);
        }
    }

    .news-list .div-details {
        margin-top: 20px;
        padding: 0 40px;
        @media screen and (max-width: 850px){
            padding: 0;
        }
        @media screen and (max-width: 645px){
            padding: 0;
            width: 100%;
            height: auto;
        }
    }

    .news-list .div-details img {
        max-width: 600px;
        width: 100%;
        height: auto;
        @media screen and (max-width: 645px){
            width: 100% !important;
            height: auto;
        }
    }

    


`

export default Warpper