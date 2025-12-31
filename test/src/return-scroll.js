const returnButton = document.getElementById('returnButton');
let startScroll = window.scrollY;

window.addEventListener('scrollend', () => {
    if (window.pageYOffset - startScroll < 0 && window.scrollY !== 0) {
        returnButton.classList.add('bottom-7');
        returnButton.classList.remove('-bottom-100');
    } else {
        returnButton.classList.add('-bottom-100');
        returnButton.classList.remove('bottom-7');
    }
    startScroll = window.pageYOffset;
});

function backToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}