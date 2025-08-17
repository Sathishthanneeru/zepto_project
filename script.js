// ✅ Active category toggle
const categories = document.querySelectorAll(".category");
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    categories.forEach((c) => c.classList.remove("active"));
    cat.classList.add("active");
  });
});

// ✅ Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ✅ Search filter
document.getElementById("searchInput").addEventListener("keyup", function () {
  let input = this.value.toLowerCase();
  let categoryList = document.getElementById("categoryList").children;
  for (let i = 0; i < categoryList.length; i++) {
    let text = categoryList[i].innerText.toLowerCase();
    categoryList[i].style.display = text.includes(input) ? "flex" : "none";
  }
});

// ✅ Multi-carousel fix
let positions = { sonic: 0, beauty: 0 };

function moveSlide(section, direction) {
  const track = document.querySelector(`.${section}-track`);
  const cards = track.children.length;
  const cardWidth = track.children[0].offsetWidth + 20; // include margin
  const carouselWrapper = track.parentElement; // parent .carousel
  const visibleCards = Math.floor(carouselWrapper.offsetWidth / cardWidth);

  positions[section] += direction;

  // stop at boundaries
  if (positions[section] < 0) positions[section] = 0;
  if (positions[section] > cards - visibleCards)
    positions[section] = cards - visibleCards;

  track.style.transform = `translateX(${-positions[section] * cardWidth}px)`;
}

// ✅ General carousels (loop through all)
document.querySelectorAll(".carousel").forEach((carousel) => {
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -250, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: 250, behavior: "smooth" });
  });
});
let coffeePos = 0;

function moveCoffeeSlide(direction) {
  const track = document.querySelector(".coffee-track");
  const cards = track.children.length;

  // card width with margin
  const cardStyle = getComputedStyle(track.children[0]);
  const cardWidth =
    track.children[0].offsetWidth +
    parseInt(cardStyle.marginLeft) +
    parseInt(cardStyle.marginRight);

  const carousel = document.querySelector(".coffee-carousel");
  const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);

  coffeePos += direction;

  if (coffeePos < 0) coffeePos = 0;
  if (coffeePos > cards - visibleCards) coffeePos = cards - visibleCards;

  track.style.transform = `translateX(${-coffeePos * cardWidth}px)`;
}

// Attach events
document
  .querySelector(".coffee-prev")
  .addEventListener("click", () => moveCoffeeSlide(-1));
document
  .querySelector(".coffee-next")
  .addEventListener("click", () => moveCoffeeSlide(1));
