  let faceActive = false;
  let rjavaActive = false;


function updateTime() {
  if (faceActive || rjavaActive) return;

  const localTimeEl = document.getElementById('local-time');
  const serverTimeEl = document.getElementById('server-time');

  const now = new Date();

  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  localTimeEl.textContent = now.toLocaleTimeString([], options);

  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const serverTime = new Date(utc + 7 * 3600000);
  serverTimeEl.textContent = serverTime.toLocaleTimeString([], options);
}


setInterval(updateTime, 1000);
updateTime(); 


const buttons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
let currentPage = document.querySelector('.page.active');
let isAnimating = false;

function changePage(targetId) {
  if (isAnimating) return;

  const targetPage = document.getElementById(`page-${targetId}`);
  if (!targetPage || targetPage === currentPage) return;

  isAnimating = true;

  // Highlight nav button
  buttons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-page') === targetId);
  });

  const currentIndex = Array.from(pages).indexOf(currentPage);
  const targetIndex = Array.from(pages).indexOf(targetPage);
  const direction = targetIndex > currentIndex ? 'left' : 'right';

  // Animate out current
  currentPage.classList.remove('active');
  currentPage.classList.add(direction === 'left' ? 'exit-left' : 'exit-right');

  // Prepare target
  targetPage.classList.remove('exit-left', 'exit-right', 'enter-from-left', 'enter-from-right');
  targetPage.classList.add(direction === 'left' ? 'enter-from-right' : 'enter-from-left');
  void targetPage.offsetWidth; // force reflow

  // Animate in target
  targetPage.classList.remove('enter-from-left', 'enter-from-right');
  targetPage.classList.add('active');

  setTimeout(() => {
    currentPage.classList.remove('exit-left', 'exit-right');
    currentPage = targetPage;
    isAnimating = false;
  }, 400);
}

// Nav button clicks
document.querySelectorAll('[data-page]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-page');
    changePage(targetId);
    history.pushState("", document.title, window.location.pathname + window.location.search);
  });
});

// On page load or hash change — open page based on hash but don't update hash when clicking nav
function handleHash() {
  const hash = window.location.hash.substring(1); // remove #
  if (!hash) return;

  const targetId = `page-${hash}`; // add your prefix internally
  const targetPage = document.getElementById(targetId);

  if (targetPage) {
    // Strip 'page-' from id for changePage since it expects id without prefix
    changePage(hash);
  }
}

window.addEventListener('load', handleHash);
window.addEventListener('hashchange', handleHash);








const astroMaxPlayers = 50;
const coreMaxPlayers = 200;

function updateCircle(element, count, maxPlayers) {
    const percent = Math.min(count / maxPlayers, 1) * 100;
    element.style.background = `conic-gradient(#0091ff ${percent}%,rgb(17, 16, 20) ${percent}%)`;
}

async function fetchPlayerCounts() {
  if (faceActive || rjavaActive) return;
    try {
        const proxyUrl = "https://corsproxy.io/?";
        const astroAPI = "https://games.roblox.com/v1/games?universeIds=2176212732";
        const coreAPI = "https://games.roblox.com/v1/games?universeIds=6109192776";

        const [astroRes, coreRes] = await Promise.all([
            fetch(proxyUrl + encodeURIComponent(astroAPI)),
            fetch(proxyUrl + encodeURIComponent(coreAPI))
        ]);

        const astroData = await astroRes.json();
        const coreData = await coreRes.json();

        const astroCount = astroData.data[0].playing;
        const coreCount = coreData.data[0].playing;

        document.getElementById("astroCount").textContent = astroCount;
        document.getElementById("coreCount").textContent = coreCount;

        updateCircle(document.getElementById("astroCircle"), astroCount, astroMaxPlayers);
        updateCircle(document.getElementById("coreCircle"), coreCount, coreMaxPlayers);

    } catch (err) {
        console.error(err);
        document.getElementById("astroCount").textContent = "Err";
        document.getElementById("coreCount").textContent = "Err";
    }
}


// Initial fetch
fetchPlayerCounts();

// Update every 10 seconds
setInterval(fetchPlayerCounts, 5000);


