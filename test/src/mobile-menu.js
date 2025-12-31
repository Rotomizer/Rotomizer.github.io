const mobile = document.getElementById("mobile-menu");
const menuButton = document.getElementById("menu-button");
const closeButton = document.getElementById("close-button");

function toggleMenu() {
  let scrollPosition = window.pageYOffset;

  if (mobile.classList.contains("show-menu")) {
    mobile.classList.toggle("show-menu");
    mobile.classList.toggle("hide-menu");

    menuButton.classList.toggle("hidden");
    closeButton.classList.toggle("hidden");

    window.onscroll = null;
  } else if (mobile.classList.contains("hide-menu")) {
    mobile.classList.toggle("hide-menu");
    mobile.classList.toggle("show-menu");

    menuButton.classList.toggle("hidden");
    closeButton.classList.toggle("hidden");

    // set window scroll Y to the locked value in scrollPosition
    window.onscroll = function () {window.scrollTo(0, scrollPosition)};
  }
}
