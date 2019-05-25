const clock = document.getElementById("clock");

function getTime() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  clock.childNodes[1].innerText = `${hours > 10 ? hours : `0${hours}`}:${
    minutes > 10 ? minutes : `0${minutes}`
  }`;
}

setInterval(getTime, 100);
