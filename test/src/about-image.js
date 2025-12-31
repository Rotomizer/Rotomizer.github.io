let imageCount = 0;
const initialDelay = 8 * 1000;
const subsequentInterval = 5 * 1000;
let carouselTimer = setTimeout(nextImage, subsequentInterval);

const aboutImage = document.getElementById("about-image");
const selectorParent = document.getElementById("about-selectors");
const selectors = Array.from(selectorParent.children);
const images = [
  { src: "../images/About-us-1.webp", alt: "" },
  { src: "../images/About-us-2.webp", alt: "" },
  { src: "../images/About-us-3.webp", alt: "" },
  { src: "../images/About-us-4.webp", alt: "" },
  { src: "../images/About-us-5.webp", alt: "" },
  { src: "../images/About-us-6.webp", alt: "" },
  { src: "../images/About-us-7.webp", alt: "" },
  { src: "../images/About-us-8.webp", alt: "" },
];

window.addEventListener('load', function() {
  imageCount = 0;
  timer();
});

function changeImage(num) {
  aboutImage.src = images[num].src;

  selectors.forEach((element) => {
    element.classList.remove("bg-accent");
    element.classList.add("bg-secondary-bg");
  });

  selectors[num].classList.remove("bg-secondary-bg");
  selectors[num].classList.add("bg-accent");

  imageCount = num;
}

function nextImage() {
  changeImage(imageCount);
  if (imageCount < 7) {
    ++imageCount;
  } else {
    imageCount = 0;
  }
}

function timer() {
  clearTimeout(carouselTimer);
  carouselTimer = setTimeout(function run() {
    nextImage();
    carouselTimer = setTimeout(run, subsequentInterval);
  }, initialDelay);
}
