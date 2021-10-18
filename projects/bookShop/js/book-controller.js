'use strict'

function onInit() {
    _createBooks()
    renderBooks()
    renderPages()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = `<table class="comicGreen"><thead><tr><th></th><th>Id</th><th class = "fillter" onclick ="onSetSort('title')" title="Sort by Title">Title</th><th class = "fillter" title="Sort by Price" onclick ="onSetSort('price')">Price</th></tr></thead><tbody class="tbody">`
    strHtmls += (books.map(function (book) {
        return `<tr>
            <td><button class="delete" onclick="onDeleteBook('${book.id}')"  title="Delete Book">X</button></td>
            <td>${book.id}</td>
            <td onclick="onReadBook('${book.id}')" title="Open Book"><span class="title">${book.title}</span></td>
            <td class = "price-${book.id}" title="Click to Update"><span class="price-span" onclick = "onInputNewBookPrice('${book.id}')">${book.price}</span></td>
            </tr>`
    })).join('')
    strHtmls = strHtmls + `</tbody></table>`
    document.querySelector('.books-container').innerHTML = (!books || !books.length) ? '<h2>NO Books - Add Some</h2>' : strHtmls
}

function renderPages() {
    var page = 1
    var strHtmls = `<button onclick="onToggalePage('-')"><<</button>`
    while (page <= getPages()) {
        strHtmls += `<button class ="page-${page}" onclick="onToggalePage('${page}')">${page}</button>`
        page++
    }
    strHtmls += `<button onclick="onToggalePage('+')">>></button>`
    document.querySelector('.toggalePage').innerHTML = strHtmls
    var elbtn = document.querySelector(`.page-${gPageIdx + 1}`)
    if (!elbtn) {
        gPageIdx--
        renderBooks()
        return
    }
    elbtn.classList.add('mark')
}

function onToggalePage(val) {
    var books = getBooks()
    if (!books || !books.length) return
    document.querySelector(`.page-${gPageIdx + 1}`).classList.remove('mark')
    togglePage(val);
    document.querySelector(`.page-${gPageIdx + 1}`).classList.add('mark')
    renderBooks();
}

function onAddBook() {
    var title = document.querySelector('.add-title')
    var price = document.querySelector('.add-price')
    if (!title.value || !price.value) return
    addBook(title.value, price.value)
    renderPages()
    renderBooks()
    title.value = ''
    price.value = ''
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderBooks()
}

function onInputNewBookPrice(bookId) {
    var book = getBookById(bookId)
    var elPrice = document.querySelector(`.price-${bookId}`)
    elPrice.innerHTML = `<input class="update-price p${book.id}" value="${book.price}">
    </input><button onclick="onUpdateBookPrice('${bookId}')">✔️</button>`
}

function onUpdateBookPrice(bookId) {
    var newPrice = document.querySelector(`.p${bookId}`).value
    updateBookPrice(bookId, (!newPrice) ? 0 : newPrice)
    var book = getBookById(bookId)
    var elPrice = document.querySelector(`.price-${bookId}`)
    elPrice.innerHTML = `<td class = "price-${book.id}">
    <span class="price-span" onclick = "onInputNewBookPrice('${book.id}')">${book.price}</span></td>`
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    renderPages()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4').innerText = `Price: ${book.price}`
    elModal.querySelector('.img').innerHTML = `<br><img src="${book.imgUrl}"></img>`
    elModal.querySelector('.rate').value = book.rate
    elModal.classList.add('open')
    gCurrReadBook = book
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
}

function onUpdateRate(val) {
    var input = document.querySelector('.rate')
    if (val === '+') input.value++
    if (val === '-') input.value--
    updateBookRate(+input.value)
}