setInterval(() => {
  if (faceActive || rjavaActive) return;
  const img = document.getElementById('discordWidget');
  const baseUrl = "https://discord.c99.nl/widget/theme-4/1125013540995076116.png";
  // Add a unique query param to bust the cache
  img.src = `${baseUrl}?_=${Date.now()}`;
}, 5000);




const cards = document.querySelectorAll(".carousel .card");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const titleEl = document.getElementById("photoTitle");

const photoTitles = [
  "By @VinsWolf04 on X",
  "By @_d6_ on Discord",
  "By @_d6_ on Discord",
  "By @BlazeThePr0t0 on X",
  "By @citkunah on X",
  "By @DemezProto on X",
  "By @haavey_skulldog on Discord",
  "By @Locu112 on X",
  "By @NumBurh on X",
  "By @pixel_photon on Discord",
  "By @grammar0532 on Discord",
  "By @apollokoline50 on Discord",
];

let current = 0;

function renderCarousel() {
  cards.forEach((card, idx) => {
    card.classList.remove("left", "center", "right");
    card.style.opacity = 0;
    card.style.zIndex = 0;
  });

  const total = cards.length;

  const leftIdx = (current - 1 + total) % total;
  const centerIdx = current % total;
  const rightIdx = (current + 1) % total;

  cards[leftIdx].classList.add("left");
  cards[centerIdx].classList.add("center");
  cards[rightIdx].classList.add("right");

  [leftIdx, centerIdx, rightIdx].forEach(i => {
    cards[i].style.opacity = 1;
    cards[i].style.zIndex = i === centerIdx ? 3 : 2;
  });

  // Update the title text to match the current center card
  titleEl.textContent = photoTitles[centerIdx] || "Untitled";
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % cards.length;
  renderCarousel();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + cards.length) % cards.length;
  renderCarousel();
});

// Initialize the carousel
renderCarousel();





window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  const dotsSpan = document.getElementById("loading-dots");
  let dotCount = 0;

  const dotsInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsSpan.textContent = '.'.repeat(dotCount);
  }, 300);

  // Start fading out splash after some delay if you want, or immediately:
  setTimeout(() => {
    clearInterval(dotsInterval);
    splash.classList.add("fade-out");

    setTimeout(() => {
      splash.remove();

      // Animate center pane
      document.querySelector(".page-animate").classList.add("show");

      // Animate left + right bars
      document.querySelector(".left-bar").classList.add("show");
      document.querySelector(".right-bar").classList.add("show");

      // Wait for animations (~600ms) then play GIF
      setTimeout(() => {
        // document.getElementById("VortexLogoIntro").classList.remove("hidden");
      }, 700);

    }, 1200); // splash fade duration

  }, 1000); // how long to show splash before fade? adjust as you like
});







// easter egg

(() => {
  let keyBuffer = "";
  let devOutlineActive = false;


  let originalTexts = [];
  let originalImages = [];

  const rjavaImage = "https://imagizer.imageshack.com/img923/8690/lUaz2O.png";

  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    keyBuffer += key;
    if (keyBuffer.length > 6) {
      keyBuffer = keyBuffer.slice(-6);
    }

    if (keyBuffer.includes(":3")) {
      toggleFace();
      keyBuffer = "";
    }

    if (keyBuffer.includes("dev")) {
      toggleDevOutline();
      keyBuffer = "";
    }

    if (keyBuffer.includes("rjava")) {
      toggleRjava();
      keyBuffer = "";
    }
  });

  function toggleFace() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    if (!faceActive) {
      originalTexts = [];
      while ((node = walker.nextNode())) {
        if (node.textContent.trim()) {
          originalTexts.push({ node, text: node.textContent });
          animateToCute(node, ":3");
        }
      }
      faceActive = true;
    } else {
      originalTexts.forEach(({ node, text }) => {
        animateDelete(node, text);
      });
      faceActive = false;
    }
  }

