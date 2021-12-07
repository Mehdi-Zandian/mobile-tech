// function for phone cards HTML ----------------------------------
function phoneCardHTMLFactory(brand) {
  // get all phones of brand one by one
  brand.forEach((phone) => {
    const phoneCardHTML = `
        <div class="img-container">
          <span class="tag">${
            phone.new == "true" ? "New" : "" || phone.top == "true" ? "Top" : ""
          }</span>
    
          <a href="#"><img src="${phone.image}" /></a>
    
          <div class="information-hover">
            <span class="add-to-cart" title="Add ${
              phone.name
            } to your shopping card">Add to cart</span>
            <span class="like-product" title="Save ${
              phone.name
            } to your favourit phones"><i class="far fa-heart"></i></span>
            <span class="compare-product" title="Compare ${
              phone.name
            } to another phone"
              ><a href="./htmls/compare.html"><i class="far fa-chart-bar"></i></a
            ></span>
          </div>
        </div>
    
        <div class="information-container">
          <span class="name-brand">
            <i class="fas fa-mobile-alt"></i>
            ${phone.name}
          </span>
    
          <div class="price-container">
            <span class="discount"> ${"$" + phone.mainPrice} </span>
            <span class="price"> now price ${"$" + phone.discount} </span>
          </div>
    
          <div class="save-money">
            Save <span class="discount-result">${
              "$" + (Number(phone.mainPrice) - Number(phone.discount))
            }</span> with this trade
            in
            <sup>${phone.discountDays} days</sup>
          </div>
    
          <button class="buy-now" title="Click to see more specs of ${
            phone.name
          }">Learn more</button>
        </div>
        `;

    // craete a product tag (consider the class inside SASS)
    let product = document.createElement("div");
    product.classList = "product";

    // add the created HTML to product
    product.innerHTML = phoneCardHTML;

    // give the special class
    if (phone.top == "true") {
      product.classList.add("top-sell-products");

      // append the product tag to the phones container
      document.querySelector(".container-top-sell").appendChild(product);
    } else if (phone.new == "true") {
      product.classList.add("new-release-products");

      // append the product tag to the phones container
      document.querySelector(".container-new-release").appendChild(product);
    }
  });
}

// variables
// new-release slider variables ************************************
// container of products inside new release
const containerNewRelease = document.querySelector(".container-new-release");

// next product button for new-release
const nextNewProduct = document.querySelector("#next-new-release");

// prev product button for new-release
const prevNewProduct = document.querySelector("#prev-new-release");

// top-selling slider variables ************************************
// container of products inside top selling
const containerTopSell = document.querySelector(".container-top-sell");

// next product button for top selling
const nextTopProduct = document.querySelector("#next-top-sell");

// prev product button for top selling
const prevTopProduct = document.querySelector("#prev-top-sell");

// user comments slider variables ************************************
const comments = document.querySelectorAll(".user");
const nextComment = document.querySelector("#next-comment");
const prevComment = document.querySelector("#prev-comment");

// phone brands slider variables ************************************
const brandsContainer = document.querySelector(".brands-slider-container");
const brandsItems = document.querySelectorAll(".brands");

//
const shoppingCard = document.querySelector(".shopping-icon");
const shoppingCardContainer = document.querySelector(".shopping-card");

// get all add to card buttons
let addToCardBtns = null;

// get all learn more buttons
setTimeout(() => {
  const learnMore = document.querySelectorAll(".buy-now");

  learnMore.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.replace("htmls/comingSonn.html");
    });
  });
}, 4600);

// objects -------------------------------------------
let newReleaseSlider;

// // top selling slider object
let topSellingSlider;

// // phone brands slider object
let phoneBrandsSlider = new SliderActions(brandsContainer, brandsItems);

// eventListeners -------------------------------------------
eventListener();
function eventListener() {
  // next product new-release show eventListener
  nextNewProduct.addEventListener("click", nextNewProductShow);

  // prev product new-release show eventListener
  prevNewProduct.addEventListener("click", prevNewProductShow);

  // next product top-sell show eventListener
  nextTopProduct.addEventListener("click", nextTopProductShow);

  // prev product new-release show eventListener
  prevTopProduct.addEventListener("click", prevTopProductShow);

  // next user comment slider
  nextComment.addEventListener("click", nextCommentShow);

  // prev user comment slider
  prevComment.addEventListener("click", prevCommentShow);

  // jump to fisrt phone brand card
  brandsContainer.addEventListener("transitionend", jumpToFirstBrand);

  // show shopping card
  shoppingCard.addEventListener("click", showShoppingCard);

  // addCards to containers on content load
  document.addEventListener("DOMContentLoaded", addCardsToContainers);
}

