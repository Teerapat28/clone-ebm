import {BASE_URL} from '/utils/config/constant.js'
import {ACTION_API} from '/utils/apis/actions_api.js'
import {NAVBAR_ENGIN} from '/assets/js/navbar.js'
import {EncryptedText, DecryptedText, DecryptedOBJ,EncryptedOBJ} from '/utils/config/crypto.js'

var LANGUAGE = ""; // th, en
var ZOOM_LEVEL = 0; // current zoom level
var MINIMUM_ZOOM_LEVEL = 0; // minimum zoom value
var MAXIMUM_ZOOM_LEVEL = 240; // maximum zoom value
var STEP_ZOOM_LEVEL = 20; // step zoom
var MAP_POSITION = 0; // top position of map init
var SUB_STATION_POINT_SIZE = 22 // pixel size
var MINIMUM_WINDOW_HEIGHT = 635;

var STATION_NAME_SELECTED = "";
var STATION_KEY_SELECTED = "";

var ORIGIN_STATION_Y = "";
var ORIGIN_STATION_X = "";
var DEST_STATION_Y = "";
var DEST_STATION_X = "";

var CUR_STATION_SELECTED_Y = "";
var CUR_STATION_SELECTED_X = "";
var CUR_STATION_ID_SELECTED = "";

var CUR_ORIGIN_STATION_ID_SELECTED = "";
var CUR_ORIGIN_STATION_KEY_SELECTED = "";
var CUR_ORIGIN_NAME_SELECTED = "";
var CUR_ORIGIN_AREAMAP_ID_SELECTED = 0;
var CUR_ORIGIN_TYPE_SELECTED = "station"; // station, area

var CUR_DESTINATION_STATION_ID_SELECTED = "";
var CUR_DESTINATION_STATION_KEY_SELECTED = "";
var CUR_DESTINATION_NAME_SELECTED = "";
var CUR_DESTINATION_AREAMAP_ID_SELECTED = 0;
var CUR_DESTINATION_TYPE_SELECTED = "station"; // station, area

var CUR_INDEX_PLANJOURNEY_SELECTED = 0; 
var CUR_AREAMAP_STATION_ID = null;
var CUR_AREAMAP_LINE_ID = null;

var STATION_LISTS = null;
var PLAN_JOURNEY_DETAILS = null;
var JOURNEY_DETAILS = null;
var DD_LINE_STATION_HEIGHT = 51; // ขนาดของ item แต่ละตัวของ dropdown .suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > li > .line
var DD_STATION_HEIGHT = 60; // ขนาดของ item แต่ละตัวของ dropdown .suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > li > .line
var DD_STATION_LIST_HEIGHT = 150;
var CURRENT_DD_SEARCH_TYPE = ""; // origin or destination (type ไหนที่กำลังเปิดอยู่)
var FOCUS_JOURNEY_STATUS = false // โฟกัสอยู่ไหม ?
var INTERVAL_TTA = null;
var INTERVAL_TTA_TIME = 40000;
var IS_TRAINTIME_ARRIVAL_ACTIVE = true;

var nextOriID = 0; 
var nextDestID = 0;

