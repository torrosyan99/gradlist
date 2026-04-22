// ===== MENU TOGGLE =====

// кнопка открытия меню
const menuButton = document.querySelector('.header__menu-button')
// само меню
const menu = document.querySelector('.menu')

// переключение состояния меню
function toggleMenu() {
  // показать / скрыть меню
  menu.classList.toggle('menu--active')

  // изменить состояние кнопки (иконка бургер/крест)
  menuButton.classList.toggle('header__menu-button--opened-menu')

  // блокировка скролла страницы
  document.body.classList.toggle('body-overflow')
}

// обработчик клика по кнопке
menuButton.addEventListener('click', toggleMenu)


// ===== INPUT PLACEHOLDER RESPONSIVE =====

const input = document.querySelector('.top__input')

if(input) {
// обновление плейсхолдера в зависимости от ширины
const updatePlaceholder = () => {
  if (window.innerWidth < 768) {
    input.placeholder = 'Поиск' // мобильная версия
  } else {
    input.placeholder = 'Поиск: квартиры, авто, работа ...' // десктоп
  }
}

// первичная инициализация
updatePlaceholder()

// обновление при ресайзе
window.addEventListener('resize', updatePlaceholder)
}

// ===== SWIPER INIT =====

// десктопный слайдер категорий
new Swiper('.top__swiper', {
  slidesPerView: 'auto', // авто ширина слайдов
  spaceBetween: 15, // отступ между элементами
  navigation: {
    nextEl: '.top__next',
    prevEl: '.top__prev',
  },
  on: {
      slideChange: function () {
        const prevBtn = document.querySelector('.top__prev');

        if (this.activeIndex > 0) {
          prevBtn.classList.add('top__prev--active'); // добавляешь свой класс
        } else {
          prevBtn.classList.remove('top__prev--active');
        }
      }
  }
})

// мобильный слайдер
new Swiper('.top__mobile-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
})


// ===== INFINITE SCROLL (LISTINGS) =====

// контейнер со всеми карточками
const container = document.querySelector('.listings__items')
if(container) {
// текущие элементы (первичный рендер)
  const items = Array.from(container.querySelectorAll('.listings__item'))

  const BATCH_SIZE = 16 // сколько добавлять за раз
  let currentIndex = 0 // (заготовка под API)
  let isLoading = false // защита от повторных вызовов

// берём первые 16 как шаблон (будем клонировать)
  const sourceItems = items.slice(0, BATCH_SIZE)

// функция подгрузки следующей пачки
  function loadMore() {
    // защита от двойного вызова
    if (isLoading) return
    isLoading = true

    // используем fragment для оптимизации (1 вставка в DOM)
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < BATCH_SIZE; i++) {
      // клонируем элемент (true = с вложенными нодами)
      const item = sourceItems[i % sourceItems.length].cloneNode(true)
      fragment.appendChild(item)
    }

    // добавляем все элементы одной операцией
    container.appendChild(fragment)

    isLoading = false
  }

// проверка достижения низа страницы
  function handleScroll() {
    const scrollBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200

    // если почти дошли до низа — грузим ещё
    if (scrollBottom) {
      loadMore()
    }
  }

// подписка на скролл
  window.addEventListener('scroll', handleScroll)
}


const swiper = new Swiper(".product__swiper", {
  spaceBetween: 15.5,
  slidesPerView: 'auto',
  freeMode: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".product__slider-next",
    prevEl: ".product__slider-prev",
  },
  on: {
    slideChange: function () {
      const prevBtn = document.querySelector('.product__slider-prev');

      if (this.activeIndex > 0) {
        prevBtn.classList.add('product__slider-prev--active'); // добавляешь свой класс
      } else {
        prevBtn.classList.remove('product__slider-prev--active');
      }
    }
  }
});

if(swiper) {
  new Swiper(".product__main-swiper", {
  loop: true,
  spaceBetween: 10,
  thumbs: {
    swiper: swiper,
  },
});
}

class Tabs {
  constructor(tabsClass) {
    const tabs = document.querySelector(tabsClass);
    if(!tabs) return
    this.data = {};
    this.activeTab = null;
    this.activeButton  = null;


    const tabsButtons = tabs.querySelectorAll('.tabs__button');
    if(tabsButtons.length > 0 ) {
      tabsButtons[0].classList.add('tabs__button--active');
      this.activeButton = tabsButtons[0]
    }
    const tabsItems = tabs.querySelectorAll('.tabs__item');
    for(let i = 0; i < tabsItems.length; i++) {
      const item = tabsItems[i];
      if(i === 0) {
        item.classList.add('tabs__item--active');
        this.activeTab = item;
      }
      this.data[item.dataset.index] = item;
    }

    tabs.addEventListener('click', (e) => {
       const target = e.target;
       const button = target.closest('.tabs__button')
      if(button && button !== this.activeButton ) {
        this.activeButton.classList.remove('tabs__button--active');
        this.activeTab.classList.remove('tabs__item--active');
        button.classList.add('tabs__button--active')
        this.data[button.dataset.index].classList.add('tabs__item--active')

        this.activeButton = button;
        this.activeTab =   this.data[button.dataset.index]
      }

    })

  }
}

const tabs = new Tabs('.product__info');
console.log(tabs)
