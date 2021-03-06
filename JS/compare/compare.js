// function create the card of phone
function createTheCard(phone, index) {
  const phoneCardHtml = `
    <h1 class="name-of-phone">${phone.name.toUpperCase()}</h1>

    <div class="photo-container">
      <img
        src="${phone.image}"
        alt="${phone.name}"
      />
    </div>

    <div class="photo-info-container">
      <div class="add-to-card card-${index}">
        <i class="fas fa-shopping-cart"></i>
        <span title="Add ${phone.name} to your card">Add to card</span>
      </div>

      <div class="like-card">
        <i class="fas fa-heart"></i>
        <span title="Like ${phone.name}">Like</span>
      </div>

      <div class="learn-card">
        <i class="fas fa-info-circle"></i>
        <span class="learn-card" title="Learn more about ${
          phone.name
        }">Learn More</span>
      </div>
    </div>
    `;

  // which container :
  const cardContainer = document.querySelectorAll(".phone-card-photo")[index];

  // append it to main doc
  cardContainer.innerHTML = phoneCardHtml;
}

// variables ----------------------------------------
const dataListFirst = document.querySelector("#list-of-phones-first");
const dataListSecond = document.querySelector("#list-of-phones-second");
//
const seachInputFirst = document.querySelector("#search-first");
const seachBtnFirst = document.querySelector("#search-first-btn");
//
const seachInputSecond = document.querySelector("#search-second");
const seachBtnSecond = document.querySelector("#search-second-btn");
//
const shoppingCard = document.querySelector(".shopping-icon");
const shoppingCardContainer = document.querySelector(".shopping-card");
const addToCardSingles = document.querySelectorAll(".add-to-card");

// eventListeners ----------------------------------------
eventListeners();
function eventListeners() {
  // add datalist automaticlly
  document.addEventListener("DOMContentLoaded", loadDataLists);

  // first search button events
  seachBtnFirst.addEventListener("click", searchFirst);

  // second search button events
  seachBtnSecond.addEventListener("click", searchSecond);

  // show shopping card
  shoppingCard.addEventListener("click", showShoppingCard);

  // for fisrt cards that are shown by default
  addToCardSingles.forEach((card) => {
    card.addEventListener("click", addToCard);
  });
}

// functions ----------------------------------------

// add datalist (input list + inside HTML) automaticlly
async function loadDataLists() {
  // fetch data from json api
  const res = await fetch("../../JSON/phonesData.json");
  const data = await res.json();

  // add phones to data list
  createDataListOptions(data.samsung);
  createDataListOptions(data.iphone);
  createDataListOptions(data.xiaomi);
}

// create the option tag of datalists for each brand (2/2)
function createDataListOptions(brand) {
  // get all phones of each brand
  brand.forEach((phone) => {
    // craete option tag
    const optionFirst = document.createElement("option");
    const optionSecond = document.createElement("option");

    // give the value to option
    optionFirst.value = phone.name;
    optionSecond.value = phone.name;

    // append it to main dataLists
    dataListSecond.appendChild(optionFirst);
    dataListFirst.appendChild(optionSecond);
  });
}

// first search button events
function searchFirst() {
  // show loader
  document
    .querySelector(".loader-shadow")
    .classList.remove("loader-shadow-hidden");

  // get the searched text
  const searchedPhone = seachInputFirst.value.trim().toLowerCase();

  // send it to create the card and table specs
  allSearchBtns(searchedPhone, 0);

  // clear the input value
  seachInputFirst.value = "";
}

// second search button events
function searchSecond() {
  // show loader
  document
    .querySelector(".loader-shadow")
    .classList.remove("loader-shadow-hidden");

  // get the searched text
  const searchedPhone = seachInputSecond.value.trim().toLowerCase();

  // send it to create the card and table specs
  allSearchBtns(searchedPhone, 1);

  // clear the input value
  seachInputSecond.value = "";
}

