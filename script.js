const apiKey = '20db9eb5b75148c403c78a5ffbc3978c';

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Vui lòng nhập tên thành phố!');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const currentTime = new Date().toLocaleString('vi-VN');

        const result = `
          <div class="city-header">
            <img src="${iconUrl}" alt="weather icon" />
            <h2>${data.name}, ${data.sys.country}</h2>
          </div>

          <div class="weather-grid">
            <p><i class="fas fa-thermometer-half"></i> <strong>Nhiệt độ:</strong> ${data.main.temp}°C (Cảm giác ${data.main.feels_like}°C)</p>
            <p><i class="fas fa-cloud-sun"></i> <strong>Thời tiết:</strong> ${data.weather[0].description}</p>
            <p><i class="fas fa-tint"></i> <strong>Độ ẩm:</strong> ${data.main.humidity}%</p>
            <p><i class="fas fa-tachometer-alt"></i> <strong>Áp suất:</strong> ${data.main.pressure} hPa</p>
            <p><i class="fas fa-wind"></i> <strong>Gió:</strong> ${data.wind.speed} m/s</p>
            <p><i class="fas fa-cloud"></i> <strong>Mây che phủ:</strong> ${data.clouds.all}%</p>
            <p><i class="fas fa-clock"></i> <strong>Thời gian:</strong> ${currentTime}</p>
          </div>
        `;
        document.getElementById('weatherResult').innerHTML = result;
      } else {
        document.getElementById('weatherResult').innerHTML = `<p>❌ Không tìm thấy thành phố!</p>`;
      }
    })
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = `<p>⚠️ Có lỗi xảy ra khi lấy dữ liệu.</p>`;
      console.error(error);
    });
}

document.getElementById('weatherBtn').addEventListener('click', getWeather);
document.getElementById('cityInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    getWeather();
  }
});
