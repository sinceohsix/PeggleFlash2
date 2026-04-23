let rufflePlayer = null;

let levelZipBlob = null;
let bgBlobURL = null;

const GAME_SWF = "peggle.swf"; 

function loadGame() {
  document.getElementById("gameContainer").innerHTML = "";

  const ruffle = window.RufflePlayer.newest();
  rufflePlayer = ruffle.createPlayer();

  rufflePlayer.style.width = "960px";
  rufflePlayer.style.height = "540px";

  document.getElementById("gameContainer").appendChild(rufflePlayer);

  installFetchInterceptor();

  rufflePlayer.load(GAME_SWF);
}

function installFetchInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async (url, opts) => {

    // ---- LEVEL ZIP ----
    if (url.includes("funnel.dat.zip")) {
      if (levelZipBlob) {
        return new Response(levelZipBlob.slice(0), {
          headers: { "Content-Type": "application/zip" }
        });
      }
    }

    if (url.includes("funnel.jpg")) {
      if (bgBlobURL) {
        const res = await originalFetch(bgBlobURL);
        return res;
      }
    }

    return originalFetch(url, opts);
  };
}

document.getElementById("levelZip").addEventListener("change", async (e) => {
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

  window.fetch = window.fetch.__proto__.constructor
    ? window.fetch.__proto__.constructor
    : window.fetch;

  loadGame();
});

loadGame();
