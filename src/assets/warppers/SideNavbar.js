import styled from "styled-components";

const SideWarpper = styled.header`
nav.navmb-sidebar
    {
        position: fixed;
        top: 0;
        left: 0;
        width: auto;
        min-width: 250px;
        height: 100%;
        padding: 0 0 30px 0;
        background: white;
        z-index: 4;
        transition: .1s ease;
        overflow-y: scroll;
    }
    nav.navmb-sidebar::-webkit-scrollbar
    {
        display: none;
    }
    nav.navmb-sidebar .logo
    {
        margin: 15px 0 0 10px;
        width: 65px;
        cursor: pointer;
    }
    nav.navmb-sidebar .logo img
    {
        width: 100%;
        height: auto;
    }
    .navmb-overlay
    {
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: #00000050;
    }
    nav.navmb-sidebar[data-status="inactive"]
    {
        transform: translateX(-100%);
    }
    nav.navmb-sidebar[data-status="acitve"]
    {
        transform: translateX(0%);
    }
    nav.navmb-sidebar ul.menuwrap
    {
        display: grid;
        grid-template-columns: 1fr;
        margin-top: 20px;
        overflow-y: hidden;
    }
    
    nav.navmb-sidebar ul.menuwrap li
    {
        list-style: none;
        width: 100%;
        height: 45px;
        padding: 0px 15px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: .2s ease;
        background-color: transparent;
        cursor: pointer;
    }
    nav.navmb-sidebar ul.menuwrap li.more-sub
    {
        display: grid;
        grid-template-columns: 1fr 10px;
    }
    nav.navmb-sidebar ul.menuwrap li.more-sub div.change-lang
    {
        display: grid;
        grid-template-columns: 20px 1fr 10px; 
        gap: 4px;
    }
    nav.navmb-sidebar ul.menuwrap li.more-sub div.change-lang img:nth-child(1)
    {
        transform: rotate(0deg); 
    }
    nav.navmb-sidebar ul.menuwrap li.more-sub > img
    {
        transform: rotate(-90deg);
    }

    nav.navmb-sidebar ul.menuwrap li.more-sub.open > img
    {
        transform: rotate(0deg);
    }
    nav.navmb-sidebar ul.menuwrap li.more-sub.open
    {
        background: var(--color-yellow);

    }
    nav.navmb-sidebar ul.menuwrap li.more-sub
    {
        background: transparent; 
    }
    nav.navmb-sidebar ul.menuwrap li.more-sub img
    {
        width: 100%;
        height: auto;
        transition: .1s ease;
    }

    nav.navmb-sidebar ul.menuwrap > li > a
    {
        text-decoration: none;
        font-size: 15px;
        font-weight: 400;
        color: var(--color-dark-text);
    }
    
    /* sub menu */
    nav.navmb-sidebar ul.submenuwrap
    {
        overflow: hidden;
        width: 100%;
        height: 0px;
        transition: .1s ease;
    }

    nav.navmb-sidebar ul.submenuwrap.open
    {
        height: auto;
    }
    
    nav.navmb-sidebar ul.submenuwrap > li:hover
    {
        background: #00000010;
    }
    nav.navmb-sidebar ul.submenuwrap > li
    {
        padding: 0 15px 0 35px;
        align-items: center;
    }
    nav.navmb-sidebar ul.submenuwrap > li.more
    {
        display: grid;
        grid-template-columns: 1fr 10px;
        gap: 6px;
    }
    nav.navmb-sidebar ul.submenuwrap > li > img
    {
        width: 100%;
        height: auto;
    }
    nav.navmb-sidebar ul.submenuwrap > li > a
    {
        text-decoration: none;
        font-size: 15px;
        font-weight: 300;
        color: var(--color-dark-text);

        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    nav.navmb-sidebar ul.menuwrap > .line-space
    {
        margin: 15px 0;
        width: 100%;
        height: 2px;
        background-color: #F4F4F4;
    }
    nav.navmb-sidebar ul.submenuwrap > li.badge
    {
        position: relative;
    }
    nav.navmb-sidebar ul.submenuwrap.open > li .badge
    {
        position: absolute;
        border-radius: 100px;
        color: var(--color-dark-text);
        background-color: var(--color-darkyellow);
        font-size: 10px;
        right: 15px;
        height: 17px;
        padding: 2px 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    nav.navmb-sidebar ul.submenuwrap > li.badge
    {
        display: none;
    }
    /* Second Sub */
    nav.navmb-sidebar ul.secondsubmenu-wrap
    {
        overflow: hidden;
        width: 100%;
        height: 0px;
        padding-left: 18px;
        transition: .1s ease;
    }

    nav.navmb-sidebar ul.secondsubmenu-wrap.open
    {
        height: auto;
    }

    nav.navmb-sidebar ul.secondsubmenu-wrap > li:hover
    {
        background: #00000010;
    }
    nav.navmb-sidebar ul.secondsubmenu-wrap > li
    {
        padding: 0 15px 0 35px;
        display: grid;
        grid-template-columns: 1fr 10px;
        gap: 6px;
        align-items: center;
    }
    nav.navmb-sidebar ul.secondsubmenu-wrap > li > img
    {
        width: 100%;
        height: auto;
    }
    nav.navmb-sidebar ul.secondsubmenu-wrap > li > a
    {
        text-decoration: none;
        font-size: 15px;
        font-weight: 200;
        color: var(--color-dark-text);

        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    nav.navmb-sidebar ul.menuwrap > .line-space
    {
        margin: 15px 0;
        width: 100%;
        height: 2px;
        background-color: #F4F4F4;
    }
    nav.navmb-sidebar ul.secondsubmenu-wrap > li[data-lang="selected"]
    {
        position: relative;
    }
    nav.navmb-sidebar ul.secondsubmenu-wrap > li[data-lang="selected"] .badge
    {
        position: absolute;
        border-radius: 100px;
        color: var(--color-dark-text);
        background-color: var(--color-darkyellow);
        font-size: 10px;
        right: 15px;
        height: 17px;
        padding: 2px 6px;
    }

    nav.navmb-sidebar ul.menuwrap > li > a
    {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    `


export default SideWarpper
