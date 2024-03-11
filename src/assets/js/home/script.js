import { Home_API } from "/utils/apis/home/apis.js";
import {
  EncryptedOBJ,
  DecryptedOBJ,
  EncryptedText,
  DecryptedText,
} from "/utils/config/crypto.js";
let lang = localStorage.getItem("LANGUAGE");
console.log(lang);


const ComponentDidMount = () => {
  BannerHomePages();
  Promotions();
  News();
  Article();
  ELibrary();
  // setTimeout(function() {
  //   handlerLoader('inactive')
  // },1500);
};

function doesFileExist(url, reurl) {
  let xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, false);
  xhr.send(null);

  if (xhr.status === 404) {
    console.log("File doesn't exist");
    return reurl;
  } else {
    console.log("File exist");
    return url;
  }
}

//!! Banner
async function BannerHomePages() {
  const id = document.getElementById("banner-homepage");
  let formdata = new FormData();
  formdata.append("lang", lang);
  formdata.append("Contentid", 0);

  try {
    const res = await Home_API.postBannerHomePages(formdata);
    setTimeout(function() {
      if (res.IsSuccess) {
        const OBJ = DecryptedOBJ(res.data);
        if (OBJ.length < 1) {
          const div = document.createElement("div");
          const image = document.createElement("img");
          const prev = document.querySelector(".pp2");
          const next = document.querySelector(".nn2");
          div.onclick = () => (window.location.href = "#");
          image.src = `/assets/images/home/icon/iconloadimage.png`;
          image.width = 45;
          image.height = 51;
          prev.style.display = "none";
          next.style.display = "none";
  
          id.style.display = "flex";
          id.style.background = "#E4E4E4";
          id.style.boxSizing = "border-box";
          id.style.alignItems = "center";
          id.style.justifyContent = "center";
          id.style.height = "150px";
  
          div.style.display = "flex";
          div.style.width = "100%";
          div.style.alignItems = "center";
          div.style.justifyContent = "center";
          div.style.height = "100%";
  
          image.style.width = "50px";
          image.style.height = "auto";
  
  
          div.appendChild(image); // fix order
          id.appendChild(div); // fix order
        }else {
          OBJ.forEach((item) => {
            // console.log(item);
            const div = document.createElement("div");
            const image = document.createElement("img");
            const reurl = ``;
    
            let urlImage = doesFileExist(item.Banner, reurl);
    
            div.onclick = () => (window.location.href = item.URL);
            image.src = urlImage;
    
            div.appendChild(image); // fix order
            id.appendChild(div); // fix order
          });
          const slider = $("#banner-homepage").slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            infinite: true,
            centerMode: false,
            focusOnSelect: true,
            speed: 1000,
            slide: "div",
            cssEase: "linear",
            prevArrow: $(".pp2"),
            nextArrow: $(".nn2"),
          });
        }
        
      } else {
        const div = document.createElement("div");
        const image = document.createElement("img");
        const prev = document.querySelector(".pp2");
        const next = document.querySelector(".nn2");
        div.onclick = () => (window.location.href = "#");
        image.src = `/assets/images/home/icon/iconloadimage.png`;
        image.width = 1440;
        image.height = 453;
        prev.style.display = "none";
        next.style.display = "none";
  
        id.style.display = "flex";
          id.style.background = "#E4E4E4";
          id.style.boxSizing = "border-box";
          id.style.alignItems = "center";
          id.style.justifyContent = "center";
          id.style.height = "150px";
  
          div.style.display = "flex";
          div.style.width = "100%";
          div.style.alignItems = "center";
          div.style.justifyContent = "center";
          div.style.height = "100%";
  
          image.style.width = "50px";
          image.style.height = "auto";
  
        div.appendChild(image); // fix order
        id.appendChild(div); // fix order
      }

    },1500);
    
  } catch (error) {
    console.log(error);
    const div = document.createElement("div");
      const image = document.createElement("img");
      const prev = document.querySelector(".pp2");
      const next = document.querySelector(".nn2");
      div.onclick = () => (window.location.href = "#");
      image.src = `/assets/images/home/icon/iconloadimage.png`;
      prev.style.display = "none";
      next.style.display = "none";

      id.style.display = "flex";
        id.style.background = "#E4E4E4";
        id.style.boxSizing = "border-box";
        id.style.alignItems = "center";
        id.style.justifyContent = "center";
        id.style.height = "150px";

        div.style.display = "flex";
        div.style.width = "100%";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.height = "100%";

        image.style.width = "50px";
        image.style.height = "auto";

      div.appendChild(image); // fix order
      id.appendChild(div); // fix order
  }
}

