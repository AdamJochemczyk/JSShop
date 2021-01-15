import {
  getElements,
  injectGallery,
  getSummaryButtons,
  actionSummary,
} from "../shop";


describe("tests for shop",()=>{

     document.body.innerHTML = `
     <main>
      <section class="orderSummary">
        <a id="close">X</a>
        <h1>Your order</h1>
        <hr/>
        <div class="product-in-summary">
        </div>
        <div class="summary"></div>
      </section>
    <div id="wrapper">
    <div class="client">
      <h2><a href="#">Yerbashop</a></h2>
      <div class="client__cart">
        <a>
          <i class="fas fa-shopping-cart"></i>
          <span></span>
        </a>
      </div>
    </div>
    <section class="productGallery"></section>
    </main>
    `;

    test('should generate 12 items in gallery', () => {
      getElements();
      injectGallery();
      expect(Array.from(document.querySelectorAll(".product")).length===12).toBe(true)
    })

})
