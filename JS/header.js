// variables
let stickyHeader = document.querySelector("header");

// slider variables ************************************

// side navigation ************************************
const sideNav = document.querySelector(".side-nav-container");
const burger = document.querySelector(".burger");
const innerBurger = document.querySelector(".inner-burger");

// search box modal variables ************************************
const modalContainer = document.querySelector(".modal-container");
const modalClose = document.querySelector(".modal-close");
const searchBox = document.querySelector("#search-box");
const searchBoxInput = document.querySelector("#search-box-input");
const clearSearch = document.querySelector(".clear-search");

// login account modal variables ************************************
const loginIcon = document.querySelector(".login-icon");
const loginContainer = document.querySelector(".login-container");
const loginClose = document.querySelector(".close-login");
const loginValidates = document.querySelectorAll(".validate");

// objects -------------------------------------------

// eventListeners -------------------------------------------
eventListeners();
function eventListeners() {
  // hide nav on scroll
  document.addEventListener("scroll", scrollAction);

  // side navbar
  burger.addEventListener("click", showSideNav);
  innerBurger.addEventListener("click", hideSideNav);

  // search box modal show and close listeners
  searchBox.addEventListener("click", showSearchModal);
  modalClose.addEventListener("click", hideSearchModal);

  // clear search box button
  clearSearch.addEventListener("click", clearSearchBox);

  // login icon show and hide the login modal
  loginIcon.addEventListener("click", showLoginModal);
  loginClose.addEventListener("click", hideLoginModal);
}

// functions
// hide nav on scroll -------------------------------------------
let firstScroll = document.documentElement.scrollTop;
function scrollAction() {
  // get second (last) scroll
  let secondScroll = document.documentElement.scrollTop;
  if (secondScroll < firstScroll) {
    // if second scroll is smaller than first scroll (means going back);
    stickyHeader.style.top = 0;
  } else {
    // if second scroll is bigger than first scroll (means going forward);
    stickyHeader.style.top = "-100px";
  }
  firstScroll = secondScroll;
}

// scroll indicator -------------------------------------------
window.onscroll = function () {
  // get now scroll position
  let scroll = document.documentElement.scrollTop;

  // get the height of client and page
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  // give the final style
  document.querySelector(".scroll-indicator").style.width =
    (scroll / height) * 100 + "%";
};

// show side nav -----
function showSideNav() {
  // translate the nav to site
  sideNav.style.transition = "transform 0.6s ease-in";
  sideNav.style.transform = "translateX(0px)";
  // pointer events none on outter side of nav
  document.querySelector(".outter-container").style.pointerEvents = "none";
}

function hideSideNav() {
  sideNav.style.transition = "transform 0.6s ease-in";
  sideNav.style.transform = "translateX(-101%)";
  // pointer events visible on outter side of nav
  document.querySelector(".outter-container").style.pointerEvents = "visible";
}

// show search box modal
function showSearchModal(e) {
  e.preventDefault();

  modalContainer.classList.add("modal-active");
}

// hide search box modal
function hideSearchModal() {
  modalContainer.classList.remove("modal-active");
}

// show and hide clear search box button on keydown
searchBoxInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 8) {
    // if user is using back button
    if (searchBoxInput.value.length - 1 < 1) {
      clearSearch.classList.remove("active-clear-search");
    }
  } else if (searchBoxInput.value.length + 1 != 0) {
    // when user is not using back button and also input is not empty
    clearSearch.classList.add("active-clear-search");
  }
});

// clear search box value
function clearSearchBox() {
  searchBoxInput.value = "";
}
// and also clear search box value on content load
document.addEventListener("DOMContentLoaded", () => {
  searchBoxInput.value = "";
});

// show the login modal
function showLoginModal(e) {
  e.preventDefault();

  loginContainer.classList.add("active-login");
}

// hide the login modal
function hideLoginModal() {
  loginContainer.classList.remove("active-login");
}

// validate login form (no email)
loginValidates.forEach((input) => {
  // on focus
  input.addEventListener("focus", () => {
    // border bottom color blue on focus
    input.style.borderBottom = "1px solid #067eed";
  });

  // on blur
  input.addEventListener("blur", () => {
    // if input is empty border bottom + icon color red on blur
    if (input.value.length == 0) {
      input.style.borderBottom = "1px solid red";
      input.previousElementSibling.style.color = "red";
    } else {
      // if input is not empty border bottom + icon color green on blur
      input.style.borderBottom = "1px solid green";
      input.previousElementSibling.style.color = "green";
    }
  });
});
