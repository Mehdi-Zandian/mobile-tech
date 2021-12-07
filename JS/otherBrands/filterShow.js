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
const filterContainer = document.querySelector(".filter-container");
const optionsContainer = document.querySelector(".options-container");
const optionsFilter = document.querySelectorAll(".options-container label");
const selectedFilter = document.querySelector(".selected-filter");
// ***
const sortContainer = document.querySelector(".sort-container");
const sortOptionsContainer = document.querySelector(".sort-options-container");
const sortOptions = document.querySelectorAll(".sort-options-container label");
const selectedSort = document.querySelector(".selected-sort");
//
const shoppingCard = document.querySelector(".shopping-icon");
const shoppingCardContainer = document.querySelector(".shopping-card");

// eventListener ----------------------------------
eventListeners();
function eventListeners() {
  // click on filter container
  filterContainer.addEventListener("click", showFilters);

  // click on the options of filter
  optionsFilter.forEach((option) => {
    option.addEventListener("click", optionFilterEvent);
  });

  // click on sort container
  sortContainer.addEventListener("click", showSort);

  // click on the sort of options
  sortOptions.forEach((sort) => {
    sort.addEventListener("click", sortOptionEvent);
  });

  // default checked inputes on content load
  document.addEventListener("DOMContentLoaded", () => {
    // option filters
    optionsFilter[0].firstElementChild.checked = true;

    // sort options
    sortOptions[0].firstElementChild.checked = true;
  });

  // show shopping card
  shoppingCard.addEventListener("click", showShoppingCard);
}

// functions ----------------------------------
// show the filter container
function showFilters() {
  // add and remove the class
  optionsContainer.classList.toggle("options-active");
}

// now what to do when click on each filter
function optionFilterEvent(option) {
  // get option.target + check if it doesnt have target pass undefined
  let filterTarget;
  let filterTargetChecked;
  try {
    filterTarget = option.target;
    filterTargetChecked = option.target.checked;
  } catch {}

  if (filterTargetChecked == true || filterTarget == undefined) {
    // hide filter and sort container
    filterContainer.style.opacity = "0.5";
    filterContainer.style.pointerEvents = "none";
    sortContainer.style.opacity = "0.5";
    sortContainer.style.pointerEvents = "none";

    // first off change the name of selected filter (get the name) **********************
    let nameOfFilter;
    if (option == "Default") {
      // name of filter
      nameOfFilter = selectedFilter.textContent.trim();
    } else {
      showFilters();
      // name of filter
      nameOfFilter = filterTarget.parentElement.textContent.trim();
    }

    // sort options
    sortOptions[0].firstElementChild.checked = true;
    selectedSort.innerHTML = `
    Default
    <i class="fas fa-chevron-down"></i>
    `;

    // put the name + i tag
    selectedFilter.innerHTML = `
    ${nameOfFilter}
    <i class="fas fa-chevron-down"></i>
    `;

    // set the changes and filters **********************
    // get all products and then remove
    const products = document.querySelectorAll(".product");

    // remove all the cards
    products.forEach((product) => {
      product.remove();
    });

    // display (none) the load-more button
    loadMore.style.display = "none";

    // create the loader img tag
    const loader = document.createElement("img");
    loader.src = "../Images/Loader.gif";
    loader.classList = "loader-img";

    // append it to main-container before phones-container
    document
      .querySelector(".main-container main")
      .insertBefore(loader, document.querySelector(".phones-container"));

    // bring the new filter cards to document after 3 seconds **********************
    setTimeout(async () => {
      // fetch data from json api
      const res = await fetch("../../JSON/phonesData.json");
      const data = await res.json();

      // find the target brand and then bring all cards to the document
      if (nameOfFilter == "Samsung") {
        phoneCardHTMLFactory(data.samsung);
      } else if (nameOfFilter == "Apple") {
        phoneCardHTMLFactory(data.iphone);
      } else if (nameOfFilter == "Xiaomi") {
        phoneCardHTMLFactory(data.xiaomi);
      } else {
        phoneCardHTMLFactory(data.samsung);
        phoneCardHTMLFactory(data.iphone);
        phoneCardHTMLFactory(data.xiaomi);
      }

      // remove the loader img tag
      loader.remove();

      // show filter and sort containers
      filterContainer.style.opacity = "1";
      filterContainer.style.pointerEvents = "all";
      sortContainer.style.opacity = "1";
      sortContainer.style.pointerEvents = "all";

      // hide All the prodcuts except first 6 cards
      let phones = document.querySelectorAll(".product");
      let currentIndex = 5;
      // so display none the rest
      for (let i = phones.length - 1; i > currentIndex; i--) {
        if (!(phones.length < currentIndex)) {
          // check if we have more than 6 cards
          phones[i].classList.add("product-hidden");

          // change the display of load-more button to block
          loadMore.style.display = "block";
        } else {
          // if we have less than 6 cards then remove button
          loadMore.style.display = "none";
        }
      }

      // get all add-to-card buttons + Add eventListener to them
      const addToCardBtns = document.querySelectorAll(".add-to-cart");
      addToCardBtns.forEach((button) => {
        button.addEventListener("click", addToCard);
      });

      // get all learn more buttons
      const learnMore = document.querySelectorAll(".buy-now");
      learnMore.forEach((button) => {
        button.addEventListener("click", () => {
          window.location.replace("comingSonn.html");
        });
      });
    }, 3000);
  }
}

