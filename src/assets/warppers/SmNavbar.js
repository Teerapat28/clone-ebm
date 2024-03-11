import styled from "styled-components";

const Warpper = styled.header`

    @media screen and (max-width: 1180px)
        {
            display: block !important;
        }

        position: relative;
        display: none;
        z-index: 6;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: var(--color-yellow);
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.32);


    nav.navmb
    {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        user-select: none;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
    }

    nav.navmb .left
    {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    nav.navmb .left div
    {
        width: 100%;
        height: 100%;
        padding-left: 10px;
    }
    nav.navmb .left div img
    {
        width: auto;
        height: 15px;
        cursor: pointer;
    }
    nav.navmb .mid div
    {
        display: flex;
        justify-content: center;
    }
    nav.navmb .mid div img
    {
        width: auto;
        height: 48px;
        margin: 0 auto;
        cursor: pointer;
    }

`
export default Warpper