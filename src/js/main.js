window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1.4,
    spaceBetween: 30,
    initialSlide: 1,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
});
