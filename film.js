// film.js

// API anahtarını farklı bir isimle tanımlayarak çakışmayı önledik
const filmApiKey = '7acee0ab0596510d99a03a4333c3d523';
const filmApiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${filmApiKey}&sort_by=popularity.desc&vote_count.gte=1000&vote_average.gte=8&language=en-US&page=1`;



// Sayfa yüklendiğinde film verilerini çek
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
});

// Film verilerini çek
function fetchMovies() {
  fetch(filmApiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("API isteği başarısız");
      }
      return response.json();
    })
    .then(data => {
      displayMovies(data.results);
    })
    .catch(error => {
      console.error("Hata:", error);
    });
}

// Filmleri ekrana bastır
function displayMovies(movies) {
  const container = document.querySelector('.movie-container');
  
  if (!container) {
    console.error("Hata: .movie-container elementi bulunamadı!");
    return;
  }

  container.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average.toFixed(1)}</p>
    `;

       // 👉 Tıklandığında details sayfasına yönlendir
       movieCard.addEventListener("click", () => {
        window.location.href = `details.html?id=${movie.id}&type=movie`;
      });

    container.appendChild(movieCard);
  });
}