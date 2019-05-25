const inputBtn = document.getElementById("input__name");
const userName = document.getElementById("userName");

const USER__LS = "currentUser";

function paintGreeting(text) {
  userName.innerText = text;
}

function loadName() {
  const currentUser = localStorage.getItem(USER__LS);
  if (currentUser === null) {
    inputBtn.addEventListener("click", () => {
      let name = document.getElementById("userInput").value;
      if (!name) {
        document.getElementById("userInput").value = null;
      } else {
        localStorage.setItem(USER__LS, name);
        userName.innerText = name;
        document.getElementById("modal").classList.add("close");
      }
    });
  } else {
    document.getElementById("modal").classList.add("close");
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