function toggleDevOutline() {
    const allElements = document.querySelectorAll(
      "body *:not(.page):not(.carousel .card):not(#splash-screen):not(.left-bar):not(.right-bar)"
    );

    if (!devOutlineActive) {
      devOutlineActive = true;
      allElements.forEach((el, i) => {
        el.classList.add("dev-outline");
        setTimeout(() => {
          el.classList.add("dev-outline-active");
        }, i * 20);
      });
    } else {
      devOutlineActive = false;
      allElements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.remove("dev-outline-active");
        }, i * 20);
      });
    }
  }

  function toggleRjava() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    const allImages = document.querySelectorAll("img");

    if (!rjavaActive) {
      originalTexts = [];
      originalImages = [];

      while ((node = walker.nextNode())) {
        if (node.textContent.trim()) {
          originalTexts.push({ node, text: node.textContent });
          animateToCute(node, "rjava");
        }
      }

      allImages.forEach((img) => {
        originalImages.push({ img, src: img.src });
        img.src = rjavaImage;
      });

      rjavaActive = true;
    } else {
      originalTexts.forEach(({ node, text }) => {
        animateDelete(node, text);
      });

      originalImages.forEach(({ img, src }) => {
        img.src = src;
      });

      rjavaActive = false;
    }
  }

  function animateToCute(node, target, duration = 500) {
    let text = node.textContent;
    const deleteInterval = setInterval(() => {
      if (text.length > 0) {
        text = text.slice(0, -1);
        node.textContent = text;
      } else {
        clearInterval(deleteInterval);

        const scrambleFrames = Math.max(1, Math.floor(duration / 50));
        let frame = 0;

        const scrambleInterval = setInterval(() => {
          if (frame < scrambleFrames) {
            node.textContent = Array.from(target).map(() => randomChar()).join("");
            frame++;
          } else {
            node.textContent = target;
            clearInterval(scrambleInterval);
          }
        }, 50);
      }
    }, 30);
  }

  function animateDelete(node, original) {
    let text = node.textContent;
    const deleteInterval = setInterval(() => {
      if (text.length > 0) {
        text = text.slice(0, -1);
        node.textContent = text;
      } else {
        clearInterval(deleteInterval);

        let i = 0;
        const restoreInterval = setInterval(() => {
          if (i < original.length) {
            node.textContent += original[i++];
          } else {
            clearInterval(restoreInterval);
          }
        }, 30);
      }
    }, 30);
  }

  function randomChar() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    return chars[Math.floor(Math.random() * chars.length)];
  }
})();










let overlayContainer = null;
let inspectorActive = false;

function createOverlay() {
  overlayContainer = document.createElement("div");
  overlayContainer.id = "layout-inspector-overlay";
  document.body.appendChild(overlayContainer);
}

function removeOverlay() {
  if (overlayContainer) {
    overlayContainer.remove();
    overlayContainer = null;
  }
}

