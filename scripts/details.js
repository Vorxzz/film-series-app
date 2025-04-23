const apiKey = "7acee0ab0596510d99a03a4333c3d523";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const type = urlParams.get("type");
const container = document.getElementById("details");

if (id && type) {
  fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=tr-TR`)
    .then(res => {
      if (!res.ok) {
        throw new Error("API isteği başarısız oldu.");
      }
      return res.json();
    })
    .then(data => {
      const title = data.title || data.name || "Bilinmeyen Başlık";
      const posterPath = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "placeholder.jpg";
      const overview = data.overview || "Açıklama bulunamadı.";
      const releaseDate = data.release_date || data.first_air_date || "Tarih yok";
      const rating = data.vote_average !== undefined ? data.vote_average : "Yok";

      // Sayfaya HTML içeriği yerleştir
      container.innerHTML = `
        <div class="detail-card">
          <img src="${posterPath}" alt="${title}" id="detailPoster" />
          <div class="info">
            <h1 id="detailTitle">${title}</h1>
            <p><strong>Çıkış Tarihi:</strong> <span id="releaseDate">${releaseDate}</span></p>
            <p><strong>Puan:</strong> <span id="rating">${rating}</span></p>
            <p id="overview">${overview}</p>

            <a href="#" id="trailerBtn" class="trailer-btn" target="_blank">
              🎬 Trailer'ı İzle
            </a>

            <button id="favoriteBtn" class="favorite-btn">
              ❤️ Favorilere Ekle
            </button>
          </div>
        </div>
      `;

      // Trailer verisini ayrı alıyoruz
      fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=tr-TR`)
  .then(res => {
    if (!res.ok) throw new Error("Trailer verisi alınamadı.");
    return res.json();
  })
  .then(videoData => {
    const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");

    const trailerBtn = document.getElementById("trailerBtn");
    if (trailer) {
      trailerBtn.href = `https://www.youtube.com/watch?v=${trailer.key}`;
      trailerBtn.target = "_blank"; // yeni sekmede aç
    } else {
      trailerBtn.href = "#";
      trailerBtn.textContent = "🎬 Trailer Bulunamadı";
      trailerBtn.style.opacity = "0.6";
      trailerBtn.style.pointerEvents = "none";
    }
  })
  .catch(err => {
    console.error("Trailer API hatası:", err);
    const trailerBtn = document.getElementById("trailerBtn");
    trailerBtn.href = "#";
    trailerBtn.textContent = "🎬 Trailer Yüklenemedi";
    trailerBtn.style.opacity = "0.6";
    trailerBtn.style.pointerEvents = "none";
  });


      // Favori butonu işlevi
      let isFavorite = false;
      const favoriteBtn = document.getElementById("favoriteBtn");
      favoriteBtn.addEventListener("click", () => {
        isFavorite = !isFavorite;
        favoriteBtn.classList.toggle("active");
        favoriteBtn.textContent = isFavorite ? "❤️ Favorilerden Çıkar" : "❤️ Favorilere Ekle";
      });
    })
    .catch(err => {
      console.error("Detay verisi alınırken hata oluştu:", err);
      container.innerHTML = "<p>Detaylar yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>";
    });
} else {
  container.innerHTML = "<p>Geçerli bir içerik seçilmedi.</p>";
}
