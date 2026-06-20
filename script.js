/* ============================================================
   Moiz ❤ Rudraa — 2nd Anniversary
   Main Script
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Config ---------- */
  const PROPOSAL_DATE = new Date("2024-06-20T00:00:00"); // 20 June 2024
  const CORRECT_PASSWORD = "20-06-2024";

  /* ============================================================
     1. LOCK SCREEN
     ============================================================ */
  const lockScreen = document.getElementById("lockScreen");
  const lockForm = document.getElementById("lockForm");
  const dateInput = document.getElementById("dateInput");
  const lockError = document.getElementById("lockError");
  const lockHeart = document.getElementById("lockHeart");
  const mainSite = document.getElementById("mainSite");
  const lockPetals = document.getElementById("lockPetals");

  // Falling petals/hearts behind the lock screen
  function createLockPetals(count) {
    const symbols = ["❤", "✦", "❀"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "lock-petal";
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = 10 + Math.random() * 14 + "px";
      const duration = 8 + Math.random() * 10;
      el.style.animationDuration = duration + "s";
      el.style.animationDelay = Math.random() * duration + "s";
      lockPetals.appendChild(el);
    }
  }
  createLockPetals(22);

  function normalizeDateString(str) {
    // Accept "20-06-2024", "20/06/2024", "20 06 2024" etc.
    return str.trim().replace(/[\/\.\s]/g, "-");
  }

  function unlockSite() {
    lockHeart.classList.add("glow");
    lockScreen.classList.add("unlocking");

    setTimeout(() => {
      lockScreen.classList.add("hidden");
      mainSite.classList.add("visible");
      document.body.style.overflow = "auto";
      initAfterUnlock();
    }, 900);
  }

  function showLockError() {
    lockError.textContent = "Oops! Try remembering our special day ❤️";
    lockError.classList.add("show");
    dateInput.classList.add("shake");
    setTimeout(() => dateInput.classList.remove("shake"), 500);
  }

  lockForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = normalizeDateString(dateInput.value);
    if (value === CORRECT_PASSWORD) {
      lockError.classList.remove("show");
      unlockSite();
    } else {
      showLockError();
    }
  });

  // Clear error state as user retypes
  dateInput.addEventListener("input", function () {
    lockError.classList.remove("show");
  });

  // Prevent body scroll while locked
  document.body.style.overflow = "hidden";

  /* ============================================================
     INIT (runs once, after unlock, to keep things lightweight)
     ============================================================ */
  let initialized = false;
  function initAfterUnlock() {
    if (initialized) return;
    initialized = true;

    createHeroHearts();
    createFinalHearts();
    startLoveCounter();
    setupScrollReveal();
    setupGalleryLightbox();
    setupEnvelope();
    createMemoryStars();
    createShootingStars();
    setupScrollProgress();
    setupSmoothButtons();
  }

  /* ============================================================
     2. HERO — floating hearts + smooth scroll button
     ============================================================ */
  function createHeroHearts() {
    const container = document.getElementById("heroHearts");
    const symbols = ["❤", "♥", "✦"];
    const count = window.innerWidth < 640 ? 14 : 24;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 10 + Math.random() * 22 + "px";
      const duration = 10 + Math.random() * 14;
      heart.style.animationDuration = duration + "s";
      heart.style.animationDelay = Math.random() * duration + "s";
      container.appendChild(heart);
    }
  }

  function createFinalHearts() {
    const container = document.getElementById("finalHearts");
    const count = window.innerWidth < 640 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = "❤";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 10 + Math.random() * 18 + "px";
      const duration = 9 + Math.random() * 12;
      heart.style.animationDuration = duration + "s";
      heart.style.animationDelay = Math.random() * duration + "s";
      container.appendChild(heart);
    }
  }

  document.getElementById("beginJourneyBtn").addEventListener("click", function () {
    document.getElementById("timeline").scrollIntoView({ behavior: "smooth" });
  });

  function setupSmoothButtons() {
    document.getElementById("replayBtn").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     3. LOVE COUNTER — real time since proposal date
     ============================================================ */
  function startLoveCounter() {
    const daysEl = document.getElementById("countDays");
    const hoursEl = document.getElementById("countHours");
    const minutesEl = document.getElementById("countMinutes");
    const secondsEl = document.getElementById("countSeconds");

    function pad(num, len) {
      return String(num).padStart(len, "0");
    }

    function update() {
      const now = new Date();
      let diff = now - PROPOSAL_DATE;
      if (diff < 0) diff = 0;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = pad(days, 4);
      hoursEl.textContent = pad(hours, 2);
      minutesEl.textContent = pad(minutes, 2);
      secondsEl.textContent = pad(seconds, 2);
    }

    update();
    setInterval(update, 1000);
  }

  /* ============================================================
     4. SCROLL REVEAL — timeline cards + generic fade-ins
     ============================================================ */
  function setupScrollReveal() {
    const items = document.querySelectorAll(".fade-in-scroll, .timeline-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach((item) => {
      item.classList.add("fade-in-scroll");
      observer.observe(item);
    });

    // Animate the vertical timeline line growing as user scrolls
    const timelineLine = document.getElementById("timelineLine");
    if (timelineLine) {
      timelineLine.style.transform = "scaleY(0)";
      timelineLine.style.transition = "transform 1.4s cubic-bezier(.22,1,.36,1)";
      const lineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              timelineLine.style.transform = "scaleY(1)";
            }
          });
        },
        { threshold: 0.1 }
      );
      lineObserver.observe(document.querySelector(".timeline-wrap"));
    }
  }

  /* ============================================================
     5. GALLERY + LIGHTBOX
     ============================================================ */
  function setupGalleryLightbox() {
    const items = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");

    items.forEach((item) => {
      item.addEventListener("click", function () {
        const img = item.querySelector("img");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = item.getAttribute("data-caption") || "";
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ============================================================
     6. LOVE LETTER ENVELOPE
     ============================================================ */
  function setupEnvelope() {
    const envelope = document.getElementById("envelope");
    const hint = document.getElementById("envelopeHint");

    envelope.addEventListener("click", function () {
      const isOpen = envelope.classList.toggle("open");
      hint.textContent = isOpen ? "tap to close" : "tap to open";
    });
  }

  /* ============================================================
     7. MEMORY STARS
     ============================================================ */
  const memories = [
    { title: "First Proposal", text: "The day you said yes, and my whole world quietly rearranged itself around you." },
    { title: "First Date", text: "Nervous hands, easy laughter — I knew within an hour you were someone special." },
    { title: "First Selfie", text: "A blurry photo, a perfect afternoon, the start of a thousand more pictures together." },
    { title: "First Birthday Together", text: "Watching you blow out candles and realizing I wanted to see that every single year." },
    { title: "1 Year Anniversary", text: "Twelve months in, and somehow I loved you more than the day we started." },
    { title: "A Quiet Sunday", text: "No plans, no agenda — just you, me, and the kind of comfort that feels like home." },
    { title: "Our Favorite Song", text: "The one that comes on and instantly, without fail, makes us reach for each other." },
    { title: "That Rainy Evening", text: "We got soaked, laughed the whole way home, and I wouldn't trade it for sunshine." }
  ];

  function createMemoryStars() {
    const sky = document.getElementById("starsSky");
    const sectionHeight = 100; // percentage based, relative to section

    memories.forEach((memory, index) => {
      const star = document.createElement("button");
      star.className = "memory-star";
      star.type = "button";
      star.textContent = "✦";
      star.setAttribute("aria-label", "Reveal memory: " + memory.title);

      const top = 8 + Math.random() * 78;
      const left = 6 + Math.random() * 88;
      star.style.top = top + "%";
      star.style.left = left + "%";
      star.style.animationDuration = 2 + Math.random() * 2.5 + "s";
      star.style.animationDelay = Math.random() * 3 + "s";

      star.addEventListener("click", function () {
        openMemoryModal(memory);
        star.classList.add("collected");
      });

      sky.appendChild(star);
    });
  }

  function openMemoryModal(memory) {
    const modal = document.getElementById("memoryModal");
    document.getElementById("memoryModalTitle").textContent = memory.title;
    document.getElementById("memoryModalText").textContent = memory.text;
    modal.classList.add("open");
  }

  document.getElementById("memoryModalClose").addEventListener("click", function () {
    document.getElementById("memoryModal").classList.remove("open");
  });
  document.getElementById("memoryModal").addEventListener("click", function (e) {
    if (e.target === this) this.classList.remove("open");
  });

  function createShootingStars() {
    const container = document.getElementById("shootingStars");
    function spawn() {
      const star = document.createElement("span");
      star.className = "shooting-star";
      star.style.top = Math.random() * 40 + "%";
      star.style.left = 50 + Math.random() * 45 + "%";
      star.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
      container.appendChild(star);
      setTimeout(() => star.remove(), 4000);
    }
    spawn();
    setInterval(spawn, 2600);
  }

  /* ============================================================
     8. SCROLL PROGRESS BAR
     ============================================================ */
  function setupScrollProgress() {
    const bar = document.getElementById("scrollProgressBar");
    window.addEventListener("scroll", function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + "%";
    });
  }

  /* ============================================================
     9. SECRET HEART EASTER EGG (works regardless of lock state,
        but only meaningfully visible after unlock since it's
        positioned fixed over the whole viewport)
     ============================================================ */
  const secretHeart = document.getElementById("secretHeart");
  const secretPopup = document.getElementById("secretPopup");
  const secretOverlayBlur = document.getElementById("secretOverlayBlur");
  const secretCloseBtn = document.getElementById("secretCloseBtn");
  const secretHeartRain = document.getElementById("secretHeartRain");

  let secretClickCount = 0;
  let secretTriggered = false;

  secretHeart.addEventListener("click", function () {
    if (secretTriggered) return;

    secretClickCount++;
    secretHeart.classList.remove("bump");
    void secretHeart.offsetWidth; // restart animation
    secretHeart.classList.add("bump");

    if (secretClickCount === 5) {
      triggerSecretEasterEgg();
    }
  });

  function triggerSecretEasterEgg() {
    secretTriggered = true;
    secretHeart.classList.add("huge");
    secretOverlayBlur.classList.add("active");

    setTimeout(() => {
      secretPopup.classList.add("show");
      spawnHeartRain();
    }, 350);
  }

  function spawnHeartRain() {
    const count = 36;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement("span");
        heart.className = "rain-heart";
        heart.textContent = "❤";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = 12 + Math.random() * 20 + "px";
        heart.style.animationDuration = 2 + Math.random() * 1.6 + "s";
        heart.style.opacity = 0.6 + Math.random() * 0.4;
        secretHeartRain.appendChild(heart);
        setTimeout(() => heart.remove(), 3800);
      }, i * 60);
    }
  }

  secretCloseBtn.addEventListener("click", function () {
    secretPopup.classList.remove("show");
    secretOverlayBlur.classList.remove("active");
    secretHeart.classList.remove("huge");
    secretClickCount = 0;
    secretTriggered = false;
  });

})();
