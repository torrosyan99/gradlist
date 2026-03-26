const menuButton = document.querySelector('.header__menu-button');
const menu = document.querySelector('.menu');

function toggleMenu() {
  menu.classList.toggle('menu--active');
  menuButton.classList.toggle('header__menu-button--opened-menu')
  document.body.classList.toggle('body-overflow')
}

menuButton.addEventListener('click', toggleMenu);



const input = document.querySelector('.top__input')

const updatePlaceholder = () => {
  if (window.innerWidth < 768) {
    input.placeholder = 'Поиск'
  } else {
    input.placeholder = 'Поиск: квартиры, авто, работа ...'
  }
}

updatePlaceholder()
window.addEventListener('resize', updatePlaceholder)


new Swiper('.top__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 15,
  navigation: {
    nextEl: '.top__next',
    prevEl: '.top__prev',
  }
})

new Swiper('.top__mobile-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
})