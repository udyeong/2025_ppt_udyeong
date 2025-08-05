var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,  //브라우저가 768보다 클 때
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,  //브라우저가 1024보다 클 때
            spaceBetween: 20,
        },
    },
});