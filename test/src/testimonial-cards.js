// < FUNCTIONALITY >
// 1. click through selectors
// 2. slide through/scroll through cards with mouse or finger
//  a. update selectors to 'active' based on which card is centered
//  b. update which card is centered based on which selector is clicked or 'active'
// 3. have an interval loop through updating the selectors
//  a. loop back to the start if index of cards is equal to the length of the testCards array

const testimonialCards = document.getElementById("testimonial");
const testimonialSelectors = document.getElementById("testSelectors");
const testCards = Array.from(testimonialCards.children);
const testSelectors = Array.from(testimonialSelectors.children);

let scrollAmount = testCards[0].clientWidth + 14;
let scrollPosition = [];

for (let i = 0; i < testCards.length; i++) {
  scrollPosition.push(scrollAmount * i);
}

const scrollInterval = (10 * 1000) / 2;
let scrollIndex = 0;
let scrollTimer = setInterval(scrollThroughSelectors, scrollInterval);

window.addEventListener("load", function () {
  testimonialCards.scrollLeft = 0;
  scrollIndex = 0;
  clearInterval(scrollTimer);
  scrollTimer = setInterval(scrollThroughSelectors, scrollInterval);
});

function scrollThroughSelectors() {
  if (scrollIndex < scrollPosition.length) {
    changeSelector(scrollIndex);
    changeCard(scrollIndex);
    scrollIndex++;
  } else {
    scrollIndex = 0;
  }
}

// run through every selector, check if has 'active' status, then update cards (move) and selectors (change colors)
testSelectors.forEach((selector) => {
  // check if clicked then update cards + selectors
  selector.addEventListener("click", (event) => {
    const clickedSelector = event.target.closest(".test-selectors");

    if (clickedSelector) {
      const clickedIndex = Array.prototype.indexOf.call(
        testSelectors,
        clickedSelector,
      );
      changeSelector(clickedIndex);
      changeCard(clickedIndex);

      // clear timer every time another selector is clicked
      scrollIndex = clickedIndex;
      clearInterval(scrollTimer);
      scrollTimer = setInterval(scrollThroughSelectors, scrollInterval);
    }
  });
  updateSelectors();
});

function updateSelectors() {
  // run through every scrollPosition (scrollLeft value of each card), check if is equal to where the testimonialCards is scrolled to, then update selectors (change colors)
  testimonialCards.addEventListener("scroll", (event) => {
    let cardPosition = testimonialCards.scrollLeft;

    scrollPosition.forEach((position) => {
      // debug
      // console.log(`index: ${scrollIndex}\ncardPosition: ${cardPosition}\nposition: ${position}\n${(Math.abs(position - cardPosition)).toFixed(2)}\nclose?: ${(Math.round(Math.abs(position - cardPosition)) < scrollAmount / 2) ? true : false}`);
      let isClose =
        Math.round(Math.abs(position - cardPosition)) < scrollAmount / 2
          ? true
          : false;

      if (isClose) {
        const scrolledIndex = Array.prototype.indexOf.call(
          scrollPosition,
          position,
        );
        changeSelector(scrolledIndex);

        scrollIndex = scrolledIndex;
      }
    });
    clearInterval(scrollTimer);
    scrollTimer = setInterval(scrollThroughSelectors, scrollInterval);
  });
}

function changeSelector(index) {
  // updates other selectors to 'non-active'
  for (let i = 0; i < testSelectors.length; i++) {
    if (i === index && testSelectors[i].classList.contains("bg-secondary-bg")) {
      testSelectors[i].classList.add("bg-accent");
      testSelectors[i].classList.remove("bg-secondary-bg");
      testCards[i].classList.add("test-active");
    } else if (i !== index) {
      testSelectors[i].classList.add("bg-secondary-bg");
      testSelectors[i].classList.remove("bg-accent");
      testCards[i].classList.remove("test-active");
    }
  }
}

function changeCard(index) {
  testimonialCards.scrollTo({
    left: scrollPosition[index],
    top: 0,
    behavior: "smooth",
  });
}

function navButtons(string) {
  if (string === "left" && scrollIndex > 0) {
    scrollIndex--;
  } else if (string === "right" && scrollIndex < scrollPosition.length - 1) {
    scrollIndex++;
  }
  changeSelector(scrollIndex);
  changeCard(scrollIndex);
  clearInterval(scrollTimer);
  scrollTimer = setInterval(scrollThroughSelectors, scrollInterval);
}