// functions
// addCards to containers on content load
function addCardsToContainers() {
  // create a new object of XML
  const XML = new XMLHttpRequest();

  // open xml
  XML.open("GET", "./JSON/phonesData.json", true);

  // load xml
  XML.onload = function () {
    // if the conenction is right go on
    if (this.status === 200 && this.readyState === 4) {
      // get all Samsung phones
      let phonesDataSamsung = JSON.parse(this.responseText).samsung;

      // get all iPhone phones
      let phonesDataiPhone = JSON.parse(this.responseText).iphone;

      // get all Xiaomi phones
      let phonesDataXiaomi = JSON.parse(this.responseText).xiaomi;

      // add Samsung phones to document
      phoneCardHTMLFactory(phonesDataSamsung);

      // add iPhone phones to document
      phoneCardHTMLFactory(phonesDataiPhone);

      // add Xiaomi phones to document
      phoneCardHTMLFactory(phonesDataXiaomi);

      setTimeout(() => {
        addToCardBtns = document.querySelectorAll(".add-to-cart");

        // add phone to card on click
        addToCardBtns.forEach((button) => {
          button.addEventListener("click", addToCard);
        });
      }, 1500);

      setTimeout(() => {
        const newReleaseProducts = document.querySelectorAll(
          ".new-release-products"
        );

        // new release slider object
        newReleaseSlider = new ProductSlider(
          containerNewRelease,
          newReleaseProducts
        );

        // finding first and last card
        newReleaseSlider.findFirstAndLast();

        // hide buttons on content load
        newReleaseSlider.hideButtons(nextNewProduct, prevNewProduct);
      }, 1500);

      setTimeout(() => {
        const topSellProducts = document.querySelectorAll(".top-sell-products");

        topSellingSlider = new ProductSlider(containerTopSell, topSellProducts);

        // finding first and last card
        topSellingSlider.findFirstAndLast();

        // hide buttons on content load
        topSellingSlider.hideButtons(nextTopProduct, prevTopProduct);
      }, 1500);
    }
  };

  // send the xml
  XML.send();
}

// product slider -------------------------------------------

// GO FOR newRelease Settings
// show next card
function nextNewProductShow() {
  newReleaseSlider.nextProductShow(nextNewProduct, prevNewProduct);
}

// show prev card
function prevNewProductShow() {
  newReleaseSlider.prevProductShow(nextNewProduct, prevNewProduct);
}

// GO FOR TopSelling settings
// show next card
function nextTopProductShow() {
  topSellingSlider.nextProductShow(nextTopProduct, prevTopProduct);
}

// show prev card
function prevTopProductShow() {
  topSellingSlider.prevProductShow(nextTopProduct, prevTopProduct);
}

// user comments slider -------------------------------------------
let commentCounter = 0;

// next comment show
function nextCommentShow() {
  // hide the comment smoothly
  comments[commentCounter].style.opacity = 0;

  // after 500ms run the function (after opacity animation)
  setTimeout(() => {
    // throw the old comment
    comments[commentCounter].style.transform = "translateX(-150%)";

    // add to counter for going to next comment
    commentCounter++;

    // if it has reached to the maximum reset the counter
    if (commentCounter > 2) commentCounter = 0;

    // bring back the next comment
    comments[commentCounter].style.transform = "translateX(0px)";

    // show the next comment slowly
    comments[commentCounter].style.opacity = 1;
  }, 550);
}

// prev comment show
function prevCommentShow() {
  // hide the comment smoothly
  comments[commentCounter].style.opacity = 0;

  // after 500ms run the function (after opacity animation)
  setTimeout(() => {
    // throw the old comment
    comments[commentCounter].style.transform = "translateX(-150%)";

    // add to counter for going to next comment
    commentCounter--;

    // if it has reached to the maximum reset the counter
    if (commentCounter < 0) commentCounter = 2;

    // bring back the next comment
    comments[commentCounter].style.transform = "translateX(0px)";

    // show the next comment slowly
    comments[commentCounter].style.opacity = 1;
  }, 550);
}

// auto next comment show
setInterval(() => {
  nextCommentShow();
}, 15000);

// phone brands slider -------------------------------------------
// show next brand phone
function nextBrandShow() {
  phoneBrandsSlider.nextShow();
}

// jump to first row when it comes to last card
function jumpToFirstBrand() {
  if (brandsItems[phoneBrandsSlider.counter].id === "last-push") {
    //if its the last brand
    brandsContainer.style.transition = "none";
    phoneBrandsSlider.counterChange = 0;
    brandsContainer.style.transform =
      "translateX(" +
      -phoneBrandsSlider.size * phoneBrandsSlider.counter +
      "px)";
  }
}

// auto next show (infinite)
setInterval(() => {
  nextBrandShow();
}, 1000);

// show shopping card -------------------------------------------
function showShoppingCard(e) {
  e.preventDefault();

  // show shopping card container
  shoppingCardContainer.classList.toggle("active-shopping");
}

// add phone to card on click
function addToCard(e) {
  e.preventDefault();

  // get the phone card
  const phoneCard = e.target.parentElement.parentElement.parentElement;

  // get the name
  const nameOfPhone = phoneCard.children[1].children[0].textContent.trim();

  // get the price
  const priceOfPhone = phoneCard.children[1].children[1].children[1].textContent
    .trim()
    .replace("now price ", "");

  // get the image
  const imageOfPhone =
    phoneCard.children[0].children[1].firstElementChild.src.trim();

  // get the container (table)
  const shoppingTable = document.querySelector(".added-phones");

  // add to shopp object
  let addToShop = new AddToObject(
    nameOfPhone,
    imageOfPhone,
    priceOfPhone,
    shoppingTable
  );

  // use the appendToContainer() function of object to append the phone in container
  addToShop.appendToContainer();

  // get removeCard
  const removeCard = document.querySelectorAll(".remove-card");

  // for removing card
  removeCard.forEach((remove) => {
    remove.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });
  });
}
