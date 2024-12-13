//send mail phpmailer
const form = document.querySelector('.footer-colomns-form');
const emailInput = document.querySelector('.footer-colomns-field');
const subscribeButton = document.getElementById('subscribeButton');
const buttonText = subscribeButton.querySelector('.button-text');
const spinner = subscribeButton.querySelector('.spinner');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (!email) {
        alert('Please enter a valid email.');
        return;
    }

    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    subscribeButton.disabled = true;

    try {
        const response = await fetch('./send_mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.text();

        if (result === 'OK') {
            alert('Ви успішно підписались, лист відправлено на вашу пошту');
            form.reset();
        } else {
            alert(`Error: ${result}`);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        alert('Something went wrong. Please try again later.');
    } finally {
        spinner.style.display = 'none';
        buttonText.style.display = 'inline-block';
        subscribeButton.disabled = false;
        form.reset();
    }
});

// Swiper

const swiperIntro = new Swiper('.intro-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    allowTouchMove: false,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const swiperVideo = new Swiper('.video-swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    loop: true,
    centeredSlides: true,
    spaceBetween: 105,
    allowTouchMove: true,
    grabCursor: true,
    effect: "coverflow",

    breakpoints: {
        // when window width is >= 320px
        768: {
          spaceBetween: 25
        },
        // when window width is >= 992px
        992: {
          spaceBetween: 75
        },
        // when window width is >= 1200px
        1201: {
          spaceBetween: 105
        },
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Menu

const body = document.body;
const site = document.querySelector(".site-container");
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".btn-menu");
const menuCloseBtn = document.querySelector(".menu-close-btn");

menuBtn.addEventListener("click", () => {
    body.classList.add("no-scroll");
    site.classList.add("overlap");
    menu.classList.add("activ-menu");
});

menuCloseBtn.addEventListener("click", () => {
    body.classList.remove("no-scroll");
    site.classList.remove("overlap");
    menu.classList.remove("activ-menu");
});

// Video player

videojs(document.querySelector(".video-js"));

// Modals

const btnPlay = document.querySelectorAll(".btn-play");
const modalOverlay = document.querySelector(".modal-overlay");
const modals = document.querySelectorAll(".modal");

btnPlay.forEach((el) => {
    el.addEventListener("click", (e) => {
        let path = e.currentTarget.getAttribute("data-path");
        modals.forEach((el) => {
            el.classList.remove("modal--visible");
        });
        modalOverlay.classList.add("modal-overlay--visible");
        document.querySelector(`[data-target="${path}"]`).classList.add("modal--visible");
    });
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target == modalOverlay) {
        modalOverlay.classList.remove("modal-overlay--visible");
        modals.forEach((el) => {
            el.classList.remove("modal--visible");
        });
    }
});