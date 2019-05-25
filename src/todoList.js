const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const userTodoList = "list";

function removeList() {
  let list = JSON.parse(localStorage.getItem("list"));
  list.map((value, key) => {
    if (value == this.parentElement.parentElement.childNodes[0].innerText) {
      list.splice(key, 1);
    }
  });

  localStorage.setItem(userTodoList, JSON.stringify(list));

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
}

function createBtns(isFinished) {
  const buttons = document.createElement("div");
  buttons.classList.add("hidden");

  if (isFinished) {
    console.log("f");
    const restoreBtn = document.createElement("button");
    restoreBtn.classList.add("btn__restore");
    restoreBtn.innerHTML = `<i class="fas fa-undo-alt"></i>`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn__remove");
    removeBtn.innerHTML = `<i class="fas fa-times"></i>`;

    buttons.appendChild(restoreBtn);
    buttons.appendChild(removeBtn);
  } else {
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("btn__done");
    clearBtn.innerHTML = `<i class="fas fa-check"></i>`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn__delete");
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;

    deleteBtn.addEventListener("click", removeList);

    buttons.appendChild(clearBtn);
    buttons.appendChild(deleteBtn);
  }

  return buttons;
}

function setList() {
  const listElement = document.createElement("p");
  const userList = JSON.parse(localStorage.getItem(userTodoList));
  const userInput = document.getElementById("user__input");
  const list = userInput.parentElement;
  const btns = createBtns(null);

  listElement.classList.add("list_element");
  listElement.innerText = userInput.value;
  userList.push(userInput.value);
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
}

init();

addBtn.addEventListener("click", addList);
