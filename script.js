let is24HourFormat = false;
const clock = document.getElementById("clock");
const dateDisplay = document.getElementById("date");
const formatButton = document.getElementById("toggle-format");
const tweetButton = document.getElementById("tweet");

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  let ampm = "";

  if (!is24HourFormat) {
    ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  clock.textContent = `${hours}:${minutes}:${seconds}${ampm}`;

  clock.textContent = clock.textContent.replace(
    /:/g,
    Math.floor(Date.now() / 500) % 2 === 0 ? ":" : " "
  );


  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dateDisplay.textContent = now.toLocaleDateString(undefined, options);


  const tweetText = `Current time: ${hours}:${minutes}:${seconds}${ampm} - ${dateDisplay.textContent}`;
  tweetButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
}

formatButton.addEventListener("click", () => {
  is24HourFormat = !is24HourFormat;
  formatButton.textContent = is24HourFormat ? "Switch to 12h" : "Switch to 24h";
  updateTime();
});

setInterval(updateTime, 1000);
updateTime(); 
