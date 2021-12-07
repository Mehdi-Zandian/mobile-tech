// functions
// countdown function
function countDown() {
  const countDate = new Date(`October 30, 2022 22:59:00`).getTime();
  const now = new Date().getTime();
  let gap = countDate - now;

  if (gap <= 0) {
    gap += 1000000000;
  }

  // how does time work
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // calculate
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  // append
  document.querySelector(".day").textContent = textDay;
  document.querySelector(".hour").textContent = textHour;
  document.querySelector(".minute").textContent = textMinute;
  document.querySelector(".second").textContent = textSecond;
}

// countdown auto run after 1 second
setInterval(countDown, 1000);
