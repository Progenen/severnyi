// Логика переключения табов для планировок квартир
document.addEventListener("DOMContentLoaded", () => {
  function apartmentTabs() {

    if (document.querySelector(".apartment-planes") === undefined) return;

    const tabButtons = document.querySelectorAll(
      ".apartment-planes__switchs-item",
    );
    const sliders = document.querySelectorAll(".apartment-planes__slider");
    const infoBlocks = document.querySelectorAll(
      ".apartment-planes__info-item",
    );
    const tabNext = document.querySelector("[data-tab-control='next']");
    const tabPrev = document.querySelector("[data-tab-control='prev']");
    let tabIndex = 0;

    function tabsUpdate() {
      tabButtons.forEach((btn) => {
        btn.classList.remove("apartment-planes__switchs-item--active");
      });

      tabButtons[tabIndex].classList.add(
        "apartment-planes__switchs-item--active",
      );

      // Переключаем слайдеры
      sliders.forEach((slider) => {
        if (Number(slider.getAttribute("data-tab-plane")) === tabIndex) {
          slider.classList.add("apartment-planes__slider--active");
        } else {
          slider.classList.remove("apartment-planes__slider--active");
        }
      });

      infoBlocks.forEach((block) => {
        if (Number(block.getAttribute("data-tab-plane")) === tabIndex) {
          block.classList.add("apartment-planes__info-item--active");
        } else {
          console.log(tabIndex);
          block.classList.remove("apartment-planes__info-item--active");
        }
      });
    }

    tabNext.addEventListener("click", () => {
      tabIndex = (tabIndex + 1) % tabButtons.length;
      tabsUpdate();
    });

    tabPrev.addEventListener("click", () => {
      tabIndex = (tabIndex - 1 + tabButtons.length) % tabButtons.length;
      tabsUpdate();
    });
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabIndex = Number(button.getAttribute("data-tab-plane"));
        tabsUpdate();
      });
    });
  }

  apartmentTabs();
});