// function for all search buttons
async function allSearchBtns(searchedPhone, index) {
  // stop loader func
  const stopLoader = () => {
    setTimeout(() => {
      // hide loader
      document
        .querySelector(".loader-shadow")
        .classList.add("loader-shadow-hidden");
    }, 1300);
  };

  // if the search value is not empty
  if (searchedPhone != "") {
    // fetch data from json api
    const res = await fetch("../../JSON/phonesData.json");
    const data = await res.json();

    // get all phones
    const phonesDataSamsung = data.samsung;
    const phonesDataiPhone = data.iphone;
    const phonesDataXiaomi = data.xiaomi;

    // find searched phone
    const samsungFound = phonesDataSamsung.find(
      (phone) => phone.name.toLowerCase() == searchedPhone
    );
    const iphoneFound = phonesDataiPhone.find(
      (phone) => phone.name.toLowerCase() == searchedPhone
    );
    const xiaomiFound = phonesDataXiaomi.find(
      (phone) => phone.name.toLowerCase() == searchedPhone
    );

    if (samsungFound) {
      // send it to createTheCard function to make the card and append
      createTheCard(samsungFound, index);
      // send it to setSpecsTable function to set the information in table
      setSpecsTable(samsungFound, index);
      // stop loader when phone is found
      stopLoader();
    } else if (iphoneFound) {
      createTheCard(iphoneFound, index);
      setSpecsTable(iphoneFound, index);
      stopLoader();
    } else if (xiaomiFound) {
      createTheCard(xiaomiFound, index);
      setSpecsTable(xiaomiFound, index);
      stopLoader();
    } else {
      alert("Enter a valid value");
      stopLoader();
    }

    //get all learn more buttons
    const learnMore = document.querySelectorAll(".learn-card");
    learnMore.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.replace("comingSonn.html");
      });
    });

    // add eventlistener to add-to-card btn
    if (index == 0) {
      document.querySelector(".card-0").addEventListener("click", addToCard);
    } else {
      document.querySelector(".card-1").addEventListener("click", addToCard);
    }
  } else {
    // else if it is empty
    alert("Enter a valid value");
    seachInputFirst.value = "";
    stopLoader();
  }
}

// function to set the information in table
function setSpecsTable(phone, index) {
  const firstPhoneName = document.querySelector(".name-of-first");
  const secondPhoneName = document.querySelector(".name-of-second");
  //
  const specsOfFirst = document.querySelectorAll(".spec-of-first");
  const specsOfSecond = document.querySelectorAll(".spec-of-second");

  // find the index
  if (index == 0) {
    // get the specs of phone
    const specs = phone.specs;

    // change the name
    firstPhoneName.textContent = phone.name.toUpperCase();

    // put each spec in its place
    for (let i = 0; i < specsOfFirst.length; i++) {
      specsOfFirst[i].textContent = specs[i].trim();
    }

    // change the price
    document.querySelector(".price-of-first").textContent =
      "$" + phone.discount;
  } else if (index == 1) {
    // get the specs of phone
    const specs = phone.specs;

    // change the name
    secondPhoneName.textContent = phone.name.toUpperCase();

    // put each spec in its place
    for (let i = 0; i < specsOfSecond.length; i++) {
      specsOfSecond[i].textContent = specs[i].trim();
    }

    // change the price
    document.querySelector(".price-of-second").textContent =
      "$" + phone.discount;
  }
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
  let phoneCard;
  if (e.target.parentElement.parentElement.classList == "phone-card-photo") {
    phoneCard = e.target.parentElement.parentElement;
  } else {
    phoneCard = e.target.parentElement.parentElement.parentElement;
  }

  // get the name
  const nameOfPhone = phoneCard.firstElementChild.textContent
    .trim()
    .toLowerCase();

  // get the price
  let priceOfPhone = null;
  if (
    e.target.parentElement.classList.contains("card-0") ||
    e.target.classList.contains("card-0")
  ) {
    // if it is the first phone
    priceOfPhone = document.querySelector(".price-of-first").textContent.trim();
  } else if (
    e.target.parentElement.classList.contains("card-1") ||
    e.target.classList.contains("card-1")
  ) {
    // if it is the second phone
    priceOfPhone = document
      .querySelector(".price-of-second")
      .textContent.trim();
  }

  // get the image
  const imageOfPhone = phoneCard.children[1].firstElementChild.src.trim();

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
