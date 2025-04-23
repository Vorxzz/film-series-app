const reelUrls = [
  "https://www.instagram.com/reel/DHYi0LstQJi/",
  "https://www.instagram.com/reel/DIbfcrwNPEl/",
  "https://www.instagram.com/reel/DH_KvGhtORC/",
  "https://www.instagram.com/reel/DHbp75ut2Mz/",
  "https://www.instagram.com/reel/DGdUjYHNUj4/",


];

function loadInstagramReels() {
  const container = document.querySelector(".reels-container");

  reelUrls.forEach(url => {
    const block = document.createElement("blockquote");
    block.className = "instagram-media";
    block.setAttribute("data-instgrm-permalink", url);
    block.setAttribute("data-instgrm-version", "14");
    block.style = "width: 100%; max-width: 400px; margin: 0 auto;";

    container.appendChild(block);
  });

  // Embed.js sadece bir kez yüklenmeli
  if (!document.getElementById("instagram-embed-script")) {
    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = function () {
      if (window.instgrm) window.instgrm.Embeds.process();
    };
    document.body.appendChild(script);
  } else {
    // Script zaten varsa tekrar işleme sok
    if (window.instgrm) window.instgrm.Embeds.process();
  }
}

document.addEventListener("DOMContentLoaded", loadInstagramReels);
