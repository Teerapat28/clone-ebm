import styled from "styled-components";

const CarouselWarpper = styled.div`

@media screen and (max-width: 1180px)
        {
                padding-top : 40px; 
        }

    padding-top : 90px;

    .banner-homepage img {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        @media screen and (max-width: 1180px){
            width: 100%;
            height: auto;
        }
    }

    .banner-homepage .slick-slide img {
        object-position: top;
        object-fit: cover;
        width: 100%;
        height: auto !important;
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: cover;
        @media screen and (max-width: 1180px){
            width: 100%;
            height: auto !important;
        }
    }

    /* .banner-homepage {
        padding-top: 30px;
        margin-top: 90px;
        text-align: -webkit-center;
        @media screen and (max-width: 1180px){
            padding-top: 0px;
            margin-top: 0px;
        }
    } */

    .slick-dots {
        /* display: flex !important; */
        list-style: none !important;
        margin: 0 !important;
        /* padding: 0 !important; */
        position: absolute !important;
        bottom: 15px !important;
        /* left: 50% !important; */
        /* transform: translateX(-50%) !important; */
        @media screen and (max-width: 765px){
            display:none !important;
        }
    }

    .slick-dots li button:before {
        display: none !important;
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

    .slick-active button {
        background: var(--color-yellow) !important;
        color: var(--color-yellow) !important;
    }

    .slick-prev {
        background: none;
        border: none;
        z-index: 1;
        position: absolute;
        bottom: 180px;
        left: 120px;
        cursor: pointer;
        width: 50px !important;
        height: 50px;
        @media screen and (max-width: 1180px){
            left: 20px;
            bottom: 40px;
            width: 25px !important;
            height: 25px;
        }
    }

    .slick-next {
    background: none;
    border: none;
    z-index: 1;
    position: absolute;
    bottom: 180px;
    right: 120px;
    cursor: pointer;
    width: 50px !important;
    height: 50px;
    @media screen and (max-width: 1180px){
    right: 16px;
    bottom: 40px;
    width: 25px !important;
    height: 25px;
}
}

`

export default CarouselWarpper