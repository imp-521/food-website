const menuFood = document.querySelector(".menuFood");
const cardFood = document.querySelector(".cardFood");
const cartCounter = document.querySelector(".sign-in .circle span");

// لیست محصولات
let productList = [
  { id: 1, name: "برگر گوشت", price: "۱۴۰,۰۰۰ تومان", image: "img/burger.png" },
  { id: 2, name: "رپ گوشت", price: "۲۵۰,۰۰۰ تومان", image: "img/chicken-roll.png" },
  { id: 3, name: "مرغ سوخاری", price: "۳۴۳,۰۰۰ تومان", image: "img/fried-chicken.png" },
  { id: 4, name: "ساندویچ سبزیجات", price: "۲۲۵,۰۰۰ تومان", image: "img/sandwich.png" },
  { id: 5, name: "پیتزا", price: "۸۷,۰۰۰ تومان", image: "img/pizza.png" },
  { id: 6, name: "لازانیا", price: "۴۳۲,۰۰۰ تومان", image: "img/lasagna.png" },
  { id: 7, name: "سپرینگ رول", price: "۱۰۰,۰۰۰ تومان", image: "img/spring-roll.png" },
  { id: 8, name: "اسپاگتی", price: "۱۹۰,۰۰۰ تومان", image: "img/spaghetti.png" },
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

// تبدیل اعداد فارسی به انگلیسی
function persianToEnglishNumber(str) {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  return str.replace(/[۰-۹]/g, d => persianNumbers.indexOf(d));
}

// تبدیل قیمت فارسی با کاما به عدد
function toNumber(priceText) {
  let cleaned = priceText.replace(/تومان/g, "").replace(/,/g, "").trim();
  cleaned = persianToEnglishNumber(cleaned);
  return parseInt(cleaned) || 0;
}

// تبدیل عدد به فارسی
function toPersianNumber(num) {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  return num.toString().split("").map(d => /\d/.test(d) ? persianNumbers[d] : d).join("");
}

// افزودن محصول به سبد خرید
const addFood = (product) => {
  // اگر محصول قبلاً اضافه شده بود، فقط تعدادش را زیاد کن
  const existingCard = Array.from(cardFood.children).find(card => {
    return card.querySelector("h3").innerText === product.name;
  });

  if (existingCard) {
    const quantitySpan = existingCard.querySelector(".cardFoodValue span");
    let quantity = parseInt(persianToEnglishNumber(quantitySpan.innerText)) || 1;
    quantity++;
    quantitySpan.innerText = toPersianNumber(quantity);
  } else {
    // اگر محصول جدید بود، کارت جدید بساز
    cardFood.innerHTML += `
      <div class="card">
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
  }

  updateTotal();
  updateCartCounter();
};

// Event Delegation برای دکمه‌ها در منو
menuFood.addEventListener("click", (e) => {
  if (e.target.classList.contains("addBuy")) {
    const id = e.target.dataset.id;
    const product = productList.find((p) => p.id == id);
    addFood(product);
  }
});

// Event Delegation برای دکمه‌های + و -
cardFood.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-plus") || e.target.classList.contains("fa-minus")) {
    const card = e.target.closest(".card");
    const quantitySpan = card.querySelector(".cardFoodValue span");
    let quantity = parseInt(persianToEnglishNumber(quantitySpan.innerText)) || 1;

    if (e.target.classList.contains("fa-plus")) {
      quantity++;
      quantitySpan.innerText = toPersianNumber(quantity);
    } else if (e.target.classList.contains("fa-minus")) {
      quantity--;
      if (quantity < 1) {
        // حذف کامل کارت
        card.remove();
      } else {
        quantitySpan.innerText = toPersianNumber(quantity);
      }
    }

    updateTotal();
    updateCartCounter();
  }
});

// محاسبه مجموع
function updateTotal() {
  let total = 0;
  const cards = document.querySelectorAll(".cardFood .card");
  cards.forEach(card => {
    const price = toNumber(card.querySelector(".cardFoodPrice span").innerText);
    const quantity = parseInt(persianToEnglishNumber(card.querySelector(".cardFoodValue span").innerText)) || 1;
    total += price * quantity;
  });

  const totalElement = document.querySelector(".cardTotalprice p");
  totalElement.innerText = "مجموع : " + toPersianNumber(total) + " تومان";
}

// بروزرسانی عدد روی آیکون سبد
function updateCartCounter() {
  const cards = document.querySelectorAll(".cardFood .card");
  let count = 0;
  cards.forEach(card => {
    count += parseInt(persianToEnglishNumber(card.querySelector(".cardFoodValue span").innerText)) || 1;
  });
  cartCounter.innerText = toPersianNumber(count);
}

// باز و بسته کردن سبد خرید
const close = document.getElementById("close");
const buy = document.querySelector(".buy");
const cardWrapper = document.querySelector(".cardWrapper");

buy.addEventListener("click", () => {
  cardWrapper.classList.add("active");
});

close.addEventListener("click", () => {
  cardWrapper.classList.remove("active");
});


