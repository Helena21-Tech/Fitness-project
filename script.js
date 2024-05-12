"use strict";
const header = document.querySelector(".main-header");
const nav = document.querySelector(".nav");
const section2 = document.querySelector(".section-2");
const classes = document.querySelectorAll(".classes");
const programs = document.querySelector(".part-1-main");
const btnLeft = document.querySelector(".arrow-left");
const btnRight = document.querySelector(".arrow-right");
const packs = document.querySelector(".packages");
const allSlides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-btn");
const packAll = document.querySelectorAll(".package");
const dots = document.querySelectorAll(".dot");
const allPrograms = [...programs.children];

//review slides functionality
let curReview = 0;
nextBtn.addEventListener("click", function (e) {
  if (curReview < allSlides.length - 1) curReview++;
  else curReview = 0;
  allSlides.forEach((review) => {
    if (curReview <= allSlides.length - 1) {
      review.style.transform = `translateX(${curReview * -100}%)`;
    } else {
      review.style.transform = `translateX(0%)`;
    }
  });
  activeDot();
  console.log("NEXT");
});
const activeDot = function () {
  dots.forEach((dot) => {
    dot.classList.remove("dot-active");
  });
  dots[curReview].classList.add("dot-active");
};
activeDot();
//activating a selected package
packs.addEventListener("click", function (e) {
  const plan = e.target.closest(".package");
  if (!plan) return;
  packAll.forEach((pack) => pack.classList.remove("package-active"));
  plan.classList.add("package-active");
});
let curSlide = 0;
//slider using the arrow btns
const goToSlide = function (slide) {
  allPrograms.forEach((program, index, arr) => {
    program.classList.remove("program-active");
    if (slide !== arr.length - 1) {
      program.style.transform = `translateX(${15 * index - 60 * slide}%)`;
      if (index === slide) program.classList.add("program-active");
    } else {
      program.style.transform = `translateX(${15 * index - 50 * slide}%)`;
      arr[slide].classList.add("program-active");
    }
  });
};
goToSlide(0);
const prevSlide = function () {
  if (curSlide === 0) curSlide = allPrograms.length - 1;
  else curSlide--;
  goToSlide(curSlide);
};
const nextSlide = function () {
  if (curSlide < allPrograms.length - 1) curSlide++;
  else curSlide = 0;
  goToSlide(curSlide);
};
btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);
//using key events to change the active slide
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});
//using event delegation to set the active class on any program
programs.addEventListener("click", function (e) {
  const clicked = e.target.closest(".program");

  allPrograms.forEach((program) => {
    program.classList.remove("program-active");
    if (program === clicked) {
      program.classList.add("program-active");
    }
  });
});
const btnSeeAll = document.querySelector(".btn-seeAll");
btnSeeAll.addEventListener("click", function (e) {
  [...classes][1].classList.toggle("class-hidden");
});

//Sticky navigation functionality
const navHeight = nav.getBoundingClientRect().height;
const obsCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const observeHeader = new IntersectionObserver(obsCallback, obsOptions);
observeHeader.observe(header);
