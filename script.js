document.addEventListener("DOMContentLoaded", function () {
  // Получаем форму и элементы ввода
  var tileForm = document.getElementById("tileForm");  // Получаем форму
  var tileXInput = document.getElementById("tileX");    // Получаем поле для ввода X
  var tileYInput = document.getElementById("tileY");    // Получаем поле для ввода Y
  var zoomLevelInput = document.getElementById("zoomLevel");  // Получаем поле для уровня масштабирования

  // Функция для расчета координат и вывода результата
  function calculateCoordinates(event) {
    event.preventDefault(); // Отменяем отправку формы

    // Получаем значения из полей ввода
    var tileX = parseInt(tileXInput.value);
    var tileY = parseInt(tileYInput.value);
    var zoom = parseInt(zoomLevelInput.value);

    // Валидация уровня масштабирования (zoom)
    if (zoom < 0 || zoom > 23) {
      alert("Уровень масштабирования должен быть в диапазоне от 0 до 23.");
      return; // Выходим из функции, чтобы не продолжать выполнение
    }

    // Используем константы для вычислений

    var e = 2.7182818284590452;  // Число Эйлера
    var pi = 3.1415926535897932;  // Число Пи
    var a = 6378137.0;           // Полуось большого эллипсоида
    var c1 = 0.00335655146887969; // Коэффициент 1
    var c2 = 0.00000657187271079536; // Коэффициент 2
    var c3 = 0.00000001764564338702; // Коэффициент 3
    var c4 = 0.00000000005328478445; // Коэффициент 4

    // Предустановленные координаты левого верхнего угла тайла
    var picX = 0;
    var picY = 0;

    // Вычисляем координаты
    var flatX = tileX * 256 + picX;
    var flatY = tileY * 256 + picY;
    var mercX = (flatX * Math.pow(2, 23 - zoom)) / 53.5865938 - 20037508.342789;
    var mercY = 20037508.342789 - (flatY * Math.pow(2, 23 - zoom)) / 53.5865938;
    var g = pi / 2 - 2 * Math.atan(1.0 / Math.exp(mercY / a));
    var f = g + c1 * Math.sin(2 * g) + c2 * Math.sin(4 * g) + c3 * Math.sin(6 * g) + c4 * Math.sin(8 * g);

    var latitude = f * 180.0 / pi;
    var longitude = (mercX / a) * 180.0 / pi;

    // Выводим результат на экран
    var coordinatesDiv = document.getElementById("coordinates");
    coordinatesDiv.innerHTML = "Широта: " + latitude.toFixed(8) + ", Долгота: " + longitude.toFixed(8);

    // Отображение плитки на карте (если уровень масштабирования не превышает 23)
    if (zoom <= 23) {
      const mapDiv = document.getElementById('map');
      mapDiv.innerHTML = '';  // Очищаем содержимое элемента mapDiv
      const tileImg = document.createElement('img');  // Создаем элемент img
      tileImg.src = `https://core-carparks-renderer-lots.maps.yandex.net/maps-rdr-carparks/tiles?l=carparks&x=${tileX}&y=${tileY}&z=${zoom}&scale=1&lang=ru_RU`;
      mapDiv.appendChild(tileImg);  // Добавляем изображение тайла на карту
    }
  }

  // Назначаем обработчик события отправки формы
  tileForm.addEventListener("submit", calculateCoordinates);
});
