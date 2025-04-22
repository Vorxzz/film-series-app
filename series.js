// series.js

const seriesApiKey = '7acee0ab0596510d99a03a4333c3d523';
const seriesApiURL = `https://api.themoviedb.org/3/discover/tv?api_key=${seriesApiKey}&sort_by=popularity.desc&vote_count.gte=1000&vote_average.gte=8&language=en-US&page=1`;

document.addEventListener("DOMContentLoaded", () => {
  fetchSeries();
});

function fetchSeries() {
  fetch(seriesApiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("API isteği başarısız");
      }
      return response.json();
    })
    .then(data => {
      displaySeries(data.results);
    })
    .catch(error => {
      console.error("Hata:", error);
    });
}

function displaySeries(seriesList) {
  const container = document.querySelector('.series-container');
  
  if (!container) {
    console.error("Hata: .series-container elementi bulunamadı!");
    return;
  }

  container.innerHTML = '';

  seriesList.forEach(tv => {
    const seriesCard = document.createElement('div');
    seriesCard.classList.add('series-card');

    seriesCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}" />
      <h3>${tv.name}</h3>
      <p>⭐ ${tv.vote_average.toFixed(1)}</p>
    `;

    // Kart tıklanınca detay sayfasına yönlendir
    seriesCard.addEventListener("click", () => {
      window.location.href = `details.html?id=${tv.id}&type=tv`;
    });

    container.appendChild(seriesCard);
  });
}
