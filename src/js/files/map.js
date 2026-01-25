export default () => {
  const targetMap = document.querySelector("#map");

  const callbackMap = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${targetMap.dataset.key}&lang=ru_RU`;
        document.body.append(script);
        
        // Preset иконки Яндекса для разных категорий
        const categoryPresets = {
          school: 'islands#blueEducationCircleIcon',
          kindergarten: 'islands#pinkEducationCircleIcon',
          metro: 'islands#blueMassTransitCircleIcon',
          transport: 'islands#grayRailwayCircleIcon',
          park: 'islands#greenParkCircleIcon',
          sport: 'islands#orangeSportCircleIcon',
          culture: 'islands#violetCinemaCircleIcon',
          hospital: 'islands#redMedicalCircleIcon',
          shop: 'islands#brownShoppingCircleIcon',
          food: 'islands#redFoodCircleIcon',
          education: 'islands#darkBlueEducationCircleIcon',
          residential: 'islands#grayHomeCircleIcon',
          default: 'islands#blueCircleDotCircleIcon'
        };
        
        script.addEventListener("load", () => {
          ymaps.ready(function () {
            const myMap = new ymaps.Map(targetMap, {
              center: JSON.parse(targetMap.dataset.center),
              zoom: JSON.parse(targetMap.dataset.zoom) === undefined ? JSON.parse(targetMap.dataset.zoom) : 16 ,
              controls: ['zoomControl']
            });

            // Получаем метки из data-атрибута
            const marksData = targetMap.dataset.marks 
              ? JSON.parse(targetMap.dataset.marks) 
              : [];

            // Создаем коллекцию для меток
            const myCollection = new ymaps.GeoObjectCollection();

            // Добавляем каждую метку отдельно
            marksData.forEach((mark) => {
              const category = mark.category || 'default';
              const preset = mark.preset || categoryPresets[category] || categoryPresets.default;
              
              const placemark = new ymaps.Placemark(
                mark.coordinates,
                {
                  balloonContentHeader: mark.title || '',
                  balloonContentBody: mark.description || '',
                  balloonContentFooter: mark.footer || '',
                  hintContent: mark.hint || mark.title || '',
                  iconCaption: mark.title || '', // Текст рядом с иконкой
                  category: category
                },
                {
                  preset: preset,
                  zIndex: (mark.category === 'residential' && mark.title === 'ЖК Северный') ? 101 : 100,
                }
              );
              
              myCollection.add(placemark);
            });

            myMap.geoObjects.add(myCollection);

            if (targetMap.dataset.filterCategory) {
              const filterCategory = targetMap.dataset.filterCategory;
              myCollection.each(function(placemark) {
                if (placemark.properties.get('category') !== filterCategory) {
                  myCollection.remove(placemark);
                }
              });
            }

            // Пересчитываем размеры карты после инициализации
            setTimeout(() => {
              myMap.container.fitToViewport();
            }, 100);

            // Пересчитываем при изменении размера окна
            window.addEventListener('resize', () => {
              myMap.container.fitToViewport();
            });
          });
        });
        
        observer.unobserve(entry.target);
      }
    });
  };

  const options = {
    rootMargin: "75px 0px 75px 0px",
    threshold: 0,
  };

  if (targetMap) {
    const observer = new IntersectionObserver(callbackMap, options);
    observer.observe(targetMap);
  }
};