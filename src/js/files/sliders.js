/*
Документация слайдера: https://swiperjs.com/
*/

import Swiper from "swiper";
import {
  A11y,
  EffectFade,
  Navigation,
  Pagination,
  Controller,
} from "swiper/modules";
/*
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
*/

import "../../scss/base/swiper.scss";
// import "../../scss/libs/swiper.scss";
// import 'swiper/css';
export const createSlider = (el, options) => {
  let mergedOptions;
  const defaultOptions = {
    modules: [A11y],
    slidesPerView: "auto",
    speed: 800,
    a11y: true,
  };

  if (options && typeof options === "object") {
    mergedOptions = { ...defaultOptions, ...options };
    if (options.modules) {
      mergedOptions.modules = [
        ...new Set([...defaultOptions.modules, ...options.modules]),
      ];
    }
  }
  sliders.push([el, mergedOptions || defaultOptions]);
};

const sliders = [];
// Инициализация слайдеров
function initSliders() {
  // Список слайдеров
  // Проверяем, есть ли слайдер на странице
  console.log(sliders);
  sliders.forEach((element) => {
    new Swiper(element[0], element[1]);
  });
}

const formatFractionCurrent = (number) => number.toString().padStart(2, "0");
const formatFractionTotal = (number) => number.toString().padStart(2, "0");

window.addEventListener("load", function (e) {
  const textImgSliderText = new Swiper(".text-img-slider__text", {
    slidesPerView: 1,
    pagination: {
      el: document.querySelector(
        ".text-img-slider__left .slider-controls__pagination"
      ),
      clickable: true,
      type: "fraction",
      formatFractionCurrent: formatFractionCurrent,
      formatFractionTotal: formatFractionTotal,
    },
    navigation: {
      nextEl: document.querySelector(
        ".text-img-slider__left .slider-controls__arrow-next"
      ),
      prevEl: document.querySelector(
        ".text-img-slider__left .slider-controls__arrow-prev"
      ),
    },
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 1000,
    modules: [EffectFade, Pagination, Navigation, Controller],
  });

  const textImgSliderImg = new Swiper(".text-img-slider__photos", {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 1000,
    modules: [EffectFade, Navigation, Controller],
  });

  textImgSliderText.controller.control = textImgSliderImg;
  textImgSliderImg.controller.control = textImgSliderText;

  initSliders();
});

// Бинд слайдеров на window для беков
window.initSliders = initSliders;