// !! Promotions
async function Promotions() {
  const id = document.getElementById("promotion");
  let formdata = new FormData();
  formdata.append("startIndex", Number(0));
  formdata.append("numRows", Number(2));

  try {
    const res = await Home_API.postPromotions(formdata);
    if (res.IsSuccess) {
      const OBJ = DecryptedOBJ(res.data);
      console.log(OBJ);
      if (OBJ.length < 1) {
        const pp2 = document.querySelector(".pp2-promo");
        const nn2 = document.querySelector(".nn2-promo");

        id.innerText = lang === "th" ? "ติดตามโปรโมชันได้ในเร็วๆ นี้" : "New promotion are coming soon";
        pp2.style.display = "none";
        nn2.style.display = "none";
      } else {
        OBJ.forEach(async (item) => {
          console.log(item);
          const div = document.createElement("div");
          const image = document.createElement("img");
          const reurl = "/assets/images/home/promotion.jpg";

          let urlImage = doesFileExist(item.CoverImage, reurl);
          div.onclick = function () {
            let idCookie = EncryptedText(item.NewsID);
            let encode = encodeURIComponent(idCookie);
            window.location.href = `/${lang}/promotion-details/?${encode}&lang=${lang}`;
            // localStorage.setItem('newsID', idCookie);
            // document.cookie = `newsID=${idCookie};path=/;`
          };
          div.style.cursor = "pointer";
          image.src = urlImage;
          image.width = 1086;
          // image.height = 285;

          div.appendChild(image); // fix order
          id.appendChild(div); // fix order
        });
        $("#promotion").slick({
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
          infinite: true,
          centerMode: false,
          focusOnSelect: true,
          speed: 1000,
          slide: "div",
          cssEase: "linear",
          prevArrow: $(".pp2-promo"),
          nextArrow: $(".nn2-promo"),
        });
      }
    } else {
      const div = document.createElement("div");
      const image = document.createElement("img");

      image.src = "/assets/images/home/promotion.jpg";
      // image.width = 1086;
      // image.height = 285;

      div.appendChild(image); // fix order
      id.appendChild(div); // fix order
    }
  } catch (error) {
    console.log(error);
  }
}

