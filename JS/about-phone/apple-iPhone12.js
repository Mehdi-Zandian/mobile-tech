// variables -----------------------------

// variables of iPhone images slider
const phonesContainer = document.querySelector(".images-container");
const nextPhoneBtn = document.querySelector(".next-phone");
const prevPhoneBtn = document.querySelector(".prev-phone");

// get the loader and shadow
const loaderShadow = document.querySelector(".loader-shadow");

// get all colors tags
const colors = document.querySelectorAll(".colors");

// get the pay condition tabs
const monthlyPayTab = document.querySelector(".monthly-pay");
const monthlyPayContainer = document.querySelector(".monthly-pay-container");
// *
const fullPayTab = document.querySelector(".full-pay");
const fullPayContainer = document.querySelector(".full-pay-container");

// get all gigs from monthlypay
const gigMonthly = document.querySelectorAll(".gig-monthly");

// get all gigs from full-pay
const gigFull = document.querySelectorAll(".gig-full");

// get the list view  , table view buttons and specs-tables-container
const tablesContainer = document.querySelector(".specs-tables-container");
const listView = document.querySelector(".list-view");
const tableView = document.querySelector(".table-view");
//
const shoppingCard = document.querySelector(".shopping-icon");
const shoppingCardContainer = document.querySelector(".shopping-card");

// getting all colors src of iPhone 12
const purpleiPhone12 = [
  "../Images/Mobiles/about/apple/purple/1.jpg",
  "../Images/Mobiles/about/apple/purple/2.jpg",
  "../Images/Mobiles/about/apple/purple/3.jpg",
  "../Images/Mobiles/about/apple/purple/4.jpg",
  "../Images/Mobiles/about/apple/purple/5.jpg",
];

const blueiPhone12 = [
  "../Images/Mobiles/about/apple/blue/1.jpg",
  "../Images/Mobiles/about/apple/blue/2.jpg",
  "../Images/Mobiles/about/apple/blue/3.jpg",
  "../Images/Mobiles/about/apple/blue/4.jpg",
  "../Images/Mobiles/about/apple/blue/5.jpg",
];

const blackiPhone12 = [
  "../Images/Mobiles/about/apple/black/1.jpg",
  "../Images/Mobiles/about/apple/black/2.jpg",
  "../Images/Mobiles/about/apple/black/3.jpg",
  "../Images/Mobiles/about/apple/black/4.jpg",
  "../Images/Mobiles/about/apple/black/5.jpg",
];

const whiteiPhone12 = [
  "../Images/Mobiles/about/apple/white/1.jpg",
  "../Images/Mobiles/about/apple/white/2.jpg",
  "../Images/Mobiles/about/apple/white/3.jpg",
  "../Images/Mobiles/about/apple/white/4.jpg",
  "../Images/Mobiles/about/apple/white/5.jpg",
];

// eventListeners -----------------------------
eventListener();
function eventListener() {
  // create the apple phones init app settings
  document.addEventListener("DOMContentLoaded", initApp);

  // next button show next phone in slider
  nextPhoneBtn.addEventListener("click", showNextPhone);

  // prev button show next phone in slider
  prevPhoneBtn.addEventListener("click", showPrevPhone);

  // click on each color and change the photos based on selected colors
  colors.forEach((color) => {
    color.addEventListener("click", changeColor);
  });

  // show full pay tab
  fullPayTab.addEventListener("click", showFullPayTab);

  // show monthly pay tab
  monthlyPayTab.addEventListener("click", showMonthlyPayTab);

  // click on each gig monthly and change the active box
  gigMonthly.forEach((gig) => {
    gig.addEventListener("click", changeActiveGigMonthly);
  });

  // click on each gig full and change the active box
  gigFull.forEach((gig) => {
    gig.addEventListener("click", changeActiveGigFull);
  });

  // add list view to tables container when list is clicked
  listView.addEventListener("click", showList);

  // Hide list view to tables container when table is clicked
  tableView.addEventListener("click", hideList);

  // show shopping card
  shoppingCard.addEventListener("click", showShoppingCard);
}

// functions -----------------------------
function initApp() {
  const colorActive = document
    .querySelector(".active-color")
    .nextElementSibling.textContent.trim();

  // get each single phone src if purple color is active
  if (colorActive == "Purple") {
    createPhoneImages(purpleiPhone12);
  }
}

