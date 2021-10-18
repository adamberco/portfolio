'use strict'


function renderTodos() {
    const todos = getTodosForDisplay();
    const strHtmls = todos.map(function (todo) {
        return `<li ><span onclick="onToggleTodo('${todo.id}')" class="${(todo.isDone) ? 'done' : ''}">

                    ${todo.txt}</span>
                    <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
                </li>`
    })
    document.querySelector('.todo-list').innerHTML = (!todos.length) ? getStrForDisplay() : strHtmls.join('')
    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveTodosCount();
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    if (confirm('Are you SURE?')) {
        console.log('Removing todo', todoId);
        removeTodo(todoId);
        renderTodos();
    }
}

function onToggleTodo(todoId) {
    console.log('Toggling todo', todoId);
    toggleTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    const elTxtTodo = document.querySelector('.new-todo');
    const elTxtImportance = document.querySelector('.importance');
    const txtTodo = elTxtTodo.value
    if (elTxtImportance.value !== '1' && elTxtImportance.value !== '2' && elTxtImportance.value !== '3' && elTxtImportance.value !== '' || !txtTodo) {
        alert((!txtTodo) ? ('Wrong input try again! (empty new Todo)') : ('Wrong input try again! (1-3)'))
        elTxtTodo.value = '';
        elTxtImportance.value = '';
        return
    }
    const txtI = (!elTxtImportance.value) ? 3 : parseInt(elTxtImportance.value)
    addTodo(txtTodo, txtI)
    renderTodos();
    elTxtTodo.value = '';
    elTxtImportance.value = '';
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetSort(sortBy) {
    console.log('Sorted By:', sortBy);
    setSort(sortBy);
    renderTodos();
}

function getStrForDisplay() {
    switch (gFilterBy) {
        case 'ALL':
            return `<h4>No Todos</h4>`;
        case 'ACTIVE':
            return `<h4>No Active Todos</h4>`;
        case 'DONE':
            return `<h4>No Done Todos</h4>`;
    }
}