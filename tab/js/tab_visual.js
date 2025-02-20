window.addEventListener("load", function () {
  const popupBtnLinks = this.document.querySelectorAll(".popup-btn .inner a");
  const popupBtn = this.document.querySelector(".popup-btn");
  const popupText = this.document.querySelector(".pop-text");
  popupBtnLinks.forEach(function (item) {
    // console.log(item);
    item.addEventListener("click", function (e) {
      e.preventDefault();
      popupBtnLinks.forEach(function (link) {
        link.classList.toggle("active");
      });
    });
  });
  popupBtn.addEventListener("click", function () {
    popupText.style.display = popupText.style.display === "none" ? "block" : "none";
  });
  // 메뉴 탭기능
  const tabTitle = this.document.querySelectorAll(".tab-nav li a");
  tabTitle.forEach(function (element) {
    // console.log(element);
    element.addEventListener("click", function (e) {
      e.preventDefault();
      tabTitle.forEach(function (item) {
        // console.log(item);
        item.classList.remove("active");
      });
      this.classList.add("active");
      const tabItems = document.querySelectorAll(".tabitem");    
      tabItems.forEach(function (tab) {
          // console.log(tab);
          tab.style.display = "none"
      });    
      const target = this.getAttribute("href")
      // console.log(this);
      document.querySelector(target).style.display = "block"    
    });
  });
  tabTitle[0].click()//<a href="#work01" class="active"> 설정해도 됨
});
