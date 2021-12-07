// slider actions has all the needed functions for images sliders ----------------------------
class SliderActions {
  constructor(container, items) {
    (this.container = container),
      (this.items = items),
      (this.size = this.items[0].clientWidth),
      (this.counter = 1);
  }

  // init show
  initShow() {
    this.container.style.transform =
      "translateX(" + -this.size * this.counter + "px)";
  }

  // next show
  nextShow() {
    // dont go to next on multiple clicks
    if (this.counter >= this.items.length - 1) return;

    // check size image again (if there is more amount add)
    this.size = this.items[0].clientWidth;

    // adding transition
    this.container.style.transition = "transform 0.8s ease";

    // add to counter
    this.counter += 1;

    // translate X the slider
    this.container.style.transform =
      "translateX(" + -this.size * this.counter + "px)";
  }

  // prev show
  prevShow() {
    // dont go to next on multiple clicks
    if (0 >= this.counter) return;

    // check size image again
    this.size = this.items[0].clientWidth;

    // adding transition
    this.container.style.transition = "transform 0.8s ease";

    // add to counter
    this.counter -= 1;

    // translate X the slider
    this.container.style.transform =
      "translateX(" + -this.size * this.counter + "px)";
  }

  // set counter for jumping
  set counterChange(amount) {
    this.counter = amount;
  }
}

// slider actions has all the needed functions for product sliders ----------------------------
class ProductSlider {
  constructor(container, items) {
    (this.container = container),
      (this.items = items),
      (this.counter = 0),
      // get product size + 6px of margin
      (this.size = items[0].clientWidth + 6);
  }

  // finding first and last card
  findFirstAndLast() {
    this.items[0].id = "first-product";
    this.items[this.items.length - 1].id = "last-product";
  }

  // hide buttons on content load
  hideButtons(next, prev) {
    // if it is the last card then hide the next button
    if (this.items[this.counter + 3].id == "last-product") {
      next.style.opacity = "0.3";
    }

    // hide prev button
    prev.style.opacity = "0.3";
  }

  // next show basic code for all media size
  nextShowGenerall(next, prev, add) {
    // if 4th card is not the last card go to next
    if (this.items[this.counter + add].id != "last-product") {
      // show prev button
      prev.style.opacity = "1";

      // check size again
      this.size = this.items[0].clientWidth + 6;

      // adding transition
      this.container.style.transition = "transform 0.4s ease";

      // add to counter
      this.counter += 1;

      // translate X the slider
      this.container.style.transform =
        "translateX(" + -this.size * this.counter + "px)";
    }

    // if it is last card then hide the next button
    if (this.items[this.counter + add].id == "last-product") {
      next.style.opacity = "0.3";
    }
  }

  // show next product card
  nextProductShow(next, prev) {
    // catching all important media sizes
    const query3 = window.matchMedia("(max-width: 433px)");
    const query2 = window.matchMedia("(max-width: 1029px)");
    const query1 = window.matchMedia("(max-width: 1314px)");

    if (query3.matches) {
      // small size
      this.nextShowGenerall(next, prev, 0);
    } else if (query2.matches) {
      // meduim size
      this.nextShowGenerall(next, prev, 1);
    } else if (query1.matches) {
      // large size (1)
      this.nextShowGenerall(next, prev, 2);
    } else {
      // Large size (2)
      this.nextShowGenerall(next, prev, 3);
    }
  }

  // show prev product card (prev show doesn't need functons for all media size)
  prevProductShow(next, prev) {
    // if prev card is not the first card then go to prev
    if (this.items[this.counter].id != "first-product") {
      // show next button
      next.style.opacity = "1";

      // check size again
      this.size = this.items[0].clientWidth + 6;

      // adding transition
      this.container.style.transition = "transform 0.4s ease";

      // add to counter
      this.counter -= 1;

      // translate X the slider
      this.container.style.transform =
        "translateX(" + -this.size * this.counter + "px)";
    }

    // hide prev button when reach to first card
    if (this.items[this.counter].id == "first-product") {
      prev.style.opacity = "0.3";
    }
  }
}

// can easilly stick a phone card to shopping card with giving needed info for all pages
class AddToObject {
  constructor(name, image, price, container) {
    (this.name = name),
      (this.image = image),
      (this.price = price),
      (this.container = container);
  }

  // append the tr to the table
  appendToContainer() {
    // create the tr tag
    const tr = document.createElement("tr");

    // create td(s)
    const tdImage = document.createElement("td");
    const tdName = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdRemove = document.createElement("td");

    // create img tag
    const img = document.createElement("img");
    img.src = this.image;

    // append the info to td(s)
    tdImage.appendChild(img);
    tdName.appendChild(document.createTextNode(this.name));
    tdPrice.appendChild(document.createTextNode(this.price));
    tdRemove.innerHTML = `<i class="fas fa-times-circle remove-card"></i>`;

    // append all to tr
    tr.appendChild(tdImage);
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdRemove);

    // append tr to container
    this.container.appendChild(tr);
  }
}
