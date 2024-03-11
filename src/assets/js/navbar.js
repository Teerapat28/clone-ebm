// State
const LANGUAGE = !!localStorage.getItem('LANGUAGE') ? String(localStorage.getItem('LANGUAGE')).toLowerCase() : 'th';

export const NAVBAR_ENGIN = {
   onNavbarReady
};

function onNavbarReady()
{
   return new Promise(async resolve => {
      // add event (desktop) เมนูที่จะทำการ slide ให้ใส่ event
      $('.nav-items li[data-index="1"]').hover(() => onHoverItemNavMenus(1), () => outHoverItemNavMenus(1))
      $('.nav-items li[data-index="2"]').hover(() => onHoverItemNavMenus(2), () => outHoverItemNavMenus(2))
      $('.nav-items li[data-index="3"]').hover(() => onHoverItemNavMenus(3), () => outHoverItemNavMenus(3))
      $('.nav-items li[data-index="4"]').hover(() => onHoverItemNavMenus(4), () => outHoverItemNavMenus(4))
      $('.nav-items li[data-index="5"]').hover(() => onHoverItemNavMenus(5), () => outHoverItemNavMenus(5))
      $('.nav-items li[data-index="6"]').hover(() => onHoverItemNavMenus(6), () => outHoverItemNavMenus(6))
      $('.nav-items li[data-index="7"]').hover(() => onHoverItemNavMenus(7), () => outHoverItemNavMenus(7))
      $('.navmenu-detail-wrap').hover(async() => await navMenuSlide(true, 0), async() => await navMenuSlide(false, 0))

      resolve();
   })
}

async function onHoverItemNavMenus(index)
{
   let html = await navMenuDetailGenerator(index);
   await navMenuItemInit(index, html);
   await navMenuSlide(true, index);
}
async function outHoverItemNavMenus(index)
{
   await navMenuSlide(false, index);
}

function navMenuItemInit(index, html)
{
   return new Promise(async resolve => {
      let detailElem = $('.navmenu-item-detail');
      detailElem.empty();
      detailElem.append(html);
      let itemElem = $(`.nav-items li[data-index="${index}"]`); 
      let itemPosition = itemElem.position();
      let left = itemPosition.left;
      detailElem.css({left: left})

      // add event
      let menuItemElem = $('.navmenu-item-detail li');
      menuItemElem.each((e, elem) => {
         $(elem).hover((ev) => hoverSubMenu(ev));
      }) 
      resolve();
   })
}

async function hoverSubMenu(event)
{
   let id = event.target.id;
   let elem = event.target;

   if(!!id)
   {
      if(id === 'more-sub') // menu ที่เลือกมี submenu
      {
         let subIndex = Number($(elem).attr('data-subindex'));
         await subMenuDataInit(subIndex);

         let subMenuWrapElem = $('.navmenu-subitem-detail-wrap');
         let subMenuDetailElem = $('.navmenu-subitem-detail');
         let subMenuConElem = $('nav.nav-under .navmenu-detail-wrap')
         let elemPosition = $(`.navmenu-item-detail li[data-subindex="${subIndex}"]`).offset();
         let menueDetailWidth = $('.navmenu-item-detail').width();
         let gap = 17;
         let left = elemPosition.left + menueDetailWidth - gap;
         subMenuWrapElem.css({left: left});

         subMenuWrapElem.show();

         let heightSubMenuWrap = subMenuConElem.innerHeight();
         let heightSubMenuDetail = subMenuDetailElem.innerHeight();
         
         if(heightSubMenuDetail > heightSubMenuWrap) // เช็คว่า submenu detail มีความสูงมากกว่าตัว wrap ไหม ถ้าใช่ให้เพิ่มขนาดของ menu wrap ไปอีก
         {
            let padding = 25;
            let calHeight = [heightSubMenuDetail, heightSubMenuWrap].sort(function(a, b){return b-a}); // ASC มากไปน้อย
            let height = (calHeight[0] - calHeight[1]) + heightSubMenuWrap + padding;

            $(subMenuConElem).css({height: height})
         }
      }
   }else
   {
      let subMenuConElem = $('nav.nav-under .navmenu-detail-wrap')
      let menueDetailHeight = $('.navmenu-item-detail').innerHeight();

      // clear child
      let subMenuWrapElem = $('.navmenu-subitem-detail-wrap');
      subMenuWrapElem.hide();
      let subMenuElem = $('.navmenu-subitem-detail');
      subMenuElem.empty();
      $(subMenuConElem).css({height: menueDetailHeight})
   }
}

