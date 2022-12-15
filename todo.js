// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelectorAll("#filter");
const clearButton = document.querySelectorAll("#clear-todos");

eventListeners(); //tek yerden tüm fonsiyonları çağırıyoruz

// Tüm event listenerlar
function eventListeners() {
  form.addEventListener("submit", addTodo);
}
function addTodo(e) {
  const newTodo = todoInput.value.trim();
  console.log(newTodo);
  addTodoToUI(newTodo);

  e.preventDefault();
  // form tekrar sayfaya yönlendirilmesin diye kullanılır
}
function addTodoToUI(newTodo) {
  //string değerini list item olarak UI(arayüze) ekleyecek.

  //list item oluşturma
  const listItem = document.createElement("li");

  //link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class= 'fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";

  console.log(listItem);

  //Text node ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //todo liste list itemı ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";
}

// e yada event fonksiyonda birşey çagrılırken yazılır.Çağrılmıyorsa e yada event yazmaya gerek yoktur.
