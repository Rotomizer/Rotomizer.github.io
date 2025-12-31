const navScroll = document.getElementById('scroll-nav');
const navBarHeight = navScroll.clientHeight;

window.addEventListener('scroll', function () {
    if (window.scrollY > navBarHeight) {
        navScroll.classList.add('top-0');
    } else {
        navScroll.classList.remove('top-0');
    }
});