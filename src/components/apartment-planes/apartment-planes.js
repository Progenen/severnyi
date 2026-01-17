// Логика переключения табов для планировок квартир
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.apartment-planes__switchs-item');
    const sliders = document.querySelectorAll('.apartment-planes__slider');
    const infoBlocks = document.querySelectorAll('.apartment-planes__info-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabIndex = button.getAttribute('data-tab-plane');

            // Удаляем активный класс со всех кнопок
            tabButtons.forEach(btn => {
                btn.classList.remove('apartment-planes__switchs-item--active');
            });

            // Добавляем активный класс на текущую кнопку
            button.classList.add('apartment-planes__switchs-item--active');

            // Переключаем слайдеры
            sliders.forEach(slider => {
                if (slider.getAttribute('data-tab-plane') === tabIndex) {
                    slider.classList.add('apartment-planes__slider--active');
                } else {
                    slider.classList.remove('apartment-planes__slider--active');
                }
            });

            // Переключаем информационные блоки
            infoBlocks.forEach(block => {
                if (block.getAttribute('data-tab-plane') === tabIndex) {
                    block.classList.add('apartment-planes__info-item--active');
                } else {
                    block.classList.remove('apartment-planes__info-item--active');
                }
            });
        });
    });
});
