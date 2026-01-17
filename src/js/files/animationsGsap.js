import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function headerMnuAnimation() {
  const tl = gsap.timeline({ paused: true });

  tl.to(".header__menu", {
    y: 0,
    duration: 0.5,
    ease: "power3.out",
  }).from(
    ".header__menu li",
    {
      y: 24,
      autoAlpha: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power3.out",
    },
    "-=0.3"
  );

  return tl;
}

export function animateMapPoints() {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".text-map")) {
      const mapSection = document.querySelector(".text-map");
      const points = document.querySelectorAll(".text-map__map-point");
      const logo = document.querySelector(".text-map__map-point-logo");

      if (!mapSection || !points.length) return;

      // Начальное состояние
      gsap.set(points, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        transformOrigin: "center center",
      });

      gsap.set(logo, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        transformOrigin: "center center",
      });

      // Группировка точек по рядам
      const rows = [
        [points[0], points[1]],
        [points[2], points[3]],
        [points[4], points[5]],
        [points[6], points[7]],
        [points[8], points[9]],
      ];

      // Timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mapSection,
          start: "top 60%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Анимация рядов
      rows.forEach((row, index) => {
        timeline.to(
          row,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
          },
          index * 0.2
        );
      });

      // Анимация логотипа
      timeline.to(
        logo,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  });
}

export function fullImageParallax() {
  if (document.querySelector(".img-parallax")) {
    gsap.to(".img-parallax__img", {
      y: "20%",
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".img-parallax",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

export function marque() {
  if (document.querySelector(".marquee")) {
    const track = document.querySelector(".marquee__track");
    const content = document.querySelector(".marquee__content");

    // Клонируем достаточно раз, чтобы заполнить экран
    const contentWidth = content.offsetWidth;
    const screenWidth = window.innerWidth;
    const clonesNeeded = Math.ceil(screenWidth / contentWidth) + 2;

    for (let i = 0; i < clonesNeeded; i++) {
      const clone = content.cloneNode(true);
      track.appendChild(clone);
    }

    // Анимация
    const allContent = track.querySelectorAll(".marquee__content");
    const speed = 50; // Пиксели в секунду

    gsap.to(allContent, {
      x: -contentWidth,
      duration: contentWidth / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % contentWidth),
      },
    });
  }
}

export function fadeOutTextBannerAnimation() {
  if (document.querySelector(".text-banner")) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".text-banner",
          start: "top center", // Начинаем когда верх блока достигнет центра экрана
          toggleActions: "play none none none",
          once: true, // Анимация воспроизводится только один раз
        },
      })
      .from(".text-banner__title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
      .from(
        ".text-banner__icon",
        {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.6"
      );
  }
}

export function animatePlaneTabSwitch(currentSlider, targetSlider, currentInfo, targetInfo) {
  const timeline = gsap.timeline({
    defaults: {
      duration: 0.6,
      ease: "power2.inOut"
    }
  });

  timeline
    .to([currentSlider, currentInfo], {
      opacity: 0,
      y: 5,
      duration: 0.5,
      onComplete: () => {
        currentSlider?.classList.remove('plane__slider--active');
        currentInfo?.classList.remove('plane__info-item--active');
        
        targetSlider?.classList.add('plane__slider--active');
        targetInfo?.classList.add('plane__info-item--active');
      }
    })
    // Анимация появления новых элементов
    .fromTo([targetSlider, targetInfo], 
      {
        opacity: 0,
        y: -5
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7
      },
      "-=0.2" // Небольшое перекрытие анимаций
    );
}