// next button show next phone in slider
let phoneCounter = 0;
function showNextPhone() {
  // get all latest phones (because of colors)
  const allPhones = document.querySelectorAll(".phone-image");

  if (phoneCounter < allPhones.length - 1) {
    // get the size
    const size = allPhones[0].clientWidth;

    // add to the counter
    phoneCounter += 1;

    // remove deactive-phone-btn class from prev button
    prevPhoneBtn.classList.remove("deactive-phone-btn");

    // add the transition to the container
    phonesContainer.style.transition = "transform 0.8s ease";

    // add transform to the container
    phonesContainer.style.transform =
      "translateX(" + -size * phoneCounter + "px)";
  }

  // add deactive-phone-btn class to next button
  if (phoneCounter >= allPhones.length - 1) {
    nextPhoneBtn.classList.add("deactive-phone-btn");
  }
}

// prev button show next phone in slider
function showPrevPhone() {
  // get all latest phones (because of colors)
  const allPhones = document.querySelectorAll(".phone-image");

  if (phoneCounter > 0) {
    // get the size
    const size = allPhones[0].clientWidth;

    // add to the counter
    phoneCounter -= 1;

    // remove deactive-phone-btn class from next button
    nextPhoneBtn.classList.remove("deactive-phone-btn");

    // add the transition to the container
    phonesContainer.style.transition = "transform 0.8s ease";

    // add transform to the container
    phonesContainer.style.transform =
      "translateX(" + -size * phoneCounter + "px)";
  }

  // add deactive-phone-btn class to prev button
  if (phoneCounter <= 0) {
    prevPhoneBtn.classList.add("deactive-phone-btn");
  }
}

// run next and prev buttons functions on resize event to keep the responsive safe
window.addEventListener("resize", () => {
  if (phoneCounter < 3) {
    if (phoneCounter >= 4) return;
    showNextPhone();
  } else {
    if (0 >= phoneCounter) return;
    showPrevPhone();
  }
});

// click on each color and change the photos based on selected colors
function changeColor(color) {
  if (!color.target.classList.contains("active-color")) {
    // bring the loader and shadow
    loaderShadow.classList.remove("loader-shadow-hidden");

    setTimeout(() => {
      // remove current images inside slider
      document.querySelectorAll(".phone-image").forEach((e) => e.remove());

      // remove previous active-color class
      document.querySelector(".active-color").classList.remove("active-color");

      // get the color name
      const colorName = color.target.nextElementSibling.textContent.trim();

      // defining the colorname and its src array then send it to creator function
      if (colorName == "Purple") {
        // if the selected color is purple
        createPhoneImages(purpleiPhone12);

        // add active class
        color.target.classList.add("active-color");
      } else if (colorName == "White") {
        // if the selected color is white
        createPhoneImages(whiteiPhone12);

        // add active class
        color.target.classList.add("active-color");
      } else if (colorName == "Black") {
        // if the selected color is black
        createPhoneImages(blackiPhone12);

        // add active class
        color.target.classList.add("active-color");
      } else if (colorName == "Blue") {
        // if the selected color is blue
        createPhoneImages(blueiPhone12);

        // add active class
        color.target.classList.add("active-color");
      }

      // remove loader and shadow
      loaderShadow.classList.add("loader-shadow-hidden");
    }, 2000);
  }
}

// function for creating phone images in slider
function createPhoneImages(colorSrc) {
  colorSrc.forEach((src) => {
    // create div tag
    const div = document.createElement("div");
    div.classList = "phone-image";

    // create img tag
    const img = document.createElement("img");
    img.src = src;

    // append img to div
    div.appendChild(img);

    // append the final div to the main document
    phonesContainer.appendChild(div);
  });
}

// show full pay tab
function showFullPayTab() {
  if (!fullPayTab.classList.contains("active-shopping-way")) {
    // deactive monthly pay tab
    monthlyPayTab.classList.remove("active-shopping-way");

    // active full pay tab
    fullPayTab.classList.add("active-shopping-way");

    // move the previous tab
    monthlyPayContainer.style.opacity = "0";
    monthlyPayContainer.style.transform = "translateX(100px)";

    // after transition ends
    setTimeout(() => {
      // hide monthlypay container
      monthlyPayContainer.classList.add("hide-price");

      // bring the full pay container smoothly
      fullPayContainer.style.display = "block";
      setTimeout(() => {
        monthlyPayContainer.style.display = "none";
        fullPayContainer.style.transform = "translateX(0px)";
        fullPayContainer.style.opacity = "1";
        fullPayContainer.style.display = "block";
        fullPayContainer.classList.remove("hide-price");
      }, 50);
    }, 500);
  }
}

