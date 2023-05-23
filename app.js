const form = document.querySelector('.form-add-todo');
const ulContainer = document.querySelector('.todos-container');
const liItens = document.querySelectorAll(".list-group-item");
const searchInput = document.querySelector('.form-search input')


const addTodos = (inputValue) => {
    if (inputValue.length) {
        ulContainer.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-item = "${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt delete" data-trash = "${inputValue}"></i>
      </li>`
        event.target.reset();
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const inputValue = event.target.add.value.trim();
    addTodos(inputValue)

})

const removeTodo = clickedElement => {
    const dataTrashValue = clickedElement.dataset.trash
    const selectTodoItem = document.querySelector(`[data-item = "${dataTrashValue}"]`);

    if (dataTrashValue) {
        selectTodoItem.remove()
    }
}

ulContainer.addEventListener('click', event => {
    const clickedElement = event.target;
    removeTodo(clickedElement)

})

const filterTodos = (listTodos, textSearchInput, returnMatchedTodos) => {
    return listTodos
        .filter(todo => {
            const matchedTodos = todo.textContent.toUpperCase().includes(textSearchInput)
            return returnMatchedTodos ? matchedTodos : !matchedTodos
        })
}

const manipulateClasses = (todos, classToAdd, classToRemove) => {
    todos.forEach(todo => {
        todo.classList.remove(classToRemove)
        todo.classList.add(classToAdd)
    })

}

const hideTodos = (listTodos, textSearchInput) => {
    const toHide = filterTodos(listTodos, textSearchInput, false)
    manipulateClasses(toHide, 'remove', 'd-flex')

}

const showTodos = (listTodos, textSearchInput) => {
    const toShow = filterTodos(listTodos, textSearchInput, true)
    manipulateClasses(toShow, 'd-flex', 'remove')

}

searchInput.addEventListener('input', event => {
    const textSearchInput = event.target.value.toUpperCase();
    const listTodos = Array.from(ulContainer.children);

    hideTodos(listTodos, textSearchInput)
    showTodos(listTodos, textSearchInput)
})