function subMenuDataInit(subIndex)
{
   return new Promise(async resolve => {
      let html = await subMenuHTMLGenerator(subIndex); 
      let subMenuDetailElem = $('.navmenu-subitem-detail');
      subMenuDetailElem.empty();
      subMenuDetailElem.append(html);

      resolve();
   })
}
function subMenuHTMLGenerator(subIndex)
{
   return new Promise(async resolve => {
      let html = ``;
      if(LANGUAGE === 'th')
      {
         switch(subIndex)
         {
            case 1:
               html += `<li><a href="/th/ticket-rabbit-trips/">ข้อมูลการซื้อบัตรโดยสาร/การเติมเที่ยว</a></li>`;
               html += `<li><a href="/th/ticket-rabbit-guide/">วิธีใช้บัตรผ่านประตูอัตโนมัติ</a></li>`;
               resolve(html)
               break;
            ;
            case 2:
               html += `<li><a href="/pdpa/cus/customerpolicy.html">สำหรับลูกค้า</a></li>`;
               // html += `<li><a href="/pdpa/lost/LostAndFoundPolicy.html">สําหรับระบบ Lost & Found</a></li>`;
               // html += `<li><a href="/pdpa/hr/HRpolicy.html">สำหรับฝ่ายทรัพยากรบุคคล</a></li>`;
               // html += `<li><a href="/pdpa/cctv/cctvpolicy.html">สำหรับการใช้กล้องโทรทัศน์วงจรปิด</a></li>`;
               // html += `<li><a href="/pdpa/businesspartner/BusinessPartnerPrivacyPolicy.html">สำหรับพันธมิตรทางธุรกิจ</a></li>`;
               // html += `<li><a href="/pdpa/shareholders/Shareholderspolicy.html">สำหรับการประชุมผู้ถือหุ้น</a></li>`;
               // html += `<li><a href="/pdpa/director/DirectorPolicy.html">สำหรับกรรมการ</a></li>`;
               // html += `<li><a href="/pdpa/reception/ReceptionAreaPolicy.html">สำหรับจุดรับรองผู้มาติดต่อ</a></li>`;
               html += `<li><a href="/pdpa/cookies/Cookiespolicy.html">สำหรับการใช้คุกกี้</a></li>`;
               html += `<li><a href="/pdpa/parking/ParkingLotsPolicy.html">สำหรับลานจอดรถยนต์</a></li>`;
               // html += `<li><a href="/pdpa/training/TrainingEventsPolicy.html">สำหรับการฝึกอบรม</a></li>`;
               // html += `<li><a href="/pdpa/event/PrivacyPolicyforEvent.html">สำหรับงานอีเว้นท์ มหกรรม และงานแสดงสินค้า</a></li>`;
               resolve(html)
               break;
            ;
            case 3:
               html += `<li><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FCon.pdf">ประกาศเงื่อนไขการออกตั๋วโดยสาร</a></li>`;
               html += `<li><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FService.pdf">ประกาศเงื่อนไขการใช้สิทธิ์สวัสดิการแห่งรัฐ</a></li>`;
               resolve(html)
               break;
            ;
            case 4:
               html += `<li><a href="/th/ticket-emv/">การใช้บัตร EMV</a></li>`;
               html += `<li><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FEMV.pdf">ประกาศเงื่อนไขการใช้ EMV</a></li>`;
               resolve(html)
               break;
            ;
         }
      }else
      {
         switch(subIndex)
         {
            case 1:
               html += `<li><a href="/en/ticket-rabbit-trips/">Information of Buying tickets/top-up trips</a></li>`;
               html += `<li><a href="/en/ticket-rabbit-guide/">How to use an automatic gate pass</a></li>`;
               resolve(html)
               break;
            ;
            case 2:
               html += `<li><a href="/pdpa/cus/customerpolicy.html">Customer Privacy Policy</a></li>`;
               // html += `<li><a href="/pdpa/lost/LostAndFoundPolicy.html">Privacy Policy for Lost & Found System</a></li>`;
               // html += `<li><a href="/pdpa/hr/HRpolicy.html">Human Resource Privacy Policy</a></li>`;
               // html += `<li><a href="/pdpa/cctv/cctvpolicy.html">CCTV Privacy Policy</a></li>`;
               // html += `<li><a href="/pdpa/businesspartner/BusinessPartnerPrivacyPolicy.html">Business Partner Privacy Policy</a></li>`;
               // html += `<li><a href="/pdpa/shareholders/Shareholderspolicy.html">Privacy Policy for Shareholder’ Meeting</a></li>`;
               // html += `<li><a href="/pdpa/director/DirectorPolicy.html">Director Privacy Policy</a></li>`;
               // html += `<li><a href="/pdpa/reception/ReceptionAreaPolicy.html">Privacy Policy for Reception Area</a></li>`;
               html += `<li><a href="/pdpa/cookies/Cookiespolicy.html">Cookie Policy</a></li>`;
               html += `<li><a href="/pdpa/parking/ParkingLotsPolicy.html">Privacy Policy for Parking Lot</a></li>`;
               // html += `<li><a href="/pdpa/training/TrainingEventsPolicy.html">Privacy Policy for Training Events</a></li>`;
               // html += `<li><a href="/pdpa/event/PrivacyPolicyforEvent.html">Privacy Policy for Events, Exhibitions and Tradeshow</a></li>`;
               resolve(html)
               break;
            ;
            case 3:
               html += `<li><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FCon.pdf">Terms and Conditions</a></li>`;
               html += `<li><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FService.pdf">Terms and Conditions: Social Welfare Card</a></li>`;
               resolve(html)
               break;
            ;
            case 4:
               html += `<li><a href="/en/ticket-emv/">How to use a EMV Contactless Card to enter or exit through an Automatic Gate</a></li>`;
               html += `<li><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FEMV.pdf">Terms and Conditions: EMV Contactless Card</a></li>`;
               resolve(html)
               break;
            ;
         }
      } 
   })
}

