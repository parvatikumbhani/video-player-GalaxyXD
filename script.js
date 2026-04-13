let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "240",
    width: "100%",
    videoId: "",
    playerVars: { controls: 1, rel: 0 }
  });
}

async function searchVideos() {
  const query = document.getElementById("search").value;

  if (!query) return;

  // Call your backend instead of YouTube directly
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  data.items.forEach(item => {
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const thumb = item.snippet.thumbnails.medium.url;

    const div = document.createElement("div");
    div.className = "video-item";
    div.innerHTML = `
      <img src="${thumb}">
      <div>${title}</div>
    `;

    div.onclick = () => playVideo(videoId);

    resultsDiv.appendChild(div);
  });
}

function playVideo(id) {
  player.loadVideoById(id);
}
