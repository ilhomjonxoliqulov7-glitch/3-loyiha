// ================== DOM ==================
const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const output = document.getElementById('output');

// ================== FETCH ==================
async function getWeather(city) {
  output.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Yuklanmoqda...</p>
    </div>
  `;

  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    if (!res.ok) throw new Error('Shahar topilmadi');
    const data = await res.json();
    renderWeather(city, data);
  } catch (err) {
    output.innerHTML = `<div class="error">❌ ${err.message}. Boshqa shahar nomini sinab ko'ring.</div>`;
  }
}

// ================== RENDER ==================
function renderWeather(city, data) {
  const cur = data.current_condition[0];
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  output.innerHTML = `
    <div class="weather-info">
      <div class="weather-main">
        <div class="city-name">${cityName}</div>
        <div class="temp">${cur.temp_C}°C</div>
        <div class="description">${cur.weatherDesc[0].value}</div>
      </div>
      <div class="details">
        <div class="detail-card">
          <div class="detail-label">His qilinadi</div>
          <div class="detail-value">${cur.FeelsLikeC}°C</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">Namlik</div>
          <div class="detail-value">${cur.humidity}%</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">Shamol</div>
          <div class="detail-value">${cur.windspeedKmph} km/h</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">Bosim</div>
          <div class="detail-value">${cur.pressure} mb</div>
        </div>
      </div>
    </div>
  `;
}

// ================== EVENTS ==================
form.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

// ================== INIT ==================
cityInput.value = 'Tashkent';
getWeather('Tashkent');