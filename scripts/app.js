/* Sağ ve Sol ok fonksiyonları  */

document.addEventListener("DOMContentLoaded", function () {
    const leftBtn = document.querySelector('.slider-btn.left');
    const rightBtn = document.querySelector('.slider-btn.right');
    const sliderContainer = document.querySelector('.slider-container');
    const slide = document.querySelector('.slide');
    const slider = document.querySelector('.slider');

    const gap = parseInt(getComputedStyle(slider).gap) || 24;
    function getScrollAmount() {
        return slide.offsetWidth + gap;
    }

    rightBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    leftBtn.addEventListener('click', () => {
        const currentScroll = sliderContainer.scrollLeft;
        const scrollAmount = getScrollAmount();
    
        
        if (currentScroll <= scrollAmount) {
            sliderContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            sliderContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    });    
});



/* Film and Series APİ */

// renderMovies fonksiyonu tanımlandı
function renderMovies(movies) {
  const moviesContainer = document.getElementById('movies-container');
  if (!moviesContainer) return;  

  movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
      movieCard.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
      `;
      moviesContainer.appendChild(movieCard); 
  });
}

fetch("https://api.themoviedb.org/3/movie/popular?api_key=7acee0ab0596510d99a03a4333c3d523")
    .then(res => res.json())
    .then(data => renderMovies(data.results)); 

// search fonksiyonu güncellendi
function search() {
    const input = document.getElementById("searchInput");
    const query = input.value.trim();

    if (query !== "") {
        const encodedQuery = encodeURIComponent(query);
        window.location.href = `search.html?q=${encodedQuery}`;
    }
}

// URL'den arama sorgusu alınarak sonuçlar getiriliyor
const apiKey = "7acee0ab0596510d99a03a4333c3d523";
const resultsContainer = document.getElementById("results");

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");

if (query) {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=tr-TR`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = "";

            if (data.results.length === 0) {
                resultsContainer.innerHTML = "<p>Sonuç bulunamadı.</p>";
                return;
            }

            data.results.forEach(item => {
                if (item.media_type !== "movie" && item.media_type !== "tv") return;

                const title = item.title || item.name;
                const posterPath = item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "placeholder.jpg";

                const card = document.createElement("a");
                card.href = `details.html?id=${item.id}&type=${item.media_type}`;
                card.className = "result-card";
                card.innerHTML = `
                    <img src="${posterPath}" alt="${title}" />
                    <h3>${title}</h3>
                `;

                resultsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Hata:", error);
            resultsContainer.innerHTML = "<p>Bir hata oluştu.</p>";
        });
} else {
    resultsContainer.innerHTML = "<p>Aranacak bir kelime yazılmadı.</p>";
}