// show monthly pay tab
function showMonthlyPayTab() {
  if (!monthlyPayTab.classList.contains("active-shopping-way")) {
    // deactive full pay
    fullPayTab.classList.remove("active-shopping-way");

    // active monthly pay
    monthlyPayTab.classList.add("active-shopping-way");

    // move the previous tab
    fullPayContainer.style.opacity = "0";
    fullPayContainer.style.transform = "translateX(100px)";

    // after transition ends
    setTimeout(() => {
      // hide fullpay container
      fullPayContainer.classList.add("hide-price");

      // bring the full monthly pay smoothly
      monthlyPayContainer.style.display = "block";
      setTimeout(() => {
        monthlyPayContainer.style.transform = "translateX(0px)";
        monthlyPayContainer.classList.remove("hide-price");
        monthlyPayContainer.style.opacity = "1";
        fullPayContainer.style.display = "none";
      }, 50);
    }, 500);
  }
}

// click on each gig monthly and change the active box
function changeActiveGigMonthly(gig) {
  // get the active clicked gig element
  let clickedGig = "";
  if (gig.target.classList.contains("gig-monthly")) {
    clickedGig = gig.target;
  } else {
    clickedGig = gig.target.parentElement;
  }

  // if it is not active itself then active the selected element (gig)
  if (!clickedGig.classList.contains("active-gig-month")) {
    // remove active-gig-month from All elements
    document
      .querySelectorAll(".active-gig-month")
      .forEach((e) => e.classList.remove("active-gig-month"));

    // add the active-gig-month to the clicked element
    clickedGig.classList.add("active-gig-month");
  }
}

// click on each gig full and change the active box
function changeActiveGigFull(gig) {
  // get the active clicked gig element
  let clickedGig = "";
  if (gig.target.classList.contains("gig-full")) {
    clickedGig = gig.target;
  } else {
    clickedGig = gig.target.parentElement;
  }

  // if it is not active itself then active the selected element (gig)
  if (!clickedGig.classList.contains("active-gig-full")) {
    // remove active-gig-full from the previous element
    document
      .querySelectorAll(".active-gig-full")
      .forEach((e) => e.classList.remove("active-gig-full"));

    // add the active-gig-full to the clicked element
    clickedGig.classList.add("active-gig-full");
  }
}

// add list view to tables container when list is clicked
function showList() {
  // if list view is not active
  if (!tablesContainer.classList.contains("list-view-active")) {
    tablesContainer.classList.add("list-view-active");

    // change the color (deActive)
    tableView.firstElementChild.style.color = "#fff";

    // change the color (active color)
    listView.firstElementChild.style.color = "#4a9eec";
  }
}

// Hide list view to tables container when table is clicked
function hideList() {
  // it list view is active
  if (tablesContainer.classList.contains("list-view-active")) {
    tablesContainer.classList.remove("list-view-active");

    // change the color (deActive)
    listView.firstElementChild.style.color = "#fff";

    // change the color (active color)
    tableView.firstElementChild.style.color = "#4a9eec";
  }
}

// clear the table view when size screen is less tha 950px *********** Start
const sizeScreen = window.matchMedia("(max-width: 950px)");

// on content loaded
document.addEventListener("DOMContentLoaded", () => {
  if (sizeScreen.matches) {
    if (!tablesContainer.classList.contains("list-view-active")) {
      showList();
    }
  }
});

// on resiez
window.addEventListener("resize", () => {
  const sizeCurrentScreen = window.matchMedia("(max-width: 950px)");

  if (sizeCurrentScreen.matches) {
    if (!tablesContainer.classList.contains("list-view-active")) {
      showList();
    }
  }
});
// clear the table view when size screen is less tha 950px *********** End

// show shopping card -------------------------------------------
function showShoppingCard(e) {
  e.preventDefault();

  // show shopping card container
  shoppingCardContainer.classList.toggle("active-shopping");
}
