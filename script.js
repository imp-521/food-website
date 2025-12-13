const menuFood = document.querySelector(".menuFood");
const cardFood = document.querySelector(".cardFood");
const cartCount = document.querySelector(".cartCount");
// لیست محصولات
let productList = [
  { id: 1, name: "برگر گوشت", price: "۱۴۰,۰۰۰ تومان", image: "img/burger.png" },
  {
    id: 2,
    name: "رپ گوشت",
    price: "۲۵۰,۰۰۰ تومان",
    image: "img/chicken-roll.png",
  },
  {
    id: 3,
    name: "مرغ سوخاری",
    price: "۳۴۳,۰۰۰ تومان",
    image: "img/fried-chicken.png",
  },
  {
    id: 4,
    name: "ساندویچ سبزیجات",
    price: "۲۲۵,۰۰۰ تومان",
    image: "img/sandwich.png",
  },
  { id: 5, name: "پیتزا", price: "۸۷,۰۰۰ تومان", image: "img/pizza.png" },
  { id: 6, name: "لازانیا", price: "۴۳۲,۰۰۰ تومان", image: "img/lasagna.png" },
  {
    id: 7,
    name: "سپرینگ رول",
    price: "۱۰۰,۰۰۰ تومان",
    image: "img/spring-roll.png",
  },
  {
    id: 8,
    name: "اسپاگتی",
    price: "۱۹۰,۰۰۰ تومان",
    image: "img/spaghetti.png",
  },
];

// نمایش محصولات در منو
productList.forEach((product) => {
  menuFood.innerHTML += `
    <div dir="rtl">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button class="addBuy button" data-id="${product.id}">افزودن به سبد خرید</button>
    </div>
  `;
});

// افزودن محصول به سبد خرید
const addFood = (product) => {
  cardFood.innerHTML += `
    <div class="card" data-id="${product.id}" data-price="${toNumber(
    product.price
  )}">
      <div class="cardFoodImg">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="cardFoodPrice">
        <h3>${product.name}</h3>
        <span>${product.price}</span>
      </div>
      <div class="cardFoodValue">
        <i class="fa-solid fa-minus"></i>
        <span>۱</span>
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
  `;
  updateTotal();
  updateCartCount()
};

// Event Delegation برای دکمه‌ها
menuFood.addEventListener("click", (e) => {
  if (e.target.classList.contains("addBuy")) {
    const id = e.target.dataset.id;
    const product = productList.find((p) => p.id == id);

    const existCard = cardFood.querySelector(`.card[data-id='${id}']`);
    if (existCard) {
      const countSpan = existCard.querySelector(".cardFoodValue span");
      let count = toNumber(countSpan.innerText);
      count++;
      const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      countSpan.innerText = count
        .toString()
        .replace(/\d/g, (d) => persianDigits[d]);

      const unitPrice = Number(existCard.dataset.price);
      const newPrice = unitPrice * count;
      const priceSpan = existCard.querySelector(".cardFoodPrice span");
      priceSpan.innerText =
        newPrice.toString().replace(/\d/g, (d) => persianDigits[d]) + " تومان";

      updateTotal();
      return; // کارت جدید اضافه نشود
    }

    // اگر کارت وجود نداشت، اضافه می‌کنیم
    addFood(product);
  }
});

cardFood.addEventListener("click", (e) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const card = e.target.closest(".card");
  if (!card) {
    return;
  }
  const countSpan = card.querySelector(".cardFoodValue span");
  let count = toNumber(countSpan.innerText);
  const unitPrise = Number(card.dataset.price);
  if (e.target.classList.contains("fa-plus")) {
    count++;
  }
  if (e.target.classList.contains("fa-minus")) {
    if (count > 1) {
      count--;
    } else {
      card.remove();
      updateTotal();
      return;
    }
  }

  const newPrice = unitPrise * count;
  const priceSpan = card.querySelector(".cardFoodPrice span");
  priceSpan.innerText =
    newPrice.toString().replace(/\d/g, (d) => persianDigits[d]) + "تومان";

  countSpan.innerText = count
    .toString()
    .replace(/\d/g, (d) => persianDigits[d]);

  updateTotal();
});

// OPEN CLOSE NAV
const body = document.querySelector("body");
const closeBtn = body.querySelector(".navClose-btn");
const openBtn = body.querySelector(".navOpen-btn");
const nav = body.querySelector("nav");

if (nav && openBtn) {
  openBtn.addEventListener("click", () => {
    nav.classList.add("open");
    body.style.overflowY = "hidden";
  });
}

if (nav && closeBtn) {
  closeBtn.addEventListener("click", () => {
    nav.classList.remove("open");
    body.style.overflowY = "scroll";
  });
}

// SWIPER
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

// NAVLINK ACTIVE
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active-navlink"));
    link.classList.add("active-navlink");
  });
});

const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active-navlink");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-navlink");
    }
  });
});

// OPEN/CLOSE CART
const close = document.getElementById("close");
const buy = document.querySelector(".buy");
const cardWrapper = document.querySelector(".cardWrapper");
const prices = document.querySelectorAll(".cardFood .card .cardFoodPrice span");
prices.forEach((p) => {});

buy.addEventListener("click", () => {
  cardWrapper.classList.add("active");
});

close.addEventListener("click", () => {
  cardWrapper.classList.remove("active");
});

// حذف تومان و کاما

function toNumber(priceText) {
  let cleaned = priceText.replace(/تومان/g, "").replace(/,/g, "").trim();
  const persianNumber = "۰۱۲۳۴۵۶۷۸۹";
  cleaned = cleaned.replace(/[۰-۹]/g, (d) => persianNumber.indexOf(d));
  return parseInt(cleaned);
}
function updateTotal() {
  let total = 0;
  const cards = document.querySelectorAll(".cardFood .card");

  cards.forEach((card) => {
    const priceText = card.querySelector(".cardFoodPrice span").innerText;
    const countText = card.querySelector(".cardFoodValue span").innerText;

    const price = toNumber(priceText);
    const count = toNumber(countText);

    total += price * count;
  });
  const persianNumber = "۰۱۲۳۴۵۶۷۸۹";
  const totalPersian = total.toString().replace(/\d/g, (d) => persianNumber[d]);
  document.querySelector(
    ".cardTotalprice p"
  ).innerText = `مجموع : ${totalPersian}`;
}

function updateCartCount() {
  const cards = document.querySelectorAll(".cardFood .card");
  let totalCount = 0;
  cards.forEach((card) => {
    const countText = card.querySelector(".cardFoodValue span").innerText;
    totalCount += toNumber(countText);
  });

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  cartCount.innerText = totalCount
    .toString()
    .replace(/\d/g, (d) => persianDigits[d]);
}

