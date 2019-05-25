const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

function setList() {
  const userInput = document.getElementById("user__input");
  const list = userInput.parentElement;
  const listElement = document.createElement("p");
  listElement.classList.add("list_element");
  listElement.innerText = userInput.value;
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  const clearBtn = document.createElement("button");
  clearBtn.classList.add("btn__done");
  clearBtn.innerHTML = `<i class="fas fa-check"></i>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn__delete");
  deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;

  buttons.appendChild(clearBtn);
  buttons.appendChild(deleteBtn);

  list.appendChild(listElement);
  list.appendChild(buttons);

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

addBtn.addEventListener("click", addList);
