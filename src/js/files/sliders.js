/*
Документация слайдера: https://swiperjs.com/
*/
import Swiper from "swiper";
import { Navigation, Pagination, Controller, EffectFade, A11y } from "swiper/modules";
import "../../scss/base/swiper.scss";

const formatFractionCurrent = (number) => number.toString().padStart(2, "0");
const formatFractionTotal = (number) => number.toString().padStart(2, "0");

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

function initTextImageSliders() {
  const textImageSliders = document.querySelectorAll(".text-image-slider");

  textImageSliders.forEach((sliderSection) => {
    const textSliderEl = sliderSection.querySelector(".text-image-slider__text");
    const imgSliderEl = sliderSection.querySelector(".text-image-slider__photos");
    const paginationEl = sliderSection.querySelector(".slider-controls__pagination");
    const nextEl = sliderSection.querySelector(".slider-controls__arrow-next");
    const prevEl = sliderSection.querySelector(".slider-controls__arrow-prev");

    if (!textSliderEl || !imgSliderEl) return;

    const textSlider = new Swiper(textSliderEl, {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 300,
      modules: [EffectFade, Pagination, Navigation, Controller],
      pagination: paginationEl ? {
        el: paginationEl,
        clickable: true,
        type: "fraction",
        formatFractionCurrent: formatFractionCurrent,
        formatFractionTotal: formatFractionTotal,
      } : false,
      navigation: (nextEl && prevEl) ? {
        nextEl: nextEl,
        prevEl: prevEl,
      } : false,
    });

    const imgSlider = new Swiper(imgSliderEl, {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 300,
      modules: [EffectFade, Controller],
      allowTouchMove: false,
    });

    textSlider.controller.control = imgSlider;
    imgSlider.controller.control = textSlider;
  });
}

function initFullscreenSliders() {
  const fullscreenSliders = document.querySelectorAll(".fullscreen-slider");

  if (fullscreenSliders.length === 0) return;

  fullscreenSliders.forEach((slider) => {
    const bgSliderEl = slider.querySelector(".fullscreen-slider__background");
    const contentSliderEl = slider.querySelector(".fullscreen-slider__content");
    const paginationEl = slider.querySelector(".slider-controls__pagination");
    const nextEl = slider.querySelector(".slider-controls__arrow-next");
    const prevEl = slider.querySelector(".slider-controls__arrow-prev");

    if (!bgSliderEl || !contentSliderEl) return;

    const fullscreenSliderBg = new Swiper(bgSliderEl, {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: { crossFade: false },
      speed: 300,
      modules: [Controller, EffectFade],
      allowTouchMove: false,
    });

    const fullscreenSliderContent = new Swiper(contentSliderEl, {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: { crossFade: false },
      speed: 300,
      modules: [EffectFade, Navigation, Pagination, Controller],
      pagination: paginationEl ? {
        el: paginationEl,
        clickable: true,
        type: "fraction",
        formatFractionCurrent: formatFractionCurrent,
        formatFractionTotal: formatFractionTotal,
      } : false,
      navigation: (nextEl && prevEl) ? {
        nextEl: nextEl,
        prevEl: prevEl,
      } : false,
    });

    fullscreenSliderContent.controller.control = fullscreenSliderBg;
    fullscreenSliderBg.controller.control = fullscreenSliderContent;
  });
}

function initImageSliderSections() {
  const imageSliderSections = document.querySelectorAll(".image-slider-section");

  if (imageSliderSections.length === 0) return;

  imageSliderSections.forEach((sliderSection) => {
    const sliderEl = sliderSection.querySelector(".image-slider-section__slider-inner");
    const paginationEl = sliderSection.querySelector(".slider-controls__pagination");
    const nextEl = sliderSection.querySelector(".slider-controls__arrow-next");
    const prevEl = sliderSection.querySelector(".slider-controls__arrow-prev");

    if (!sliderEl) return;

    new Swiper(sliderEl, {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: { crossFade: false },
      speed: 300,
      modules: [EffectFade, Pagination, Navigation],
      pagination: paginationEl ? {
        el: paginationEl,
        clickable: true,
        type: "fraction",
        formatFractionCurrent: formatFractionCurrent,
        formatFractionTotal: formatFractionTotal,
      } : false,
      navigation: (nextEl && prevEl) ? {
        nextEl: nextEl,
        prevEl: prevEl,
      } : false,
    });
  });
}

function initPromoSliders() {
  const promoSliders = document.querySelectorAll(".promo-slider__slider");

  if (promoSliders.length === 0) return;

  promoSliders.forEach((slider) => {
    const carouselEl = slider.querySelector(".promo-slider__slider-carousel");
    const nextEl = slider.querySelector(".slider-controls__arrow-next");
    const prevEl = slider.querySelector(".slider-controls__arrow-prev");

    if (!carouselEl) return;

    new Swiper(carouselEl, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      modules: [Navigation],
      navigation: (nextEl && prevEl) ? {
        nextEl: nextEl,
        prevEl: prevEl,
      } : false,
      breakpoints: {
        639: {
          slidesPerView: 2,
        },
        939: {
          slidesPerView: 3,
        },
        1199: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  });
}

function initStepsGallerySliders() {
  const stepsGallery = document.querySelectorAll(".steps-gallery__slider");

  if (stepsGallery.length === 0) return;

  stepsGallery.forEach((slider) => {
    const carouselEl = slider.querySelector(".steps-gallery__slider-carousel");
    const nextEl = slider.querySelector(".slider-controls__arrow-next");
    const prevEl = slider.querySelector(".slider-controls__arrow-prev");

    if (!carouselEl) return;

    new Swiper(carouselEl, {
      slidesPerView: "auto",
      slidesPerGroup: 1,
      spaceBetween: 12,
      modules: [Navigation],
      navigation: (nextEl && prevEl) ? {
        nextEl: nextEl,
        prevEl: prevEl,
      } : false,
      breakpoints: {
        639: {
          spaceBetween: 24,
        },
      },
    });
  });
}

function initGallerySectionSliders() {
  const gallerySectionSliders = document.querySelectorAll(".gallery-section__slider");

  if (gallerySectionSliders.length === 0) return;

  gallerySectionSliders.forEach((slider) => {
    const carouselEl = slider.querySelector(".gallery-section__slider-carousel");
    const nextEl = slider.querySelector(".slider-controls__arrow-next");
    const prevEl = slider.querySelector(".slider-controls__arrow-prev");

    if (!carouselEl) return;

    let swiperInstance = null;

    const initSwiper = () => {
      if (window.innerWidth >= 639 && !swiperInstance) {
        swiperInstance = new Swiper(carouselEl, {
          slidesPerView: "auto",
          slidesPerGroup: 1,
          spaceBetween: 12,
          modules: [Navigation],
          navigation: (nextEl && prevEl) ? {
            nextEl: nextEl,
            prevEl: prevEl,
          } : false,
          breakpoints: {
            939: {
              spaceBetween: 24,
            },
          },
        });
      } else if (window.innerWidth < 639 && swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    };

    initSwiper();
    
    window.addEventListener("resize", debounce(initSwiper, 250));
  });
}

function initAllSliders() {
  initTextImageSliders();
  initFullscreenSliders();
  initImageSliderSections();
  initPromoSliders();
  initStepsGallerySliders();
  initGallerySectionSliders();
}

window.addEventListener("load", initAllSliders);

window.initSliders = initAllSliders;