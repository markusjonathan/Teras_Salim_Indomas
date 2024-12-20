// Ganti-Ganti halaman about
(function () {
  let atas = document.querySelector("#main1");
  let bawah = document.querySelector("#main2");
  let tengah = document.querySelector("#main3");
  let halaman_atas = document.querySelector("#about-head");
  let halaman_bawah = document.querySelector("#about-head2");
  let halaman_tengah = document.querySelector("#about-head3");

  bawah.addEventListener("click", () => {
    atas.classList.remove("active-nav-main");
    bawah.classList.add("active-nav-main");
    tengah.classList.remove("active-nav-main");
    halaman_bawah.classList.add("active-nav-main");
    halaman_atas.classList.remove("active-nav-main");
    halaman_tengah.classList.remove("active-nav-main");
  });

  atas.addEventListener("click", () => {
    atas.classList.add("active-nav-main");
    bawah.classList.remove("active-nav-main");
    tengah.classList.remove("active-nav-main");
    halaman_atas.classList.add("active-nav-main");
    halaman_bawah.classList.remove("active-nav-main");
    halaman_tengah.classList.remove("active-nav-main");
  });

  tengah.addEventListener("click", () => {
    atas.classList.remove("active-nav-main");
    bawah.classList.remove("active-nav-main");
    tengah.classList.add("active-nav-main");
    halaman_atas.classList.remove("active-nav-main");
    halaman_bawah.classList.remove("active-nav-main");
    halaman_tengah.classList.add("active-nav-main");
  });
})();

// Slider
(function () {
  const container = document.querySelector(".slider-feature-container");
  const slides = document.querySelectorAll(".slide-feature");
  const slides_length = slides.length;
  const icons = document.querySelectorAll(".slide-icon-feature");
  const btn_next = document.querySelector(".next-btn");
  const btn_prev = document.querySelector(".prev-btn");
  let index = 0;
  let automatic_slider;

  let automatic = () => {
    automatic_slider = setInterval(function () {
      slides.forEach((slide) => {
        slide.classList.remove("active-feature");
      });
      icons.forEach((icon) => {
        icon.classList.remove("active-feature");
      });

      index++;

      if (index > slides_length - 1) {
        index = 0;
      }

      slides[index].classList.add("active-feature");
      icons[index].classList.add("active-feature");
    }, 6000);
  };
  automatic();

  btn_next.addEventListener("click", () => {
    slides.forEach((slide) => {
      slide.classList.remove("active-feature");
    });
    icons.forEach((icon) => {
      icon.classList.remove("active-feature");
    });

    index++;

    if (index > slides_length - 1) {
      index = 0;
    }

    slides[index].classList.add("active-feature");
    icons[index].classList.add("active-feature");
  });

  btn_prev.addEventListener("click", () => {
    slides.forEach((slide) => {
      slide.classList.remove("active-feature");
    });
    icons.forEach((icon) => {
      icon.classList.remove("active-feature");
    });

    index--;

    if (index < 0) {
      index = slides_length - 1;
    }

    slides[index].classList.add("active-feature");
    icons[index].classList.add("active-feature");
  });

  container.addEventListener("mouseover", () => {
    clearInterval(automatic_slider);
  });

  container.addEventListener("mouseout", () => {
    automatic();
  });
})();