function updateLayoutInspector() {
  if (!overlayContainer) createOverlay();
  overlayContainer.innerHTML = "";

  document.querySelectorAll("body *").forEach(el => {
    const style = getComputedStyle(el);

    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      el.offsetWidth < 50 ||
      el.offsetHeight < 20 ||
      el.tagName.match(/^(SCRIPT|STYLE|LINK|META|TITLE|HEAD)$/)
    ) {
      return;
    }

    const rect = el.getBoundingClientRect();

    // Skip if not visible on viewport to optimize
    if (rect.width === 0 || rect.height === 0) return;

    const box = document.createElement("div");
    box.className = "layout-inspector-box";
    box.style.position = "fixed";  // <-- changed from absolute to fixed
    box.style.top = `${rect.top}px`;
    box.style.left = `${rect.left}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
    box.style.pointerEvents = "none";

    const label = document.createElement("div");
    label.className = "layout-inspector-label";
    label.textContent = `content: ${Math.round(rect.width)}×${Math.round(rect.height)}`;
    box.appendChild(label);

    const paddingTop = parseFloat(style.paddingTop) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const paddingBottom = parseFloat(style.paddingBottom) || 0;
    const paddingLeft = parseFloat(style.paddingLeft) || 0;

    const marginTop = parseFloat(style.marginTop) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    const marginBottom = parseFloat(style.marginBottom) || 0;
    const marginLeft = parseFloat(style.marginLeft) || 0;

    // Padding box relative to content box (fixed positioning)
    const paddingBox = document.createElement("div");
    paddingBox.className = "layout-inspector-padding";
    paddingBox.style.position = "fixed";
    paddingBox.style.top = `${rect.top - paddingTop}px`;
    paddingBox.style.left = `${rect.left - paddingLeft}px`;
    paddingBox.style.width = `${rect.width + paddingLeft + paddingRight}px`;
    paddingBox.style.height = `${rect.height + paddingTop + paddingBottom}px`;
    paddingBox.style.pointerEvents = "none";

    // Margin box relative to padding box (fixed positioning)
    const marginBox = document.createElement("div");
    marginBox.className = "layout-inspector-margin";
    marginBox.style.position = "fixed";
    marginBox.style.top = `${rect.top - paddingTop - marginTop}px`;
    marginBox.style.left = `${rect.left - paddingLeft - marginLeft}px`;
    marginBox.style.width = `${rect.width + paddingLeft + paddingRight + marginLeft + marginRight}px`;
    marginBox.style.height = `${rect.height + paddingTop + paddingBottom + marginTop + marginBottom}px`;
    marginBox.style.pointerEvents = "none";

    box.appendChild(paddingBox);
    box.appendChild(marginBox);

    box._originalElement = el;
    overlayContainer.appendChild(box);
  });
}


function highlightOverlayForElement(el) {
  if (!overlayContainer) return;

  overlayContainer.querySelectorAll(".layout-inspector-box.highlighted").forEach(box => {
    box.classList.remove("highlighted");
  });

  if (!el) return;

  // walk up DOM to find matching overlay box
  let targetBox = null;
  let current = el;

  while (current && current !== document.body) {
    targetBox = Array.from(overlayContainer.children).find(box => box._originalElement === current);
    if (targetBox) break;
    current = current.parentElement;
  }

  if (targetBox) {
    targetBox.classList.add("highlighted");
  }
}


function toggleLayoutInspector() {
  inspectorActive = !inspectorActive;

  if (inspectorActive) {
    updateLayoutInspector();

    // Show overlays & listen for highlight
    window.addEventListener("resize", updateLayoutInspector);
    window.addEventListener("scroll", updateLayoutInspector);

    window.addEventListener("mousemove", onMouseMove);
  } else {
    removeOverlay();

    window.removeEventListener("resize", updateLayoutInspector);
    window.removeEventListener("scroll", updateLayoutInspector);

    window.removeEventListener("mousemove", onMouseMove);
  }
}

function onMouseMove(e) {
  const el = document.elementFromPoint(e.clientX, e.clientY);
  highlightOverlayForElement(el);
}

// Keyboard detection for "show" to toggle
let typedKeys = "";
window.addEventListener("keydown", e => {
  typedKeys += e.key.toLowerCase();

  if (typedKeys.length > 10) typedKeys = typedKeys.slice(-10);

  if (typedKeys.endsWith("style")) {
    toggleLayoutInspector();
    typedKeys = "";
  }
});


document.getElementById("popupToggle").addEventListener("click", () => {
  document.querySelector(".right-bar").classList.toggle("open");
});


document.querySelectorAll(".right-bar .nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".right-bar").classList.remove("open");
  });
});


function moveBottomText() {
  const bottomText = document.querySelector(".bottom-text");
  const leftBar = document.querySelector(".left-bar");
  const mainDetail = document.querySelector(".maindetail");

  const vortexGif = document.querySelector("#VortexLogoIntro img");

  if (!bottomText || !leftBar || !mainDetail) return; // safety check

  if (window.matchMedia("(orientation: portrait)").matches) {
    // Mobile portrait → move to maindetail
    if (!mainDetail.contains(bottomText)) {
      mainDetail.appendChild(bottomText);
    }
  } else {
    // Non-mobile → move back to left-bar
    if (!leftBar.contains(bottomText)) {
      leftBar.appendChild(bottomText);
      const src = vortexGif.src;
      vortexGif.src = "";
      vortexGif.src = src;
    }
  }
}



// Run on load & resize
window.addEventListener("DOMContentLoaded", moveBottomText);
window.addEventListener("resize", moveBottomText);
