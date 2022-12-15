// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners(); //tek yerden tüm fonsiyonları çağırıyoruz

// Tüm event listenerlar
function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  clearButton.addEventListener("click", clearAllTodos);
  filter.addEventListener("keyup", filterTodos);
}

// e yada event fonksiyonda birşey çagrılırken yazılır.Çağrılmıyorsa e yada event yazmaya gerek yoktur.
function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo giriniz...");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo başarıyla eklendi...");
  }

  e.preventDefault();
  // form tekrar sayfaya yönlendirilmesin diye kullanılır
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo başarıyla silindi...");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
      // index:değer eşleşince arrayden sırayı alır.
      // 2. kısım: o indexten sonra kaç değer alacağımızı sorar.
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function getTodosFromStorage() {
  //Storagedan todoları alma
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = "alert alert-${type}";
  alert.textContent = message;
  firstCardBody.appendChild(alert);
  setTimeout(function () {
    // verilen saniye kadar çalışan funksiyon ekledim
    alert.remove();
  }, 2000);
}

function addTodoToUI(newTodo) {
  //string değerini list item olarak UI(arayüze) ekleyecek.

  //list item oluşturma
  const listItem = document.createElement("li");

  //link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class= 'fa fa-remove colorIcon'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";

  console.log(listItem);

  //Text node ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //todo liste list itemı ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";
}

function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
    //todoList.innerHTML = ""; daha yavaş işliyor
    //UI(Arayüzden) todoları temizleme
    while (todoList.firstChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      //Değer bulunmadı
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}
