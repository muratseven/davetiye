// ===============================
// COUNTDOWN
// ===============================
const weddingDate = new Date(2026, 4, 24, 13, 0, 0);

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl) return;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const total = Math.floor(diff / 1000);
  daysEl.textContent = Math.floor(total / 86400);
  hoursEl.textContent = String(Math.floor((total % 86400) / 3600)).padStart(2, "0");
  minutesEl.textContent = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  secondsEl.textContent = String(total % 60).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===============================
// COLLAPSE + CONFETTI
// ===============================
function toggleDonationCollapse(button) {
  const collapse = button.nextElementSibling;
  const icon = button.querySelector("svg");
  const isOpening = !collapse.classList.contains("active");

  collapse.classList.toggle("active");
  icon.style.transform = collapse.classList.contains("active")
    ? "rotate(180deg)"
    : "rotate(0deg)";

  if (isOpening) {
    createConfettiFromButton(button);
  }
}

// ===============================
// CONFETTI (SAĞA DOĞRU)
// ===============================
function createConfettiFromButton(button) {
  const rect = button.getBoundingClientRect();

  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  layer.style.left = rect.right + "px";
  layer.style.top = rect.top + "px";

  document.body.appendChild(layer);

  const colors = ["#F6C177", "#F28482", "#84A59D", "#F7EDE2"];

  for (let i = 0; i < 22; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty("--x", `${80 + Math.random() * 120}px`);
    piece.style.setProperty("--y", `${-60 + Math.random() * -80}px`);
    piece.style.animationDelay = `${Math.random() * 0.2}s`;

    layer.appendChild(piece);
  }

  setTimeout(() => layer.remove(), 1600);
}