function navMenuDetailGenerator(index)
{
   return new Promise(async resolve => {
      let html = ``;
      if(LANGUAGE === 'th')
      {
         switch(index)
         {
            case 1:
               html += `<li class="head">เกี่ยวกับเรา</li>`;
               html += `<li class="link"><a href="/th/history/">ประวัติความเป็นมา</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/th/vision/">วิสัยทัศน์ ภารกิจ และค่านิยมร่วม</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/th/board/">คณะกรรมการบริษัท</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               // html += `<li class="link"><a href="#">คณะกรรมการบริหารและคณะกรรมการที่ปรึกษา</a>`;
               //    html += `<div class="icons">`;
               //       html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
               //       html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
               //    html += `</div>`; 
               // html += `</li>`;
               // html += `<li class="link"><a href="/th/info/info-company_policies.html">นโยบายบริษัท</a>`;
               //    html += `<div class="icons">`;
               //       html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
               //       html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
               //    html += `</div>`; 
               // html += `</li>`;
               html += `<li class="link"><a href="/th/social-responsibility/">ความรับผิดชอบต่อสังคม</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link" id="more-sub" data-subindex="2"><a href="#">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a>`;
                  html += `<div id="more-sub" data-subindex="2" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               resolve(html); 
               break
            ;
            case 2:
               html += `<li class="head">ข้อมูลบัตรโดยสาร</li>`;
               html += `<li class="link"><a href="/th/ticket-journey/">บัตรโดยสารเที่ยวเดียว</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link" id="more-sub" data-subindex="1"><a href="/th/ticket-rabbit">บัตรแรบบิท</a>`;
                  html += `<div id="more-sub" data-subindex="1" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"  id="more-sub" data-subindex="4"><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FCon.pdf">บัตร EMV Contactless</a>`;
               html += `<div id="more-sub" data-subindex="4" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"  id="more-sub" data-subindex="3"><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FCon.pdf">เงื่อนไขการออกบัตร</a>`;
               html += `<div id="more-sub" data-subindex="3" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               resolve(html); 
               break
            ;
            case 3:
               html += `<li class="head">ข้อมูลการใช้บริการ</li>`;
               html += `<li class="link"><a href="/th/routemap/">เส้นทางและอัตราค่าโดยสาร</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/th/areamap/">แผนที่บริเวณสถานี</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/th/traintime-frequency">เวลาและความถี่การเดินรถ</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/th/parkandride/">ที่จอดรถ</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/th/lostfound/">วิธีการแจ้งทรัพย์สินสูญหาย</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://www.mrta.co.th/th/document_publications/laws/ministerial-regulations/life-safety-body-and-property-to-maintain-order-cleanliness-and-tidiness-in-the-metro-system/" target="_blank">ประกาศและระเบียบข้อบังคับในการใช้บริการ</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               resolve(html); 
               break
            ;
            case 4:
               html += `<li class="head">ธุรกิจและพาณิชย์</li>`;
               html += `<li class="link"><a href="/th/rabbit-type/">บัตรแรบบิทประเภทต่างๆ</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://rabbit.co.th/promotions">โปรโมชั่นบัตรแรบบิท</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://rabbit.co.th/where-to-use-and-top-up">ร้านค้า/บริการ ที่สามารถใช้แรบบิทและจุดเติมเงิน</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/th/business/">ข้อมูล/ติดต่อสอบถาม</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://rabbit.co.th/myrabbit-topup">My Rabbit</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               resolve(html);
               break
            ;
         }
      }else
      {
         switch(index)
         {
            case 1:
               html += `<li class="head">About Us</li>`;
               html += `<li class="link"><a href="/en/history/">Company’s Profile</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/en/vision/">Vision Mission and Shared Values</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/en/board/">Board of Directors</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               // html += `<li class="link"><a href="#">คณะกรรมการบริหารและคณะกรรมการที่ปรึกษา</a>`;
               //    html += `<div class="icons">`;
               //       html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
               //       html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
               //    html += `</div>`; 
               // html += `</li>`;
               // html += `<li class="link"><a href="/en/info/info-company_policies.html">นโยบายบริษัท</a>`;
               //    html += `<div class="icons">`;
               //       html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
               //       html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
               //    html += `</div>`; 
               // html += `</li>`;
               html += `<li class="link"><a href="/en/social-responsibility/">Corporate Social Responsibilities</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link" id="more-sub" data-subindex="2"><a href="#">Personal Information Protection Policies</a>`;
                  html += `<div id="more-sub" data-subindex="2" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               resolve(html); 
               break
            ;
            case 2:
               html += `<li class="head">Card Info</li>`;
               html += `<li class="link"><a href="/en/ticket-journey/">Single Journey Ticket</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link" id="more-sub" data-subindex="1"><a href="/en/ticket-rabbit">Rabbit Card</a>`;
                  html += `<div id="more-sub" data-subindex="1" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"  id="more-sub" data-subindex="4"><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FCon.pdf">EMV Contactless Card</a>`;
               html += `<div id="more-sub" data-subindex="4" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"  id="more-sub" data-subindex="3"><a href="https://www.ebm.co.th/cms-routemap/Warehouse/Condition-Card/FCon.pdf">Terms and Conditions</a>`;
               html += `<div id="more-sub" data-subindex="3" class="icons">`;
                     html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                     html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  html += `</div>`; 
               html += `</li>`;
               resolve(html); 
               break
            ;
            case 3:
               html += `<li class="head">Service Info</li>`;
               html += `<li class="link"><a href="/en/routemap/">Routes and Fares</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/en/areamap/">Area map</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/en/traintime-frequency">Time Table</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/en/parkandride/">Park & Ride</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/en/lostfound/">Lost & Found</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://www.mrta.co.th/en/ministerial-regulations/1904" target="_blank">Annoucement and Regulation</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               resolve(html); 
               break
            ;
            case 4:
               html += `<li class="head">Business and Commerce</li>`;
               html += `<li class="link"><a href="/en/rabbit-type/">Types of Rabbit cards</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://rabbit.co.th/promotions">Rabbit Card Promotion</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://rabbit.co.th/where-to-use-and-top-up">Shop/service that uses rabbits and top-up points</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="/en/business/">Information/Contact</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               html += `<li class="link"><a href="https://rabbit.co.th/myrabbit-topup">My Rabbit</a>`;
                  // html += `<div class="icons">`;
                  //    html += `<img data-color="yellow" src="/assets/images/icons/CaretDoubleRight.png" alt="bts the skytrain ประวัติความเป็นมา" />`; 
                  //    html += `<img data-color="white" src="/assets/images/icons/CaretDoubleRight-white.png" alt="bts the skytrain ประวัติความเป็นมา" />`;
                  // html += `</div>`; 
               html += `</li>`;
               resolve(html);
               break
            ;
         }
      }
   })
}

