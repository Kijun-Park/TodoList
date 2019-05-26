const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const finishList = document.getElementById("finishList");
const userTodoList = "list";
const userFinishList = "finishList";
const finishListClass = "lists__finishList-list";

function restoreList() {
  const listElement = this.parentElement.parentElement;
  const Btns = createBtns(false);

  listElement.removeChild(listElement.childNodes[1]);

  listElement.classList.add("lists__todoList-list");
  listElement.classList.remove("lists__finishList-list");
  listElement.appendChild(Btns);
  todoList.appendChild(listElement);
  addEvent(listElement, Btns);

  console.log(listElement.childNodes[0].innerText);

  let list = JSON.parse(localStorage.getItem(userFinishList));
  list.map(function(value, key) {
    if (value === listElement.childNodes[0].innerText) {
      list.splice(key, 1);
    }
  });

  localStorage.setItem(userFinishList, JSON.stringify(list));

  list = JSON.parse(localStorage.getItem(userTodoList));
  if (!list) list = [listElement.childNodes[0].innerText];
  else list.push(listElement.childNodes[0].innerText);

  localStorage.setItem(userTodoList, JSON.stringify(list));
}

function clearList() {
  const listElement = this.parentElement.parentElement;
  const finishList = document.getElementById("finishList");
  const Btns = createBtns(true);

  listElement.removeChild(listElement.childNodes[1]);

  listElement.classList.add("lists__finishList-list");
  listElement.classList.remove("lists__todoList-list");
  listElement.appendChild(Btns);
  finishList.appendChild(listElement);
  addEvent(listElement, Btns);

  console.log(listElement.childNodes[0].innerText);

  let list = JSON.parse(localStorage.getItem("list"));
  list.map(function(value, key) {
    if (value === listElement.childNodes[0].innerText) {
      list.splice(key, 1);
    }
  });

  localStorage.setItem(userTodoList, JSON.stringify(list));

  let finList = JSON.parse(localStorage.getItem("userFinishList"));
  if (!finList) finList = [listElement.childNodes[0].innerText];
  else finList.push(listElement.childNodes[0].innerText);

  localStorage.setItem(userFinishList, JSON.stringify(finList));
}

function removeList(_, isFinished) {
  let list;
  if (finishListClass === this.parentElement.parentElement.classList[0]) {
    list = JSON.parse(localStorage.getItem(userFinishList));
  } else {
    list = JSON.parse(localStorage.getItem(userTodoList));
  }

  list.map((value, key) => {
    if (value === this.parentElement.parentElement.childNodes[0].innerText) {
      list.splice(key, 1);
    }
  });

  if (finishListClass === this.parentElement.parentElement.classList[0])
    localStorage.setItem(userFinishList, JSON.stringify(list));
  else localStorage.setItem(userTodoList, JSON.stringify(list));

  this.parentElement.parentElement.parentElement.removeChild(
    this.parentElement.parentElement
  );
}

function addEvent(list, btns) {
  list.addEventListener("mouseover", () => {
    btns.classList.add("buttons");
    btns.classList.remove("hidden");
  });

  list.addEventListener("mouseleave", () => {
    btns.classList.add("hidden");
    btns.classList.remove("buttons");
  });

  if (btns.childNodes[0].classList[0] === "btn__done") {
    btns.childNodes[0].addEventListener("click", clearList);
  }
}

function createBtns(isFinished) {
  const buttons = document.createElement("div");
  buttons.classList.add("hidden");

  if (isFinished) {
    const restoreBtn = document.createElement("button");
    restoreBtn.classList.add("btn__restore");
    restoreBtn.innerHTML = `<i class="fas fa-undo-alt"></i>`;
    restoreBtn.addEventListener("click", restoreList);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn__remove");
    removeBtn.innerHTML = `<i class="fas fa-times"></i>`;
    removeBtn.addEventListener("click", removeList, true);

    buttons.appendChild(restoreBtn);
    buttons.appendChild(removeBtn);
  } else {
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("btn__done");
    clearBtn.innerHTML = `<i class="fas fa-check"></i>`;
    clearBtn.addEventListener("click", clearList);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn__delete");
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
    deleteBtn.addEventListener("click", removeList, false);

    buttons.appendChild(clearBtn);
    buttons.appendChild(deleteBtn);
  }

  return buttons;
}

function setList() {
  const listElement = document.createElement("p");
  let userList = JSON.parse(localStorage.getItem(userTodoList));
  const userInput = document.getElementById("user__input");
  const list = userInput.parentElement;
  const btns = createBtns(null);

  listElement.classList.add("list_element");
  listElement.innerText = userInput.value;

  if (!userList) userList = [userInput.value];
  else userList.push(userInput.value);

  localStorage.setItem(userTodoList, JSON.stringify(userList));

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  list.appendChild(listElement);
  list.appendChild(btns);

  addEvent(list, btns);

  addBtn.addEventListener("click", addList);
}

function addList() {
  const list = document.createElement("div");
  list.classList.add("lists__todoList-list");

  const listElement = document.createElement("input", "type:text");
  listElement.setAttribute("placeholder", "What will you do?");
  listElement.classList.add("lists__todoList-input");
  listElement.setAttribute("id", "user__input");
  const setListBtn = document.createElement("button");
  setListBtn.innerHTML = `<i class="fas fa-arrow-right"></i>`;
  setListBtn.classList.add("lists__todoList-btn");

  list.appendChild(listElement);
  list.appendChild(setListBtn);
  todoList.appendChild(list);
  setListBtn.addEventListener("click", setList);
  addBtn.removeEventListener("click", addList);
}

function init() {
  const userList = JSON.parse(localStorage.getItem(userTodoList));
  if (userList) {
    userList.map(value => {
      const list = document.createElement("div");
      list.classList.add("lists__todoList-list");

      const listElement = document.createElement("p");
      listElement.classList.add("list_element");
      listElement.innerText = value;

      const btns = createBtns(null);

      list.appendChild(listElement);
      list.appendChild(btns);
      todoList.appendChild(list);
      addEvent(list, btns);
    });
  }

  const finList = JSON.parse(localStorage.getItem(userFinishList));
  if (finList) {
    finList.map(value => {
      const list = document.createElement("div");
      list.classList.add("lists__finishList-list");

      const listElement = document.createElement("p");
      listElement.classList.add("list_element");
      listElement.innerText = value;

      const btns = createBtns(true);

      list.appendChild(listElement);
      list.appendChild(btns);
      finishList.appendChild(list);
      addEvent(list, btns);
    });
  }
}

init();

addBtn.addEventListener("click", addList);
