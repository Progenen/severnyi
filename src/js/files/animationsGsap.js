export function headerMnuAnimation() {
  const tl = gsap.timeline({ paused: true });

  tl
    .to(".header__menu", {
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    })
    .from(
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

