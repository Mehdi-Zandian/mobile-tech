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

// get all learn more buttons
setTimeout(() => {
  const learnMore = document.querySelectorAll(".learn-card");

  learnMore.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.replace("comingSonn.html");
    });
  });
}, 1000);

// eventListeners ----------------------------------------
eventListeners();
function eventListeners() {
  // add datalist automaticlly (get from Ajax)
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

// add datalist automaticlly (get from Ajax) (1/2)
function loadDataLists() {
  // create the object
  const XML = new XMLHttpRequest();

  // open the object
  XML.open("GET", "../JSON/phonesData.json", true);

  // load the object
  XML.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      // get all Samsung phones
      let phonesDataSamsung = JSON.parse(this.responseText).samsung;
      // send samsung
      createDataListOptions(phonesDataSamsung);

      // get all iPhone phones
      let phonesDataiPhone = JSON.parse(this.responseText).iphone;
      // send iPhone
      createDataListOptions(phonesDataiPhone);

      // get all Xiaomi phones
      let phonesDataXiaomi = JSON.parse(this.responseText).xiaomi;
      // send Xiaomi
      createDataListOptions(phonesDataXiaomi);
    }
  };

  // send the object
  XML.send();
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
function allSearchBtns(searchedPhone, index) {
  // if the search value is not empty
  if (searchedPhone != "") {
    // create the object
    const XML = new XMLHttpRequest();

    // open the object
    XML.open("GET", "../JSON/phonesData.json", true);

    // load the object
    XML.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        // get all Samsung phones
        let phonesDataSamsung = JSON.parse(this.responseText).samsung;

        // get all iPhone phones
        let phonesDataiPhone = JSON.parse(this.responseText).iphone;

        // get all Xiaomi phones
        let phonesDataXiaomi = JSON.parse(this.responseText).xiaomi;

        // status of searched value
        let status = "";

        // find the phone
        phonesDataSamsung.forEach((phoneSamsung) => {
          if (phoneSamsung.name.toLowerCase() == searchedPhone) {
            // start from samsung ***********

            // send it to createTheCard function to make the card and append
            createTheCard(phoneSamsung, index);

            // send it to setSpecsTable function to set the information in table
            setSpecsTable(phoneSamsung, index);

            // change status
            status = "ok";
          }

          // Next is iPhone ***********
          phonesDataiPhone.forEach((phoneIPhone) => {
            if (phoneIPhone.name.toLowerCase() == searchedPhone) {
              // send it to createTheCard function to make the card and append
              createTheCard(phoneIPhone, index);

              // send it to setSpecsTable function to set the information in table
              setSpecsTable(phoneIPhone, index);

              // change status
              status = "ok";
            }

            // Next is Xiaomi ***********
            phonesDataXiaomi.forEach((phoneXiaomi) => {
              if (phoneXiaomi.name.toLowerCase() == searchedPhone) {
                // send it to createTheCard function to make the card and append
                createTheCard(phoneXiaomi, index);

                // send it to setSpecsTable function to set the information in table
                setSpecsTable(phoneXiaomi, index);

                // change status
                status = "ok";
              }
            });
          });
        });

        // // get all learn more buttons
        setTimeout(() => {
          const learnMore = document.querySelectorAll(".learn-card");

          learnMore.forEach((button) => {
            button.addEventListener("click", () => {
              window.location.replace("comingSonn.html");
            });
          });
        }, 500);

        // eventListeners for phonecard buttons
        if (index == 0) {
          setTimeout(() => {
            // eventListenr for first phone add-to-card button
            document
              .querySelector(".card-0")
              .addEventListener("click", addToCard);
          }, 500);
        } else if (index == 1) {
          setTimeout(() => {
            // eventListenr for first phone add-to-card button
            document
              .querySelector(".card-1")
              .addEventListener("click", addToCard);
          }, 500);
        }

        // if searched value was wrong (not Ok) then alert
        if (status != "ok") {
          // else if it is empty
          alert("Enter a valid value");
          seachInputFirst.value = "";
        } else if ((status = "ok")) {
          setTimeout(() => {
            // hide loader
            document
              .querySelector(".loader-shadow")
              .classList.add("loader-shadow-hidden");
          }, 1300);
        }
      }
    };

    // send the object
    XML.send();
  } else {
    // else if it is empty
    alert("Enter a valid value");
    seachInputFirst.value = "";
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