function navMenuSlide(status, index)
{
   return new Promise(async resolve => {
      if(status === true)
      {
         if(index === 0)
         {
            // active nav menu detail
            let iconElem = $('.navmenu-detail-wrap .arrowi');
            let navMenusElem = $('.navmenu-detail-wrap');
            let navMenuDetailHeight = $('.navmenu-item-detail').innerHeight();
            navMenusElem.css({height: navMenuDetailHeight})
            iconElem.addClass('active');            
            resolve();
         }else
         {
            // set location icon
            let navTopHeight = $(`nav.nav-top`).height();
            let arrowIconHeight = 8; //8px
            let itemMenuPosition = $(`.nav-items li[data-index="${index}"]`).position();
            let itemMenuHeight = $(`.nav-items li[data-index="${index}"]`).height();
            let itemMenuWidth = $(`.nav-items li[data-index="${index}"]`).width();
            let top = (itemMenuHeight + navTopHeight) - arrowIconHeight;
            let iconElem = $('.navmenu-detail-wrap .arrowi');
            let left = ((itemMenuWidth/2) + itemMenuPosition.left) -16; // minus(-) margin = 24 and minus(-) 10 = icon width / 2
            iconElem.css({left: left, top: top})
            iconElem.addClass('active');            

            // active nav menu detail
            let navMenusElem = $('.navmenu-detail-wrap');
            let navMenuDetailHeight = $('.navmenu-item-detail').innerHeight();
            navMenusElem.css({height: navMenuDetailHeight})
            resolve();
         }
      }else
      {
         // inactive nav menu detail
         let navMenusElem = $('.navmenu-detail-wrap');
         let iconElem = $('.navmenu-detail-wrap .arrowi');
         let subMenuDetailElem = $('.navmenu-subitem-detail');
         let subMenuWrapElem = $('.navmenu-subitem-detail-wrap');

         subMenuWrapElem.hide();
         subMenuDetailElem.empty();
         iconElem.removeClass('active');            
         navMenusElem.css({height: 0})
         resolve();
      }
   })
}

function onClickNavMenuMobile()
{
   // console.log('Clicked');
}