// Seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const filter = [...document.querySelector("#filter-select")]

let oldInputValue
// Funçoes
const saveTodo = (text)=>{

    const todo = document.createElement("div")
    todo.classList.add("todo")
    
    const todoTitle = document.createElement("h3")
    todoTitle.innerHTML= text
    todo.appendChild(todoTitle)

    
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    todo.appendChild(removeBtn)


    todoList.appendChild(todo)
    todoInput.value = ""
    todoInput.focus()

}
const toggleForms = ()=>{
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo=(text)=>{
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerHTML === oldInputValue){
            todoTitle.innerText = text
        }
    })

}

document.querySelector("#search-input").addEventListener("keyup", function() {
    const searchText = this.value.toLowerCase(); // Get the entered search text in lowercase
    const todos = document.querySelectorAll(".todo");

    todos.forEach(todo => {
        const todoText = todo.querySelector("h3").textContent.toLowerCase(); // Get the task text in lowercase
        if (todoText.includes(searchText)) {
            todo.style.display = "flex"; // Show the task if it matches the search text
        } else {
            todo.style.display = "none"; // Hide the task if it doesn't match
        }
    });
});
document.querySelector("#filter-select").addEventListener("change", function() {
    const selectedFilter = this.value;
    const todos = document.querySelectorAll(".todo");

    todos.forEach(todo => {
        const isDone = todo.classList.contains("done");

        if (
            (selectedFilter === "all") ||
            (selectedFilter === "done" && isDone) ||
            (selectedFilter === "todo" && !isDone)
        ) {
            todo.style.display = "flex"; // Show the task if it matches the selected filter
        } else {
            todo.style.display = "none"; // Hide the task if it doesn't match
        }
    });
});
// Eventos
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener("click",(e)=>{

    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerHTML
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove()
    }
    if(targetEl.classList.contains("edit-todo")){
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }


})
cancelEditBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    toggleForms()
})
editForm.addEventListener("submit",(e)=>{

    e.preventDefault()
    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms()

})