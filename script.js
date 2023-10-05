document.getElementById('tileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tileX = parseInt(document.getElementById('tileX').value);
    const tileY = parseInt(document.getElementById('tileY').value);
    const zoomLevel = parseInt(document.getElementById('zoomLevel').value);

    // Проверка введенных данных
    if (isNaN(tileX) || isNaN(tileY) || isNaN(zoomLevel) || zoomLevel < 0 || zoomLevel > 20) {
        alert('Пожалуйста, введите корректные данные, включая уровень зума от 0 до 20.');
        return;
    }

    // Расчет максимальной координаты
    const maxCoordinate = Math.pow(2, zoomLevel);

    // Расчет координат центральной точки тайла
    const centerX = (tileX) / maxCoordinate;
    const centerY = (tileY) / maxCoordinate;

    // Расчет долготы и широты верхней левой точки тайла
    const longitude = (centerX - 0.5) * 360;
    const latitude = Math.atan(Math.sinh((1 - 2 * centerY) * Math.PI)) * (180 / Math.PI);

    // Отображение координат на странице (округление только здесь)
    document.getElementById('coordinates').innerHTML = `Координаты верхней левой точки плитки: Широта: ${latitude.toFixed(6)}, Долгота: ${longitude.toFixed(6)}`;

    // Отображение плитки на карте
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = '';
    const tileImg = document.createElement('img');
    tileImg.src = `https://core-carparks-renderer-lots.maps.yandex.net/maps-rdr-carparks/tiles?l=carparks&x=${tileX}&y=${tileY}&z=${zoomLevel}&scale=1&lang=ru_RU`;
    mapDiv.appendChild(tileImg);
});
