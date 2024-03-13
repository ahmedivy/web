document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.style.display = "flex";
      } else {
        slide.style.display = "none";
      }
    });
  }, 3000);
});
