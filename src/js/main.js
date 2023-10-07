/* eslint-disable no-undef */
window.addEventListener("DOMContentLoaded", () => {
  anim();

  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: 20,
        centeredSlides: false,
      },
      450: {
        slidesPerView: 1.4,
        spaceBetween: 30,
        centeredSlides: true,
        initialSlide: 1,
      },
    },
  });
});

function anim() {
  gsap.registerPlugin(ScrollTrigger);

  const mediaAnimation = gsap.matchMedia();

  mediaAnimation.add("(min-width: 1025px)", () => {
    // Header, preview-image & promo title animation
    //  1- Full-screen header-logo shrinks to its regular size
    //  2- Parallax effect on preview image
    //  3- Promo title moves up from outside of the screen
    gsap.set(".header", {
      height: "100vh",
    });

    gsap.set(".preview__bg", {
      yPercent: 10,
      scale: 1.2,
    });

    const tlHeader = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });

    tlHeader
      .from(".header__logo img", {
        duration: 0.7,
        autoAlpha: 0,
        yPercent: -100,
        stagger: 0.2,
      })
      .to(".header", {
        duration: 0.8,
        height: "auto",
        delay: 0.3,
      })
      .to(
        ".header__logo",
        {
          duration: 0.8,
          scale: 1,
        },
        "<"
      )
      .from(
        ".preview",
        {
          duration: 1.3,
          autoAlpha: 0,
        },
        "<"
      )
      .from(
        ".promo__title",
        {
          duration: 1,
          autoAlpha: 0,
          yPercent: 50,
        },
        "-=0.7"
      );

    gsap.to(".preview__bg", {
      yPercent: -10,
      scrollTrigger: {
        trigger: ".preview",
        start: "top 150px",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Promo section animation - title, text and image change opacity from 0.1 to 1
    gsap.set(".promo__title", {
      opacity: 1,
    });

    gsap.set(".promo__img", {
      opacity: 1,
    });

    const tlPromoTitle = gsap.timeline({
      scrollTrigger: {
        trigger: ".promo__info",
        start: "top 80%",
        end: "top 40%",
        scrub: true,
      },
    });

    tlPromoTitle
      .to(".promo__title", {
        opacity: 0.1,
      })
      .from(
        ".promo__info",
        {
          opacity: 0.1,
        },
        "<"
      )
      .from(
        ".promo__img",
        {
          autoAlpha: 0,
          opacity: 0.1,
        },
        "<"
      );

    // Promo section animation -  text remains in place, images move from bottom to top
    gsap.set(".promo__left-inner", {
      yPercent: 120,
    });

    const tlPromo = gsap.timeline({
      scrollTrigger: {
        trigger: ".promo__wrapper",
        start: "top top",
        end: "bottom+=100%",
        scrub: true,
        pin: true,
      },
    });

    tlPromo
      .to(".promo__left-inner", {
        yPercent: 0,
      })
      .to(
        ".promo__img",
        {
          y: "-100vh",
        },
        "<"
      );

    // Titles fade-away animation
    const opacityTitles = document.querySelectorAll(".opacity-title");

    opacityTitles.forEach((item) => {
      gsap.set(item, {
        opacity: 1,
      });

      gsap.to(item, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: item,
          start: "bottom 50%",
          end: "bottom 10%",
          scrub: true,
        },
      });
    });

    // Features section animation - cards appear from outside bottom of the screen at different speeds
    gsap.from(
      ".features__item",
      {
        opacity: 0.1,
        yPercent: "random([20, 30, 40])",
        stagger: {
          from: "center",
          each: 0.1,
        },
        scrollTrigger: {
          trigger: ".features__wrapper",
          start: "top 85%",
          end: "top 40%",
          scrub: true,
        },
      },
      "<"
    );

    // Tradition section - background-color change, emerging text
    gsap.set(".tradition", {
      background: "#100F0D",
    });

    gsap.set(".tradition__title", {
      color: "#EDEAE2",
    });

    const tlBg = gsap.timeline({
      scrollTrigger: {
        trigger: ".tradition",
        start: "top 50%",
        end: "bottom 50%",
        duration: 0.7,
        toggleActions: "play reverse play reverse",
      },
    });

    tlBg
      .to("body", {
        background: "#EDEAE2",
      })
      .to(
        ".features__name",
        {
          color: "#BB9930",
        },
        "<"
      )
      .to(
        ".tradition",
        {
          background: "#EDEAE2",
        },
        "<"
      )
      .to(
        ".tradition__title",
        {
          color: "#BB9930",
        },
        "<"
      );

    gsap.from(".tradition__info", {
      opacity: 0.1,
      scrollTrigger: {
        trigger: ".tradition__info",
        start: "top 80%",
        end: "top 40%",
        scrub: true,
      },
    });

    // Parallax effect on images
    gsap.set(".parallax img", {
      scale: 1.3,
      yPercent: 15,
    });

    const parallaxBlocks = document.querySelectorAll(".parallax");

    parallaxBlocks.forEach((block) => {
      const img = block.querySelector("img");

      gsap.to(img, {
        yPercent: -15,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    });

    // Country section animation - text gradually appears
    gsap.from(".country__right", {
      scrollTrigger: {
        trigger: ".country__right p:first-of-type",
        start: "top 80%",
        end: "top 40%",
        scrub: true,
      },
      opacity: 0.1,
    });

    // Story section - background-color change  for smoother transition to footer
    gsap.set(".story", {
      background: "#100F0D",
    });

    gsap.set(".story__title", {
      color: "#EDEAE2",
    });

    const tlStory = gsap.timeline({
      scrollTrigger: {
        trigger: ".story",
        start: "top 50%",
        end: "bottom 50%",
        duration: 0.7,
        toggleActions: "play reverse play reverse",
      },
    });

    tlStory
      .to("body", {
        background: "#EDEAE2",
      })
      .to(
        ".country__right",
        {
          color: "#100F0D",
        },
        "<"
      )
      .to(
        ".story",
        {
          background: "#EDEAE2",
        },
        "<"
      )
      .to(
        ".story__title",
        {
          color: "#BB9930",
        },
        "<"
      );

    // Story section - horizontal scroll
    const sections = gsap.utils.toArray(".slider__slide");
    const sectionsContainer = document.querySelector(".story__slider");

    const horisontal = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".slider__wrapper",
        pin: true,
        start: "top top",
        scrub: 1,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / (sections.length - 1),
          inertia: false,
          duration: { min: 0.2, max: 1 },
          delay: 0.2,
          ease: "power1.inOut",
        },
        end: () => "+=" + (sectionsContainer.offsetWidth - innerWidth),
      },
    });

    // Story section - emerging text
    document.querySelectorAll(".slider__text").forEach((item, index) => {
      gsap.set(item, {
        opacity: 0.1,
      });

      if (index != 0) {
        gsap.to(item, {
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "left 60%",
            end: "+=500",
            scrub: 1,
            containerAnimation: horisontal,
          },
        });
      } else {
        gsap.to(item, {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: ".slider__wrapper",
            start: "top top",
            once: true,
          },
        });
      }
    });

    // Footer animation - emerging text and logo
    const tlFooter = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "90% bottom",
      },
    });

    tlFooter
      .from(".footer__bottom", {
        autoAlpha: 0,
      })
      .from(".footer__logo", {
        autoAlpha: 0,
        scale: 0.6,
        duration: 1.75,
        ease: "bounce.out",
      });
  });

  mediaAnimation.add("(max-width: 1024px)", () => {
    // Header, preview-image & promo title animation
    //  1- Full-screen header-logo shrinks to its regular size
    //  2- Parallax effect on preview image
    //  3- Promo title moves up from outside of the screen
    gsap.set(".header", {
      height: "100vh",
    });

    gsap.set(".preview__bg", {
      yPercent: 10,
      scale: 1.2,
    });

    const tlHeader = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });

    tlHeader
      .from(".header__logo img", {
        duration: 0.7,
        autoAlpha: 0,
        yPercent: -100,
        stagger: 0.2,
      })
      .to(".header", {
        duration: 0.8,
        height: "auto",
        delay: 0.3,
      })
      .from(
        ".preview",
        {
          duration: 1.3,
          autoAlpha: 0,
        },
        "<"
      )
      .from(
        ".promo__title",
        {
          duration: 1,
          autoAlpha: 0,
          yPercent: 50,
        },
        "-=0.7"
      );

    gsap.to(".preview__bg", {
      yPercent: -10,
      scrollTrigger: {
        trigger: ".preview",
        start: "top 126px",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Promo section animation - title, text and image change opacity from 0.1 to 1
    gsap.set(".promo__title", {
      opacity: 1,
    });

    const tlPromoTitle = gsap.timeline({
      scrollTrigger: {
        trigger: ".promo__info",
        start: "top 80%",
        end: "top 40%",
        scrub: true,
      },
    });

    tlPromoTitle
      .to(".promo__title", {
        opacity: 0.1,
      })
      .from(
        ".promo__info",
        {
          opacity: 0.1,
        },
        "<"
      );

    // Titles fade-away animation
    document.querySelector(".story__title").classList.remove("opacity-title");
    const opacityTitles = document.querySelectorAll(".opacity-title");

    opacityTitles.forEach((item) => {
      gsap.set(item, {
        opacity: 1,
      });

      gsap.to(item, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: item,
          start: "bottom 50%",
          end: "bottom 10%",
          scrub: true,
        },
      });
    });

    // Features section animation - emerging cards
    const items = document.querySelectorAll(".features__item");

    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "bottom 80%",
          scrub: true,
        },
      });
    });

    // Tradition section - background-color change
    gsap.set(".tradition", {
      background: "#100F0D",
    });

    gsap.set(".tradition__title", {
      color: "#EDEAE2",
    });

    const tlBg = gsap.timeline({
      scrollTrigger: {
        trigger: ".tradition",
        start: "top 35%",
        end: "90% bottom",
        duration: 0.7,
        toggleActions: "play reverse play reverse",
      },
    });

    tlBg
      .to("body", {
        background: "#EDEAE2",
      })
      .to(
        ".features__name",
        {
          color: "#BB9930",
        },
        "<"
      )
      .to(
        ".tradition",
        {
          background: "#EDEAE2",
        },
        "<"
      )
      .to(
        ".tradition__title",
        {
          color: "#BB9930",
        },
        "<"
      );

    // Parallax effect on images
    gsap.set(".parallax img", {
      scale: 1.3,
      yPercent: 15,
    });

    const parallaxBlocks = document.querySelectorAll(".parallax");

    parallaxBlocks.forEach((block) => {
      const img = block.querySelector("img");

      gsap.to(img, {
        yPercent: -15,
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    });

    // Story section - background-color change for smoother transition to footer
    ScrollTrigger.refresh();

    gsap.set(".story", {
      background: "#100F0D",
    });

    gsap.set(".story__title", {
      opacity: 1,
    });

    gsap.set(".story__title", {
      color: "#EDEAE2",
    });

    const tlStory = gsap.timeline({
      scrollTrigger: {
        delay: 5,
        trigger: ".story",
        start: "top 50%",
        end: "bottom 50%",
        duration: 0.7,
        toggleActions: "play reverse play reverse",
      },
    });

    tlStory
      .to("body", {
        background: "#EDEAE2",
      })
      .to(
        ".country__right",
        {
          color: "#100F0D",
        },
        "<"
      )
      .to(
        ".story",
        {
          background: "#EDEAE2",
        },
        "<"
      )
      .to(
        ".story__title",
        {
          color: "#BB9930",
        },
        "<"
      );

    // Story section - title fade-away

    gsap.to(".story__title", {
      opacity: 0.1,
      scrollTrigger: {
        trigger: ".story__title",
        start: "bottom 50%",
        end: "bottom 10%",
        scrub: true,
      },
    });

    // Footer animation - emerging logo
    gsap.from(".footer__logo", {
      scrollTrigger: {
        trigger: ".footer",
        start: "90% bottom",
      },
      autoAlpha: 0,
      scale: 0.6,
      duration: 1.75,
      ease: "bounce.out",
    });
  });
}
