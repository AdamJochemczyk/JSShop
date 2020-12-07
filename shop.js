const productGallery = document.querySelector(".productGallery");
const productCounter = document.querySelector(".client__cart span");
const wrapper = document.querySelector("#wrapper");
const goToSummaryBtn = document.querySelector(".client__cart a");
const summary = document.querySelector(".orderSummary");
const leaveSummaryBtn = document.querySelector("#close");
const summaryFooter = document.querySelector(".summary");
let productsToBuy = [];

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
productGallery.innerHTML = html1 + html2;

function generateSummaryItems({ src, alt, amount, price }) {
  return `
<div class="toBuyProduct">
          <div class="toBuyProduct__left">
            <img src="${src}" alt="${alt}">
          </div>
          <div class="toBuyProduct__right">
            <h1>${alt}</h1>
            Amount: <input class="toBuyProduct__amount" type='number' value='${amount}' min='1'>
            <button type="button" class="toBuyProduct__remove">Remove</button>
            <span class="cost">Total: ${amount * price} $</span>
          </div>
          </div>
          <hr />
        `;
}
function removeItem(e) {
  const itemNameToRemove = e.target.parentNode.querySelector("h1").innerText;
  productsToBuy = productsToBuy.filter(({ alt }) => alt !== itemNameToRemove);
  updateSummaryItems();
}
function updateRemoveButtons() {
  const removeButtons = Array.from(
    document.querySelectorAll(".toBuyProduct__remove")
  );
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", removeItem);
  });
}

function getTotalCost() {
  return productsToBuy.reduce((prev, { price, amount }) => {
    return prev + price * amount;
  }, 0);
}
function addSummarySubmitAction() {
  document
    .querySelector(".summary__submit")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert("Thanks for checking my shop demo");
    });
}

function generateSummaryFooter() {
  summaryFooter.innerHTML = `
        <span>Total cost: ${getTotalCost()} $</span><a href="" class="summary__submit">Submit order</a>
        `;
  addSummarySubmitAction();
}

function addProductToBuy(productSrc, productName, productPrice) {
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
}

function updateProductsCounter() {
  productCounter.innerHTML = productsToBuy.reduce(
    (prev, { amount }) => prev + amount,
    0
  );
}
function updateAmountInItem(){
    const inputs =Array.from(document.querySelectorAll(".toBuyProduct__amount"));
    inputs.forEach(input => {
        input.addEventListener('change',(e)=>{
            let newAmount=parseInt(e.target.value)
            if(newAmount<1){
            newAmount=1;
            }  
            const itemName = e.target.parentNode.querySelector("h1").innerText;
            for(let i=0;i<productsToBuy.length;i++){
                if(productsToBuy[i].alt===itemName)
                {
                    productsToBuy[i].amount=newAmount;
                }
            }
            updateSummaryItems();
        })
    });
}
function updateSummaryItems() {
  const summaryItemsHTML = productsToBuy
    .map((productToBuy) => generateSummaryItems(productToBuy))
    .join("");
  document.querySelector(".product-in-summary").innerHTML = summaryItemsHTML;
  updateRemoveButtons();
  generateSummaryFooter();
  updateProductsCounter();
  updateAmountInItem();
}
function handleAddToShoppingCartClick(e) {
  e.preventDefault();
  const product = e.currentTarget.parentNode.parentNode.querySelector("img");
  const productSrc = product.src;
  const productName = product.alt;
  const productPrice = parseInt(
    e.currentTarget.parentNode.parentNode.querySelector(".product__price")
      .firstChild.innerHTML
  );

  addProductToBuy(productSrc, productName, productPrice);
  updateProductsCounter();
  updateSummaryItems();
}

const products = document.querySelectorAll("a.addToShoppingCart");
products.forEach((product) =>
  product.addEventListener("click", handleAddToShoppingCartClick)
);

function actionSummary(e) {
  e.preventDefault();
  wrapper.classList.toggle("wrapper");
  summary.classList.toggle("openSummary");
}

goToSummaryBtn.addEventListener("click", actionSummary);
leaveSummaryBtn.addEventListener("click", actionSummary);