// show sort on clicking sort container
function showSort() {
  // add and remove the class
  sortOptionsContainer.classList.toggle("sort-options-active");
}

// now what to do when click on each sort
function sortOptionEvent(sort) {
  // if it is checked
  if (sort.target.checked == true) {
    // hide filter and sort container
    filterContainer.style.opacity = "0.5";
    filterContainer.style.pointerEvents = "none";
    sortContainer.style.opacity = "0.5";
    sortContainer.style.pointerEvents = "none";
    showSort();

    // first off change the name of selected sort (get the name) **********************
    let nameOfSort = sort.target.parentElement.textContent.trim();

    // name of filter
    const nameOfFilterNow = selectedFilter.textContent.trim();

    // put the name + i tag
    selectedSort.innerHTML = `
    ${nameOfSort}
    <i class="fas fa-chevron-down"></i>
    `;

    // set the changes and sort **********************

    // defining filters
    if (nameOfSort == "Price High" || nameOfSort == "Price Low") {
      // price filters
      priceFilter(nameOfSort);
    } else if (nameOfSort == "Default") {
      // recall this function for going to the default of each phone
      optionFilterEvent(nameOfSort);
    } else if (nameOfSort == "New" || nameOfSort == "Top") {
      // tag (new) or (top) filter
      tagFilter(nameOfSort);
    }

    // show filter and sort containers
    filterContainer.style.opacity = "1";
    filterContainer.style.pointerEvents = "all";
    sortContainer.style.opacity = "1";
    sortContainer.style.pointerEvents = "all";
  }
}

// this is a special function for all things related to price filter
function priceFilter(nameOfSort) {
  // get all products + name of filter
  const products = document.querySelectorAll(".product");
  const nameOfFilter = selectedFilter.textContent.trim();

  // get all prices from products and push to array
  let prices = [];

  products.forEach((phone) => {
    // take out the price from each card
    const finalPrice = phone.children[1].children[1].children[1].textContent
      .trim()
      .replace("now price $", "");

    // push the final price to the array
    prices.push(finalPrice);
  });

  // find which filter show be user price high or price low
  if (nameOfSort == "Price High") {
    prices.sort((a, b) => a - b).reverse();
  } else {
    prices.sort((a, b) => a - b);
  }

  // remove all cards
  products.forEach((phone) => {
    phone.remove();
  });

  // remove load more button
  loadMore.style.display = "none";

  // get data
  const fetchData = async () => {
    // fetch data from json api
    const res = await fetch("../../JSON/phonesData.json");
    const data = await res.json();

    if (nameOfFilter == "Samsung") {
      priceFilterCreate(data.samsung, prices);
    } else if (nameOfFilter == "Apple") {
      priceFilterCreate(data.iphone, prices);
    } else if (nameOfFilter == "Xiaomi") {
      priceFilterCreate(data.xiaomi, prices);
    } else {
      let allPhones = [];
      data.samsung.forEach((e) => allPhones.push(e));
      data.iphone.forEach((e) => allPhones.push(e));
      data.xiaomi.forEach((e) => allPhones.push(e));
      priceFilterCreate(allPhones, prices);
    }

    // hide All the prodcuts except first 6 cards
    let phones = document.querySelectorAll(".product");
    // index of cards that want to be visible
    let currentIndex = 5;
    // so display none the rest
    for (let i = phones.length - 1; i > currentIndex; i--) {
      if (!(phones.length < currentIndex)) {
        // check if we have more than 6 cards
        phones[i].classList.add("product-hidden");
        // change the display of load-more button to block
        loadMore.style.display = "block";
      } else {
        // if we have less than 6 cards then remove button
        loadMore.style.display = "none";
      }
    }

    // get all add-to-card buttons + Add eventListener to them
    const addToCardBtns = document.querySelectorAll(".add-to-cart");
    addToCardBtns.forEach((button) => {
      button.addEventListener("click", addToCard);
    });

    // get all learn more buttons
    const learnMore = document.querySelectorAll(".buy-now");
    learnMore.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.replace("comingSonn.html");
      });
    });
  };
  fetchData();
}

// creating the products after computing price filter
function priceFilterCreate(brand, prices) {
  // final array
  let finalPhones = [];

  // mqtching prices and cards
  for (let i = 0; i < prices.length; i++) {
    brand.forEach((phone, index) => {
      if (phone.discount == prices[i]) {
        // push to the finalPhones array
        finalPhones.push(phone);

        // remove from array
        brand.splice(index, 1);
      }
    });
  }

  // now send finalPhones to this function creating phone cards
  phoneCardHTMLFactory(finalPhones);
}

// this is a special function for all things related to tag filter
function tagFilter(nameOfSort) {
  // get all products
  const products = document.querySelectorAll(".product");

  // check phone one by one and display none if is not needed
  products.forEach((phone) => {
    // get the tag
    const tag = phone.children[0].children[0].textContent.trim();

    // if tags match display block else display non
    if (tag == nameOfSort) {
      phone.style.display = "block";
      phone.classList.add("product-back");
    } else {
      phone.style.display = "none";
      phone.classList.add("product-hidden");
    }

    // display (none) the load-more button
    loadMore.style.display = "none";
  });
}

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