var BROWSER_DETECT = "";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(document).ready(() => {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // init function 
    mapPreviewInit();
    // if (origin != "" && dest != "") {
    //     getSuggestJourneyDetail();
    // }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Map Preview
    $('#map_preview').draggable({ // init map ทำให้สามารถ drag map image ได้
        drag: function() {
            removeStationDialog(); // จับ event drag เมื่อ drag จะปิด station dialog
        }
    });
    //! For Dev (เพื่อแค่ให้สะดวกต่อการ development)
    // $('#map_preview').click((e) => {
    //     console.log('Current X: ', e.offsetX);
    //     console.log('Current Y: ', e.offsetY);
    // });
    // $('body').keydown((e) => {
    //     let keyCode = e.keyCode;
    //     switch(keyCode)
    //     {
    //         case 87:
    //             $('#zoom-in').click(); 
    //             break;
    //         ;
    //         case 70:
    //             $('#zoom-out').click(); 
    //             break;            
    //         ;
    //         default: return;
    //     }
    // })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Station Dialog (คลิกสถานีเพื่อขึ้น modal เลือกต้นทางปลายทาง)
    $('body').click(async(e) => {
        let stationNameTH = e.target.getAttribute('st-name-th');
        let stationNameEN = e.target.getAttribute('st-name-en');
        let stationName = `${stationNameTH} | ${stationNameEN}`;
        let stationKey = e.target.getAttribute('station-key');
        let isDialog = e.target.getAttribute('data-isdialog');
        let stationPositionX = e.target.getAttribute('data-px');
        let stationPositionY = e.target.getAttribute('data-py');
        let stationID = e.target.getAttribute('station-id');
        let lineID = e.target.getAttribute('station-line-id');

        if(!!stationKey)
        {
            // Remove Old Dialog
            removeStationDialog();

            let html = '';
            html += `<div id="station-dialog">`;
                html += `<li class="head">`; // เพิ่มเพื่ิอ click จะได้รู้ว่าคือ dialog จะได้ไม่ถูกปิด
                    html += `<div class="left">`;
                        html += `<p>${stationNameTH}</p>`;
                        html += `<p>${stationNameEN}</p>`;
                    html += `</div>`;
                    html += `<div class="right">`;
                        html += `<img id="close-stdialog" src="/assets/images/icons/cross.png" alt="bts the skytrain icon cross (cancel)" />`;
                    html += `</div>`;
                html += `</li>`;
                html += `<li id="mark-origin" data-isdialog="#searchst-origin">`;
                    if(LANGUAGE === 'th')
                    {
                        html += `<p data-type="th">เลือกสถานีต้นทาง</p>`;
                        html += `<p data-type="en">Select Origin</p>`;
                    }else
                    {
                        html += `<p data-type="th">Select Origin</p>`;
                        html += `<p data-type="en">เลือกสถานีต้นทาง</p>`;
                    }
                html += `</li>`;
                html += `<li id="mark-destination" data-isdialog="#searchst-destination">`;
                    if(LANGUAGE === 'th')
                    {
                        html += `<p data-type="th">เลือกสถานีปลายทาง</p>`;
                        html += `<p data-type="en">Select Destination</p>`;
                    }else
                    {
                        html += `<p data-type="th">Select Destination</p>`;
                        html += `<p data-type="en">เลือกสถานีปลายทาง</p>`;
                    }
                html += `</li>`;
                html += `<li id="mark-facillities-btn" station-line-id="${lineID}" station-id="${stationID}">`;
                    if(LANGUAGE === 'th')
                    {
                        html += `<p data-type="th">สิ่งอำนวยความสะดวก</p>`;
                        html += `<p data-type="en">Service and Facillties</p>`;
                    }else
                    {
                        html += `<p data-type="th">Service and Facillties</p>`;
                        html += `<p data-type="en">สิ่งอำนวยความสะดวก</p>`;
                    }
                html += `</li>`;
                html += `<li id="mark-areamap-btn" station-line-id="${lineID}" station-id="${stationID}">`;
                    if(LANGUAGE === 'th')
                    {
                        html += `<p data-type="th">แผนที่บริเวณสถานี</p>`;
                        html += `<p data-type="en">Area Map</p>`;
                    }else
                    {
                        html += `<p data-type="th">Area Map</p>`;
                        html += `<p data-type="en">แผนที่บริเวณสถานี</p>`;
                    }
                html += `</li>`;
                if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                {
                    html += `<li id="mark-tta-btn" station-line-id="${lineID}" station-id="${stationID}" station-code="${stationKey}">`;
                        html += `<p data-type="th">เวลารถไฟฟ้าเข้าสถานี</p>`;
                        html += `<p data-type="en">Train Time Arrival</p>`;
                    html += `</li>`;
                }
            html += `</div>`;

            let stationDialog = html;
            
            // Add New Dialog
            $('body').append(stationDialog);
            STATION_NAME_SELECTED = stationName;
            STATION_KEY_SELECTED = stationKey;
            CUR_STATION_SELECTED_X = stationPositionX;
            CUR_STATION_SELECTED_Y = stationPositionY;
            CUR_STATION_ID_SELECTED = stationID;

            // Add Event
            $('#mark-origin').click(() => {
                CUR_ORIGIN_TYPE_SELECTED = 'station'; // set default;
                handlerSelectStationPoint('#searchst-origin');
            }) 
            $('#mark-destination').click(() => {
                CUR_DESTINATION_TYPE_SELECTED = 'station'; // set default;
                handlerSelectStationPoint('#searchst-destination');
            }) 
            $('#station-dialog img#close-stdialog').click(() => {
                removeStationDialog();
            }) 
            $('#mark-areamap-btn').click(function(){
                let elem = $(this);
                let station_id = elem.attr('station-id');
                let line_id = elem.attr('station-line-id');
                let station_id_enc = encodeURIComponent(EncryptedText(String(station_id)));
                let line_id_enc = encodeURIComponent(EncryptedText(String(line_id)));

                navigateAreaMap(station_id_enc, line_id_enc);
            })
            $('#mark-facillities-btn').click(function(){
                let elem = $(this);
                let station_id = elem.attr('station-id');
                let line_id = elem.attr('station-line-id');
                let station_id_enc = encodeURIComponent(EncryptedText(String(station_id)));
                let line_id_enc = encodeURIComponent(EncryptedText(String(line_id)));

                navigateFacilities(station_id_enc, line_id_enc);

                // handleModalFacilities('init', station_id);
                removeStationDialog();
            })
            $('#mark-tta-btn').click(function(){
                clearInterval(INTERVAL_TTA);
                let elem = $(this);
                let station_code = elem.attr('station-code');
                let reqData = {
                    StationKey: String(station_code).toUpperCase()
                }
                handleModalTTA('init', reqData);
            })

            // Style
            let positionLeft = e.clientX-($('#station-dialog').innerWidth()/2);
            let positionTop = e.clientY;
            $('#station-dialog').css({"left": `${positionLeft}px`, "top": `${positionTop}px`});
        }else
        {
            // Remove Old Dialog
            // removeStationDialog();
            // STATION_NAME_SELECTED = "";
            // STATION_KEY_SELECTED = "";
        }
    })

    async function handlerSelectStationPoint(isDialog)
    {
        if(isDialog === "#searchst-origin")
        {   
            // console.log('#searchst-origin');
            ORIGIN_STATION_X = CUR_STATION_SELECTED_X;
            ORIGIN_STATION_Y = CUR_STATION_SELECTED_Y;
            CUR_ORIGIN_STATION_ID_SELECTED = CUR_STATION_ID_SELECTED;
            CUR_ORIGIN_STATION_KEY_SELECTED = STATION_KEY_SELECTED;
            CUR_ORIGIN_NAME_SELECTED = STATION_NAME_SELECTED;

            // console.log('ORIGIN_STATION_X - ',CUR_STATION_SELECTED_X);
            // console.log('ORIGIN_STATION_Y - ',CUR_STATION_SELECTED_Y);
            // console.log('CUR_ORIGIN_STATION_ID_SELECTED - ',CUR_STATION_ID_SELECTED);
            // console.log('CUR_ORIGIN_STATION_KEY_SELECTED - ',STATION_KEY_SELECTED);
            // console.log('CUR_ORIGIN_NAME_SELECTED - ',STATION_NAME_SELECTED);

            
        }
        if(isDialog === "#searchst-destination")
        {
            // console.log('#searchst-destination');
            DEST_STATION_X = CUR_STATION_SELECTED_X;
            DEST_STATION_Y = CUR_STATION_SELECTED_Y;
            CUR_DESTINATION_STATION_ID_SELECTED = CUR_STATION_ID_SELECTED;
            CUR_DESTINATION_STATION_KEY_SELECTED = STATION_KEY_SELECTED;
            CUR_DESTINATION_NAME_SELECTED = STATION_NAME_SELECTED;
        }

        nextOriID = CUR_ORIGIN_STATION_ID_SELECTED;
        nextDestID = CUR_DESTINATION_STATION_ID_SELECTED;

        // Set Station Selected
        await handlerActivateInputSelected(isDialog, STATION_NAME_SELECTED);
        // Pin Station
        await handlerPinStation(isDialog);
        await removeFocusJourneyUI();
        // Close Dialog Plan Journey Dialog & Suggest Journey Detail
        await handlerPlanJourneyDialog(false);
        await handleSuggestDetailStatus(false);
        // Remove Current Dialog
        removeStationDialog();
    }

    function handlerActivateInputSelected(isDialog, station_name)
    {
        return new Promise(async resolve => {
            // inactive input (readonly) & clear input value
            $(`${isDialog}`).prop('readonly', true);
            $(`${isDialog}`).val('');
            // css (input station name selected)
            let elemAppend = isDialog === '#searchst-origin' ? '#input-searchorigin-elem' : '#input-searchdest-elem'
            let html = `<div class="stationname-selected"><p><span>${station_name}</span> <img id="removeinput-stnameselected" src="/assets/images/icons/cross-filled.png" alt="bts the skytrain cross icon filled" /></p></div>`;
            // remove old
            $(`${elemAppend} .stationname-selected`).remove();
            // remove placeholder input
            $(`${elemAppend} > input`).attr('placeholder', '');
            // append new
            $(elemAppend).append(html);

            // add event
            $('#input-searchorigin-elem img#removeinput-stnameselected').click(() => handlerUnselectInputStation('origin', isDialog))
            $('#input-searchdest-elem img#removeinput-stnameselected').click(() => handlerUnselectInputStation('destination', isDialog))

            // เช็คปุ่มสลับสถานี | check button swap station
            await checkBtnSwapStation(false);

            resolve();
        })
    }

    function checkBtnSwapStation(submitted) // submitted = focus journey status === true หรือไม่
    {
        return new Promise(async resolve => {
            if(submitted === true) // มาจากปุ่มค้นหา ให้ทำการปิดเลย
            {
                // inactive
                $('.switch-search-station-wrap').removeClass('active');
                $('.switch-search-station-wrap').removeClass('inactive');
                $('.switch-search-station-wrap').addClass('inactive'); 
            }else
            {
                if(CUR_ORIGIN_NAME_SELECTED !== "" || CUR_DESTINATION_NAME_SELECTED !== "")
                {
                    // active
                    $('.switch-search-station-wrap').removeClass('active');
                    $('.switch-search-station-wrap').removeClass('inactive');
                    $('.switch-search-station-wrap').addClass('active');
                }else
                {
                    // inactive
                    $('.switch-search-station-wrap').removeClass('active');
                    $('.switch-search-station-wrap').removeClass('inactive');
                    $('.switch-search-station-wrap').addClass('inactive');
                }
            }

            resolve();
        })
    }
    async function handleSwapStation()
    {
        // ไม่ว่างทั้งคู่
        if(CUR_ORIGIN_NAME_SELECTED !== "" && CUR_DESTINATION_NAME_SELECTED !== "")
        {
            let NEW_ORIGIN_STATION_ID_SELECTED = CUR_DESTINATION_STATION_ID_SELECTED;
            let NEW_ORIGIN_STATION_KEY_SELECTED = CUR_DESTINATION_STATION_KEY_SELECTED;
            let NEW_ORIGIN_NAME_SELECTED = CUR_DESTINATION_NAME_SELECTED; 
            let NEW_ORIGIN_AREAMAP_ID_SELECTED = CUR_DESTINATION_AREAMAP_ID_SELECTED;
            let NEW_ORIGIN_TYPE_SELECTED = CUR_DESTINATION_TYPE_SELECTED;

            let NEW_DESTINATION_STATION_ID_SELECTED = CUR_ORIGIN_STATION_ID_SELECTED;
            let NEW_DESTINATION_STATION_KEY_SELECTED = CUR_ORIGIN_STATION_KEY_SELECTED;
            let NEW_DESTINATION_NAME_SELECTED = CUR_ORIGIN_NAME_SELECTED;
            let NEW_DESTINATION_AREAMAP_ID_SELECTED = CUR_ORIGIN_AREAMAP_ID_SELECTED;
            let NEW_DESTINATION_TYPE_SELECTED = CUR_ORIGIN_TYPE_SELECTED;

            let NEW_ORIGIN_STATION_X = DEST_STATION_X;
            let NEW_ORIGIN_STATION_Y = DEST_STATION_Y;

            let NEW_DEST_STATION_X = ORIGIN_STATION_X;
            let NEW_DEST_STATION_Y = ORIGIN_STATION_Y;
            
            // update state
            CUR_ORIGIN_STATION_ID_SELECTED = NEW_ORIGIN_STATION_ID_SELECTED;
            CUR_ORIGIN_STATION_KEY_SELECTED = NEW_ORIGIN_STATION_KEY_SELECTED
            CUR_ORIGIN_NAME_SELECTED = NEW_ORIGIN_NAME_SELECTED;
            CUR_ORIGIN_AREAMAP_ID_SELECTED = NEW_ORIGIN_AREAMAP_ID_SELECTED;
            CUR_ORIGIN_TYPE_SELECTED = NEW_ORIGIN_TYPE_SELECTED;

            CUR_DESTINATION_STATION_ID_SELECTED = NEW_DESTINATION_STATION_ID_SELECTED;
            CUR_DESTINATION_STATION_KEY_SELECTED = NEW_DESTINATION_STATION_KEY_SELECTED;
            CUR_DESTINATION_NAME_SELECTED = NEW_DESTINATION_NAME_SELECTED;
            CUR_DESTINATION_AREAMAP_ID_SELECTED = NEW_DESTINATION_AREAMAP_ID_SELECTED;
            CUR_DESTINATION_TYPE_SELECTED = NEW_DESTINATION_TYPE_SELECTED;

            ORIGIN_STATION_X = NEW_ORIGIN_STATION_X;
            ORIGIN_STATION_Y = NEW_ORIGIN_STATION_Y;

            DEST_STATION_X = NEW_DEST_STATION_X;
            DEST_STATION_Y = NEW_DEST_STATION_Y;

            // update ui
            let originElem = $('#input-searchorigin-elem .stationname-selected p span');
            let destinationElem = $('#input-searchdest-elem .stationname-selected p span');
            originElem.text(NEW_ORIGIN_NAME_SELECTED);
            destinationElem.text(NEW_DESTINATION_NAME_SELECTED);

            
            // current location(x, y) of the selected station
            const station_selected_origin = $(`#station-pointer[station-key="${NEW_ORIGIN_STATION_KEY_SELECTED}"]`);
            const station_selected_dest = $(`#station-pointer[station-key="${NEW_DESTINATION_STATION_KEY_SELECTED}"]`);
            const station_origin_raw_x = Number(String(station_selected_origin.attr('data-px')).replace('px', ''));
            const station_origin_raw_y = Number(String(station_selected_origin.attr('data-py')).replace('px', ''));
            const station_dest_raw_x = Number(String(station_selected_dest.attr('data-px')).replace('px', ''));
            const station_dest_raw_y = Number(String(station_selected_dest.attr('data-py')).replace('px', ''));
            // balance เพื่อให้ pin ได้ตรงและสมดุล
            const balance_x_origin = 1;
            const balance_y_origin = 1;
            const balance_x_dest = 1;
            const balance_y_dest = 9; // minus
            // calculate position
            const station_x_dest = station_dest_raw_x;
            const station_y_dest = station_dest_raw_y - balance_y_dest;
            const station_x_origin = station_origin_raw_x - balance_x_origin;
            const station_y_origin = station_origin_raw_y;

            await handlePinUI('reactive', 'origin', station_x_origin, station_y_origin);
            await handlePinUI('reactive', 'destnation', station_x_dest, station_y_dest);

            return;
        }
        // ต้นทางไม่ว่าง & ปลายทางว่าง
        if(CUR_ORIGIN_NAME_SELECTED !== "" && CUR_DESTINATION_NAME_SELECTED === "")
        {
            let NEW_ORIGIN_STATION_ID_SELECTED = "";
            let NEW_ORIGIN_STATION_KEY_SELECTED = ""
            let NEW_ORIGIN_NAME_SELECTED = ""; 
            let NEW_ORIGIN_AREAMAP_ID_SELECTED = 0; // default = 0
            let NEW_ORIGIN_TYPE_SELECTED = "station";
            
            let NEW_DESTINATION_STATION_ID_SELECTED = CUR_ORIGIN_STATION_ID_SELECTED;
            let NEW_DESTINATION_STATION_KEY_SELECTED = CUR_ORIGIN_STATION_KEY_SELECTED;
            let NEW_DESTINATION_NAME_SELECTED = CUR_ORIGIN_NAME_SELECTED;
            let NEW_DESTINATION_AREAMAP_ID_SELECTED = CUR_ORIGIN_AREAMAP_ID_SELECTED;
            let NEW_DESTINATION_TYPE_SELECTED = CUR_ORIGIN_TYPE_SELECTED;

            let NEW_ORIGIN_STATION_X = "";
            let NEW_ORIGIN_STATION_Y = "";

            let NEW_DEST_STATION_X = ORIGIN_STATION_X;
            let NEW_DEST_STATION_Y = ORIGIN_STATION_Y;

            // update state
            CUR_ORIGIN_STATION_ID_SELECTED = NEW_ORIGIN_STATION_ID_SELECTED;
            CUR_ORIGIN_STATION_KEY_SELECTED = NEW_ORIGIN_STATION_KEY_SELECTED;
            CUR_ORIGIN_NAME_SELECTED = NEW_ORIGIN_NAME_SELECTED;
            CUR_ORIGIN_AREAMAP_ID_SELECTED = NEW_ORIGIN_AREAMAP_ID_SELECTED;
            CUR_ORIGIN_TYPE_SELECTED = NEW_ORIGIN_TYPE_SELECTED;

            CUR_DESTINATION_STATION_ID_SELECTED = NEW_DESTINATION_STATION_ID_SELECTED;
            CUR_DESTINATION_STATION_KEY_SELECTED = NEW_DESTINATION_STATION_KEY_SELECTED;
            CUR_DESTINATION_NAME_SELECTED = NEW_DESTINATION_NAME_SELECTED;
            CUR_DESTINATION_AREAMAP_ID_SELECTED = NEW_DESTINATION_AREAMAP_ID_SELECTED;
            CUR_DESTINATION_TYPE_SELECTED = NEW_DESTINATION_TYPE_SELECTED;

            ORIGIN_STATION_X = NEW_ORIGIN_STATION_X;
            ORIGIN_STATION_Y = NEW_ORIGIN_STATION_Y;

            DEST_STATION_X = NEW_DEST_STATION_X;
            DEST_STATION_Y = NEW_DEST_STATION_Y;

            // update ui จะแค่สลับกันไม่ได้ ต้องลบตัวเดิมออกไปแล้วสร้างตัวที่ยังไม่มีเพื่ิอสลับข้อมูลไปอีกฝั่ง
            handlerUnselectInputStation('origin', '#searchst-origin') // unselect input station (origin)
            await handlerActivateInputSelected('#searchst-destination', CUR_DESTINATION_NAME_SELECTED) // select input station (destination)

            // current location(x, y) of the selected station
            const station_selected_dest = $(`#station-pointer[station-key="${NEW_DESTINATION_STATION_KEY_SELECTED}"]`);
            const station_dest_raw_x = Number(String(station_selected_dest.attr('data-px')).replace('px', ''));
            const station_dest_raw_y = Number(String(station_selected_dest.attr('data-py')).replace('px', ''));
            // balance เพื่อให้ pin ได้ตรงและสมดุล
            const balance_x_dest = 1;
            const balance_y_dest = 9; // minus
            // calculate position
            const station_x_dest = station_dest_raw_x;
            const station_y_dest = station_dest_raw_y - balance_y_dest;

            await handlePinUI('inactive', 'origin');
            await handlePinUI('active', 'destnation', station_x_dest, station_y_dest);

            return;
        }
        // ต้นทางว่าง & ปลายทางไม่ว่าง
        if(CUR_ORIGIN_NAME_SELECTED === "" && CUR_DESTINATION_NAME_SELECTED !== "")
        {
            let NEW_ORIGIN_STATION_ID_SELECTED = CUR_DESTINATION_STATION_ID_SELECTED;
            let NEW_ORIGIN_STATION_KEY_SELECTED = CUR_DESTINATION_STATION_KEY_SELECTED;
            let NEW_ORIGIN_NAME_SELECTED = CUR_DESTINATION_NAME_SELECTED; 
            let NEW_ORIGIN_AREAMAP_ID_SELECTED = CUR_DESTINATION_AREAMAP_ID_SELECTED;
            let NEW_ORIGIN_TYPE_SELECTED = CUR_DESTINATION_TYPE_SELECTED;
            
            let NEW_DESTINATION_STATION_ID_SELECTED = "";
            let NEW_DESTINATION_STATION_KEY_SELECTED = "";
            let NEW_DESTINATION_NAME_SELECTED = "";
            let NEW_DESTINATION_AREAMAP_ID_SELECTED = 0;
            let NEW_DESTINATION_TYPE_SELECTED = "station";
            
            let NEW_ORIGIN_STATION_X = DEST_STATION_X;
            let NEW_ORIGIN_STATION_Y = DEST_STATION_Y;

            let NEW_DEST_STATION_X = "";
            let NEW_DEST_STATION_Y = "";

            // update state
            CUR_ORIGIN_STATION_ID_SELECTED = NEW_ORIGIN_STATION_ID_SELECTED;
            CUR_ORIGIN_STATION_KEY_SELECTED = NEW_ORIGIN_STATION_KEY_SELECTED;
            CUR_ORIGIN_NAME_SELECTED = NEW_ORIGIN_NAME_SELECTED;
            CUR_ORIGIN_AREAMAP_ID_SELECTED = NEW_ORIGIN_AREAMAP_ID_SELECTED;
            CUR_ORIGIN_TYPE_SELECTED = NEW_ORIGIN_TYPE_SELECTED;

            CUR_DESTINATION_STATION_ID_SELECTED = NEW_DESTINATION_STATION_ID_SELECTED;
            CUR_DESTINATION_STATION_KEY_SELECTED = NEW_DESTINATION_STATION_KEY_SELECTED;
            CUR_DESTINATION_NAME_SELECTED = NEW_DESTINATION_NAME_SELECTED;
            CUR_DESTINATION_AREAMAP_ID_SELECTED = NEW_DESTINATION_AREAMAP_ID_SELECTED;
            CUR_DESTINATION_TYPE_SELECTED = NEW_DESTINATION_TYPE_SELECTED;

            ORIGIN_STATION_X = NEW_ORIGIN_STATION_X;
            ORIGIN_STATION_Y = NEW_ORIGIN_STATION_Y;

            DEST_STATION_X = NEW_DEST_STATION_X;
            DEST_STATION_Y = NEW_DEST_STATION_Y;

            // update ui จะแค่สลับกันไม่ได้ ต้องลบตัวเดิมออกไปแล้วสร้างตัวที่ยังไม่มีเพื่ิอสลับข้อมูลไปอีกฝั่ง
            handlerUnselectInputStation('destination', '#searchst-destination') // unselect input station (origin)
            await handlerActivateInputSelected('#searchst-origin', CUR_ORIGIN_NAME_SELECTED) // select input station (destination)
            // remove readonly on destination input เพราะได้ย้ายไป origin แล้ว

            // current location(x, y) of the selected station
            const station_selected_origin = $(`#station-pointer[station-key="${NEW_ORIGIN_STATION_KEY_SELECTED}"]`);
            const station_origin_raw_x = Number(String(station_selected_origin.attr('data-px')).replace('px', ''));
            const station_origin_raw_y = Number(String(station_selected_origin.attr('data-py')).replace('px', ''));
            // balance เพื่อให้ pin ได้ตรงและสมดุล
            const balance_x_origin = 1;
            const balance_y_origin = 1;
            // calculate position
            const station_x_origin = station_origin_raw_x - balance_x_origin;
            const station_y_origin = station_origin_raw_y;

            await handlePinUI('inactive', 'destination');
            await handlePinUI('active', 'origin', station_x_origin, station_y_origin);

            return;
        }
    }

    async function handlerUnselectInputStation(type, isDialog)
    {
        // remove attr readonly
        $(isDialog).removeAttr('readonly');

        CUR_STATION_ID_SELECTED = "";

        if(type === 'origin')
        {
            $('#input-searchorigin-elem .stationname-selected').remove();
            
            CUR_ORIGIN_NAME_SELECTED = "";
            CUR_ORIGIN_STATION_ID_SELECTED = "";
            CUR_ORIGIN_STATION_KEY_SELECTED = "";
            CUR_ORIGIN_AREAMAP_ID_SELECTED = "";
            CUR_ORIGIN_TYPE_SELECTED = "";
            await checkBtnSwapStation(false);
            await handlePinUI('inactive', 'origin');

            // restore placeholder
            let inputSearch = $('#input-searchorigin-elem > input');
            inputSearch.attr('placeholder', LANGUAGE === 'th' ? 'เลือกต้นทาง' : 'origin');
        }else
        {
            $('#input-searchdest-elem .stationname-selected').remove(); 
            CUR_DESTINATION_NAME_SELECTED = "";
            CUR_DESTINATION_STATION_ID_SELECTED = "";
            CUR_DESTINATION_STATION_KEY_SELECTED = "";
            CUR_DESTINATION_AREAMAP_ID_SELECTED = "";
            CUR_DESTINATION_TYPE_SELECTED = "";
            await checkBtnSwapStation(false);
            await handlePinUI('inactive', 'destination');

            // restore placeholder
            let inputSearch = $('#input-searchdest-elem > input');
            inputSearch.attr('placeholder', LANGUAGE === 'th' ? 'เลือกปลายทาง' : 'destination');
        }
        await removeFocusJourneyUI();
        // Close Dialog Plan Journey Dialog & Suggest Journey Detail
        await handlerPlanJourneyDialog(false);
        await handleSuggestDetailStatus(false);
    }

    function removeFocusJourneyUI()
    {
        return new Promise(async resolve => {
            if(FOCUS_JOURNEY_STATUS === true)
            {
                // remove lines
                $('.mapLine.active').removeClass('active');    
    
                // change bg color gray to blue
                $('.maprvw-bgovl').removeClass('onoverlay');
                $('.maprvw-bgovl').addClass('inoverlay');
    
                // remove overlay
                $('.map-preview-img').removeClass('onoverlay');
                $('.map-preview-img').addClass('inoverlay');
    
                // remove station point
                let lengthFocusJourneyStation = $('.focus-journey-wrap').length;
                if(lengthFocusJourneyStation > 1)
                {
                    // remove
                    $('.focus-journey-wrap').remove()
                    // create new
                    let newElem = `<div class="focus-journey-wrap"><img src="/assets/images/yellow-map.jpeg" alt="bts the skytrain map" width="1380" height="1380" class="focus-journey" /></div>`;
                    $('.map-wrap').append(newElem);
                } 
            }

            // update focus journey status
            FOCUS_JOURNEY_STATUS = false;
            // update current index plan journey detail
            CUR_INDEX_PLANJOURNEY_SELECTED = 0;
            resolve();
        })
    }

    function handlePinUI(status, type, x, y) 
    {
        return new Promise(async resolve => {
            if(type === `origin`)
            {
                if(status === 'inactive')
                {
                    $('#map-pin-org').removeClass('active');
                    $('#map-pin-org').addClass('inactive');
                }
                if(status === 'active')
                {
                    $('#map-pin-org').addClass('active');
                    $('#map-pin-org').css({"top": `${y}px`, "left": `${x}px`});
                }
                if(status === 'reactive')
                {
                    $('#map-pin-org').removeClass('active');
                    $('#map-pin-org').addClass('inactive');
                    await handleCallbackAnimate(200, () => $('#map-pin-org').removeClass('inactive'));
                    $('#map-pin-org').addClass('active');
                    $('#map-pin-org').css({"top": `${y}px`, "left": `${x}px`});
                }
                resolve();
            }else
            {
                if(status === 'inactive')
                {
                    $('#map-pin-dest').removeClass('active');
                    $('#map-pin-dest').addClass('inactive');    
                }
                if(status === 'active')
                {
                    $('#map-pin-dest').addClass('active');
                    $('#map-pin-dest').css({"top": `${y}px`, "left": `${x}px`});                    
                }
                if(status === 'reactive')
                {
                    $('#map-pin-dest').removeClass('active');
                    $('#map-pin-dest').addClass('inactive');
                    await handleCallbackAnimate(200, () => $('#map-pin-dest').removeClass('inactive'));
                    $('#map-pin-dest').addClass('active');
                    $('#map-pin-dest').css({"top": `${y}px`, "left": `${x}px`});    
                }
                resolve();
            }
        })
    }
    function removeStationDialog() {
        $('#station-dialog').remove();
    }
    async function handleCheckStationSelected() {
        // ถ้าเลือกต้นทางปลายทางแล้ว
        if(CUR_ORIGIN_NAME_SELECTED !== "" && CUR_DESTINATION_NAME_SELECTED !== "") // เลือกครบแล้วหรือยัง
        {
            await checkFocusJourneyStatus(); // focus อยู่แล้วไหม?
            await checkBtnSwapStation(true);
            handleFocusJournyLine();
        }else
        {
            await handleAlertInputSearch();
        }
    }
    function checkFocusJourneyStatus()
    {
        return new Promise(async resolve => {
            if(FOCUS_JOURNEY_STATUS === false) // เช็คว่า focus journey ทำงานอยู่แล้วไหม ถ้าทำงานอยู่แล้ว
            {
                resolve();
            }
        })
    }
    async function handleFocusJournyLine() {
        // get journey details
        let journeyDetails = await getJourneyDetails();
        let journeyRoutes = journeyDetails.RoutesMap[0].RoutesJorney; // recommend journey
        let routeMapDetail = journeyDetails.RoutesMap;

        PLAN_JOURNEY_DETAILS = journeyDetails;

        // Active Overlay
        $('.map-preview-img').removeClass('inoverlay');
        $('.map-preview-img').addClass('onoverlay');
        $('.maprvw-bgovl').removeClass('inoverlay');
        $('.maprvw-bgovl').addClass('onoverlay');
        // Journey Routes Generator
        let journeyRoutesLists = await journeyRoutesGenerator(journeyRoutes); // generate station position for focus station by station

        // Clone Focus Element
        await cloneFocusElem(journeyRoutesLists.length); // ที่ลบ 1 เพราะ focus element มีอยู่แล้ว 1 element
        // Focus Journey Line
        await handlerFocusStationByStation(journeyRoutesLists); // เจนตำแหน่งที่จะทำการ focus
        // Plan Journey Detail
        await handlerPlanJourneyDetails(routeMapDetail);
    }

    function handlerPlanJourneyDetails(routeMapDetail)
    {
        return new Promise(async resolve => {
            await handlerPlanJourneyDialog(true); // open dialog
            await handlePlanJourneyStatus('loading'); // set loading
            await handlePlanJourneyStatus('init', routeMapDetail); // init plan detail
            resolve();
        })
    } 

    function handlerPlanJourneyDialog(status) // status plan journey dialog
    {
        return new Promise(async resolve => {
            let planJourneyElem = $('.plan-journey-con');
            if(status === true)
            {
                planJourneyElem.fadeIn(); 
            }else
            {
                await handlePlanJourneyStatus('clear')
                // clear all content in plan journey dialog
            }
            resolve();
        })
    }

    function handlePlanJourneyStatus(type, routeMapDetail) // detail plan journey dialog
    {
        return new Promise(async resolve => {
            let planJourneyElem = $('.plan-journey-con');
            let mainElem = $('.plan-journey-wrap .main'); // for get height
            let parentLoaderElem = $('.plan-journey-con .main-wrap'); // append
            let planJourneyDotted = $('.st-dotted');
            let btnSlideJourneyPlanDetail = $('.plan-journey-con .btn-slide-content');

            // Init Detail
            if(type === 'init')
            {
                if(routeMapDetail.length > 0)
                {
                    await planJourneyDetailInit(routeMapDetail, mainElem, parentLoaderElem);

                    resolve();
                }else
                {
                    resolve();
                }
            }
            // Loading
            if(type === 'loading')
            {
                // เช็คว่ามีอยู่แล้วไหมถ้ามีอยู่แล้วให้ลบไปก่อน
                let lengthLoader = $('.journeydetail-loader');
                if(lengthLoader.length > 0)
                {
                    lengthLoader.remove();
                }
                let html = `<div class="journeydetail-loader" style="display: flex;"><div></div></div>`;
                // append child
                parentLoaderElem.append(html);
                // set height
                let height = parentLoaderElem.innerHeight();
                mainElem.css({height: height})    

                resolve();
            }
            // Clear
            if(type === 'clear')
            {
                let height = 0;
                mainElem.css({height: height})    
                planJourneyDotted.remove();
                parentLoaderElem.empty();

                planJourneyElem.fadeOut(); 
                resolve();
            }
            // Slide Hide
            if(type === 'hide')
            {
                btnSlideJourneyPlanDetail.attr('data-status', 'inactive');
                let height = 0;
                mainElem.css({height: height})    
                resolve();
            }
            // Slide Un-Hide
            if(type === 'unhide')
            {
                btnSlideJourneyPlanDetail.attr('data-status', 'active');
                let height = parentLoaderElem.innerHeight(); // + padding 30px
                mainElem.css({height: height})    
                resolve();
            }
        })

    }

    function planJourneyDetailInit(routeMapDetail, mainElem, parentLoaderElem)
    {
        return new Promise(async resolve => {
            let station_from = routeMapDetail[0].RoutesJorney[0];
            let station_to = routeMapDetail[0].RoutesJorney[routeMapDetail[0].RoutesJorney.length-1];
            let station_from_lineid = station_from.Station.StationLineId;
            let station_to_lineid = station_to.Station.StationLineId;
            let station_from_linecolor = station_from.Station.StationLineColor;
            let station_to_linecolor = station_to.Station.StationLineColor;
            let station_from_stkey = station_from.Station.StationKey;
            let station_to_stkey = station_to.Station.StationKey;
            let station_from_code = String(station_from.StationCode).toLowerCase();
            let station_to_code = String(station_to.StationCode).toLowerCase();

            let station_from_icon = ``;
            let station_to_icon = ``;
            let station_from_symbol = ``;
            let station_to_symbol = ``;

            // station from
            if(CUR_ORIGIN_TYPE_SELECTED === 'station')
            {
                station_from_symbol = `<div style="border: 3px solid ${station_from_linecolor}">${station_from_stkey}</div>`;
                switch(station_from_lineid)
                {
                    case 1:
                        station_from_icon = '<img src="/assets/images/icons/bts-gr.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 2:
                        station_from_icon = '<img src="/assets/images/icons/bts-dg.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 3:
                        station_from_icon = '<img src="/assets/images/icons/bts-gld.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 4:
                        station_from_icon = '<img src="/assets/images/icons/mrt-yl.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 5:
                        station_from_icon = '<img src="/assets/images/icons/mrt-pk.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    default: return;
                }
    
            }else
            {
                station_from_symbol = ``;            
                station_from_icon = ``;
            }

            if(CUR_DESTINATION_TYPE_SELECTED === 'station')
            {
                station_to_symbol = `<div style="border: 3px solid ${station_to_linecolor}">${station_to_stkey}</div>`;
                // station to
                station_to_symbol = `<div style="border: 3px solid ${station_to_linecolor}">${station_to_stkey}</div>`;
                switch(station_to_lineid)
                {
                    case 1:
                        station_to_icon = '<img src="/assets/images/icons/bts-gr.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 2:
                        station_to_icon = '<img src="/assets/images/icons/bts-dg.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 3:
                        station_to_icon = '<img src="/assets/images/icons/bts-gld.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 4:
                        station_to_icon = '<img src="/assets/images/icons/mrt-yl.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    case 5:
                        station_to_icon = '<img src="/assets/images/icons/mrt-pk.png" alt="bts the skytrain station" />';
                        break; 
                    ;
                    default: return;
                }
            }else
            {
                station_to_symbol = ``;
                station_to_icon = ``;
            }

            let planJourneySuggestElem = await planJourneySuggestHTMLGenerate(routeMapDetail); 
            let cenSymbol = `<img src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง ebm the sky trains new yellow line" />`;

            let html = "";
            html += `<div class="content">`;
                html += `<div class="title">`;
                    if(LANGUAGE === 'th')    
                    {
                        html += `<h3>ข้อมูลการเดินทาง</h3>`;
                        html += `<p>Travel Information</p>`;
                    }else
                    {
                        html += `<h3>Travel Information</h3>`;
                        html += `<p>ข้อมูลการเดินทาง</p>`;
                    }
                html += `</div>`;
                html += `<div class="head-info">`;

                    html += `<div class="from">`;  
                        html += `<div class="left">`;
                            html += `<img data-typeicon="pin-staion-from" src="/assets/images/icons/pin_from.png" alt="bts the skytrain pin from" />`;
                        html += `</div>`;
                        html += `<div class="mid">`;
                            if(LANGUAGE === 'th')
                            {
                                html += `<p>สถานีต้นทาง</p><h4>${CUR_ORIGIN_NAME_SELECTED}</h4>`;
                            }else
                            {
                                html += `<p>Origin</p><h4>${CUR_ORIGIN_NAME_SELECTED}</h4>`;
                            }
                        html += `</div>`;
                        html += `<div class="right">`;
                            html += station_from_icon;
                            if(station_from_code === 'cen')
                            {
                                html += cenSymbol;    
                            }else
                            {
                                html += station_from_symbol;
                            }
                        html += `</div>`;
                    html += `</div>`;

                    html += `<div class="to">`;  
                        html += `<div class="left">`;
                            html += `<img data-typeicon="pin-staion-to" src="/assets/images/icons/pin_to.png" alt="bts the skytrain pin to" />`;
                        html += `</div>`;
                        html += `<div class="mid">`;
                            if(LANGUAGE === "th")
                            {
                                html += `<p>สถานีปลายทาง</p><h4>${CUR_DESTINATION_NAME_SELECTED}</h4>`;
                            }else
                            {
                                html += `<p>Destination</p><h4>${CUR_DESTINATION_NAME_SELECTED}</h4>`;
                            }
                        html += `</div>`;
                        html += `<div class="right">`;
                            html += station_to_icon;
                            if(station_to_code === 'cen')
                            {
                                html += cenSymbol;    
                            }else
                            {
                                html += station_to_symbol;
                            }
                        html += `</div>`;
                    html += `</div>`;
                html += `</div>`;
                html += planJourneySuggestElem;
           html += `</div>`;

            // clear child
            parentLoaderElem.empty(); 
            // append new child
            parentLoaderElem.append(html);
            // set position & event
            await handleSetPositionPlanJourneyDetail();
            // add event plan journey detail;
            let palnJourneyElem = $('.plan-suggest-wrap');
            let btnSeeDetail = $('button#btn-planjourneydetail');

            palnJourneyElem.each((i, elem) => {
                let index = Number($(elem).attr('data-index'));
                $(elem).click(async() => {
                    // set current data index selected
                    $('.sugg-journey-con .main-wrap').attr('showdata-index', index);
                    await onSelectSuggestJourney(index);
                })
            });
            
            $(window).on('resize', async() => {
                await handleSetPositionPlanJourneyDetail();
            })
            
            setTimeout(async() => {
                // add event
                btnSeeDetail.each((i, elem) => {
                    $(elem).click(async(e) => {
                        let elem = $(e.target);
                        let name = elem.attr('name');   
                        let dataIndex = elem.attr('data-index');
                        let type = elem.attr('data-type') // other plan, recommend plan;
                        let detailData = PLAN_JOURNEY_DETAILS.RoutesMap[dataIndex];

                        await handleSeeDetailPlanJourneyDetail(name, detailData, type);                         
                    })
                })
                // set dotted location pin icon
                await renderDottedStationPlanJourney();
                // set height
                let height = parentLoaderElem.innerHeight(); // + padding 30px
                let minimumHeight = 300;
                let windowHeight = $(window).height();
                if(windowHeight <= MINIMUM_WINDOW_HEIGHT)
                {
                    mainElem.css({height: minimumHeight});
                }else
                {
                    mainElem.css({height: height})    
                }
            }, 200)

            resolve();
        })
    }

    function handleSeeDetailPlanJourneyDetail(name, data, type)
    {
        return new Promise(async resolve => {
            let fareRateInfo = data.FareRateInfo;

            if(name === 'fares-detail')
            {
                // let typeName = '';
                // if(LANGUAGE === 'th')
                // {
                //     if(type === 'other')
                //         typeName = 'เส้นทางอื่นๆ'
                //     if(type === 'recommend')
                //         typeName = 'เส้นทางแนะนำ' 
                // }else
                // {
                //     if(type === 'other')
                //         typeName = 'Other Route'  
                //     if(type === 'recommend')
                //         typeName = 'Recommended Route'   
                // }
    
                await fareRateInfoHTMLGenerate(fareRateInfo);
                $('.modal-planjourney').fadeIn();
            }
            if(name === 'travel-detail')
            {
                await travelTimeDetailHTMLGenerate();
                await addEventTimeTable();
                $('.modal-traveltime-detail').fadeIn();
            }
        })
    }

    function addEventTimeTable()
    {
        return new Promise(async resolve => {
            let btnShowTimeTable = $('button#showtimetable-btn');
            btnShowTimeTable.each((i, elem) => {
                $(elem).click(function() {
                    let line_id = $(this).attr('data-lineid'); 
                    let reqData = {LineId: line_id}; 
                    ACTION_API.getPdfTimeTable(reqData)
                    .then((res) => {
                        if(res.IsSuccess === true)
                        {
                            let path_file = res.data.PathFile;

                            window.open(path_file, '_blank');

                            resolve();
                        }
                    })
                })
            })
            resolve();
        })
    }

    function travelTimeDetailHTMLGenerate()
    {
        return new Promise(async resolve => {
            let originData = await getFirstTrainLastTrain(CUR_ORIGIN_STATION_ID_SELECTED);
            let destData = await getFirstTrainLastTrain(CUR_DESTINATION_STATION_ID_SELECTED);
            let data = [originData, destData]

            for(var i in data)
            {
                let item = data[i];

                await renderDataGroup(item);

                if(Number(i) === data.length-1)
                {
                    resolve();
                }
            }

            resolve();
        })

        function renderDataGroup(data)
        {
            return new Promise(async resolve => {
                let firstTrain = data.StationInfo.FirstTrain;
                let lastTrain = data.StationInfo.LastTrain;
                let supplyTrain = data.StationInfo.SupplyTrain;
                let lineColor = data.LineColor;
                let lineNameEn = data.LineNameEN;
                let lineNameTh = data.LineNameTH;
                let stationNameEn = data.StationNameEN;
                let stationNameTh = data.StationNameTH;
                let stationCode = data.StationCode;
                let lineID = data.LineId;
                let stationFullName = `${stationNameTh} | ${stationNameEn}`;
                let icon = await getSingleStationIconByStationID(lineID);
        
                let html = ``; 
        
                // card head
                html += `<div class="card-head">`;
                    //  top
                    html += `<div class="top">`;
                        html += `<div class="left">`;
                            html += `<p class="stname">${stationFullName}</p>`;
                            html += `<p class="badge" style="background: ${lineColor};">${LANGUAGE === 'th' ? lineNameTh : lineNameEn}</p>`;
                        html += `</div>`; 
                        html += `<div class="right">`;
                            html += `<img src="${icon}" alt="the sky trains new yellow line (route map)" />`;
                            html += `<p style="border: 3px solid ${lineColor}">${stationCode}</p>`;
                        html += `</div>`; 
                    html += `</div>`;
                    // bottom
                    html += `<div class="bottom">`;
                        html += `<div class="left">`;
                            html += `<p>${LANGUAGE === 'th' ? 'ข้อมูลตารางการให้บริการ' : 'Service Schedule Information'}</p>`;
                            html += `<p>${LANGUAGE === 'th' ? 'เวลาทำการของสถานี : 05:00 - 01:00 น' : 'Station hours: 05:00 - 01:00'}</p>`;
                        html += `</div>`; 
                        html += `<div class="right">`;
                            html += `<button id="showtimetable-btn" data-lineid="${lineID}">${LANGUAGE === 'th' ? 'ดูตารางเวลา' : 'see schedule'}</button>`;
                        html += `</div>`; 
                    html += `</div>`;
                html += `</div>`;
        
                let itemFirstHTML = await itemHTMLGenerate(firstTrain);
        
                // First Trains
                html += `<div class="firsttrain-wrap" data-type="first">`;
                    html += `<h4>${LANGUAGE === 'th' ? 'รถไฟขบวนแรกออกเดินทางเวลาโดยประมาณ' : 'The first train departs at approximate time.'}</h4>`;
                    html += `<div class="card-group">`;
                        html += `${itemFirstHTML}`;
                    html += `</div>`;
                html += `</div>`;
                
                let itemLastHTML = await itemHTMLGenerate(lastTrain);
        
                // Last Trains
                html += `<div class="firsttrain-wrap" data-type="last">`;
                    html += `<h4>${LANGUAGE === 'th' ? 'รถไฟขบวนสุดท้ายออกเวลาโดยประมาณ' : 'The last train leaves at approximate time.'}</h4>`;
                    html += `<div class="card-group">`;
                        html += itemLastHTML;
                    html += `</div>`;
                html += `</div>`;
                
                // Supply Trains
                if(supplyTrain.length > 0)
                {
                    let itemSupHTML = await itemHTMLGenerate(supplyTrain);
                    html += `<div class="firsttrain-wrap" data-type="supply">`;
                        html += `<div class="card-group">`;
                            html += itemSupHTML;
                        html += `</div>`;
                    html += `</div>`;
                }
        
                // Append
                let contentWrapElem = $('.modal-traveltime-detail #main-content');
                contentWrapElem.append(html);
                 
                function itemHTMLGenerate(data)
                {
                    return new Promise(async resolve => {
                        let html = ``;
                        for(var i in data)
                        {
                            let item = data[i];
        
                            html += `<div class="item">`;
                                html += `<div class="main">`; 
                                    html += `<div class="main-top">`;
                                        html += `<p>${LANGUAGE === 'th' ? item.fromstation_th : item.fromstation_en}</p>`;
                                        html += `<p>${LANGUAGE === 'th' ? item.fromstation_en : item.fromstation_th}</p>`;
                                    html += `</div>`;
                                    html += `<div class="main-bottom">`;
                                        html += `<h3>${item.Time}</h3>`;
                                        html += `<span>น/hrs.</span>`;
                                    html += `</div>`;
                                html += `</div>`; 
                                html += `<div class="under">`
                                    html += `<p>${LANGUAGE === 'th' ? 'ชานชาลา' : 'Platform'} ${item.platform}</p>`;
                                html += `</div>`;
                            html += `</div>`;
        
                            if(Number(i) === data.length-1)
                            {
                                resolve(html);
                            }
                        }
                    })
                }
        
                resolve();
            })
        }
    }

    function getFirstTrainLastTrain(line_id)
    {
        let reqData = {StationID: line_id}
        return new Promise(async resolve => {
            ACTION_API.getFirstTrainLastTrain(reqData)
            .then(res => {
                if(res.IsSuccess === true)
                {
                    resolve(res.data);
                }
            })
        })
    }

    function fareRateInfoHTMLGenerate(data)
    {
        return new Promise(async resolve => {
            let html = ``;

            for(var i in data)
            {
                let item = data[i];
                let stationFrom = item.Station_From;
                let stationTo = item.Station_To;
                let fareRateList = item.FareRate_List;
                let stationTo_ID = stationTo.StationID;
                let stationFrom_ID = stationFrom.StationID;

                if(fareRateList.length > 0 && (stationTo_ID !== 0 && stationFrom_ID !== 0))
                {
                    let stationName = `${stationFrom.StationName_TH} | ${stationFrom.StationName_EN} <span>-></span> ${stationTo.StationName_TH} | ${stationTo.StationName_EN}`
                    let routeImg = item.FareRate_ConnectLine; 
    
                    html += `<div class="item">`; 
                        html += `<div class="route-img"><img src="${routeImg}" alt="the skytrains" /></div>`;
                        html += `<div class="route-name"><p>${stationName}</p></div>`;
                        html += `<div class="price-group">`;
        
                            let fareRateGroupHTML = await fareRatePriceGroupHTMLGenerate(fareRateList);
                            html += fareRateGroupHTML;
        
                        html += `</div>`;
                    html += `</div>`;
                }else
                {
                    let stationName = `${stationFrom.StationName_TH} | ${stationFrom.StationName_EN} <span>-></span> ${stationTo.StationName_TH} | ${stationTo.StationName_EN}`
                    let routeImg = item.FareRate_ConnectLine; 
    
                    html += `<div class="item">`; 
                        html += `<div class="route-img"><img src="${routeImg}" alt="the skytrains" /></div>`;
                        html += `<div class="route-name"><p>${stationName}</p></div>`;
                        html += `<p class="route-desc">${LANGUAGE === 'th' ? 'สายสีน้ำเงิน : ตรวจสอบค่าโดยสารกับผู้ให้บริการ' : 'Blue Line : Check fares with operators.'}</p>`;
                    html += `</div>`; 
                }

                
                if(Number(i) === data.length-1)
                {
                    // html += `<div class="promotion-wrap">`;
                    //     html += `<p class="left">`;
                    //         html += `${LANGUAGE === 'th' ? 'ดูรายการโปรโมชัน' : 'See more promotion list'}`; 
                    //     html += `</p>`;
                    //     html += `<img class="right" src="/assets/images/icons/CaretCircleRight.png" alt="the sky trains route map yellow line new" />`;
                    html += `</div>`;
                    if(LANGUAGE === "th")
                    {
                        html += `<div class="remark-th"><p>หมายเหตุ*</p><p>บัตรโดยสารแบบเติมเที่ยวเดินทางราคาค่าโดยสารต่อเที่ยวขึ้นอยู่กับจำนวนเที่ยวเดินทางตามโปรโมชันที่เลือก ยกเว้นสถานีส่วนต่อขยายสายสุขุมวิทและสถานีส่วนต่อขยายสายสีลม</p></div>`;
                    }
                    html += `<div class="remark-en"><p>Remark*</p><p>Fare per trip depends on the selected promotion package. Except for travel on the Sukhumvit Line Extension and Silom Line Extenion</p></div>`;
                    html
                    let mainElem = $('.modal-planjourney #main-content');
                    mainElem.append(html); 
                    resolve();
                }
            }
        })
    }
    
    function fareRatePriceGroupHTMLGenerate(fareRateList)
    {
        return new Promise(async resolve => {
            let html = ``; 

            for(var x in fareRateList)
            {
                let fareRateItem = fareRateList[x];
                let cardImg = fareRateItem.FareIcon;
                let nameTH = fareRateItem.FareDetail;
                let nameEN = fareRateItem.FareDetail_ENG;
                let price = Number(fareRateItem.FarePrice).toLocaleString('th', {minimumFractionDigits: 0});
        
                html += `<div class="price-item">`;
                    html += `<div class="left">`;
                        html += `<img src="${cardImg}" alt="the sky trains route map plan journey detail" />`;
                    html += `</div>`;
                    html += `<div class="mid">`;
                        if(LANGUAGE === "th")
                        {
                            html += `<p class="name-th">${nameTH}</p>`;
                            html += `<p class="name-en">${nameEN}</p>`;
                        }else
                        {
                            html += `<p class="name-th">${nameEN}</p>`;
                            html += `<p class="name-en">${nameTH}</p>`;
                        }
                    html += `</div>`;
                    html += `<div class="right">`;
                        html += `<p>${price} ${LANGUAGE === 'th' ? 'บาท' : 'baht'}</p>`;
                    html += `</div>`;
                html += `</div>`;

                if(Number(x) === fareRateList.length -1)
                {
                    resolve(html);
                }
            }
        })
    }

    function onSelectSuggestJourney(index)
    {
        return new Promise(async resolve => {
            let mainWrapIndexElem = Number($('.sugg-journey-con .main-wrap').attr('showdata-index'));

            await suggestJourneyDetailPositionInit();
            $(window).on('resize', async() => {
                await suggestJourneyDetailPositionInit();
            })

            await handleSuggestDetailStatus(true);
            if(mainWrapIndexElem !== CUR_INDEX_PLANJOURNEY_SELECTED) // เช็คเพื่อกันกดซ้ำ
            {
                await handleSuggestJourneyDetailDialog('loading');
            }
            await getSuggestJourneyDetail();
            await handleSuggestJourneyDetailDialog('init', index);

            resolve();
        })
    }

    function handleSuggestJourneyDetailDialog(status, index)
    {
        return new Promise(async resolve => {
            let suggJourneyElem = $('.sugg-journey-con');
            let parentLoaderElem = $('.sugg-journey-con .main-wrap'); // append
            let mainElem = $('.sugg-journey-wrap .main'); // for get height
            let btnSlideJourneyPlanDetail = $('.sugg-journey-con .btn-slide-suggjourney');

            if(status === 'loading')
            {
                // เช็คว่ามีอยู่แล้วไหมถ้ามีอยู่แล้วให้ลบไปก่อน
                let lengthLoader = $('.suggjourneydetail-loader');
                if(lengthLoader.length > 0)
                {
                    lengthLoader.remove();
                }
                let html = `<div class="suggjourneydetail-loader" style="display: flex;"><div></div></div>`;
                // append child
                parentLoaderElem.append(html);
                // set height
                let height = parentLoaderElem.innerHeight();
                mainElem.css({height: height});
                resolve();
            }

            if(status === 'init')
            {
                await suggestJourneyDetailInit(index);
            }

            // Clear
            if(status === 'clear')
            {
                let height = 0;
                mainElem.css({height: height})    
                parentLoaderElem.empty();

                suggJourneyElem.fadeOut(); 
                JOURNEY_DETAILS = null;
                resolve();
            }
            // Slide Hide
            if(status === 'hide')
            {
                btnSlideJourneyPlanDetail.attr('data-status', 'inactive');
                let height = 0;
                mainElem.css({height: height})    
                resolve();
            }
            // Slide Un-Hide
            if(status === 'unhide')
            {
                btnSlideJourneyPlanDetail.attr('data-status', 'active');
                let height = parentLoaderElem.innerHeight(); // + padding 30px
                mainElem.css({height: height})    
                resolve();
            }
        })
    }
    function handleSuggestDetailStatus(status)
    {
        return new Promise(async resolve => {
            let suggJourneyDetailElem = $('.sugg-journey-con');
            if(status === true)
            {
                $(suggJourneyDetailElem).fadeIn();
                resolve();
            }else
            {
                await handleSuggestJourneyDetailDialog('clear');
                resolve();
            }
        })
    }

    function suggestJourneyDetailInit(index)
    {
        return new Promise(async resolve => {
            let mainWrapElem = $('.sugg-journey-con .main-wrap'); // append
            let mainWrapIndexElem = Number($('.sugg-journey-con .main-wrap').attr('showdata-index'));
            let mainElem = $('.sugg-journey-con .main');
            // recommended route
            let html = await suggestJourneyHTMLGenerate(index);

            // clear & append
            // if(mainWrapIndexElem !== CUR_INDEX_PLANJOURNEY_SELECTED) // เช็คว่า data index ที่เลือกจะต้องไม่ถูกเปิดอยู่แล้ว ไม่งั้นจะทำให้สามารถกดสแปมได้
            // {
            //     mainWrapElem.empty();
            //     mainWrapElem.append(html);
            //     CUR_INDEX_PLANJOURNEY_SELECTED = index;
            // }

            mainWrapElem.empty();
            mainWrapElem.append(html);
            CUR_INDEX_PLANJOURNEY_SELECTED = index;

            // set height 
            setTimeout(async() => {
                // add event bypass
                await addEventByPassItem();
                // add event traintime arrival
                await addEventTraintimeArrival();
                // add style in line station
                await lineStationEventInit();
                await lineStationStyleInit();
                let height = mainWrapElem.innerHeight();
                let minimumHeight = 300;
                let windowHeight = $(window).height();
                if(windowHeight <= MINIMUM_WINDOW_HEIGHT)
                {
                    mainElem.css({height: minimumHeight});
                }else
                {
                    mainElem.css({height: height})    
                }

                // Walk Handle
                await handleDistanceTime();

            }, 200)
            
            resolve();
        })
    }

    function addEventTraintimeArrival()
    {
        return new Promise(async resolve => {
            let ttaTimeRoute = $('.tta-timeroute'); 

            ttaTimeRoute.click(function() {
                clearInterval(INTERVAL_TTA);
                let ttaElem = $(this);
                let platform = ttaElem.attr('data-platform');
                let station_key = String(ttaElem.attr('data-stkey')).toUpperCase();

                let reqData = {
                    "StationKey": station_key,
                    "Platform": platform
                } 
                handleModalTTAwithPlatform('init', reqData);
            })

            resolve();
        })
    }

    function handleDistanceTime()
    {
        return new Promise(async resolve => {
            let lineWalkElem = $('div.line.walk');

            let parentElem = $('.sugg-journey-con .main-wrap');

            
            lineWalkElem.each((index, elem) => {
                let item = $(elem);
                let mainWrapElem = $('.sugg-journey-wrap .main-wrap');
                let mainWrapPosition = mainWrapElem.offset();
                let linePosition = $(elem).offset();
                let lineHeight = $(elem).innerHeight();
                let lineCenter = lineHeight / 2;

                // let top = (linePosition.top - mainWrapPosition.top) + lineCenter;
                // let style = `position: absolute; top: ${top}px; left: 20px;`;

                let html = `<div class="walkpiont-wrap"><img data-type="${Number(index) === 0 ? 'origin' : 'dest'}" id="walk-point" src="/assets/images/icons/walking.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง" /></div>`;
                // let html = `<img style="${style}" data-type="${Number(index) === 0 ? 'origin' : 'dest'}" id="walk-point" src="/assets/images/icons/walking.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง" />`;
                item.append(html);
                // parentElem.append(html);
            })


            resolve();
        })
    }

    function subStationPointStyleInit()
    {
        return new Promise(async resolve => {

        })
    }

    function addEventByPassItem()
    {
        return new Promise(async resolve => {
            let elems = $('.sugg-journey-wrap .bp-title');

            elems.each(async(i, elem) => {
                $(elem).click(async function() {
                    let item = $(this);
                    let lineColorSelected = item.attr('data-line-color');
                    let indexData = item.attr('data-index');
                    let byPassParentElem = $(`.sugg-journey-wrap .bp-title[data-index="${indexData}"]`);
                    let byPassItemElem = $(`.sugg-journey-wrap .bp-title[data-index="${indexData}"] .bp-items p`);
                    let byPassElem = $(`.sugg-journey-wrap .bp-title[data-index="${indexData}"] .bp-items`);
                    let byPassStatus = byPassElem.attr('data-status');
                    let height = 10; // default 15 คือบวก padding
                    let gap = 20;
                    let lineElems = $('.sugg-journey-wrap .main .line')

                    let popupElem = $('.sugg-journey-wrap .main');
                    let contentHeight = $('.sugg-journey-wrap .main-wrap').innerHeight();

                    let bypassSelectedElem = item.find('.bp-items p');

                    if(byPassStatus === 'inactive')
                    {
                        // active sub statin point
                        byPassItemElem.each(async(x, elem) => {
                            let item = $(elem);
                            let line_color = item.attr('data-color');
                            let itemHeight = item.innerHeight();
                            height += itemHeight + gap;
    
                            if(Number(x) === byPassItemElem.length-1)
                            {
                                byPassElem.css({height: height});
                                byPassElem.attr('data-status', 'active');

                                popupElem.css({height: contentHeight+height})

                                let heightLine = lineElems.innerHeight();
                                // console.log('Line Height: ', heightLine);
                                lineElems.css({height: heightLine+height})

                                setTimeout(async() => {
                                    // follow line (update position line)
                                    await lineStationStyleInit();
                                    // create & append sub station point
                                    await handleSubStationPoint('init', bypassSelectedElem);
                                }, 100)
                            }
                        })
                    }else
                    {
                        // inactive sub statin point 
                        byPassItemElem.each(async(x, elem) => {
                            let itemHeight = $(elem).innerHeight();
                            height += itemHeight + gap;
    
                            if(Number(x) === byPassItemElem.length-1)
                            {
                                byPassElem.css({height: 0});
                                byPassElem.attr('data-status', 'inactive'); 

                                let heightLine = lineElems.innerHeight();
                                console.log('Line Height: ', heightLine);
                                lineElems.css({height: heightLine-height})

                                setTimeout(async() => {
                                    // follow line (update position line)
                                    await lineStationStyleInit();
                                }, 100)
                                await handleSubStationPoint('removeByColor', bypassSelectedElem, lineColorSelected);
                            }
                        })
                    }
                })
                if(Number(i) === elems.length-1)
                {
                    resolve();
                }
            })
        })
    }

    function handleSubStationPoint(status, bypassElems, lineColorSelected)
    {
        return new Promise(async resolve => {
            // Initial Sub Station Popint
            if(status === 'init')
            {
                // เอา bypass มาลูป แลถทำการสร้าง sub station point ให้เท่ากับจำนวน bypass ที่มี หลังจากนั้น ให้กำหนัดตำแหน่ง left = ตำแหน่งของ line journey และให้อยู่ตรงกลาง ส่วน top = position ของ bypass ที่ลูปแต่ละตัว
                bypassElems.each((i, elem) => {
                    let lineColor = $(elem).attr('data-color');
                    let stationID = $(elem).attr('data-st-id');
                    let lineJourney = $('.sugg-journey-wrap .main-wrap > .line')
                    let journeyWrap = $('.sugg-journey-wrap .main-wrap');
    
                    // cal left
                    let lineJourneyLeft = lineJourney.position().left;
                    let lineJourneyWidth = lineJourney.innerWidth();
                    let subStationPointWidth = SUB_STATION_POINT_SIZE;
                    let balanceCenter = [lineJourneyWidth, subStationPointWidth].sort(function(a, b){return b-a}); // ASC มากไปน้อย
                    balanceCenter = balanceCenter[0] - balanceCenter[1];
                    balanceCenter = balanceCenter / 2;
                    let left = lineJourneyLeft - balanceCenter;
    
                    // cal top
                    let subStationPointTop = $(elem).offset().top;
                    let journeyWrapTop = journeyWrap.offset().top;
                    let top = [subStationPointTop, journeyWrapTop].sort(function(a, b){return b-a}); // ASC มากไปน้อย
                    top = top[0] - top[1];
    
                    // sub station point *HTML
                    let html  = ``;
                    html += `<p id="sub-stationpoint-item" data-st-id="${stationID}" data-color="${lineColor}"`;
                        html += `style="border: 3px solid ${lineColor}; left: ${left}px;">`;
                    html += `</p>`;
    
                    // append new
                    journeyWrap.append(html);
    
                    if(Number(i) === bypassElems.length-1)
                    {
                        let subStationPointElem = $('p#sub-stationpoint-item');
                        subStationPointElem.show();
    
                        updatePosition();

                        resolve();
                    }
                })
            }
            // REMOVE (sub station point)
            if(status === 'removeByColor')
            {
                let subStationPointSelectedElem = $(`p#sub-stationpoint-item[data-color="${lineColorSelected}"]`);
                subStationPointSelectedElem.remove();

                setTimeout(() => {
                    updatePosition();
                }, 100)
            }

            // Update position sub station point 
            function updatePosition()
            {
                // จะเอาตัวที่มีอยู่ หรือปัจจุบันยังไม่ได้โดนปิด เอามากำหนดตำแหน่งใหม่ให้เป็นตำแหน่งล่าสุด
                let allSubStationPoint = $(`p#sub-stationpoint-item`);
                let journeyWrap = $('.sugg-journey-wrap .main-wrap');

                allSubStationPoint.each((i, elem) => {
                    let stationID = $(elem).attr('data-st-id');
                    // query bypass elem color = datacolor เพื่อที่จะเอาตำแหน่งของมัน
                    let byPassItem = $(`.bp-items p[data-st-id="${stationID}"]`);
                    let byPassIndex = Number(byPassItem.attr('data-index'));
                    let byPassTop = byPassItem.offset().top;
                    let journeyWrapTop = journeyWrap.offset().top;
                    let top = [byPassTop, journeyWrapTop].sort(function(a, b){return b-a}); // ASC มากไปน้อย
                    top = top[0] - top[1];
                    let walkElemHeight = 85;
                    let lineWalkElem = $('.line.walk');

                    if(byPassIndex === 0 && lineWalkElem.length > 0) // เช็คว่าเลือกสถานที่หรือไม่ ถ้าใช่ให้บวกเพิ่มอีก 85 เพราะ point group ชุดแรก มีปัญหากับตำแหน่งแต่ตัวอื่นไม่เป็น
                    {
                        $(elem).css({top: top + walkElemHeight})
                    }else
                    {
                        $(elem).css({top: top})
                    }
                })
            }
        })
    }

    function lineStationEventInit()
    {
        return new Promise(async resolve => {
            let stationElems = $('.sugg-journey-wrap .main .origin-wrap, .sugg-journey-wrap .main .dest-wrap');

            stationElems.each((i, elem) => {
                $(elem).on('click', async function(){
                    let item = $(this);
                    
                    let station_id = item.attr('data-station-id');
                    let station_code = item.attr('data-station-code');
                    let station_name = String(item.attr('data-name')).replace(/ /g, '').split('|');
                    let station_color = item.attr('data-color');
                    let line_id = Number(item.attr('data-line-id'));
                    let line_name = String(item.attr('data-line-name')).replace(/ /g, '').split('|');
                    let isWalkPoint = item.attr('data-iswalk');

                    CUR_AREAMAP_STATION_ID = station_id;
                    CUR_AREAMAP_LINE_ID = line_id;

                    if(!isWalkPoint)
                    {
                        let nameTH = station_name[0];
                        let nameEN = station_name[1];
                        let lineNameTH = line_name[0];
                        let lineNameEN = line_name[1];
                        let src = await getSingleStationIconByStationID(line_id);  
    
                        $('#mdstdt-name-th').text(nameTH);
                        $('#mdstdt-name-en').text(nameEN);
                        $('#mdstdt-line-badge').text(LANGUAGE === 'th' ? lineNameTH : lineNameEN);
                        $('#mdstdt-line-badge').css({background: station_color})
                        $('#mdstdt-icon img').attr('src', src)
                        $('#mdstdt-stcode p').text(station_code); 
                        $('#mdstdt-stcode').css({border: `3px solid ${station_color}`}); 
    
                        await handleModalStationDetail('active');
                    }
                })
            })

            resolve();
        })
    }

    function handleModalStationDetail(type)
    {
        return new Promise(async resolve => {
            let elem = $('.modal-station-detail');
            if(type === 'inactive')
            {
                elem.fadeOut(); 
                resolve();
            }else
            {
                elem.fadeIn(); 
                resolve();
            }
        })
    }

    function lineStationStyleInit()
    {
        return new Promise(async resolve => {
            console.log('lineStationStyleInit');

            let lineElems = $('.sugg-journey-wrap .main .line')

            lineElems.each((i, elem) => { // loop line (LINE STATION)
                // current
                let lineIndex = Number($(elem).attr('data-index'));
                let isMrtLine = !!$(elem).attr('data-ismrt') ? JSON.parse($(elem).attr('data-ismrt')) : false;
                let oriStationElem = $(`.sugg-journey-wrap .main .origin-wrap[data-index="${lineIndex}"] .icon`);
                let lineOriElem = $(`.sugg-journey-wrap .main-wrap > .line[data-index="${lineIndex}"]`);
                let destStationElem = $(`.sugg-journey-wrap .main .dest-wrap[data-index="${lineIndex}"] .icon`);
                let lineDestElem = $(`.sugg-journey-wrap .main-wrap > .line[data-index="${lineIndex}"]`);
                // next item
                let nextOriStationElem = $(`.sugg-journey-wrap .main .origin-wrap[data-index="${lineIndex+1}"] .icon`);
                let nextLineOriElem = $(`.sugg-journey-wrap .main-wrap > .line[data-index="${lineIndex+1}"]`);
                let nextDestStationElem = $(`.sugg-journey-wrap .main .dest-wrap[data-index="${lineIndex+1}"] .icon`);
                let nextLineDestElem = $(`.sugg-journey-wrap .main-wrap > .line[data-index="${lineIndex+1}"]`);
                // prev item
                let prevOriStationElem = $(`.sugg-journey-wrap .main .origin-wrap[data-index="${lineIndex-1}"] .icon`);
                let prevLineOriElem = $(`.sugg-journey-wrap .main-wrap > .line[data-index="${lineIndex-1}"]`);
                let prevDestStationElem = $(`.sugg-journey-wrap .main .dest-wrap[data-index="${lineIndex-1}"] .icon`);
                let prevLineDestElem = $(`.sugg-journey-wrap .main-wrap > .line[data-index="${lineIndex-1}"]`);
                
                // current (origin)
                let oriWidth = oriStationElem.width();
                let oriPosition = oriStationElem.position();
                let oriLineColor = lineOriElem.attr('data-color');
                // next item
                let nextOriWidth = nextOriStationElem.width();
                let nextOriPosition = nextOriStationElem.position();
                let nextOriLineColor = nextLineOriElem.attr('data-color');
                // prev item
                let prevOriWidth = prevOriStationElem.width();
                let prevOriPosition = prevOriStationElem.position();
                let prevOriLineColor = prevLineOriElem.attr('data-color');

                // current (destination)
                let destWidth = destStationElem.width();
                let destPosition = destStationElem.position();
                let destLineColor = lineDestElem.attr('data-color');
                // next item
                let nextDestWidth = nextDestStationElem.width();
                let nextDestPosition = nextDestStationElem.position();
                let nextDestLineColor = nextLineDestElem.attr('data-color');
                // prev item
                let prevDestWidth = prevDestStationElem.width();
                let prevDestPosition = prevDestStationElem.position();
                let prevDestLineColor = prevLineDestElem.attr('data-color');

                // option style
                let lineStroke = 12;
                let space = 5; // กันเส้นเกิน เอาตัวนี้ไปลบทั้ง top
                
                if(isMrtLine === true)
                {
                    let connect = $(elem).attr('data-connect'); // next , prev
                    let type = $(elem).attr('data-self-type'); // origin, destination

                    if(connect === 'next')
                    {
                        if(type === 'destination') // ต้องไป conect ตัวถัดไปที่เป็น origin
                        {
                            // current is destination
                            let top = destPosition.top + space;
                            let left = (destWidth / 2) + (destPosition.left - lineStroke/2);
                            let height = [nextOriPosition.top, destPosition.top].sort(function(a, b){return b-a}); // ASC มากไปน้อย
                            height = height[0] - height[1];
                            $(elem).css({position: 'absolute', top, left, width: lineStroke, height, background: '#1E4F6F'})                   
                        }
                    }
                    if(connect === 'prev')
                    {
                        if(type === 'origin') // ต้องไป conect ตัวก่อนหน้าที่เป็น destination
                        {
                            // current is origin
                            let top = prevDestPosition.top + space;
                            let left = (oriWidth / 2) + (oriPosition.left - lineStroke/2);
                            let height = [prevDestPosition.top, oriPosition.top].sort(function(a, b){return b-a}); // ASC มากไปน้อย
                            height = height[0] - height[1];
                            $(elem).css({position: 'absolute', top, left, width: lineStroke, height, background: '#1E4F6F'})                   
                        }
                    }
                }else
                {
                    // มีทั้งคู่
                    if(!!oriPosition && !!destPosition)
                    {
                        // origin
                        let top = oriPosition.top + space;
                        let left = (oriWidth / 2) + (oriPosition.left - lineStroke/2);
                        let height = destPosition.top - oriPosition.top;
                        $(elem).css({position: 'absolute', top, left, width: lineStroke, height, background: oriLineColor})                   
                    }
                    // ต้นทางมี ปลายทางไม่มี
                    if(!!oriPosition && !destPosition)
                    {
                        if(!!nextOriPosition)
                        {
                            // origin
                            let top = oriPosition.top + space;
                            let left = (oriWidth / 2) + (oriPosition.left - lineStroke/2);
                            let height = nextOriPosition.top - oriPosition.top;
                            $(elem).css({position: 'absolute', top, left, width: lineStroke, height, background: oriLineColor})                   
                        }else // ถ้า next origin ไม่มี ให้ไปใช้ next destination เพิื่อ ref position แทน
                        {
                            // origin
                            let top = oriPosition.top + space;
                            let left = (oriWidth / 2) + (oriPosition.left - lineStroke/2);
                            let height = nextDestPosition.top - oriPosition.top;
                            $(elem).css({position: 'absolute', top, left, width: lineStroke, height, background: oriLineColor})                   
                        }
                    }
                    // ต้นทางไม่มี ปลายทางมี
                    if(!oriPosition && !!destPosition)
                    {
                        if(!!prevDestPosition) 
                        {
                            // destination
                            let top = prevDestPosition.top + space;
                            let left = (destWidth / 2) + (destPosition.left - lineStroke/2);
                            let height = destPosition.top - prevDestPosition.top;
                            $(elem).css({position: 'absolute', top, left, width: lineStroke, height, background: destLineColor})                   
                        }else
                        {
                            // destination
                            let top = prevOriPosition.top + space;
                            let left = (destWidth / 2) + (destPosition.left - lineStroke/2);
                            let height = destPosition.top - prevOriPosition.top;
                            $(elem).css({position: 'absolute', top, left, width: lineStroke, height, background: destLineColor})                   
                        }
                    }
                }
                
                // last loop
                if(i === lineElems.length-1)
                {
                    resolve();
                }
            })
        })
    }

    function getTTAstatus(line_id)
    {
        return new Promise(async resolve => {
            switch(line_id)
            {
                case 1:
                    resolve(true); 
                    break;
                ;
                default:
                    resolve(false)
                    break;
                ;
            }
            resolve();
        })
    }

    function suggestJourneyHTMLGenerate(index)
    {
        return new Promise(async resolve => {
            let data = JOURNEY_DETAILS.RoutesMap[index-1];
            let dataGroup = data.RoutesJorneyGroup;
            let originLocation = JOURNEY_DETAILS.Origin_Location;
            let destLocation = JOURNEY_DETAILS.Destination_Location;

            let html = ``;

            html += `<div class="content">`;
                html += `<div class="title">`;
                    html += `<h3>${LANGUAGE === 'th' ? 'เส้นทางแนะนำ' : 'Recommended Route'}</h3>`;
                html += `</div>`;
            html += `</div>`;

            // ถ้ามี Line เดียว & ถ้ามีมากกว่า 1 Line
            if(dataGroup.length > 1)
            {
                for(let i = 0; i < dataGroup.length; i++)
                {
                    let origin_data = dataGroup[i].Origin;
                    let dest_data = dataGroup[i].Destination;
                    console.log('Destination Data: ', dest_data);
                    let origin_lineid = dataGroup[i].LineId;
                    let dest_lineid = dataGroup[i].LineId;
                    let origin_ismrt = origin_data.IsMRT;
                    let dest_ismrt = dest_data.IsMRT;
                    let ByPass = dataGroup[i].ByPass;
                    let platform = dataGroup[i].PlatForm;
                    let origin_linename = `${origin_data.Station.LineNameTH} | ${origin_data.Station.LineNameEN}`;
                    let dest_linename = `${dest_data.Station.LineNameTH} | ${dest_data.Station.LineNameEN}`;
                    let origin_station_code = String(origin_data.StationCode).toLowerCase();
                    let dest_station_code = String(dest_data.StationCode).toLowerCase();

                    let byPassHTML = await byPassItemHTMLGenerator(ByPass, i);
                    let origin_ttaStatus = await getTTAstatus(origin_lineid);
                    let dest_ttaStatus = await getTTAstatus(dest_lineid); 

                    if(i === 0) // first loop
                    {
                        // origin icon = sigle station
                        let origin_icon = await getSingleStationIconByStationID(origin_lineid);
                                               
                        // Walk (Origin)
                        if(!!originLocation)
                        {
                            let distanceTime = Math.trunc(originLocation.DistanceTime);
                            let stationName = `${originLocation.LocationName_TH} | ${originLocation.LocationName_EN}`;
                            let index = i-1;

                            html += `<div class="origin-wrap" data-iswalk="true" data-line-name="${origin_linename}" data-line-id="${origin_lineid}" data-station-id="${origin_data.StationID}" data-station-code="${origin_data.StationCode}" data-name="${origin_data.Detail}" data-color=#A9A9A9" data-index="${index}">`;
                                html += `<p class="timeroute"></p>`;
                                html += `<div class="icon-wrap">`;
                                    html += `<img style="background: white; border-radius: 100px;" class="icon" data-icontype="single" src="/assets/images/icons/pin_from.png" alt="bts the skytrain new line yellow" />`;
                                html += `</div>`;
                                html += `<p class="title">${stationName}</p>`;
                                html += `<p class="symbol"></p>`;
                            html += `</div>`;

                            // ByPass
                            html += `<div class="bypass-wrap">`;
                                html += `<div></div>`;
                                html += `<div class="bpwalk" data-line-color="${origin_data.BTSLineColor}" data-index="${i}">`
                                    html += `<div class="bp-head">`;
                                        html += `<p>${LANGUAGE === 'th' ? `เดิน ${distanceTime} นาที` : `${distanceTime} minutes walk`}</p>`; 
                                    html += `</div>`
                                    html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`;
                                html += `</div>`
                            html += `</div>`;

                            // Line
                            html += `<div class="line walk" data-index="${index}" data-color="#A9A9A9"></div>`;
                        }
                        
                        // Origin
                        html += `<div class="origin-wrap" data-line-name="${origin_linename}" data-line-id="${origin_lineid}" data-station-id="${origin_data.StationID}" data-station-code="${origin_data.StationCode}" data-name="${origin_data.Detail}" data-color="${origin_data.BTSLineColor}" data-index="${i}">`;
                            if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                            {
                                html += `<p class="timeroute ${origin_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                    if(origin_ttaStatus)
                                    {
                                        html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                                    }
                            }else
                            {
                                html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                            }
                            html += `</p>`;
                            html += `<div class="icon-wrap">`;
                                html += `<img class="icon" data-icontype="single" src="${origin_icon}" alt="bts the skytrain new line yellow" />`;
                            html += `</div>`;
                            html += `<p class="title">${origin_data.Title}</p>`;
                            if(origin_station_code === 'cen')
                            {
                                html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                            }else
                            {
                                html += `<p style="border: 3px solid ${origin_data.BTSLineColor}" class="symbol">${origin_data.StationCode}</p>`;
                            }
                        html += `</div>`;
                        // ByPass
                        html += `<div class="bypass-wrap">`;
                            html += `<div></div>`;
                            html += `<div class="bp-title" data-line-color="${origin_data.BTSLineColor}" data-index="${i}">`
                                html += `<div class="bp-head">`;
                                    if(origin_ismrt === true && dest_ismrt === true && dataGroup.length != 2)
                                    {
                                        // html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `connect to the MRT Blue Line`}</p>`; 
                                        html += `<p></p>`; 
                                    }else
                                    {
                                        if(ByPass.length !== 0)
                                        {
                                            html += `<p>${LANGUAGE === 'th' ? `เดินทาง ${ByPass.length} สถานี` : `Travel ${ByPass.length} Stations`}</p>`;
                                            html += `<img src="/assets/images/icons/upanddown-bypass.png" alt="the skytrain new yellow line" />`
                                        }
                                        if(platform !== 0)
                                        {
                                            html += `<p>${LANGUAGE === 'th' ? `ชานชาลาที่ ${platform}` : `Platform ${platform}`}</p>`;
                                        }
                                    }
                                html += `</div>`
                                html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`;
                            html += `</div>`
                            // html += `<div class="bypass-item" data-index="${i}">`;
                            //     html += ``;
                            // html += `</div>`;
                        html += `</div>`;
                        // Line
                        html += `<div class="line" data-index="${i}" data-color="${origin_data.BTSLineColor}"></div>`;
            
                        if(origin_ismrt === false || (origin_ismrt === true && dest_ismrt === true)) // ถ้าต้นทางเป็น mrt ให้ปิดปลายทางไม่ต้องแสดง
                        {
                            let next_lineid = dataGroup[i+1].LineId;
                            let next_ismrt = dataGroup[i+1].Origin.IsMRT;
                            let next_lineColor = dataGroup[i+1].Origin.BTSLineColor;
                            let next_stationCode = dataGroup[i+1].Origin.StationCode;
                            let type = 'origin' // origin of mrt
                            let dest_icon = await getInterChangeIconByIdToId(dest_lineid, dest_ismrt, next_lineid, next_ismrt, type);
    
                            // Destination
                            html += `<div class="dest-wrap" data-line-name="${dest_linename}" data-line-id="${dest_lineid}" data-station-id="${dest_data.StationID}" data-station-code="${dest_data.StationCode}" data-name="${dest_data.Detail}" data-color="${dest_data.BTSLineColor}" data-index="${i}">`;
                                // if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                                // {
                                //     html += `<p class="timeroute ${dest_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                                //         if(dest_ttaStatus)
                                //         {
                                //             html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                                //         }
                                // }else
                                // {
                                //     html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                                // }
                                html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                                html += `</p>`;
                                html += `<div class="icon-wrap">`;
                                    html += `<img class="icon" data-icontype="interchange" src="${dest_icon}" alt="bts the skytrain new line yellow" />`;
                                html += `</div>`;
                                html += `<p class="title">${dest_data.Title}</p>`;
                                if(dest_station_code === 'cen')
                                {
                                    html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                                }else
                                {
                                    html += `<p style="border: 3px solid ${dest_ismrt === true ? dest_data.BTSLineColor : next_lineColor}" class="symbol">${dest_ismrt === true ? dest_data.StationCode : next_stationCode}</p>`;
                                }
                            html += `</div>`;
                        }
                        if(dest_ismrt === true && origin_ismrt === false && dataGroup.length != 2) // เผื่อมีแต่สองตัว เช็คไว้จะได้ไม่เบิ้ล
                        {
                            html += `<div class="mrt-title">`
                                html += `<p></p>`
                                html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `Connect to the MRT Blue Line`}</p>`; 
                            html += `</div>`
                            html += ``;
                            html += `<div class="line" data-index="${i}" data-color="${origin_data.BTSLineColor}" data-ismrt="true" data-connect="next" data-self-type="destination"></div>`;
                        }
                        if(dest_ismrt === true && origin_ismrt === true && dataGroup.length != 2)
                        {
                            html += `<div class="mrt-title">`
                                html += `<p></p>`
                                html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `Connect to the MRT Blue Line`}</p>`; 
                            html += `</div>`
                            html += ``;
                            html += `<div class="line" data-index="${i}" data-color="${origin_data.BTSLineColor}" data-ismrt="true" data-connect="next" data-self-type="destination"></div>`;
                        }
                    }
                    // not first & last loop
                    if(i !== 0 && i !== dataGroup.length-1)
                    {
                        if(origin_ismrt === true)
                        {
                            let next_lineid = dataGroup[i+1].LineId;
                            let next_ismrt = dataGroup[i+1].Origin.IsMRT;
                            let next_lineColor = dataGroup[i+1].Origin.BTSLineColor;
                            let next_stationCode = dataGroup[i+1].Origin.StationCode;
                            let type = "destination"; // destination of bts
                            let platform = dataGroup[i].PlatForm;
                            let origin_icon = await getInterChangeIconByIdToId(origin_lineid, origin_ismrt, next_lineid, next_ismrt, type);
                            
                            html += `<div class="origin-wrap" data-line-name="${origin_linename}" data-line-id="${origin_lineid}" data-station-id="${origin_data.StationID}" data-station-code="${origin_data.StationCode}" data-name="${origin_data.Detail}" data-color="${origin_data.BTSLineColor}" data-index="${i}">`;
                                // if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                                // {
                                //     html += `<p class="timeroute ${origin_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                //         if(origin_ttaStatus)
                                //         {
                                //             html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                                //         }
                                // }else
                                // {
                                //     html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                // }
                                html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                html += `</p>`;
                                html += `<div class="icon-wrap">`;
                                    html += `<img class="icon" data-icontype="interchange" src="${origin_icon}" alt="bts the skytrain new line yellow" />`;
                                html += `</div>`;
                                html += `<p class="title">${origin_data.Title}</p>`;
                                if(origin_station_code === 'cen')
                                {
                                    html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                                }else
                                {
                                    html += `<p style="border: 3px solid ${origin_data.BTSLineColor}" class="symbol">${origin_data.StationCode}</p>`;
                                }
                            html += `</div>`;
                        }

                        let ByPass = dataGroup[i].ByPass;
                        let platform = dataGroup[i].PlatForm;
                        // ByPass
                        html += `<div class="bypass-wrap">`;
                            html += `<div></div>`;
                            html += `<div class="bp-title" data-line-color="${origin_data.BTSLineColor}" data-index="${i}">`
                                html += `<div class="bp-head">`;
                                    if(origin_ismrt === true && dest_ismrt === true)
                                    {
                                        html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `Connect to the MRT Blue Line`}</p>`; 
                                    }else
                                    {
                                        if(ByPass.length !== 0)
                                        {
                                            html += `<p>${LANGUAGE === 'th' ? `เดินทาง ${ByPass.length} สถานี` : `Travel ${ByPass.length} stations`}</p>`;
                                            html += `<img src="/assets/images/icons/upanddown-bypass.png" alt="the skytrain new yellow line" />`
                                        }
                                        if(platform !== 0)
                                        {
                                            html += `<p>${LANGUAGE === 'th' ? `ชานชาลาที่ ${platform}` : `Platform ${platform}`}</p>`;
                                        }
                                    }
                                html += `</div>`
                                html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`; 
                            html += `</div>`
                            // html += `<div class="bypass-item" data-index="${i}">`;
                            //     html += ``;
                            // html += `</div>`;
                        html += `</div>`;
                        // Line
                        html += `<div class="line" data-index="${i}" data-color="${origin_data.BTSLineColor}"></div>`;

                        let next_lineid = dataGroup[i+1].LineId;
                        let next_ismrt = dataGroup[i+1].Origin.IsMRT;
                        let next_lineColor = dataGroup[i+1].Origin.BTSLineColor;
                        let next_stationCode = dataGroup[i+1].Origin.StationCode;
                        let type = "origin"; // origin of bts next location is mrt
                        let dest_icon = await getInterChangeIconByIdToId(dest_lineid, dest_ismrt, next_lineid, next_ismrt, type);
    
                        html += `<div class="dest-wrap" data-line-name="${dest_linename}" data-line-id="${dest_lineid}" data-station-id="${dest_data.StationID}" data-station-code="${dest_data.StationCode}" data-name="${dest_data.Detail}" data-color="${dest_data.BTSLineColor}" data-index="${i}">`;
                            // if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                            // {
                            //     html += `<p class="timeroute ${dest_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                            //         if(dest_ttaStatus)
                            //         {
                            //             html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                            //         }
                            // }else
                            // {
                            //     html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                            // }
                            html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                            html += `</p>`;
                            html += `<div class="icon-wrap">`;
                                html += `<img class="icon" data-icontype="interchange" src="${dest_icon}" alt="bts the skytrain new line yellow" />`;
                            html += `</div>`;
                            html += `<p class="title">${dest_data.Title}</p>`;
                            if(dest_station_code === 'cen')
                            {
                                html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                            }else
                            {
                                html += `<p style="border: 3px solid ${dest_ismrt === true ? dest_data.BTSLineColor : next_lineColor}" class="symbol">${dest_ismrt === true ? dest_data.StationCode : next_stationCode}</p>`;
                            }
                        html += `</div>`;
                    }
                    // last loop
                    if(i === dataGroup.length-1)
                    {
                        if(origin_ismrt === true && dest_ismrt === false)
                        {
                            let type = "destination"; // destination of bts
                            let origin_icon = await getInterChangeIconByIdToId(origin_lineid, origin_ismrt, null, null, type);
                            let platform = dataGroup[i].PlatForm;
                            
                            html += `<div class="mrt-title">`
                                html += `<p></p>`
                                html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `Connect to the MRT Blue Line`}</p>`; 
                            html += `</div>`
                            
                            html += `<div class="line" data-index="${i}" data-color="${origin_data.BTSLineColor}" data-ismrt="true" data-connect="prev" data-self-type="origin"></div>`;

                            html += `<div class="origin-wrap" data-line-name="${origin_linename}" data-line-id="${origin_lineid}" data-station-id="${origin_data.StationID}" data-station-code="${origin_data.StationCode}" data-name="${origin_data.Detail}" data-color="${origin_data.BTSLineColor}" data-index="${i}">`;
                                // if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                                // {
                                //     html += `<p class="timeroute ${origin_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                //         if(origin_ttaStatus)
                                //         {
                                //             html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                                //         }
                                // }else
                                // {
                                //     html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                // }
                                html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                html += `</p>`;
                                html += `<div class="icon-wrap">`;
                                    html += `<img class="icon" data-icontype="interchange" src="${origin_icon}" alt="bts the skytrain new line yellow" />`;
                                html += `</div>`;
                                html += `<p class="title">${origin_data.Title}</p>`;
                                if(origin_station_code === 'cen')
                                {
                                    html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                                }else
                                {
                                    html += `<p style="border: 3px solid ${origin_data.BTSLineColor}" class="symbol">${origin_data.StationCode}</p>`;
                                }
                            html += `</div>`;
                        }
                        if(origin_ismrt === true && dest_ismrt === true)
                        {
                            let type = "destination"; // destination of bts
                            let origin_icon = await getInterChangeIconByIdToId(origin_lineid, origin_ismrt, null, null, type);
                            let platform = dataGroup[i].PlatForm;

                            html += `<div class="mrt-title">`
                                html += `<p></p>`
                                html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `Connect to the MRT Blue Line`}</p>`; 
                            html += `</div>`
                            
                            html += `<div class="line" data-index="${i}" data-color="${origin_data.BTSLineColor}" data-ismrt="true" data-connect="prev" data-self-type="origin"></div>`;

                            html += `<div class="origin-wrap" data-line-name="${origin_linename}" data-line-id="${origin_lineid}" data-station-id="${origin_data.StationID}" data-station-code="${origin_data.StationCode}" data-name="${origin_data.Detail}" data-color="${origin_data.BTSLineColor}" data-index="${i}">`;
                                // if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                                // {
                                //     html += `<p class="timeroute ${origin_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                //         if(origin_ttaStatus)
                                //         {
                                //             html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                                //         }
                                // }else
                                // {
                                //     html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                // }
                                html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                html += `</p>`;
                                    html += `<div class="icon-wrap">`;
                                    html += `<img class="icon" data-icontype="interchange" src="${origin_icon}" alt="bts the skytrain new line yellow" />`;
                                html += `</div>`;
                                html += `<p class="title">${origin_data.Title}</p>`;
                                if(origin_station_code === 'cen')
                                {
                                    html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                                }else
                                {
                                    html += `<p style="border: 3px solid ${origin_data.BTSLineColor}" class="symbol">${origin_data.StationCode}</p>`;
                                }
                            html += `</div>`;
                        }

                        let ByPass = dataGroup[i].ByPass;
                        let platform = dataGroup[i].PlatForm;
                        // ByPass
                        html += `<div class="bypass-wrap">`;
                            html += `<div></div>`;
                            html += `<div class="bp-title" data-line-color="${origin_data.BTSLineColor}" data-index="${i}">`
                                html += `<div class="bp-head">`;
                                    if(origin_ismrt === true && dest_ismrt === true && dataGroup.length !== 2)
                                    {
                                        // html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `connect to the MRT Blue Line`}</p>`; 
                                        html += `<p></p>`; 
                                    }else
                                    {
                                        if(ByPass.length !== 0)
                                        {
                                            html += `<p>${LANGUAGE === 'th' ? `เดินทาง ${ByPass.length} สถานี` : `Travel ${ByPass.length} stations`}</p>`;
                                            html += `<img src="/assets/images/icons/upanddown-bypass.png" alt="the skytrain new yellow line" />`
                                        }
                                        if(platform !== 0)
                                        {
                                            html += `<p>${LANGUAGE === 'th' ? `ชานชาลาที่ ${platform}` : `Platform ${platform}`}</p>`;
                                        }
                                    }
                                html += `</div>`
                                html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`;
                            html += `</div>`
                            // html += `<div class="bypass-item" data-index="${i}">`;
                            //     html += ``;
                            // html += `</div>`;
                        html += `</div>`;
                        // Line
                        html += `<div class="line" data-index="${i}" data-color="${origin_data.BTSLineColor}"></div>`;

                        // destination icon = sigle station
                        let dest_icon = await getSingleStationIconByStationID(dest_lineid);
                        html += `<div class="dest-wrap" data-line-name="${dest_linename}" data-line-id="${dest_lineid}" data-station-id="${dest_data.StationID}" data-station-code="${dest_data.StationCode}" data-name="${dest_data.Detail}" data-color="${dest_data.BTSLineColor}" data-index="${i}">`;
                            // if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                            // {
                            //     html += `<p class="timeroute ${dest_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                            //         if(dest_ttaStatus)
                            //         {
                            //             html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                            //         }
                            // }else
                            // {
                            //     html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                            // }
                            html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                            html += `</p>`;
                            html += `<div class="icon-wrap">`;
                                html += `<img class="icon" data-icontype="single" src="${dest_icon}" alt="bts the skytrain new line yellow" />`;
                            html += `</div>`;
                            html += `<p class="title">${dest_data.Title}</p>`;
                            if(dest_station_code === 'cen')
                            {
                                html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                            }else
                            {
                                html += `<p style="border: 3px solid ${dest_data.BTSLineColor}" class="symbol">${dest_data.StationCode}</p>`;
                            }
                        html += `</div>`;

                        // Walk (Destination)
                        if(!!destLocation)
                        {
                            let distanceTime = Math.trunc(destLocation.DistanceTime);
                            let stationName = `${destLocation.LocationName_TH} | ${destLocation.LocationName_EN}`;
                            let index = i+1;

                            // ByPass
                            html += `<div class="bypass-wrap">`;
                                html += `<div></div>`;
                                html += `<div class="bpwalk" data-line-color="${dest_data.BTSLineColor}" data-index="${i}">`
                                    html += `<div class="bp-head">`;
                                        html += `<p>${LANGUAGE === 'th' ? `เดิน ${distanceTime} นาที` : `${distanceTime} minutes walk`}</p>`; 
                                    html += `</div>`
                                    html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`;
                                html += `</div>`
                            html += `</div>`;
                            
                            html += `<div class="dest-wrap" data-iswalk="true" data-line-name="${dest_linename}" data-line-id="${dest_lineid}" data-station-id="${dest_data.StationID}" data-station-code="${dest_data.StationCode}" data-name="${dest_data.Detail}" data-color=#A9A9A9" data-index="${index}">`;
                                html += `<p class="timeroute"></p>`;
                                html += `<div class="icon-wrap">`;
                                    html += `<img style="background: white; border-radius: 100px;" class="icon" data-icontype="single" src="/assets/images/icons/pin_to.png" alt="bts the skytrain new line yellow" />`;
                                html += `</div>`;
                                html += `<p class="title">${stationName}</p>`;
                                html += `<p class="symbol"></p>`;
                            html += `</div>`;

                            // Line
                            html += `<div class="line walk" data-index="${index}" data-color="#A9A9A9"></div>`;
                        }

                        resolve(html); 
                    }
                }
            }else
            {
                for(let i = 0; i < dataGroup.length; i++)
                {
                    let origin_data = dataGroup[i].Origin;
                    let bypass_data = dataGroup[i].ByPass;
                    let dest_data = dataGroup[i].Destination;
                    let origin_lineid = dataGroup[i].LineId;
                    let dest_lineid = dataGroup[i].LineId;
                    let origin_ismrt = origin_data.IsMRT;
                    let dest_ismrt = dest_data.IsMRT;
                    let ByPass = dataGroup[i].ByPass;
                    let platform = dataGroup[i].PlatForm;
                    let origin_linename = `${origin_data.Station.LineNameTH} | ${origin_data.Station.LineNameEN}`;
                    let dest_linename = `${dest_data.Station.LineNameTH} | ${dest_data.Station.LineNameEN}`;
                    let origin_station_code = String(origin_data.StationCode).toLowerCase();
                    let dest_station_code = String(dest_data.StationCode).toLowerCase();
    
                    // origin icon = sigle station
                    let origin_icon = await getSingleStationIconByStationID(origin_lineid);
                    let byPassHTML = await byPassItemHTMLGenerator(ByPass, i);

                    let origin_ttaStatus = await getTTAstatus(origin_lineid);
                    let dest_ttaStatus = await getTTAstatus(dest_lineid); 
                    
                    // Walk (Origin)
                    if(!!originLocation)
                    {
                        let distanceTime = Math.trunc(originLocation.DistanceTime);
                        let stationName = `${originLocation.LocationName_TH} | ${originLocation.LocationName_EN}`;
                        let index = i-1;

                        html += `<div class="origin-wrap" data-iswalk="true" data-line-name="${origin_linename}" data-line-id="${origin_lineid}" data-station-id="${origin_data.StationID}" data-station-code="${origin_data.StationCode}" data-name="${origin_data.Detail}" data-color=#A9A9A9" data-index="${index}">`;
                            html += `<p class="timeroute"></p>`;
                            html += `<div class="icon-wrap">`;
                                html += `<img style="background: white; border-radius: 100px;" class="icon" data-icontype="single" src="/assets/images/icons/pin_from.png" alt="bts the skytrain new line yellow" />`;
                            html += `</div>`;
                            html += `<p class="title">${stationName}</p>`;
                            html += `<p class="symbol"></p>`;
                        html += `</div>`;

                        // ByPass
                        html += `<div class="bypass-wrap">`;
                            html += `<div></div>`;
                            html += `<div class="bpwalk" data-line-color="${origin_data.BTSLineColor}" data-index="${i}">`
                                html += `<div class="bp-head">`;
                                    html += `<p>${LANGUAGE === 'th' ? `เดิน ${distanceTime} นาที` : `${distanceTime} minutes walk`}</p>`; 
                                html += `</div>`
                                html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`;
                            html += `</div>`
                        html += `</div>`;

                        // Line
                        html += `<div class="line walk" data-index="${index}" data-color="#A9A9A9"></div>`;
                    }

                    html += `<div class="origin-wrap" data-line-name="${origin_linename}" data-line-id="${origin_lineid}" data-station-id="${origin_data.StationID}" data-station-code="${origin_data.StationCode}" data-name="${origin_data.Detail}" data-color="${origin_data.BTSLineColor}" data-index="${i}">`;
                        if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                        {
                            html += `<p class="timeroute ${origin_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                                if(origin_ttaStatus)
                                {
                                    html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                                }
                        }else
                        {
                            html += `<p class="timeroute" data-stkey="${origin_station_code}" data-platform="${platform}">${origin_data.TimeRoute}`;
                        }
                        html += `</p>`;
                        html += `<div class="icon-wrap">`;
                            html += `<img class="icon" data-icontype="single" src="${origin_icon}" alt="bts the skytrain new line yellow" />`;
                        html += `</div>`;
                        html += `<p class="title">${origin_data.Title}</p>`;
                        if(origin_station_code === 'cen') 
                        {
                            html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                        }else
                        {
                            html += `<p style="border: 3px solid ${origin_data.BTSLineColor}" class="symbol">${origin_data.StationCode}</p>`;
                        }
                    html += `</div>`;
                    // ByPass
                    html += `<div class="bypass-wrap">`;
                        html += `<div></div>`;
                        html += `<div class="bp-title" data-line-color="${origin_data.BTSLineColor}" data-index="${i}">`
                            html += `<div class="bp-head">`;
                                if(origin_ismrt === true && dest_ismrt === true)
                                {
                                    html += `<p>${LANGUAGE === 'th' ? `เชื่อมต่อรถไฟฟ้ามหานครสายสีน้ำเงิน` : `Connect to the MRT Blue Line`}</p>`; 
                                }else
                                {
                                    if(ByPass.length !== 0)
                                    {
                                        html += `<p>${LANGUAGE === 'th' ? `เดินทาง ${ByPass.length} สถานี` : `Travel ${ByPass.length} stations`}</p>`;
                                        html += `<img src="/assets/images/icons/upanddown-bypass.png" alt="the skytrain new yellow line" />`
                                    }
                                    if(platform !== 0)
                                    {
                                        html += `<p>${LANGUAGE === 'th' ? `ชานชาลาที่ ${platform}` : `Platform ${platform}`}</p>`;
                                    }
                                }
                            html += `</div>`
                            html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`;
                        html += `</div>`
                    html += `</div>`;
                    // Line
                    html += `<div class="line" id="journey-line" data-index="${i}" data-color="${origin_data.BTSLineColor}"></div>`;
    
                    // destination icon = sigle station
                    let dest_icon = await getSingleStationIconByStationID(dest_lineid);
        
                    html += `<div class="dest-wrap" data-line-name="${dest_linename}" data-line-id="${dest_lineid}" data-station-id="${dest_data.StationID}" data-station-code="${dest_data.StationCode}" data-name="${dest_data.Detail}" data-color="${dest_data.BTSLineColor}" data-index="${i}">`;
                        // if(IS_TRAINTIME_ARRIVAL_ACTIVE)
                        // {
                        //     html += `<p class="timeroute ${dest_ttaStatus ? 'tta-timeroute' : null}" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                        //         if(dest_ttaStatus)
                        //         {
                        //             html += `<img src="/assets/images/icons/arrow-down.png" />`;    
                        //         }
                        // }else
                        // {
                        //     html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                        // }
                        html += `<p class="timeroute" data-stkey="${dest_station_code}" data-platform="${platform}">${dest_data.TimeRoute}`;
                        html += `</p>`;
                        html += `<div class="icon-wrap">`;
                            html += `<img class="icon" data-icontype="single" src="${dest_icon}" alt="bts the skytrain new line yellow" />`;
                        html += `</div>`;
                        html += `<p class="title">${dest_data.Title}</p>`;
                        if(dest_station_code === 'cen')
                        {
                            html += `<img class="sugg-sym-cen" src="/assets/images/icons/cen-2.png" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง the sky trains new yellow line" />`;
                        }else
                        {
                            html += `<p style="border: 3px solid ${dest_data.BTSLineColor}" class="symbol">${dest_data.StationCode}</p>`;
                        }
                    html += `</div>`;
            
                    // Walk (Destination)
                    if(!!destLocation)
                    {
                        let distanceTime = Math.trunc(destLocation.DistanceTime);
                        let stationName = `${destLocation.LocationName_TH} | ${destLocation.LocationName_EN}`;
                        let index = i+1;

                        // ByPass
                        html += `<div class="bypass-wrap">`;
                            html += `<div></div>`;
                            html += `<div class="bpwalk" data-line-color="${dest_data.BTSLineColor}" data-index="${i}">`
                                html += `<div class="bp-head">`;
                                    html += `<p>${LANGUAGE === 'th' ? `เดิน ${distanceTime} นาที` : `${distanceTime} minutes walk`}</p>`; 
                                html += `</div>`
                                html += `<div class="bp-items" data-status="inactive">${byPassHTML}</div>`;
                            html += `</div>`
                        html += `</div>`;
                        
                        html += `<div class="dest-wrap" data-iswalk="true" data-line-name="${dest_linename}" data-line-id="${dest_lineid}" data-station-id="${dest_data.StationID}" data-station-code="${dest_data.StationCode}" data-name="${dest_data.Detail}" data-color=#A9A9A9" data-index="${index}">`;
                            html += `<p class="timeroute"></p>`;
                            html += `<div class="icon-wrap">`;
                                html += `<img style="background: white; border-radius: 100px;" class="icon" data-icontype="single" src="/assets/images/icons/pin_to.png" alt="bts the skytrain new line yellow" />`;
                            html += `</div>`;
                            html += `<p class="title">${stationName}</p>`;
                            html += `<p class="symbol"></p>`;
                        html += `</div>`;

                        // Line
                        html += `<div class="line walk" data-index="${index}" data-color="#A9A9A9"></div>`;
                    }

                    resolve(html); 
                }
            }
        })
    }

    function subStationPointGenerate(data)
    {
        return new Promise(async resolve => {
            let html = ``;
            if(data.length > 0)
            {
                for(var i in data)
                {
                    let item = data[i];
    
                    html += `<p id="sub-stationpoint-item" data-index="${i}" data-color="${item.BTSLineColor}"></p>`;
    
                    if(Number(i) === data.length -1)
                    {
                        resolve(html);
                    }
                }
            }
            else
            {
                resolve(html);
            }
        })
    }
    function byPassItemHTMLGenerator(data, index)
    {
        return new Promise(async resolve => {
            let html = ``;
            if(data.length > 0)
            {
                for(var i in data)
                {
                    let item = data[i];
    
                    html += `<p data-index="${index}" data-st-id="${item.Station.StationId}" data-color="${item.BTSLineColor}">${item.Title}</p>`;
    
                    if(Number(i) === data.length -1)
                    {
                        resolve(html);
                    }
                }
            }
            else
            {
                resolve(html);
            }
        })
    }

    function getInterChangeIconByIdToId(origin_lineid, origin_ismrt ,dest_lineid , dest_ismrt, type)
    {
        return new Promise(async resolve => {
            let src = '';

            if(type === 'origin')
            {
                if(origin_ismrt === true)
                {
                    if(origin_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_1_mrt.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 4)
                    {
                        src = `/assets/images/journeydetail/ic_change_4_mrt.png`;
                        return resolve(src);
                    }
                }else
                {
                    if(origin_lineid === 1 && dest_lineid === 2)
                    {
                        src = `/assets/images/journeydetail/ic_change_1_2.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 1 && dest_lineid === 4)
                    {
                        src = `/assets/images/journeydetail/ic_change_1_4.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 1 && dest_lineid === 5)
                    {
                        src = `/assets/images/journeydetail/ic_change_1_5.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 2 && dest_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_2_1.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 2 && dest_lineid === 3)
                    {
                        src = `/assets/images/journeydetail/ic_change_2_3.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 3 && dest_lineid === 2)
                    {
                        src = `/assets/images/journeydetail/ic_change_3_2.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 4 && dest_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_4_1.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 5 && dest_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_5_1.png`;
                        return resolve(src);
                    }
                }
            }
            if(type === 'destination')
            {
                if(origin_ismrt === true)
                {
                    if(origin_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_mrt_1.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 4)
                    {
                        src = `/assets/images/journeydetail/ic_change_mrt_4.png`;
                        return resolve(src);
                    }
                }else
                {
                    if(origin_lineid === 1 && dest_lineid === 2)
                    {
                        src = `/assets/images/journeydetail/ic_change_1_2.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 1 && dest_lineid === 4)
                    {
                        src = `/assets/images/journeydetail/ic_change_1_4.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 1 && dest_lineid === 5)
                    {
                        src = `/assets/images/journeydetail/ic_change_1_5.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 2 && dest_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_2_1.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 2 && dest_lineid === 3)
                    {
                        src = `/assets/images/journeydetail/ic_change_2_3.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 3 && dest_lineid === 2)
                    {
                        src = `/assets/images/journeydetail/ic_change_3_2.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 4 && dest_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_4_1.png`;
                        return resolve(src);
                    }
                    if(origin_lineid === 5 && dest_lineid === 1)
                    {
                        src = `/assets/images/journeydetail/ic_change_5_1.png`;
                        return resolve(src);
                    }
                }
            }
        })
    }

    function suggestJourneyDetailPositionInit()
    {
        return new Promise(async resolve => {
            let planJourneyDetailElem = $('.plan-journey-con');
            let planJourneyDetailWidth = planJourneyDetailElem.width();
            let planJourneyDetailPosition = planJourneyDetailElem.position();
            let suggDetailElem = $('.sugg-journey-con');
    
            let windowWidth = $(window).width();
            if(windowWidth > 1180)
            {
                let gap = 20;
                let left = planJourneyDetailPosition.left + planJourneyDetailWidth + gap;
        
                suggDetailElem.css({left: left});
    
                resolve();
            }
        })
    }

    function getSuggestJourneyDetail()
    {
        return new Promise(async resolve => {

            if(JOURNEY_DETAILS !== null && !!JOURNEY_DETAILS)
            {
                resolve();
            }else
            {
                let reqData = {
                    "Origin": Number(CUR_ORIGIN_STATION_ID_SELECTED) != "" ? Number(CUR_ORIGIN_STATION_ID_SELECTED) : Number(origin) ,
                    "Destination": Number(CUR_DESTINATION_STATION_ID_SELECTED) != "" ? Number(CUR_DESTINATION_STATION_ID_SELECTED) : Number(dest) ,
                    "Origin_Location": Number(CUR_ORIGIN_AREAMAP_ID_SELECTED),
                    "Destination_Location": Number(CUR_DESTINATION_AREAMAP_ID_SELECTED)
                };
                ACTION_API.getSuggestJourneyDetail(reqData)
                .then(res => {
                    if(res.IsSuccess === true)
                    {
                        JOURNEY_DETAILS = res.data; 
                        resolve();
                    }
                })
            }
        })
    }

    function handleSetPositionPlanJourneyDetail()
    {
        return new Promise(async resolve => {
            // position init
            let searchElem = $('.search-station-con');
            let planJourneyElem = $('.plan-journey-con');
            let searchPosition = searchElem.position();
            let searchWidth = searchElem.width();
            let gap = 20; //px
            let leftPosition = searchPosition.left + searchWidth + gap;
            planJourneyElem.css({left: leftPosition});

            resolve();
        })
    }

    function planJourneySuggestHTMLGenerate(planJourney)
    {
        return new Promise(async resolve => {
            let html = ``;
            
            planJourney.map((item, i) => {
                let count_interchange = item.Count_InterChange;
                let count_station  = item.Count_Station;
                let route_connectline_img = item.Route_ConnectLine;
                let estimate_time = Math.trunc(item.TotalTime);

                html += `<div class="plan-suggest-wrap" data-index="${i+1}">`;
                    html += `<div class="head-wrap">`;

                        i === planJourney.length-1
                        ?
                        html += `<p>${LANGUAGE === 'th' ? 'เส้นทางอื่นๆ' : 'Other Routes'}</p>`
                        :
                        html += `<p>${LANGUAGE === 'th' ? 'เส้นทางแนะนำ' : 'Recommended Route'}</p>`

                        html += `<img src="/assets/images/icons/ArrowCircleRight.png" alt="the skytrain plan journey suggestion" />`;
                    html += `</div>`;
                    html += `<div class="content-top">`;
                        html += `<div class="count-wrap">`;
                            html += `<span>${LANGUAGE === 'th' ? `เปลี่ยนสถานี ${count_interchange} สถานี` : `Interchange ${count_interchange} stations`} | </span>`;
                            html += `<span>${LANGUAGE === 'th' ? `จำนวน ${count_station} สถานี` : `${count_station} stations`}</span>`;
                        html += `</div>`;
                        html += `<div class="img-conline">`;
                            html += `<img src="${route_connectline_img}" alt="bts the skytrain route line connect" />`;
                        html += `</div>`;
                        html += `<div class="estimate-time-wrap">`;
                            html += `<p>${LANGUAGE === 'th' ? 'เวลาในการเดินทาง' : 'Travel Time'}</p>`;
                            html += `<p>~ ${estimate_time} ${LANGUAGE === 'th' ? 'นาที' : 'minutes'}</p>`;
                        html += `</div>`;
                    html += `</div>`;
                    html += `<div class="content-under">`;
                        html += `<div class="left">`;
                            // html += `<p>${LANGUAGE === 'th' ? 'อัตราค่าโดยสาร' : 'Fares'}</p>`;
                            html += `<button data-index="${i}" data-type="${i === planJourney.length-1 ? 'other' : 'recommend'}" id="btn-planjourneydetail" name="fares-detail">${LANGUAGE === 'th' ? 'ดูอัตราค่าโดยสาร' : 'Fares'}</button>`;
                        html += `</div>`;
                        html += `<div></div>`;
                        html += `<div class="right">`;
                            // html += `<p>${LANGUAGE === 'th' ? 'เวลาเดินทาง' : 'Travel Time'}</p>`;
                            html += `<button data-index="${i}" data-type="${i === planJourney.length-1 ? 'other' : 'recommend'}" id="btn-planjourneydetail" name="travel-detail">${LANGUAGE === 'th' ? 'ดูเวลาเดินทาง' : 'Travel Time'}</button>`;
                        html += `</div>`;
                    html += `</div>`;
                html += `</div>`;

                // last loop
                if(i === planJourney.length-1)
                {
                    resolve(html);
                }
            })
        })
    }

    function handlePlanJourneySelected()
    {
        return new Promise(async resolve => {

        })
    }

    function renderDottedStationPlanJourney()
    {
        return new Promise(async resolve => {
            let parentElem = $('.plan-journey-wrap .head-info');
            let pinFromElem = $('.plan-journey-con img[data-typeicon="pin-staion-from"]');
            let pinToElem = $('.plan-journey-con img[data-typeicon="pin-staion-to"]');
            let fromOffset = pinFromElem.position();
            let toOffset = pinToElem.position();
            let height = [fromOffset.top, toOffset.top].sort(function(a, b){return b-a}); // ASC มากไปน้อย
            height = (height[0] - height[1]) - 21; // - width of icon - 2px
            let top = fromOffset.top + 21; // + width of icon + 2px
            let left = toOffset.left;
            let widthDot = 6;
            let gap = 3;
            let lengthDot = Math.trunc(height / 6); 
            lengthDot = (height) - (gap * lengthDot);
            lengthDot = Math.trunc(lengthDot / 6);

            // `.plan-journey-wrap .head-info`
            let child = ``;
            for(let i = 1; i <= lengthDot; i++)
            {
                child += `<div style="width: ${widthDot}px; height: ${widthDot}px; border-radius: 100px; background: #D9D9D9;"></div>`;
            }

            let html = `<div class="st-dotted" style="width: 25px; height: ${height}px; position: absolute; left: ${left}px; top: ${top}px; z-index: 4; display: grid; align-items: center; justify-content: center;">`;
            html += `${child}</div>`;
            // remove old elem
            $('.st-dotted').remove();
            $(parentElem).append(html);
            // parentElem.append(html);

            resolve();
        })
    }

    function journeyRoutesGenerator(journeyRoutes) {
        return new Promise(async resolve => {
            let routeList = [];

            for(var i in journeyRoutes)
            {
                let props = {top: "", right: "", bottom: "", left: "", station_code: ""}

                // เช็คว่าเป็นลูปสุดท้ายแล้วหรือไม่ ถ้าลูดท้ายแล้วจะไม่ไห้ทำ เพราะว่าต้อง lenth +1
                let stationCode_1 = String(journeyRoutes[i].StationCode).toLowerCase();
                let stationCode_2 = !!journeyRoutes[(Number(i))+1] ? journeyRoutes[(Number(i))+1].StationCode : null
                let stationElem_1 = $(`#station-pointer[station-key="${stationCode_1}"]`) // get position x, y ของสถานีแต่ละตัว
                let stationX_1 = Number(String(stationElem_1.attr('data-px')).replace('px', ''));
                let stationY_1 = Number(String(stationElem_1.attr('data-py')).replace('px', ''));

                // Get Line Type vertical(| Z), horizontal(- Y), Depth(/ X)
                // let getLineType = await lineTypeGenerator(stationX_1, stationY_1);

                let getLineType = 'v';

                const mapHeight = $(".focus-journey-wrap").height();
                const mapWidth = $(".focus-journey-wrap").width();

                // Vertical Line (Z)
                if(getLineType === 'v')
                {
                    // บวก, ลบ เพื่อเพิ่มสมดุลให้กับการ clip หรือ crop image
                    const balance_top = 1;
                    // const balance_top = 3;
                    const balance_right = 18;
                    const balance_bottom = 18;
                    const balance_left = 0;

                    // const top = arr_position_clip_y[0]-balance_top;
                    // const right = (mapWidth - arr_position_clip_x[0]) - balance_right;
                    // const bottom = (mapHeight - arr_position_clip_y[1]) - balance_bottom;
                    // const left = arr_position_clip_x[0]-balance_left;
                    
                    const top = stationY_1 + balance_top;
                    const right = (mapWidth - stationX_1) - balance_right;
                    const bottom = (mapHeight - stationY_1) - balance_bottom;
                    const left = stationX_1 - balance_left;

    
                    props.top = `${top}px`;
                    props.right = `${right}px`;
                    props.bottom = `${bottom}px`;
                    props.left = `${left}px`;
                    props.station_code = !!stationCode_2 ? `${stationCode_1}|${stationCode_2}` : null;
                    routeList.push(props);
                }
                // Horizontal Line (Y)
                if(getLineType === 'h')
                {
                    // บวก, ลบ เพื่อเพิ่มสมดุลให้กับการ clip หรือ crop image
                    const balance_top = 3;
                    const balance_right = 23;
                    const balance_bottom = 22;
                    const balance_left = 3;

                    const top = arr_position_clip_y[0] - balance_top;
                    const right = (mapWidth - arr_position_clip_x[1]) - balance_right;
                    const bottom = (mapHeight - arr_position_clip_y[1]) - balance_bottom;
                    const left = arr_position_clip_x[0]-balance_left;
    
                    props.top = `${top}px`;
                    props.right = `${right}px`;
                    props.bottom = `${bottom}px`;
                    props.left = `${left}px`;
                    routeList.push(props);
                }
                // Depth Line (X)
                if(getLineType === 'x')
                {
                    // บวก, ลบ เพื่อเพิ่มสมดุลให้กับการ clip หรือ crop image
                    const balance_top = 3;
                    const balance_right = 23;
                    const balance_bottom = 22;
                    const balance_left = 4;

                    const top = arr_position_clip_y[0]-balance_top;
                    const right = (mapWidth - arr_position_clip_x[0]) - balance_right;
                    const bottom = (mapHeight - arr_position_clip_y[1]) - balance_bottom;
                    const left = arr_position_clip_x[0]-balance_left;
    
                    props.top = `${top}px`;
                    props.right = `${right}px`;
                    props.bottom = `${bottom}px`;
                    props.left = `${left}px`;
                    routeList.push(props);                    
                }

                // if laste loop
                if(Number(i) === journeyRoutes.length-1)
                {
                    resolve(routeList);
                }
            }
        })
    }
    async function lineTypeGenerator(x, y) {
        // เพื่อเช็คว่าไลน์ที่จะ clip path เป็น vertical, horizontal
        const top = y[0];
        const right = x[1];
        const bottom = y[1];
        const left = x[0];
        // angle
        const verticalDistance = bottom - top; // Z
        const horizontalDistance = right - left; // Y

        if(verticalDistance > horizontalDistance)
        {
            if(horizontalDistance !== 0)  // มันเลี้ยว 
            {
                return 'x'
            }else
            {
                return 'v'; // V, H (vertical, horizontal)
            }
        }
        if(horizontalDistance > verticalDistance)
        {
            if(verticalDistance !== 0)  // มันเลี้ยว 
            {
                return 'x'
            }else
            {
                return 'h';
            }
        }
    }
    function handlerFocusStationByStation(journeyRoutesLists) {
        return new Promise(async resolve => {

            for(var i in journeyRoutesLists) 
            {
                // focus stations
                const top = journeyRoutesLists[i].top;
                const right = journeyRoutesLists[i].right;
                const bottom = journeyRoutesLists[i].bottom;
                const left = journeyRoutesLists[i].left;
                const clipPosition = `inset(${top} ${right} ${bottom} ${left} round 10%)`;
                $($('.focus-journey-wrap')[i]).css({"clip-path": `${clipPosition}`});

                // focus lines
                let stationsCode = journeyRoutesLists[i].station_code;
                if(!!stationsCode)
                {
                    let stcode_1 = String(stationsCode).split("|")[0].toLowerCase();
                    let stcode_2 = String(stationsCode).split("|")[1].toLowerCase();

                    let matchLine = await checkMatchLineJourney(stcode_1, stcode_2); 

                    switch(matchLine)
                    {
                        case 1:
                            $(`div[data-linecode1="${stcode_1}"][data-linecode2="${stcode_2}"]`).addClass("active");
                            $(`div[data-linecode1="${stcode_1}"][data-linecode2="${stcode_2}"]`).fadeIn();
                        ;
                        case 2:
                            $(`div[data-linecode1="${stcode_2}"][data-linecode2="${stcode_1}"]`).addClass("active");
                            $(`div[data-linecode1="${stcode_2}"][data-linecode2="${stcode_1}"]`).fadeIn();
                        ;
                    }
                    // update status focus journey 
                    FOCUS_JOURNEY_STATUS = true;
                }
            }

            resolve();
        })
    }
    function cloneFocusElem(length) {
        return new Promise(async resolve => {
            let i = 1;
            while(i < length) {
                let html = `<div class="focus-journey-wrap"><img src="/assets/images/yellow-map.jpg" alt="bts the skytrain map" width="1380" height="1380" class="focus-journey" /></div>`;
                $('.map-wrap').append(html); // โคลนเพื่อที่จะได้ clip path (focus) station by station ได้
                i++;
            }
            // last loop, then end
            if(i === length)
            {
                resolve();
            }
        })
    }
    function checkMatchLineJourney(stcode_1, stcode_2) {
        return new Promise(async resolve => {
            if($(`div[data-linecode1="${stcode_1}"]`).length > 0 && $(`div[data-linecode2="${stcode_2}"]`).length > 0)
            {
                resolve(1); // case 1
            } else if ($(`div[data-linecode1="${stcode_2}"]`).length > 0 && $(`div[data-linecode2="${stcode_1}"]`).length > 0)
            {
                resolve(2); // case 2
            }else
            {
                resolve(false); // failed case
            }
        })
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Get Journey Details
    function getJourneyDetails() {
        return new Promise(async resolve => {
            // turn on content loading
            $('#content-loader').removeClass('inactive');
            $('#content-loader').fadeIn();

            let reqData = {
                "Origin": Number(CUR_ORIGIN_STATION_ID_SELECTED),
                "Destination": Number(CUR_DESTINATION_STATION_ID_SELECTED),
                "Origin_Location": Number(CUR_ORIGIN_AREAMAP_ID_SELECTED),
                "Destination_Location": Number(CUR_DESTINATION_AREAMAP_ID_SELECTED)
            };

            console.log(reqData);

            ACTION_API.getJourneyDetails(reqData)
            .then(res => {
                if(res.ErrMessage === 'Success')
                {
                    // turn off content loading
                    $('#content-loader').fadeOut(); 
                    
                    resolve(res.data);
                }
            })
        })
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Pin Station
    function handlerPinStation(type_selected) {
        return new Promise(async resolve => {
            // current location(x, y) of the selected station
            const station_selected = $(`#station-pointer[station-key=${STATION_KEY_SELECTED}]`);
            const station_raw_x = Number(String(station_selected.attr('data-px')).replace('px', ''));
            const station_raw_y = Number(String(station_selected.attr('data-py')).replace('px', ''));
            // balance เพื่อให้ pin ได้ตรงและสมดุล
            const balance_x = 1;
            const balance_y = 9; // minus
            const balance_x_origin = 1;
            const balance_y_origin = 1;
            // calculate position
            const station_x = station_raw_x;
            const station_y = station_raw_y - balance_y;
            const station_x_origin = station_raw_x - balance_x_origin;
            const station_y_origin = station_raw_y;
            
            if(type_selected === '#searchst-origin')
            {
                let oldPin = $('#map-pin-org.active').length;
                if(oldPin > 0)
                {
                    $('#map-pin-org').removeClass('active');
                    $('#map-pin-org').addClass('inactive');
                    await handleCallbackAnimate(200, () => $('#map-pin-org').removeClass('inactive'));
                    $('#map-pin-org').addClass('active');
                    $('#map-pin-org').css({"top": `${station_y_origin}px`, "left": `${station_x_origin}px`});
                }else
                {
                    $('#map-pin-org').addClass('active');
                    $('#map-pin-org').css({"top": `${station_y_origin}px`, "left": `${station_x_origin}px`});
                }
            }
            if(type_selected === '#searchst-destination')
            {
                let oldPin = $('#map-pin-dest.active').length;
                if(oldPin > 0)
                {
                    $('#map-pin-dest').removeClass('active');
                    $('#map-pin-dest').addClass('inactive');
                    await handleCallbackAnimate(200, () => $('#map-pin-dest').removeClass('inactive'));
                    $('#map-pin-dest').addClass('active');
                    $('#map-pin-dest').css({"top": `${station_y}px`, "left": `${station_x}px`});
                }else
                {
                    $('#map-pin-dest').addClass('active');
                    $('#map-pin-dest').css({"top": `${station_y}px`, "left": `${station_x}px`});
                }
            }
            resolve();
        })
    }

    function handleCallbackAnimate(time, callback) {
        return new Promise(async resolve => {
            setTimeout(() => {
                callback();
                resolve();
            }, time)
        })
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Zoom Button
    $('#zoom-in').click(() => {
        let modelZoomLevel = ZOOM_LEVEL + STEP_ZOOM_LEVEL;
        
        if(modelZoomLevel <= MAXIMUM_ZOOM_LEVEL)
        {
            let currentZoom = ZOOM_LEVEL + STEP_ZOOM_LEVEL;
            $('.map-wrap').css({"transform": `scale(${currentZoom}%)`})
            ZOOM_LEVEL = currentZoom;
        }
    })
    $('#zoom-out').click(() => {
        let modelZoomLevel = ZOOM_LEVEL - STEP_ZOOM_LEVEL;
        if(modelZoomLevel >= MINIMUM_ZOOM_LEVEL)
        {
            let currentZoom = ZOOM_LEVEL - STEP_ZOOM_LEVEL;
            $('.map-wrap').css({"transform": `scale(${currentZoom}%)`})
            ZOOM_LEVEL = currentZoom;
        }else
        {
            $('.map-wrap').css({"transform": `scale(${MINIMUM_ZOOM_LEVEL}%)`})
            ZOOM_LEVEL = MINIMUM_ZOOM_LEVEL;
            moveMapPosition();
        }
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Search Station
    // - input origin
    $('#searchst-origin').on('input', async function(e){
        let value = e.target.value;
        console.log(value);
        handleInputSearchStationChange(value);
    })
    $('input[id=searchst-origin]').on('focus', async() => {
        CURRENT_DD_SEARCH_TYPE = 'origin';
        suggestStationInit();
    })
    $('body').click(async(e) => { // close origin line suggestion
        let id = e.target.id === "" ? e.target.className : e.target.id;

        if(
            id !== 'input-searchorigin-elem'
            && 
            id !== 'input-searchdest-elem'
            && 
            id !== 'islineselected'
            && 
            id !== 'searchst-origin'
            && 
            id !== 'searchst-destination'
            && 
            id !== 'right'
        ) // เช็ึคเพื่อให้รู้ว่าควรปิด dropdown line selection ไหม
        {
            await handlerSuggestStationList(false);
        }
    })

    // - input destination
    $('#searchst-destination').on('input', async function(e){
        let value = e.target.value;
        console.log(value);
        handleInputSearchStationChange(value);
    })
    $('input[id=searchst-destination]').on('focus', () => {
        CURRENT_DD_SEARCH_TYPE = 'destination';
        suggestStationInit();
    })

    async function handleInputSearchStationChange(value)
    {
        let lengthValue = value.length;

        if(lengthValue > 0)
        {
            // check old loading
            let heightOldLoadingElem = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] .loading`).length; 
            if(heightOldLoadingElem === 0) // เช็คเพื่ิอจะได้ไม่ต้อง active ซ้ำ
            {
                await handlerSuggestStationList(true, 'loading'); // active loading
            }

            if(lengthValue >= 3) // start searching
            {
                handlerSearchStation(value);
            }
        }
        if(lengthValue === 0)
        {
            // await changeHeightDropdownStationLists(0);
            await handlerSuggestStationList(true, true);
        }
    }

    async function handlerSearchStation(txtSearch)
    {
        let data = await getSearchLocation(txtSearch);
        let stations = data.stations;
        let area = data.area;
        await dropdownStationListInit(stations, area);
    }

    function dropdownStationListInit(stations, area)
    {
        return new Promise(async resolve => {
            // remove old element
            $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > li, .suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists`).remove();

            if(stations.length > 0)
            {
                stations.map(async(item, i) => {
                    let station_name = `${item.StationName_TH} | ${item.StationName_EN}`;
                    let station_key = String(item.StationKey).toLowerCase();
                    let html = `<li id="ddsearch-station-item" data-stkey="${item.StationKey}"><div class="iconst" style="border: 2px solid ${item.LineColor};">${item.StationKey}</div><p class="st-name">${station_name}</p></li>`;
                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).append(html);      
    
                    // add event
                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] #ddsearch-station-item[data-stkey="${item.StationKey}"]`)
                    .click(() => handlerStationSelected('station', item.StationID, station_key, station_name))
                    if(i === stations.length-1) // last loop
                    {
                        await heightInit();
                        renderArea();
                    }
                })
            }else
            {
                renderArea();
            }

            
            function renderArea()
            {
                if(area.length > 0)
                {
                    area.map(async(item, i) => {
                        let location_name = `${item.LocationName_TH} | ${item.LocationName_EN}`;
                        let station_id = item.StationId;
                        let station_key = String(item.StationKey).toLowerCase();
                        let area_map_id = item.AreaMapId;
                        let latitude = item.Latitude;
                        let longtitude = item.Longitude;
                        let symbol_img = item.SymbolImage;
                        let symbol_name = item.SymbolName;
    
                        let html = `<li id="ddsearch-station-item" data-stkey="${station_key}"><img style="width: 100%;" src="${symbol_img}" alt="the skytrain search station and location" /><p class="st-name">${location_name}</p></li>`;
                        $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).append(html);      
    
                        // add event
                        $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] #ddsearch-station-item[data-stkey="${station_key}"]`)
                        .click(() => handlerStationSelected('area', station_id, station_key, location_name, area_map_id))
                        
                        if(i === area.length-1) // last loop
                        {
                            await heightInit()
                            resolve();
                        }
                    })
                }else
                {
                    resolve();
                }
            }
            function heightInit()
            {
                return new Promise(async resolve => {
                    let heightElem = 0; // default 8 = padding
                    let parentElem = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`); 

                    parentElem.css({overflow: 'auto'});

                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] li`).each(function(index, elem) {
                        var innerHeight = $(elem).innerHeight();
                        heightElem += innerHeight; 
                    });
                    
                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).css({height: heightElem});
                    resolve();
                })
            }
        })
    }

    function getSearchLocation(txtSearch)
    {
        return new Promise(async resolve => {
            let reqData = {
                "TextSearch": txtSearch
            };
            ACTION_API.searchLocation(reqData)
            .then(async res => {
                if(res.IsSuccess === true)
                {
                    let stations = res.data.Location_Station;
                    let area = res.data.Location_Area;
                    let data = {stations, area}
                    if(stations.length > 0 || area.length > 0)
                    {
                        resolve(data);
                    }
                }else
                {
                    await handlerSuggestStationList(true, false);
                }
            })
        })
    }

    function changeHeightDropdownStationLists(height)
    {
        return new Promise(async resolve => {
            $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"`).css({height: `${height}px`})
            resolve();
        })
    }

    function handlerSuggestStationList(isActive, suggStatus) // isActive = show & hide station lists | // suggStatus = แนะนำสถานีปกติ หรือ api error
    {
        return new Promise(async resolve => {
            // remove old element
            $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > li, .suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists`).remove();

            if(isActive === true && suggStatus === false)
            {
                let html = `<li class="failed">${LANGUAGE==='th'?'ไม่สามารถใช้งานได้ในขณะนี้' : 'Currently not available'}</li>`;
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).append(html)
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).css({height: '36px'})
                resolve();
            }
            if(isActive === true && suggStatus === true)
            {
                await stationListInit();
            }
            if(isActive === false)
            {
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).css({height: '0px'});
                setTimeout(() => {
                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] li`).remove();
                }, 100) // time ขึ้นอยู้กับ duration time ของ animate เท่าไหร่ ให้ใส่เท่ากันจะได้ทำงานต่อกันได้อย่าง smooth
                resolve();
            }
            if(isActive === true && suggStatus === 'loading')
            {
                let html = `<li class="loading"><div></div></li>`;
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).append(html)
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).css({height: '36px'})
                resolve();
            }
        })
    }

    async function suggestStationInit()
    {
        // เช็คว่า focus ครั้งแรกไหม ถ้าครั้งแรกให้แนะนำ line station แต่ถ้าไม่ใช่และมีคำค้นหาอยู่แล้วให้ค้นหาต่อ (search station!)
        let lengthInputValue = CURRENT_DD_SEARCH_TYPE === 'origin' ? $('#searchst-origin').val().length : $('#searchst-destination').val().length;
        let inputValue = CURRENT_DD_SEARCH_TYPE === 'origin' ? $('#searchst-origin').val() : $('#searchst-destination').val();
        console.log(inputValue);
        if(lengthInputValue > 0) // searching (station, location)
        {
            await checkOppositeDDsearchStation();
            handleInputSearchStationChange(inputValue);
        }else // suggest stations
        {
            if(STATION_LISTS === null)
            {
                await checkOppositeDDsearchStation();
                await handlerSuggestStationList(true, 'loading');
    
                ACTION_API.getStationLists()
                .then(async res => {
                    if(res.IsSuccess === true)
                    {
                        STATION_LISTS = res.data;
                        await handlerSuggestStationList(true, true);
                    }
                })
            }else // already get station lists
            {
                await checkOppositeDDsearchStation();
                await handlerSuggestStationList(true, 'loading');
                await handlerSuggestStationList(true, true);
            }
        }
    }

    function checkOppositeDDsearchStation() 
    {
        // เช็คว่า Dropdown ตัวอื่นเปิดอยู่ไหม
        return new Promise(async resolve => {
            let heightLineListElem = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).height();
            if(heightLineListElem === 0) 
            {
                let oppositeDDsearch = CURRENT_DD_SEARCH_TYPE === 'origin' ? 'destination' : 'origin';
                let heightOppositeLineListElem = $(`.suggest-station-lists[data-type="${oppositeDDsearch}"]`).height();
                if(heightOppositeLineListElem === 0) // เช็คว่า dropdown อีกตัวเปิดอยู่ก่อนแล้วไหม
                {
                    resolve();
                }else // เปิดอยู่ (active)
                {
                   // ปิดมันก่อน 
                   $(`.suggest-station-lists[data-type="${oppositeDDsearch}"]`).css({height: '0px'})
                   resolve();
                }
            }
        })
    }

    function stationListInit()
    {
        return new Promise(async resolve => {
            STATION_LISTS.map(async(item, i) => {
                let html = await stationListHTMLGenerator(item);
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).append(html);      
                
                if(i === STATION_LISTS.length-1) // last loop
                {
                    let height = DD_LINE_STATION_HEIGHT * STATION_LISTS.length; // คำนวณหา height of .suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]
                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`).css({height: height}) 
                    resolve();
                }

                // add event
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .line[data-line-id="${item.LineId}"]`).click(() => handleLineSelected(item.LineId))
            })
        })    
    }

    function stationListHTMLGenerator(item)
    {
        return new Promise(async resolve => {
            let html = `<li class="line" id="islineselected" style="height: ${DD_LINE_STATION_HEIGHT}px;" data-line-id="${item.LineId}">`;
            html += `<div id="islineselected">`;
                html += `<div class="left">`;
                    html += `<div id="islineselected">`;
                        html += `<div class="pole" id="islineselected" style="background-color: ${item.LineColor};"></div>`;
                        html += `<div id="islineselected"><p id="islineselected">${item.LineName_TH}</p><p id="islineselected">${item.LineName_EN}</p></div>`;
                    html += `</div>`;
                html += `</div>`;
                html += `<div class="right"><img id="islineselected" src="/assets/images/icons/arrow-down.png" alt="the skytrain select station icon arrow down" /></div>`;
            html += `</div>`
            html += `</li>`;
            html += `<ul class="station-lists" data-id="${item.LineId}" id="islineselected"></ul>`
            resolve(html);
        })
    }

    // Line Selection (append station list)
    async function handleLineSelected(lineID) {
        let lengthOldElem = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists[data-id="${lineID}"] li`).length;
        let suggestStationMoreHeight = 0;

        if(lengthOldElem > 0) // เช็คว่าอันที่เลือกได้เปิดอยู่แล้วไหม
        {
            let heightStationLists = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists[data-id="${lineID}"]`).height();
            if(heightStationLists > 0) // เปิดอยู่แล้ว ต้องปิด (inactive)
            {
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists[data-id="${lineID}"]`).css({height: '0px'}); // ปิด list
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .line[data-line-id="${lineID}"] .right img`).css({transform: 'rotate(0deg)'}) // หมุน arrow icon

                let parentElem = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`);
                let stationListLength = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > li`).length;
                let stationListHeight = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > li`).innerHeight();
                let height = stationListHeight * stationListLength;

                parentElem.css({height: height, overflow: 'auto'});
                await suggScrollTop('inactive')

            }else // ยังไม่ได้เปิด ต้องเปิด (active)
            {
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists[data-id="${lineID}"]`).css({height: DD_STATION_LIST_HEIGHT});  
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .line[data-line-id="${lineID}"] .right img`).css({transform: 'rotate(180deg)'}) // หมุน arrow icon

                let parentElem = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`);
                let parentHeight = parentElem.innerHeight();
                let height = parentHeight + suggestStationMoreHeight;

                parentElem.css({height: height, overflow: 'hidden'});
                await suggScrollTop()
            }
        }else // เปิดครั้งแรก (ต้อง append) (active)
        {
            let stationsSelected = STATION_LISTS.filter(item => item.LineId === lineID).map(item => item.StationList)[0];
            stationsSelected.map(async (item, i) => {
                let station_name = item.StationName;
                let station_key = String(item.StationKey).toLowerCase();
                let html = `<li id="dd-station-item" data-stkey="${item.StationKey}">`;
                    html += `<div class="iconst" style="border: 2px solid ${item.StationLineColor};">${item.StationKey}</div>`;
                    html += `<p class="st-name">${item.StationName}</p>`;
                html += `</li>`;
    
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists[data-id="${lineID}"]`).append(html);
    
                // add event
                $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] #dd-station-item[data-stkey="${item.StationKey}"]`)
                .click(() => handlerStationSelected('station', item.StationId, station_key, station_name))

                if(i === stationsSelected.length-1) // last loop
                {
                    // let height = DD_STATION_HEIGHT * stationsSelected.length; // คำนวณหา height of .suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]
                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .station-lists[data-id="${lineID}"]`).css({height: DD_STATION_LIST_HEIGHT}) 
                    $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] > .line[data-line-id="${lineID}"] .right img`).css({transform: 'rotate(180deg)'}) // หมุน arrow icon

                    let parentElem = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`);
                    let parentHeight = parentElem.innerHeight();
                    let height = parentHeight + suggestStationMoreHeight;

                    parentElem.css({height: height, overflow: 'hidden'});
                    await suggScrollTop()
                }
            }) 
        }

        async function suggScrollTop(status)
        {
            if(status === 'inactive')
            {
                await scrollToTop(status);
            }else
            {
                let lineWrap = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`);
                let lineWrapHeight = lineWrap.innerHeight();
    
                let lineSelected = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] #islineselected[data-line-id="${lineID}"]`);            
                let lineSelectedHeight = lineSelected.innerHeight();
    
                let lineListHeight = lineWrapHeight - lineSelectedHeight;
                let lineListWrap = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] ul.station-lists[data-id="${lineID}"]`);
    
                await reHeightLineList(lineListWrap, lineListHeight);
                await scrollToTop();
            }
        }
        
        function reHeightLineList(lineListWrap, lineListHeight)
        {
            return new Promise(async resolve => {
                // clear all
                let stationListWrap = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] ul.station-lists`); 
                stationListWrap.each((index, elem) => {
                    let item = $(elem);                    
                    item.css({height: 0})

                    // Add new height
                    if(Number(index === stationListWrap.length-1))
                    {
                        lineListWrap.css({height: lineListHeight})
                    }
                })

                resolve();
            })
        }
        function scrollToTop(status)
        {
            return new Promise(async resolve => {
                setTimeout(() => {
                    if(status === 'inactive')
                    {
                        let lineWrap = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`);
                        lineWrap.animate({ scrollTop: 0 }, 80);
                    }else
                    {
                        let lineWrap = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"]`);
                        let lineSelected = $(`.suggest-station-lists[data-type="${CURRENT_DD_SEARCH_TYPE}"] #islineselected[data-line-id="${lineID}"]`);
                        let lineSelectedTop = lineSelected.position().top;
                        lineWrap.animate({ scrollTop: lineSelectedTop }, 80);
                    }
                }, 130)
                resolve();
            })
        }

    }

    async function handlerStationSelected(typesearch, station_id, station_key, station_name, area_map_id)
    {
        if(checkDuplicateStationSelect(station_id)) // เช็คว่าที่เลือกซ้ำกันไหม
        {
            await handleAlertInputSearch();
        }else
        {
            // remove station dialog
            removeStationDialog();
            let type = CURRENT_DD_SEARCH_TYPE === 'origin' ? '#searchst-origin' : '#searchst-destination';

            if(typesearch === 'station')
            {
                console.log('station');
                // set station key & constant variable for function active pin
                let station_x = Number(String($(`#station-pointer[station-key="${station_key}"]`).attr('data-px')).replace('px', ''));
                let station_y = Number(String($(`#station-pointer[station-key="${station_key}"]`).attr('data-py')).replace('px', ''));
    
                STATION_KEY_SELECTED = String(station_key).toLowerCase();
                CUR_STATION_ID_SELECTED = station_id;
                STATION_NAME_SELECTED = station_name;
                console.log();
                if(CURRENT_DD_SEARCH_TYPE === 'origin')
                {
                    CUR_STATION_SELECTED_X = station_x;
                    CUR_STATION_SELECTED_Y = station_y;
                    CUR_ORIGIN_TYPE_SELECTED = typesearch;
                }else
                {
                    CUR_STATION_SELECTED_X = station_x;
                    CUR_STATION_SELECTED_Y = station_y;
                    CUR_DESTINATION_TYPE_SELECTED = typesearch;
                }
        
                // handler select station point
                handlerSelectStationPoint(type);
            }
            if(typesearch === 'area')
            {
                console.log('area');
                // set station key & constant variable for function active pin
                let station_x = Number(String($(`#station-pointer[station-key="${station_key}"]`).attr('data-px')).replace('px', ''));
                let station_y = Number(String($(`#station-pointer[station-key="${station_key}"]`).attr('data-py')).replace('px', ''));
    
                STATION_KEY_SELECTED = String(station_key).toLowerCase();
                CUR_STATION_ID_SELECTED = station_id;
                STATION_NAME_SELECTED = station_name;
                if(CURRENT_DD_SEARCH_TYPE === 'origin')
                {
                    CUR_STATION_SELECTED_X = station_x;
                    CUR_STATION_SELECTED_Y = station_y;
                    CUR_ORIGIN_AREAMAP_ID_SELECTED = area_map_id;
                    CUR_ORIGIN_TYPE_SELECTED = typesearch;
                }else
                {
                    CUR_STATION_SELECTED_X = station_x;
                    CUR_STATION_SELECTED_Y = station_y;
                    CUR_DESTINATION_AREAMAP_ID_SELECTED = area_map_id;
                    CUR_DESTINATION_TYPE_SELECTED = typesearch;
                }
        
                // handler select station point
                handlerSelectStationPoint(type);
            }
        }
    }

    function checkDuplicateStationSelect(station_id)
    {
        if(String(CUR_STATION_ID_SELECTED) === String(station_id) || String(CUR_ORIGIN_STATION_ID_SELECTED) === String(station_id) || String(CUR_DESTINATION_STATION_ID_SELECTED) === String(station_id))
        {
            return true;
        }else
        {
            return false;
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Alerts
    function handleAlertInputSearch()
    {
        return new Promise(async resolve => {
            if(CUR_ORIGIN_NAME_SELECTED === "")
            {
                $(`input[name="searchst-origin"]`).addClass('failed');
                setTimeout(() => {
                    $(`input[name="searchst-origin"]`).removeClass('failed');
                    resolve();
                }, 1000);
            }
            if(CUR_DESTINATION_NAME_SELECTED === "")
            {
                $(`input[name="searchst-destination"]`).addClass('failed');
                setTimeout(() => {
                    $(`input[name="searchst-destination"]`).removeClass('failed');
                    resolve();
                }, 1000);
            }
        })
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Button Swap Station
    $('.switch-search-station-wrap img[data-flag="active"]').click(() => handleSwapStation())

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Submit Journey Button
    $('#btn-submitjourney').click(() => handleCheckStationSelected())

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Button Slide Plan Journey Detail
    $('.plan-journey-con .btn-slide-content').click(async() => {
        let status = $('.plan-journey-con .btn-slide-content').attr('data-status');
        if(status === 'active')
        {
            await handlePlanJourneyStatus('hide');
        }else
        {
            await handlePlanJourneyStatus('unhide');
        }
    })
    $('.sugg-journey-con .btn-slide-suggjourney').click(async() => {
        let status = $('.sugg-journey-con .btn-slide-suggjourney').attr('data-status');
        if(status === 'active')
        {
            await handleSuggestJourneyDetailDialog('hide');
        }else
        {
            await handleSuggestJourneyDetailDialog('unhide');
        }
    })

    // Init Map Preview
    async function mapPreviewInit()
    {
        await getLanguage();
        await displayNoneInit();
        await loadComponent();
        await positionWindowSearchInit();
        await addEventWindowSearch();
        await resizeMapInit();
        addEventModal();

        await checkCameFromInit(); 

        // Close Loader
        $('.loader').fadeOut();
    }

    function checkCameFromInit()
    {
        return new Promise(async resolve => {
            let params = await urlParam('id');

            if(!!params)
            {
                let decryptedParam = DecryptedOBJ(decodeURIComponent(params));
        
                let originData = await getFirstTrainLastTrain(decryptedParam.origin);
                let destData = await getFirstTrainLastTrain(decryptedParam.dest);
        
                let typesearch = 'station';
                let origin_station_id = originData.StationId;
                let origin_station_key = originData.StationCode;
                let origin_station_name = `${originData.StationNameTH} | ${originData.StationNameEN}`;
    
                CURRENT_DD_SEARCH_TYPE = 'origin';
                CUR_ORIGIN_NAME_SELECTED = origin_station_name;
    
                handlerStationSelected(typesearch, origin_station_id, origin_station_key, origin_station_name)
    
                let dest_station_id = destData.StationId;
                let dest_station_key = destData.StationCode;
                let dest_station_name = `${destData.StationNameTH} | ${destData.StationNameEN}`;
    
                CURRENT_DD_SEARCH_TYPE = 'destination'
                CUR_DESTINATION_NAME_SELECTED = dest_station_name;
    
                await handlerStationSelected(typesearch, dest_station_id, dest_station_key, dest_station_name)
        
                handleCheckStationSelected() 
            }
            resolve();
        })
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


let urlParam = function(name){
    return new Promise(async resolve => {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if(!!results)
        {
            resolve(results[1] || 0);
        }else
        {
            resolve(null);
        }
    })
}

function addEventModal()
{
    let areaMapBtnElem = $('#mdstdt-areamap-button');
    let servicesBtnElem = $('#mdstdt-services-button');

    areaMapBtnElem.click(function() {
        let station_id_enc = encodeURIComponent(EncryptedText(String(CUR_AREAMAP_STATION_ID)));
        let line_id_enc = encodeURIComponent(EncryptedText(String(CUR_AREAMAP_LINE_ID)))

        navigateAreaMap(station_id_enc, line_id_enc);
    })

    servicesBtnElem.click(function() {
        // handleModalFacilities('init', CUR_AREAMAP_STATION_ID);
        let station_id_enc = encodeURIComponent(EncryptedText(String(CUR_AREAMAP_STATION_ID)));
        let line_id_enc = encodeURIComponent(EncryptedText(String(CUR_AREAMAP_LINE_ID)))

        navigateFacilities(station_id_enc, line_id_enc);
    })
}

function navigateFacilities(station_id, line_id)
{
    window.location.href = `/${LANGUAGE}/facilities/?stationid=${station_id}&lineid=${line_id}` 
}
function navigateAreaMap(station_id, line_id)
{
    window.location.href = `/${LANGUAGE}/areamap/?stationid=${station_id}&lineid=${line_id}` 
}

function displayNoneInit()
{
    return new Promise(async resolve => {
        $('.modal-planjourney, .modal-station-detail, .modal-traveltime-detail, .modal-facilities, .modal-traintime-arrival').fadeOut();
        resolve();
    })
}

function loadComponent()
{
    return new Promise(async resolve => {
        // Footer
        $('#footer-yl').load("/components/th/footer/footer-yl.html", () => {
            // Load Header Mobile
            $('#navbar-yl-mb').load("/components/th/headers/navbar.yl-mb.html", () => {
                // Load Header Desktop
                $('#navbar-yl').load("/components/th/headers/navbar-yl.html", async() => {
                    await NAVBAR_ENGIN.onNavbarReady();
                    resolve();
                }); 
            })
        })
    })
}

function addEventWindowSearch()
{
    return new Promise(async resolve => {
        let windowWidth = $(window).width();
        let pathName = window.location.pathname;
        if(
            pathName === `/${LANGUAGE}/routemap/`
            || 
            pathName === `/${LANGUAGE}/routemap`
            || 
            pathName === `/${LANGUAGE}/routemap/index.html`
            ||
            pathName === `/${LANGUAGE}/routemap/index.html/`
        ) {
            if(windowWidth > 1180)
            {
                $(window).on('resize', async() => {
                    let windowWidth = $(window).width();
                    if(windowWidth > 1180)
                    {
                        await positionWindowSearchInit();
                    }else
                    {
                        window.location.href = `/${LANGUAGE}/routemap-mb`;
                    }
                })
            }else
            {
                window.location.href = `/${LANGUAGE}/routemap-mb`;
            }
            
        }
        resolve();
    })
}

function positionWindowSearchInit()
{
    return new Promise(async resolve => {
        let rs_status = await checkResponsiveStatus();
        if(rs_status === 'd')
        {
            let logoPosition = $('#navbar-yl .logo').position();
            let logoLeft = logoPosition.left;
            let searchElem = $('.search-station-con');
            searchElem.css({left: logoLeft});
            resolve();
        }else
        {
            let searchElem = $('.search-station-con');
            searchElem.css({left: 100});
            resolve();
        }
    })
}
function checkResponsiveStatus()
{
    return new Promise(async resolve => {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if(width <= 1180)
        {
            // mobile
            let status = `m`;
            resolve(status);
        }else
        {
            // desktop
            let status = `d`;
            resolve(status);
        }
    })
}

function resizeMapInit()
{
    return new Promise(async resolve => {
        let clientHeight = $(window).height();
        let mapHeight= $('.map-wrap').height();
        let headerHeight = $('header#navbar-yl').innerHeight();
        let footerHeight = $('.passenger-con').innerHeight();
        clientHeight -= (headerHeight + footerHeight); // ไม่ได้อิงจาก footer แล้ว footer ไม่ได้ position fixed
        let scale = (clientHeight / mapHeight) * 100;
        ZOOM_LEVEL = scale;
        MINIMUM_ZOOM_LEVEL = scale;
        
        // set scale
        $('.map-wrap').css({"transform": `scale(${scale}%)`})  
        // set map container (เพื่อการแสดงผล map & footer จพได้พอดีกัน)
        let mapPreviewWrap = $('.map_preview-wrap, .maprvw-bgovl')
        let windowHeight = $(window).height();
        let mapPreviewWrapHeight = windowHeight - footerHeight;
        mapPreviewWrap.css({height: mapPreviewWrapHeight})

        setTimeout(() => { // รอปรับ scale เสร็จ โทษนะที่ต้องใช้ setTimeout พอดี jquery css method ไม่มี event callback ให้ใช้
            let mapOffset = $('.focus-journey-wrap').offset();

            let mapPosition = mapOffset.top - headerHeight;
            MAP_POSITION = mapPosition;

            $('#map_preview').css({"top": `-${mapPosition}px`}) 
    
            resolve();
        }, 500)
    })
}

async function handleModalFacilities(status, station_id)
{
    let parentElem = $('.modal-facilities');
    if(status === 'init') 
    {
        let services = await getStatoinFacilities(station_id);
        await renderStationFacilities(services);

        parentElem.fadeIn();
    }
    if(status === 'inactive')
    {
        parentElem.fadeOut();
    }
}
async function handleModalTTAwithPlatform(status, reqData)
{
    let parentElem = $('.modal-traintime-arrival');
    let mainContentElem = $('.modal-traintime-arrival #main-content');
    let modalRemove = $('.modal-station-detail');

    if(status === 'init') 
    {
        let trainTimeData = await ACTION_API.getTTAwithPlatform(reqData);
        if(trainTimeData.IsSuccess === true)
        {
            await renderTTAwithPlatform(trainTimeData.data);
            addEventTTAwithPlatform(reqData);
            modalRemove.hide();
            parentElem.fadeIn();

            INTERVAL_TTA = setInterval(async() => {
                mainContentElem.fadeOut(); 
                let trainTimeData_2 = await ACTION_API.getTTAwithPlatform(reqData);
                if(trainTimeData_2.IsSuccess === true)
                {
                    setTimeout(async() => {
                        await renderTTAwithPlatform(trainTimeData_2.data);
                        addEventTTAwithPlatform(reqData);
                        modalRemove.hide();
                        mainContentElem.fadeIn();
                    }, 100)
                }
            }, INTERVAL_TTA_TIME)
        }
    }
    if(status === 'inactive')
    {
        parentElem.fadeOut();
    }
}
async function handleModalTTA(status, reqData) // came form pin map
{
    let parentElem = $('.modal-traintime-arrival');
    let mainContentElem = $('.modal-traintime-arrival #main-content');
    let modalRemove = $('.modal-station-detail');

    if(status === 'init') 
    {
        let trainTimeData = await ACTION_API.getTTA(reqData);
        if(trainTimeData.IsSuccess === true)
        {
            await renderTTA(trainTimeData.data);
            addEventTTA(reqData);
            modalRemove.hide();
            parentElem.fadeIn();

            INTERVAL_TTA = setInterval(async() => {
                mainContentElem.fadeOut();
                let trainTimeData_2 = await ACTION_API.getTTA(reqData);
                if(trainTimeData_2.IsSuccess === true)
                {
                    setTimeout(async() => {
                        await renderTTA(trainTimeData_2.data);
                        addEventTTA(reqData);
                        modalRemove.hide();
                        mainContentElem.fadeIn();
                    }, 100) 
                }
            }, INTERVAL_TTA_TIME)
        }
    }
    if(status === 'inactive')
    {
        parentElem.fadeOut();
    }
}

function addEventTTA(reqData)
{
    // Add Event
    setTimeout(() => {
        let mainHeadElem = '.modal-traintime-arrival .ttam-mainhead';
        let trainTimeListElem = '.modal-traintime-arrival .ttam-lists-wrap'
        let parentElem = '.modal-traintime-arrival #main-content'
        let arrowIconElem = '.modal-traintime-arrival .ttam-mainhead .right img'

        // let itemIndex = $(mainHeadElem).attr('data-index');
        // let itemElem = $(`${mainHeadElem}[data-index="${itemIndex}"]`)

        // Slide train time arrival & Rotate arrow icon
        $(mainHeadElem).each((i, elem) => {
            let index = Number($(elem).attr('data-index'));
            let status = $(elem).find('.right img').attr('data-status');

            // Add Event
            $(elem).click(async() => {
                if(status === 'active')
                {
                    $(elem).find('.right img').attr('data-status', 'inactive');       
                }else
                {
                    $(elem).find('.right img').attr('data-status', 'active');       
                }
    
                $(`${trainTimeListElem}[data-index="${index}"]`).slideToggle(); 
            })

            // Style Init
            if(Number(i) > 0)
            {
                $(`${trainTimeListElem}[data-index="${index}"]`).slideUp();     
            }
        });

        // Reload train time arrival list
        let iconReloadElem = $('#ttam-list-reload');
        iconReloadElem.click(async function(){
            clearInterval(INTERVAL_TTA);
            $(parentElem).fadeOut();
            setTimeout(async() => {
                await handleModalTTA('init', reqData);
                $(parentElem).fadeIn();
            }, 100)
        }) 

    }, 100)
}
function addEventTTAwithPlatform(reqData)
{
    // Add Event
    setTimeout(() => {
        let mainHeadElem = '.modal-traintime-arrival .ttam-mainhead';
        let trainTimeListElem = '.modal-traintime-arrival .ttam-lists-wrap'
        let parentElem = '.modal-traintime-arrival #main-content'
        let arrowIconElem = '.modal-traintime-arrival .ttam-mainhead .right img'

        // Slide train time arrival & Rotate arrow icon
        $(mainHeadElem).click(function() {
            let elem = $(this);
            let status = $(arrowIconElem).attr('data-status');

            if(status === 'active')
            {
                elem.find('.right img').attr('data-status', 'inactive');       
            }else
            {
                elem.find('.right img').attr('data-status', 'active');       
            }

            $(trainTimeListElem).slideToggle();
        })

        // Reload train time arrival list
        let iconReloadElem = $('#ttam-list-reload');
        iconReloadElem.click(async function(){
            clearInterval(INTERVAL_TTA);
            $(parentElem).fadeOut();
            setTimeout(async() => {
                await handleModalTTAwithPlatform('init', reqData);
                $(parentElem).fadeIn();
            }, 100)
        }) 

    }, 100)
}

function getStatoinFacilities(station_id)
{
    return new Promise(async resolve => {
        let reqData = {
            StationId: station_id 
        }

        ACTION_API.getStationFacility(reqData)
        .then(res => {
            if(res.IsSuccess === true)
            {
                resolve(res.data);
            }
        })
    })
}

function moveMapPosition()
{
    $('#map_preview').css({"transition": `top 0.3s ease-in-out, left 0.3s ease-in-out`}) 
    $('#map_preview').css({"top": `-${MAP_POSITION}px`}) 
    $('#map_preview').css({"left": `0px`}) 
    setTimeout(() => {
        $('#map_preview').css({"transition": `top 0.0s ease-in-out, left 0.0s ease-in-out`})
    }, 300)
}

function getSingleStationIconByStationID(line_id)
{
    return new Promise(async resolve => {
        let src = "";
        switch(line_id) 
        {
            case 1:
                src = "/assets/images/icons/bts-gr.png";
                resolve(src);
            ;
            case 2:
                src = "/assets/images/icons/bts-dg.png";
                resolve(src);
                
            ;
            case 3:
                src = "/assets/images/icons/bts-gld.png";
                resolve(src);
                
            ;
            case 4:
                src = "/assets/images/icons/mrt-yl.png";
                resolve(src);
                
            ;
            case 5:
                src = "/assets/images/icons/mrt-pk.png";
                resolve(src);
                
            ;
        }
    })
}

function renderStationFacilities(services)
{
    return new Promise(async resolve => {
        let html = ``;
        let parentElem = $('.modal-facilities #main-content');

        for(var i in services)
        {
            let item = services[i];
            let image = item.Images;
            let name = LANGUAGE === 'th' ? `${item.TitleTH} | ${item.TitleEN}` : `${item.TitleEN} | ${item.TitleTH}`

            html += `<div class="f-item">`;
                html += `<img src="${image}" alt="ebm รถไฟฟ้ามหานคร สายสีเหลือง services & facility สิ่งอำนวยความสะดวก" />`;
                html += `<p>${name}</p>`;
            html += `</div>`;

            if(Number(i) === services.length-1)
            {
                parentElem.empty();
                parentElem.append(html);
                resolve();
            }
        }
    })
}
function renderTTAwithPlatform(data)
{
    return new Promise(async resolve => {
        let html = ``;
        let parentElem = $('.modal-traintime-arrival #main-content');

        let nameTH = data.StationName_TH;
        let nameEN = data.StationName_EN;
        let stationKey = data.StationKey;
        let lineColor = data.LineColor;
        let time = data.time;

        let platFormList = data.platform_list[0];
        let destName = String(platFormList.DestinationStation).split('|')[0].replace(/g" "/g, "") ;
        let icon = await getSingleStationIconByStationID(platFormList.LineId);

        let trainList = platFormList.train_list;

        html += `<div class="ttam-head">`;
            html += `<div class="left">`; 
                html += `<h3>${nameTH}</h3>`;
                html += `<span>${nameEN}</span>`;
            html += `</div>`; 
            html += `<div class="right">`; 
                html += `<img src="${icon}" atl="ebm รถไฟฟ้ามหานคร สายสีเหลือง services & facility สิ่งอำนวยความสะดวก" />`;
                html += `<div class="symbol" style="border: 3px solid ${lineColor};">${stationKey}</div>`;
            html += `</div>`; 
        html += `</div>`;

        let subRightP = `ไปสถานี ${destName}`;
        let subRightSpan = `Platform ${platFormList.platform} (สถานีปลายทาง ${destName})`;

        html += `<div class="ttam-time"><span>ปลายทางสถานี / Destination</span> <span><img id="ttam-list-reload" src="/assets/images/icons/reload.png" /> ${time}</span></div>`;
        html += `<div class="ttam-main">`;
            html += `<div class="ttam-mainhead">`;
                html += `<div class="left">`;
                    html += `<div class="sub-left">`;
                        html += `<img src="${icon}" />`;
                    html += `</div>`;
                    html += `<div class="sub-right">`;
                        html += `<p>${subRightP}</p>`;
                        html += `<span>${subRightSpan}</sp>`;
                    html += `</div>`;
                html += `</div>`;
                html += `<div class="right">`;
                    html += `<img data-status="active" src="/assets/images/icons/CaretCircleDown.png" />`;
                html += `</div>`;
            html +=`</div>`

            html += `<div class="ttam-lists-wrap">`
                html += `<p class="list-label"><span>ปลายทางสถานี / Destination</span><span>เวลา / Time </span></p>`;
                html += `<div class="ttam-item-wrap">`;
                    for(var i in trainList)
                    {
                        let item = trainList[i];
                        let statusText = "";
                        if(LANGUAGE === 'th')
                        {
                            statusText = item.status === "arriving" ? 'กำลังเข้าสถานี' : item.status === "arrival" ? 'กำลังเข้าสถานี' : `${item.time_come} นาที`;
                        }else
                        {
                            statusText = item.status === "arriving" ? 'Arriving' : item.status === "arrival" ? 'Arrival' : `${item.time_come} min`;
                        }
                        
                        html += `<div class="ttam-item" style="background: ${item.status === 'pending' ? '#F8F8F8' : lineColor}; color: ${item.status === 'pending' ? '#030303' : 'white'};">`;
                            html += `<div class="left">`;
                                html += `<span>${item.station}</span>`;
                            html += `</div>`;
                            html += `<div class="right">`;
                                html += `<span id="ttam-status-text" data-status="${item.status}">${statusText}</span>`;
                            html += `</div>`;
                        html += `</div>`;
                    }
                html += `</div>`;
            html += `</div>`;
        html += `</div>`;        

        // Clear & Append
        parentElem.empty();
        parentElem.append(html);

        resolve();
    })
}

function renderTTA(data)
{
    return new Promise(async resolve => {
        let html = ``;
        let parentElem = $('.modal-traintime-arrival #main-content');

        let nameTH = data.StationName_TH;
        let nameEN = data.StationName_EN;
        let stationKey = data.StationKey;
        let lineColor = data.LineColor;
        let time = data.time;

        let platFormList = data.platform_list;
        let icon = await getSingleStationIconByStationID(platFormList[0].LineId);

        html += `<div class="ttam-head">`;
            html += `<div class="left">`; 
                html += `<h3>${nameTH}</h3>`;
                html += `<span>${nameEN}</span>`;
            html += `</div>`; 
            html += `<div class="right">`; 
                html += `<img src="${icon}" atl="ebm รถไฟฟ้ามหานคร สายสีเหลือง services & facility สิ่งอำนวยความสะดวก" />`;
                html += `<div class="symbol" style="border: 3px solid ${lineColor};">${stationKey}</div>`;
            html += `</div>`; 
        html += `</div>`;

        
        html += `<div class="ttam-time"><span>ปลายทางสถานี / Destination</span> <span><img id="ttam-list-reload" src="/assets/images/icons/reload.png" /> ${time}</span></div>`;

        
        for(let i in platFormList)
        {
            let destName = String(platFormList[i].DestinationStation).split('|')[0].replace(/g" "/g, "") ;
            let icon = await getSingleStationIconByStationID(platFormList[i].LineId);
            let trainList = platFormList[i].train_list;
    
            let subRightP = `ไปสถานี ${destName}`;
            let subRightSpan = `Platform ${platFormList[i].platform} (สถานีปลายทาง ${destName})`;

            html += `<div class="ttam-main" data-index="${i}">`;
                html += `<div class="ttam-mainhead" data-index="${i}">`;
                    html += `<div class="left">`;
                        html += `<div class="sub-left">`;
                            html += `<img src="${icon}" />`;
                        html += `</div>`;
                        html += `<div class="sub-right">`;
                            html += `<p>${subRightP}</p>`;
                            html += `<span>${subRightSpan}</sp>`;
                        html += `</div>`;
                    html += `</div>`;
                    html += `<div class="right">`;
                        html += `<img data-status="active" src="/assets/images/icons/CaretCircleDown.png" />`;
                    html += `</div>`;
                html +=`</div>`
    
                html += `<div class="ttam-lists-wrap" data-index="${i}">`
                    html += `<p class="list-label"><span>ปลายทางสถานี / Destination</span><span>เวลา / Time </span></p>`;
                    html += `<div class="ttam-item-wrap">`;
                        for(var x in trainList)
                        {
                            let item = trainList[x];
                            let statusText = "";
                            if(LANGUAGE === 'th')
                            {
                                statusText = item.status === "arriving" ? 'กำลังเข้าสถานี' : item.status === "arrival" ? 'กำลังเข้าสถานี' : `${item.time_come} นาที`;
                            }else
                            {
                                statusText = item.status === "arriving" ? 'Arriving' : item.status === "arrival" ? 'Arrival' : `${item.time_come} min`;
                            }
                            
                            html += `<div class="ttam-item" style="background: ${item.status === 'pending' ? '#F8F8F8' : lineColor}; color: ${item.status === 'pending' ? '#030303' : 'white'};">`;
                                html += `<div class="left">`;
                                    html += `<span>${item.station}</span>`;
                                html += `</div>`;
                                html += `<div class="right">`;
                                    html += `<span id="ttam-status-text" data-status="${item.status}">${statusText}</span>`;
                                html += `</div>`;
                            html += `</div>`;
                        }
                    html += `</div>`;
                html += `</div>`;
            html += `</div>`;        
        }

        // Clear & Append
        parentElem.empty();
        parentElem.append(html);

        resolve();
    })
}


// Set Language
function getLanguage() {
    return new Promise(async resolve => {
        if(!!localStorage.getItem('LANGUAGE'))
        {
            LANGUAGE = String(localStorage.getItem('LANGUAGE')).toLowerCase();
            resolve();
        }
    })    
}

// next button to page routemap 
$('#goToRouteMap').on('click', async function(){
    console.log('origin -',nextOriID);
    console.log('dest -',nextDestID);

    const routeNextPage = {
        "origin" : nextOriID,
        "dest" : nextDestID
    }
    // let lang = localStorage.getItem("LANGUAGE");

    const encodeUrl = EncryptedOBJ(routeNextPage)

    if(nextOriID != 0 && nextDestID != 0){
        let windowWidth = $(window).width();
        let pathName = window.location.pathname;
        console.log(pathName);
        if(
            pathName === '/'
            || 
            pathName === '/index.html'
            || 
            pathName === '/'
            ||
            pathName === '/en'
            || 
            pathName === '/en/'
        ) {
            if(LANGUAGE === "th"){
                if(windowWidth > 1180)
                {
                    window.location.href = `/${LANGUAGE}/routemap/?id=${encodeURIComponent(encodeUrl)}`
                }else
                {
                    window.location.href = `/${LANGUAGE}/routemap-mb/?id=${encodeURIComponent(encodeUrl)}`;
                }
            }else{
                if(windowWidth > 1180)
                {
                    window.location.href = `/${LANGUAGE}/routemap/?id=${encodeURIComponent(encodeUrl)}`
                }else
                {
                    window.location.href = `/${LANGUAGE}/routemap-mb/?id=${encodeURIComponent(encodeUrl)}`;
                }
            }
                
        }
    }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
