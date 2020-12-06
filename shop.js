const productGallery = document.querySelector(".productGallery");

const itemsInShop = [
  {
    name: "Guyaki traditional",
    price: 2,
  },
  {
    name: "Mate green",
    price: 3,
  },
  {
    name: "Elaborada",
    price: 2.5,
  },
  {
    name: "Zestaw do yerby",
    price: 10,
  },
  {
    name: "Rio negro",
    price: 7.5,
  },
  {
    name: "YerbaCan",
    price: 5,
  },
];

function generateGallery(item, index) {
  const { name, price } = item;
  return `
            <div class="product">
             <p class="product__name">${name}</p>
             <div class="img__container">
            <img src="images/product${
              index + 1
            }.jpg" alt="${name}" class="product__img">
            </div>
             <div class="product__params">
                <p class="product__price"><span>${price}</span><span> $</span></p>
                <a href="shop.html" class="addToShoppingCart">Add to cart</a>
              </div>
        </div>
            `;
}

//better method for this?
const html1 = itemsInShop
  .map((item, index) => generateGallery(item, index))
  .join("");
const html2 = itemsInShop
  .map((item, index) => generateGallery(item, index))
  .join("");
const html = html1 + html2;
productGallery.innerHTML = html;

const productCounter = document.querySelector(".client__cart span");

const productsToBuy = [];
function generateSummaryItems({ src, alt, amount, price }) {
  return `
<div class="toBuyProduct">
          <div class="toBuyProduct__left">
            <img src="${src}" alt="${alt}">
          </div>
          <div class="toBuyProduct__right">
            <h1>${alt}</h1>
            Amount: ${amount}
            <span class="cost">${amount * price} $</span>
          </div>
          </div>
          <hr />
        `;
}

const summaryFooter = document.querySelector(".summary");
function generateSummary() {
  const cost = productsToBuy.reduce((prev, { price, amount }) => {
    return prev + price * amount;
  }, 0);
  summaryFooter.innerHTML = `
        <span>Total cost: ${cost} $</span><a href="" class="summary__submit">Submit order</a>
        `;

  document
    .querySelector(".summary__submit")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert("Thanks for checking my shop demo");
    });
}

function handleClick(e) {
  e.preventDefault();
  const product = e.currentTarget.parentNode.parentNode.querySelector("img");
  const productSrc = product.src;
  const productName = product.alt;
  const productPrice = parseFloat(
    e.currentTarget.parentNode.parentNode.querySelector(".product__price")
      .firstChild.innerHTML
  );

  let found = false;
  for (let i = 0; i < productsToBuy.length; i++) {
    if (productsToBuy[i].alt == productName) {
      productsToBuy[i].amount++;
      found = true;
      break;
    }
  }
  if (!found) {
    productsToBuy.push({
      src: productSrc,
      alt: productName,
      price: productPrice,
      amount: 1,
    });
  }
  productCounter.innerHTML = productsToBuy.length;
  const summaryItemsHTML = productsToBuy
    .map((productToBuy) => generateSummaryItems(productToBuy))
    .join("");
  document.querySelector(".product-in-summary").innerHTML = summaryItemsHTML;
  generateSummary();
}
const products = document.querySelectorAll("a.addToShoppingCart");
products.forEach((product) => product.addEventListener("click", handleClick));

const wrapper = document.querySelector("#wrapper");
const goToSummaryBtn = document.querySelector(".client__cart a");
const summary = document.querySelector(".orderSummary");
function actionSummary(e) {
  e.preventDefault();
  if (productsToBuy.length > 0) {
    wrapper.classList.toggle("wrapper");
    summary.classList.toggle("openSummary");
  }
}

const leaveSummaryBtn = document.querySelector("#close");
goToSummaryBtn.addEventListener("click", actionSummary);
leaveSummaryBtn.addEventListener("click", actionSummary);