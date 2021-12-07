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
              ><a href="../htmls/compare.html"><i class="far fa-chart-bar"></i></a
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

    // append the product tag to the phones container
    document.querySelector(".phones-container").appendChild(product);
  });
}

// variables ----------------------------------
let loadMore = document.querySelector(".load-more");

// eventListeners ----------------------------------
eventListeners();
function eventListeners() {
  // 5 steps to get info from api
  // create a new event (step 1)
  document.addEventListener("DOMContentLoaded", loadPhones);

  // load more phones on click button
  loadMore.addEventListener("click", loadMorePhones);
}

// functions ----------------------------------
function loadPhones() {
  // hiding filter and sort
  filterContainer.style.opacity = "0.5";
  filterContainer.style.pointerEvents = "none";
  sortContainer.style.opacity = "0.5";
  sortContainer.style.pointerEvents = "none";

  // change the display of load-more button to none
  loadMore.style.display = "none";

  // create the loader img tag
  const loader = document.createElement("img");
  loader.src = "../Images/Loader.gif";
  loader.classList = "loader-img";

  // append it to main-container before phones-container
  document
    .querySelector(".main-container main")
    .insertBefore(loader, document.querySelector(".phones-container"));

  // bring phones to document after 4 seconds *****
  setTimeout(() => {
    // create a new object of XML
    const XML = new XMLHttpRequest();

    // open xml
    XML.open("GET", "../JSON/phonesData.json", true);

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

        // remove the loader img
        loader.remove();

        // show filter and sort containers
        filterContainer.style.opacity = "1";
        filterContainer.style.pointerEvents = "all";
        sortContainer.style.opacity = "1";
        sortContainer.style.pointerEvents = "all";

        // add Samsung phones to document
        phoneCardHTMLFactory(phonesDataSamsung);

        // add iPhone phones to document
        phoneCardHTMLFactory(phonesDataiPhone);

        // add Xiaomi phones to document
        phoneCardHTMLFactory(phonesDataXiaomi);
      }
    };

    // send the xml
    XML.send();

    // hide All the prodcuts except first 6 cards
    setTimeout(() => {
      // get all products
      let products = document.querySelectorAll(".product");

      // index of cards that want to be visible
      let currentIndex = 5;

      // so display none the rest
      for (let i = products.length - 1; i > currentIndex; i--) {
        if (!(products.length < currentIndex)) {
          // check if we have more than 6 cards
          products[i].classList.add("product-hidden");

          // change the display of load-more button to block
          loadMore.style.display = "block";
        } else {
          // if we have less than 6 cards then remove button
          loadMore.style.display = "none";
        }
      }
    }, 200);
  }, 4000);
}

// init setting for showing next 6 phones
let currentIndex = 6;
let nextSix = 12;

// load more phones on clicking button
function loadMorePhones() {
  // change the display of load-more button to none
  loadMore.style.display = "none";

  // create the loader img tag
  const loader = document.createElement("img");
  loader.src = "../Images/Loader.gif";
  loader.classList = "loader-img";

  // append it to main-container before phones-container
  document
    .querySelector(".main-container main")
    .insertBefore(loader, document.querySelector(".load-more"));

  // bring more phone cards after 3 seconds
  setTimeout(() => {
    // remove loader ing tag
    loader.remove();

    // get all products cars
    let products = document.querySelectorAll(".product");

    // display show next 6 phones
    for (let i = currentIndex; i <= nextSix - 1; i++) {
      if (!(i > products.length - 1)) {
        products[i].classList.add("product-back");

        // show load more button if it's not thye last round
        loadMore.style.display = "block";
      } else {
        // remove load more button if it was thye last round
        loadMore.style.display = "none";
      }
    }

    // double the index fore next 6 phones
    nextSix += 6;
  }, 3000);
}
