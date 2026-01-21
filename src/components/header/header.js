import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  if (!header) return;

  const burger = document.querySelector(".header__burger");
  const headerMenu = document.querySelector(".header__menu");
  const menuListItems = headerMenu.querySelectorAll(".header__menu-list li");
  const menuUi = headerMenu.querySelector(".header__menu-ui");

  const uiBtns = document.querySelector(".header__ui-btns");
  const uiBtnsParent = uiBtns.parentElement;

  const firstSection = document.querySelector("main section:first-child");

  let isMobile = false;
  let isOpen = false;
  let menuTl = null;

  function createMenuAnimation() {
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });

    tl.to(headerMenu, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      pointerEvents: "auto",
    });

    if (menuListItems.length) {
      tl.from(
        menuListItems,
        { y: 24, autoAlpha: 0, duration: 0.4, stagger: 0.08 },
        "-=0.3",
      );
    }

    const menuButtons = menuUi.querySelectorAll(".header__button");
    console.log(menuButtons);
    if (menuButtons.length) {
      if (menuButtons.length) {
        tl.fromTo(
          menuButtons,
          { y: 16, scale: 0.95, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.1 },
          "-=0.2",
        );
      }
    }

    return tl;
  }

  function moveUiButtons() {
    if (window.innerWidth <= 1199 && !isMobile) {
      menuUi.appendChild(uiBtns);
      isMobile = true;
      menuTl = createMenuAnimation();
    } else if (window.innerWidth > 1199 && isMobile) {
      uiBtnsParent.insertBefore(uiBtns, burger);
      isMobile = false;
      if (menuTl) menuTl.progress(0).pause();
      document.body.classList.remove("no-scroll", "menu-open");
      isOpen = false;
    }
  }

  function toggleMenu() {
    if (!isMobile || !menuTl) return;

    if (!isOpen) {
      menuTl.play();
      document.body.classList.add("no-scroll", "menu-open");
    } else {
      menuTl.reverse();
      document.body.classList.remove("no-scroll", "menu-open");
    }
    isOpen = !isOpen;
  }

  function updatePadding() {
    if (firstSection && !document.querySelector(".header--alt"))
      firstSection.style.paddingTop = `${header.clientHeight}px`;
    if (headerMenu && window.innerWidth <= 1199)
      headerMenu.style.paddingTop = `${header.clientHeight}px`;
  }

  function handleResize() {
    moveUiButtons();
    updatePadding();
  }

  burger.addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleResize);
  handleResize();
});
