/* eslint-disable no-unused-vars */

window.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line no-undef
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
