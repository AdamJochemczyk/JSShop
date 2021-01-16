const puppeter = require("puppeteer");

test("Basic functions in page work correctly", async () => {
  const browser = await puppeter.launch({
    headless: false,
    args: ["--window-size=1366,768"],
    defaultViewport: {
      width: 1366,
      height: 768,
    },
  });

  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/dist/index.html");
  await page.click("body > main > header > nav > li:nth-child(2) > a");
  await page.waitForSelector(
    "#wrapper > section > div:nth-child(1) > div.product__params > a"
  );

  await page.click(
    "#wrapper > section > div:nth-child(1) > div.product__params > a"
  );
  const productsInCart = await page.$eval(
    "#wrapper > div > div > a > span",
    (el) => el.textContent
  );
  expect(productsInCart).toBe("1");
  await page.click(
    "#wrapper > div > div > a > i"
  );
  await page.click(
    "body > main > section > div.product-in-summary > div > div.toBuyProduct__right > input"
  );
  await page.type(
    "body > main > section > div.product-in-summary > div > div.toBuyProduct__right > input","4"
  );
  await page.click(
    "body > main > section > div.product-in-summary > div > div.toBuyProduct__right > span"
  );
  const totalCost = await page.$eval(
    "body > main > section > div.summary > span", el=>el.textContent
  );
  expect(totalCost).toBe("Total cost: 28 $");

  await page.click(
    "body > main > section > div.product-in-summary > div > div.toBuyProduct__right > button"
  );
  const finalCost = await page.$eval(
    "body > main > section > div.summary > span",
    (el) => el.textContent
  );
  expect(finalCost).toBe("Total cost: 0 $");

});