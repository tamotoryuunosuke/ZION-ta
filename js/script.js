"use strict";
//クリックしたらページのトップに戻る
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // スムーズにスクロール
    });
  }
 
  // ハンバーガーメニューをクリックしたときに、メニューを表示/非表示にする
document.getElementById("hamburger-menu").addEventListener("click", function() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("open"); // メニューを表示/非表示に切り替え
});

"use strict";

"use strict";

// 最大幅を定義
const MAX_WIDTH = 425;
let intervalId = null;
let currentIndex = 0;

// 切り替える会社データ
const companies = [
    { header: "A社", selector: "td:nth-child(3)" },
    { header: "B社", selector: "td:nth-child(4)" },
];

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed!");

    // ハンバーガーメニューのクリック処理
    const hamburgerMenu = document.getElementById("hamburger-menu");
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", () => {
            const navMenu = document.getElementById("nav-menu");
            if (navMenu) {
                navMenu.classList.toggle("open");
                console.log("Hamburger menu toggled!");
            }
        });
    }

    // 次の会社を表示する
    function showNextCompany() {
        if (window.innerWidth > MAX_WIDTH) return;

        console.log("Switching to next company...");
        currentIndex = (currentIndex + 1) % companies.length;
        updateCompanyDisplay(currentIndex);
    }

    // ヘッダーと会社データを更新
    function updateCompanyDisplay(index) {
        companies.forEach((company, idx) => {
            const elements = document.querySelectorAll(company.selector);
            if (elements.length > 0) {
                elements.forEach(el => el.style.display = idx === index ? "table-cell" : "none");
            }
        });
        updateHeader(companies[index].header);
        updateIndicator();
    }

    // ヘッダーのテキストを更新
    function updateHeader(headerText) {
        const header = document.querySelector("th.company-btn.active");
        if (header) {
            header.textContent = headerText;
            console.log(`Header updated to: ${headerText}`);
        }
    }

    // インジケーターを更新
    function updateIndicator() {
        const dots = document.querySelectorAll("#indicator .indicator-dot");
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
    }

    // 初期化
    function initializeData() {
        if (window.innerWidth > MAX_WIDTH) return;
        updateCompanyDisplay(currentIndex);
        console.log("Data initialized.");
    }

    // インジケーターのクリック処理
    const dots = document.querySelectorAll("#indicator .indicator-dot");
    if (dots.length > 0) {
        dots.forEach((dot, idx) => {
            dot.addEventListener("click", () => {
                console.log(`Indicator ${idx} clicked.`);
                if (intervalId) clearInterval(intervalId);
                currentIndex = idx;
                updateCompanyDisplay(currentIndex);
                intervalId = setInterval(showNextCompany, 3000);
            });
        });
    }

    // リサイズ時の処理
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const isSmallScreen = window.innerWidth <= MAX_WIDTH;
            if (isSmallScreen && !intervalId) {
                intervalId = setInterval(showNextCompany, 3000);
            } else if (!isSmallScreen && intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            initializeData();
            console.log("Resize event handled.");
        }, 250);
    });

    // 初期実行
    initializeData();
    intervalId = setInterval(showNextCompany, 3000);
});


document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".slider-image");
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length; // 次のインデックス
        images[currentIndex].classList.add("active");
    }

    // 初期化
    images[currentIndex].classList.add("active");

    // 3秒ごとに画像を切り替え
    setInterval(showNextImage, 3000);
});

