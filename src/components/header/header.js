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
  let lastScroll = 0;
  let headerShow = false;
  const headerAlt = header.classList.contains("header--alt") ? true : false;

  const MOBILE_BREAKPOINT = 1199;
  const UI_BUTTONS_BREAKPOINT = 639;

  function createMenuAnimation() {
    if (menuTl) {
      menuTl.kill();
    }

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

    if (menuButtons.length) {
      tl.fromTo(
        menuButtons,
        { y: 16, scale: 0.95, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.1 },
        "-=0.2",
      );
    }

    return tl;
  }

  function resetButtonStyles() {
    const allButtons = document.querySelectorAll(".header__button");
    if (allButtons.length) {
      gsap.set(allButtons, {
        clearProps: "all",
      });
    }
  }

  function setDesktopStyles() {
    gsap.set(headerMenu, {
      clearProps: "all",
    });

    gsap.set(menuListItems, {
      clearProps: "all",
    });

    resetButtonStyles();
  }

  function handleMenuAnimation() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      if (!menuTl) {
        menuTl = createMenuAnimation();
      }
    } else {
      if (menuTl) {
        menuTl.progress(0).pause();
        menuTl.kill();
        menuTl = null;
      }
      if (isOpen) {
        document.body.classList.remove("lock", "menu-open");
        isOpen = false;
      }
      setDesktopStyles();
    }
  }

  function moveUiButtons() {
    const currentWidth = window.innerWidth;
    const needsRecreate = menuTl !== null;

    if (currentWidth <= UI_BUTTONS_BREAKPOINT) {
      if (!isMobile) {
        menuUi.appendChild(uiBtns);
        isMobile = true;

        if (needsRecreate && currentWidth <= MOBILE_BREAKPOINT) {
          menuTl.kill();
          menuTl = createMenuAnimation();
        }
      }
    } else {
      if (isMobile) {
        uiBtnsParent.insertBefore(uiBtns, burger);
        isMobile = false;

        resetButtonStyles();

        if (needsRecreate && currentWidth <= MOBILE_BREAKPOINT) {
          menuTl.kill();
          menuTl = createMenuAnimation();
        }
      }
    }
  }

  function toggleMenu() {
    if (window.innerWidth > MOBILE_BREAKPOINT) return;

    if (!menuTl) {
      menuTl = createMenuAnimation();
    }

    if (!isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    if (menuTl) {
      document.body.classList.add("lock", "menu-open");
      isOpen = true;
      menuTl.play();
    }
  }

  function closeMenu() {
    if (!isOpen) return;

    if (menuTl) {
      menuTl.reverse();
      // Убираем блокировку только после завершения анимации закрытия
      menuTl.eventCallback("onReverseComplete", () => {
        document.body.classList.remove("lock", "menu-open");
        isOpen = false;
      });
    } else {
      document.body.classList.remove("lock", "menu-open");
      isOpen = false;
    }
  }

  function updatePadding() {
    const headerHeight = header.clientHeight;

    if (firstSection && !document.querySelector(".header--alt")) {
      firstSection.style.paddingTop = `${headerHeight}px`;
    }

    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      headerMenu.style.paddingTop = `${headerHeight}px`;
    } else {
      headerMenu.style.paddingTop = "";
    }
  }

  function headerFloat() {
    window.addEventListener("scroll", (event) => {
      let scrollY = window.scrollY;

      if (scrollY < header.clientHeight) {
        header.classList.remove("header--fixed");
        header.classList.remove("header--fixed-show");
        headerAlt || header.classList.remove("header--alt");
        headerShow = false;
        return;
      } else {
        header.classList.add("header--fixed");
        headerAlt || header.classList.add("header--alt");
      }

      if (!headerShow && lastScroll < scrollY) {
        headerShow = true;
        header.classList.add("header--fixed-show");
      } else if (headerShow && lastScroll > scrollY) {
        headerShow = false;
        header.classList.remove("header--fixed-show");
      }

      lastScroll = scrollY;
    });
  }

  function handleResize() {
    moveUiButtons();
    handleMenuAnimation();
    updatePadding();
  }

  let resizeTimer;
  function debouncedResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  }

  burger.addEventListener("click", toggleMenu);
  window.addEventListener("resize", debouncedResize);

  handleResize();
  headerFloat();
});
