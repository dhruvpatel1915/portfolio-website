// ---------- Dark / light theme ----------
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
  }
}

// Use the saved choice, otherwise the computer's preference
let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) { /* storage not available */ }
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
});

// ---------- Mobile menu ----------
const nav = document.getElementById("nav");
document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

// ---------- Typing effect ----------
const words = ["Java developer", "web developer", "graphic designer", "MSc IT student"];
const typingEl = document.getElementById("typingText");
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = words[wordIndex];
  typingEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

// ---------- Contact form (front-end validation only) ----------
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  formMessage.className = "form-message";
  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.classList.add("error");
  } else if (!emailOk) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.classList.add("error");
  } else {
    // TODO: connect to a real service (for example Formspree) to receive messages
    formMessage.textContent = "Thank you, " + name + "! Your message is ready to send.";
    formMessage.classList.add("success");
    form.reset();
  }
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
