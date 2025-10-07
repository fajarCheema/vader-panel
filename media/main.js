const helmet = document.getElementById("helmet");
const bubble = document.getElementById("bubble");
let timeoutId = null;
function showBubble() {
  bubble.classList.remove("show");
  void bubble.offsetWidth;
  bubble.classList.add("show");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    bubble.classList.remove("show");
    const next = 4000 + Math.random() * 3000;
    timeoutId = setTimeout(showBubble, next);
  }, 2600);
}
helmet.addEventListener("click", () => {
  showBubble();
});
window.addEventListener("load", () => {
  setTimeout(showBubble, 900);
});