// !! News List
async function News() {
  const id = document.getElementById("news-list");
  let reqData = new FormData();
  reqData.append("startIndex", 0);
  reqData.append("numRows", 5);

  try {
    const res = await Home_API.postNews(reqData);
    if (res.IsSuccess) {
      const OBJ = DecryptedOBJ(res.data);

      if (OBJ.length < 1) {
        const pp2 = document.querySelector(".pp2-news");
        const nn2 = document.querySelector(".nn2-news");
        id.innerText = lang === "en" ? "New news are coming soon" : "ติดตามข่าวสารและกิจกรรมของรถไฟฟ้ามหานคร สายสีเหลืองได้ในเร็วๆ นี้";

        pp2.style.display = "none";
        nn2.style.display = "none";
      } else {
        OBJ.map((item) => {
          const div = document.createElement("div");
          const divImage = document.createElement("div");
          const image = document.createElement("img");
          const divDetails = document.createElement("div");
          const p1 = document.createElement("p");
          const p2 = document.createElement("p");
          const divBTN = document.createElement("div");
          const a = document.createElement("a");
          const aImage = document.createElement("img");
          div.classList.add("box-news");
          divImage.classList.add("sub-image");
          divDetails.classList.add("sub-details");
          divBTN.classList.add("btn-details");

          aImage.src = "/assets/images/Vector.png";
          aImage.width = "3.59";
          aImage.height = "7.19";

          const reurl = "/assets/images/home/news1.jpg";

          let urlImage = doesFileExist(item.CoverImage, reurl);
          divBTN.onclick = function () {
            let idCookie = EncryptedText(item.NewsID);
            let encode = encodeURIComponent(idCookie);
            window.location.href = `/${lang}/news-details/?${encode}&lang=${lang}`;
          };

          image.src = urlImage;
          image.height = 179;
          image.width = 277;
          p1.innerText =  lang === "en" ? item.CreateDate_ENG : item.CreateDate;
          p2.innerHTML = lang === "en" ? item.Title_ENG : item.Title_TH;
          a.innerText = lang === "en" ? "Read more" : "อ่านเพิ่มเติม";
          a.href = "#";

          id.appendChild(div);
          div.appendChild(divImage);
          divImage.appendChild(image);
          div.appendChild(divDetails);
          divDetails.appendChild(p1);
          divDetails.appendChild(p2);
          div.appendChild(divBTN);
          divBTN.appendChild(a);
          a.appendChild(aImage);
        });
        $("#news-list").slick({
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          infinite: true,
          centerMode: false,
          focusOnSelect: true,
          speed: 1000,
          slidesToShow: 4,
          slidesToScroll: 1,
          prevArrow: $(".pp2-news"),
          nextArrow: $(".nn2-news"),
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// !! Article List
async function Article() {
  const id = document.getElementById("article-list");
  let reqData = new FormData();
  reqData.append("startIndex", 0);
  reqData.append("numRows", 12);

  try {
    const res = await Home_API.postArticle(reqData);
    if (res.IsSuccess) {
      const OBJ = DecryptedOBJ(res.data);
      // console.log(OBJ);

      if (OBJ.length < 1) {
        const pp2 = document.querySelector(".pp2-art");
        const nn2 = document.querySelector(".nn2-art");
    
        id.innerText = lang === "th" ? "ติดตามบทความได้ในเร็วๆ นี้" : "New articles are coming soon";
        pp2.style.display = "none";
        nn2.style.display = "none";
      } else {
        OBJ.forEach((item) => {
          // console.log(item);
          const div = document.createElement("div");
          const divImage = document.createElement("div");
          const image = document.createElement("img");
          const divDetails = document.createElement("div");
          const p1 = document.createElement("p");
          const p2 = document.createElement("p");
          div.classList.add("box-news");
          divImage.classList.add("sub-image");
          divDetails.classList.add("sub-details");
  
          const reurl = "/assets/images/home/article1.jpg";
  
          const urlImage = doesFileExist(item.CoverImage, reurl);
  
          div.onclick = function () {
            let idCookie = EncryptedText(item.NewsID);
            let encode = encodeURIComponent(idCookie);
            window.location.href = `/${lang}/article-details/?${encode}&lang=${lang}`;
            // localStorage.setItem('newsID', idCookie);
            // document.cookie = `newsID=${idCookie};path=/;`
          };
  
          image.src = urlImage;
          image.height = 169;
          // image.width = 373;
          p1.innerText =  lang === "en" ? item.CreateDate_ENG : item.CreateDate;
          p2.innerHTML = lang === "en" ? item.Title_ENG : item.Title_TH;
  
          id.appendChild(div);
          div.appendChild(divImage);
          divImage.appendChild(image);
          div.appendChild(divDetails);
          divDetails.appendChild(p1);
          divDetails.appendChild(p2);
        });
        $("#article-list").slick({
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          infinite: true,
          centerMode: false,
          focusOnSelect: true,
          speed: 1000,
          slidesToShow: 3,
          slidesToScroll: 1,
          prevArrow: $(".pp2-art"),
          nextArrow: $(".nn2-art"),
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }
      
    }
  } catch (error) {
    console.log(error);
  }
}

// !! ELibrary
async function ELibrary() {
  const id = document.getElementById("elibrary-list");
  const data = [
    {
      CoverImage: "/assets/images/home/elib1.jpg",
      Title_TH: "ระบบรถไฟฟ้า",
      Title_EN: "Railway Operating System",
      Url: "/th/system-smodel/",
      Url_EN: "/en/system-smodel/",
    },
    {
      CoverImage: "/assets/images/home/elib2.jpg",
      Title_TH: "ระบบโครงสร้างทางวิ่งและสถานี",
      Title_EN: "Structure of Routes and Stations",
      Url: "/th/system-structuer/",
      Url_EN: "/en/system-structuer/",
    },
    {
      CoverImage: "/assets/images/home/elib3.jpg",
      Title_TH: "ระบบอาณัติสัญญาณ",
      Title_EN: "Signal Systemx",
      Url: "/th/system-signal/",
      Url_EN: "/en/system-signal/",
    },
    {
      CoverImage: "/assets/images/home/elib1.jpg",
      Title_TH: "ระบบซ่อมบำรุง",
      Title_EN: "Maintenance System",
      Url: "/th/system-maintenance/",
      Url_EN: "/en/system-maintenance/",
    },
    {
      CoverImage: "/assets/images/home/elib2.jpg",
      Title_TH: "ระบบบัตรโดยสาร",
      Title_EN: "Ticketing System",
      Url: "/th/system-tickets/",
      Url_EN: "/en/system-tickets/",
    },
    {
      CoverImage: "/assets/images/home/elib3.jpg",
      Title_TH: "ระบบความปลอดภัย",
      Title_EN: "Safety System",
      Url: "/th/system-security/",
      Url_EN: "/en/system-security/",
    },
    {
      CoverImage: "/assets/images/home/elib1.jpg",
      Title_TH: "ระบบรักษาความปลอดภัย",
      Title_EN: "Security System",
      Url: "/th/system-personnel/",
      Url_EN: "/en/system-personnel/",
    },
    {
      CoverImage: "/assets/images/home/elib3.jpg",
      Title_TH: "รายงานประจำปี",
      Title_EN: "Annual Report",
      Url: "/th/system-annual/",
      Url_EN: "/en/system-annual/",
    },
  ];

  data.map((item) => {
    // console.log(item);
    const div = document.createElement("div");
    const title = document.createElement("div");
    const details = document.createElement("div");
    const btn = document.createElement("div");
    const a = document.createElement("a");

    div.classList.add("box-elib");
    title.classList.add("title");
    details.classList.add("details");
    btn.classList.add("btn-elib");

    title.innerText = item.Title_TH;
    details.innerText = item.Title_EN;
    a.innerText = lang === "en" ? "More" : "เพิ่มเติม";
    a.href = lang === "en" ? item.Url_EN : item.Url;

    div.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.47) 80.33%),url(${item.CoverImage})no-repeat center center/cover`;

    id.append(div);
    div.append(title);
    div.append(details);
    div.append(btn);
    btn.append(a);
  });
  $("#elibrary-list").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    centerMode: false,
    focusOnSelect: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $(".pp2-elib"),
    nextArrow: $(".nn2-elib"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

function handlerLoader(status) {
  return new Promise((resolve, reject) => {
      try {
          let loaderElem = $('.sls-loader-container');

          if (status === 'inactive') {
              loaderElem.fadeOut(() => {
                  resolve('Loader element faded out');
              });
          } else {
              loaderElem.fadeIn(() => {
                  resolve('Loader element faded in');
              });
          }
      } catch (error) {
          console.error(error);
          reject(error);
      }
  })
}

ComponentDidMount();
