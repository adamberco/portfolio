'use strict'

var gTodos
_createTodos()

var gFilterBy = 'ALL'
var gSortBy = 'CREATED'

function getTodosForDisplay() {
    var todos
    if (gFilterBy === 'ALL') todos = gTodos;
    else todos = gTodos.filter(function (todo) {
        return (todo.isDone && gFilterBy === 'DONE') ||
            (!todo.isDone && gFilterBy === 'ACTIVE')
    })

    switch (gSortBy) {
        case 'CREATED':
            console.log(gSortBy)
            return todos.sort((a, b) => a.createdAt - b.createdAt)
        case 'TXT':
            console.log(gSortBy)
            return todos.sort(sortBytxt)
        case 'IMPORTANCE':
            console.log(gSortBy)
            return todos.sort((a, b) => a.importance - b.importance)
    }
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1);
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone;
    _saveTodosToStorage()
}

function addTodo(txt, imp) {
    const todo = _createTodo(txt, imp)
    gTodos.push(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    const todos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return todos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function _saveTodosToStorage() {
    saveToStorage('todosDB', gTodos)
}


function _createTodo(txt, imp = 3) {
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date().getTime(),
        importance: imp,
    }
    return todo;
}

function _createTodos() {
    var todos = loadFromStorage('todosDB')
    // Setup Demo data
    if (!todos || !todos.length) {
        todos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ];
    }
    gTodos = todos
    _saveTodosToStorage()
}

function sortBytxt(a, b) {
    var nameA = a.txt.toUpperCase()
    var nameB = b.txt.toUpperCase()
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}