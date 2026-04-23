let rufflePlayer = null;

let levelZipBlob = null;
let bgBlobURL = null;

let interceptionEnabled = false;

const originalFetch = window.fetch;

window.fetch = async (url, opts) => {

  if (!interceptionEnabled) {
    return originalFetch(url, opts);
  }

  if (url.includes("funnel.dat.zip") && levelZipBlob) {
    return new Response(levelZipBlob.slice(0), {
      headers: { "Content-Type": "application/zip" }
    });
  }

  if (url.includes("funnel.jpg") && bgBlobURL) {
    return originalFetch(bgBlobURL);
  }

  return originalFetch(url, opts);
};

function loadGame() {
  document.getElementById("gameContainer").innerHTML = "";

  const ruffle = window.RufflePlayer.newest();
  rufflePlayer = ruffle.createPlayer();

  rufflePlayer.style.width = "960px";
  rufflePlayer.style.height = "540px";

  document.getElementById("gameContainer").appendChild(rufflePlayer);

  interceptionEnabled = false;

  rufflePlayer.load("peggle.swf");

  // enable interception AFTER boot
  setTimeout(() => {
    interceptionEnabled = true;
  }, 2000);
}

document.getElementById("levelZip").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  levelZipBlob = file;
});

document.getElementById("bgFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (bgBlobURL) URL.revokeObjectURL(bgBlobURL);

  bgBlobURL = URL.createObjectURL(file);

  document.getElementById("bgPreview").src = bgBlobURL;
});

document.getElementById("restart").addEventListener("click", () => {

  interceptionEnabled = false;

  document.getElementById("gameContainer").innerHTML = "";

  loadGame();
});

loadGame();
