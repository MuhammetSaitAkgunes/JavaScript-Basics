// kullanılacak tüm elementler seçildi.
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    // tüm event listenerlar buraya eklenecek.
    form.addEventListener("submit", addTodo);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", deleteAllTodos);
}

function deleteAllTodos(e){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        showAlert("success","Başaıyla temizlendi !");
    }
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulamadı
            listItem.setAttribute("style", "display : none !important");
        }
        else {
            listItem.setAttribute("style", "display : block ");
        }
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        showAlert("success", "Başarıyla silindi !")
    }
}


function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        /*
                        <div class="alert alert-danger" role="alert">
                    This is a danger alert—check it out!
                </div>
                */
        showAlert("danger", "Lütfen bir todo girin !");
    }
    else {
        addTodoToUI(newTodo);
        showAlert("success", "Yeni todo eklendi !")
    }


    e.preventDefault();
}

function getTodosFromStorage() { // local storagedan todo listesini almak
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    // setTimeout metodu ile bilgilendirme mesajını bir süre sonra silmek
    setTimeout(function () {
        alert.remove();
    }, 1000);

}


function addTodoToUI(newTodo) {
    // aldığı değeri list item olarak arayüze ekler.

    // list item oluşturma
    const listItem = document.createElement("li");

    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // text node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // todo list'e list item'ı ekleme
    todoList.appendChild(listItem);

    todoInput.value = "";
}
