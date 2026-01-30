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

import "../../scss/base/swiper.scss";

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

function initSliders() {
  console.log(sliders);
  sliders.forEach((element) => {
    new Swiper(element[0], element[1]);
  });
}

const formatFractionCurrent = (number) => number.toString().padStart(2, "0");
const formatFractionTotal = (number) => number.toString().padStart(2, "0");

window.addEventListener("load", function (e) {
  // Инициализация всех text-image-slider на странице
  const textImageSliders = document.querySelectorAll(".text-image-slider");

  textImageSliders.forEach((sliderSection) => {
    const textSlider = new Swiper(
      sliderSection.querySelector(".text-image-slider__text"),
      {
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 300, // Уменьши скорость
        modules: [EffectFade, Pagination, Navigation, Controller],
        pagination: {
          el: sliderSection.querySelector(".slider-controls__pagination"),
          clickable: true,
          type: "fraction",
          formatFractionCurrent: formatFractionCurrent,
          formatFractionTotal: formatFractionTotal,
        },
        navigation: {
          nextEl: sliderSection.querySelector(".slider-controls__arrow-next"),
          prevEl: sliderSection.querySelector(".slider-controls__arrow-prev"),
        },
      },
    );

    const imgSlider = new Swiper(
      sliderSection.querySelector(".text-image-slider__photos"),
      {
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 300,
        modules: [EffectFade, Controller],
      },
    );

    // Связываем слайдеры
    textSlider.controller.control = imgSlider;
    imgSlider.controller.control = textSlider;
  });

  // Fullscreen slider
  const fullscreenSliders = document.querySelectorAll(".fullscreen-slider");

  if (fullscreenSliders) {
    fullscreenSliders.forEach((slider) => {
      const fullscreenSliderBg = new Swiper(
        slider.querySelector(".fullscreen-slider__background"),
        {
          slidesPerView: 1,
          effect: "fade",
          fadeEffect: { crossFade: false },
          speed: 300,
          modules: [Controller, EffectFade],
        },
      );

      const fullscreenSliderContent = new Swiper(
        slider.querySelector(".fullscreen-slider__content"),
        {
          slidesPerView: 1,
          effect: "fade",
          fadeEffect: { crossFade: false },
          speed: 300,
          modules: [EffectFade, Navigation, Pagination, Controller],
          pagination: {
            el: slider.querySelector(".slider-controls__pagination"),
            clickable: true,
            type: "fraction",
            formatFractionCurrent: formatFractionCurrent,
            formatFractionTotal: formatFractionTotal,
          },
          navigation: {
            nextEl: slider.querySelector(".slider-controls__arrow-next"),
            prevEl: slider.querySelector(".slider-controls__arrow-prev"),
          },
        },
      );

      fullscreenSliderContent.controller.control = fullscreenSliderBg;
      fullscreenSliderBg.controller.control = fullscreenSliderContent;
    });
  }

  // Apartment planes sliders
  const apartmentPlaneSliders = document.querySelectorAll(
    ".apartment-planes__slider",
  );

  apartmentPlaneSliders.forEach((sliderContainer) => {
    const sliderInner = sliderContainer.querySelector(
      ".apartment-planes__slider-inner",
    );
    const prevBtn = sliderContainer.querySelector(
      ".slider-controls__arrow-prev",
    );
    const nextBtn = sliderContainer.querySelector(
      ".slider-controls__arrow-next",
    );

    createSlider(sliderInner, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
    });
  });

  // Image slider section (только изображения)
  const imageSliderSections = document.querySelectorAll(
    ".image-slider-section",
  );

  imageSliderSections.forEach((sliderSection) => {
    new Swiper(
      sliderSection.querySelector(".image-slider-section__slider-inner"),
      {
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: { crossFade: false },
        speed: 300,
        modules: [EffectFade, Pagination, Navigation],
        pagination: {
          el: sliderSection.querySelector(".slider-controls__pagination"),
          clickable: true,
          type: "fraction",
          formatFractionCurrent: formatFractionCurrent,
          formatFractionTotal: formatFractionTotal,
        },
        navigation: {
          nextEl: sliderSection.querySelector(".slider-controls__arrow-next"),
          prevEl: sliderSection.querySelector(".slider-controls__arrow-prev"),
        },
      },
    );
  });

  const promoSlider = document.querySelectorAll(".promo-slider__slider");

  if (promoSlider[0]) {
    promoSlider.forEach((slider) => {
      new Swiper(slider.querySelector(".promo-slider__slider-carousel"), {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
        modules: [Navigation],
        navigation: {
          nextEl: slider.querySelector(".slider-controls__arrow-next"),
          prevEl: slider.querySelector(".slider-controls__arrow-prev"),
        },

        breakpoints: {
          1199: {
            slidesPerView: 4,
            spaceBetween: 24,
          },

          939: {
            slidesPerView: 3,
          },

          639: {
            slidesPerView: 2,
          },
        },
      });
    });
  }

  const stepsGallery = document.querySelectorAll(".steps-gallery__slider");

  if (stepsGallery[0]) {
    stepsGallery.forEach((slider) => {
      new Swiper(slider.querySelector(".steps-gallery__slider-carousel"), {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 12,
        modules: [Navigation],
        navigation: {
          nextEl: slider.querySelector(".slider-controls__arrow-next"),
          prevEl: slider.querySelector(".slider-controls__arrow-prev"),
        },

        breakpoints: {
          639: {
            spaceBetween: 24,
          },
        },
      });
    });
  }

  const gallerySectionSlider = document.querySelectorAll(
    ".gallery-section__slider",
  );

  if (gallerySectionSlider[0]) {
    gallerySectionSlider.forEach((slider) => {
      let swiperInstance = null;

      const initSwiper = () => {
        if (window.innerWidth >= 639 && !swiperInstance) {
          swiperInstance = new Swiper(
            slider.querySelector(".gallery-section__slider-carousel"),
            {
              slidesPerView: "auto",
              slidesPerGroup: 1,
              spaceBetween: 12,
              modules: [Navigation],
              navigation: {
                nextEl: slider.querySelector(".slider-controls__arrow-next"),
                prevEl: slider.querySelector(".slider-controls__arrow-prev"),
              },
              breakpoints: {
                939: {
                  spaceBetween: 24,
                },
              },
            },
          );
        } else if (window.innerWidth < 639 && swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }
      };

      initSwiper();
      window.addEventListener("resize", initSwiper);
    });
  }
  initSliders();
});

window.initSliders = initSliders;
