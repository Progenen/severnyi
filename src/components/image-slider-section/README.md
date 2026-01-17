# image-slider-section

Универсальный компонент: слайдер изображений со статичным контентом

## Описание

Компонент состоит из двух частей (50/50):
- **Левая часть**: Слайдер изображений с fade-эффектом
- **Правая часть**: Статичный контент (заголовок, текст, список, кнопки)

## Структура БЭМ

```
.image-slider-section                    # Блок
├── .image-slider-section__container     # Элемент: контейнер
│   └── .image-slider-section__row       # Элемент: строка
│       ├── .image-slider-section__left  # Элемент: левая часть
│       │   ├── .image-slider-section__slider         # Элемент: слайдер
│       │   │   └── .image-slider-section__slide      # Элемент: слайд
│       │   └── .image-slider-section__controls       # Элемент: контролы
│       │
│       └── .image-slider-section__right              # Элемент: правая часть
│           └── .image-slider-section__content        # Элемент: обертка
│               ├── .image-slider-section__title      # Элемент: заголовок
│               ├── .image-slider-section__description # Элемент: описание
│               │   ├── .image-slider-section__list   # Элемент: список
│               │   │   └── .image-slider-section__list-item  # Элемент: элемент
│               │   │       ├── .image-slider-section__list-number # Элемент: номер
│               │   │       └── .image-slider-section__list-text   # Элемент: текст
│               │   └── .image-slider-section__note   # Элемент: примечание
│               └── .image-slider-section__button     # Элемент: кнопка
```

## Использование

### Базовое включение

```html
@@include('components/image-slider-section/image-slider-section.html',{})
```

### Кастомизация контента

Скопируйте HTML в нужную страницу и измените:
- Изображения в слайдах
- Заголовок
- Описание
- Элементы списка
- Текст кнопки

## Особенности

### Слайдер изображений
- Эффект: fade (плавное затухание)
- Скорость: 1000ms
- Навигация: стрелки + счетчик
- Формат счетчика: "01 / 03"

### Контент
- Темный фон (#3c445b)
- Белый текст
- Нумерованный список с уникальным дизайном
- Две кнопки (текстовая + иконка)

## Адаптивность

### Desktop (1440px+)
- Две колонки по 50%
- Высота: 800px
- Контролы слева внизу

### Tablet (768px - 1199px)
- Колонки сверху вниз (column-reverse)
- Слайдер сверху, контент снизу
- Высота слайдера: 400px

### Mobile (< 768px)
- Высота слайдера: 320px
- Кнопки в колонку (100% ширины)
- Уменьшенные отступы и размеры

## Зависимости

- `slider-controls` - компонент управления
- Swiper.js модули: EffectFade, Pagination, Navigation
- Иконки: `icon-arrow-right`

## Стилизация

### Цвета
- Фон правой части: `cl(drkBlu)` (#3c445b)
- Текст: `cl(whte)` (белый)
- Номера списка: rgba(80, 88, 111, 0.3) + border #50586f
- Текст списка: #50586f
- Кнопка: #50586f

### Шрифты
- Заголовок: Benzin, 36px
- Текст: Onest, 16px
- Номера списка: Benzin, 14px
- Счетчик: Benzin, 32px / 20px

## JavaScript

Инициализация в `src/js/files/sliders.js`:

```javascript
const imageSliderSections = document.querySelectorAll(".image-slider-section");

imageSliderSections.forEach((sliderSection) => {
  new Swiper(
    sliderSection.querySelector(".image-slider-section__slider"),
    {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1000,
      modules: [EffectFade, Pagination, Navigation],
      pagination: {
        el: sliderSection.querySelector(".slider-controls__pagination"),
        clickable: true,
        type: "fraction",
      },
      navigation: {
        nextEl: sliderSection.querySelector(".slider-controls__arrow-next"),
        prevEl: sliderSection.querySelector(".slider-controls__arrow-prev"),
      },
    }
  );
});
```

## Изображения

Размещайте изображения в:
```
src/img/pages/home/ready-solution/
├── img1.jpg
├── img2.jpg
└── img3.jpg
```

Рекомендуемые размеры: 1440x1600px (2:1 aspect ratio)

## Пример контента

```html
<section class="image-slider-section">
  <!-- Левая часть: слайдер изображений -->
  <div class="image-slider-section__left">
    <!-- 3-5 изображений -->
  </div>
  
  <!-- Правая часть: контент -->
  <div class="image-slider-section__right">
    <h2>Ваш заголовок</h2>
    <p>Ваше описание</p>
    <ul>
      <li>Пункт 1</li>
      <li>Пункт 2</li>
    </ul>
    <button>Действие</button>
  </div>
</section>
```

## Когда использовать

✅ Используйте этот компонент когда:
- Нужен слайдер изображений с описанием
- Контент статичен (не меняется вместе с изображениями)
- Нужен список преимуществ/особенностей
- Нужна CTA кнопка

❌ НЕ используйте когда:
- Текст должен меняться вместе с изображениями (используйте `text-image-slider`)
- Не нужен слайдер (используйте `text-image-section`)
- Нужен полноэкранный слайдер (используйте `fullscreen-slider`)

## История

Создан: 15 января 2026  
Автор: AI Assistant  
Версия: 1.0.0
