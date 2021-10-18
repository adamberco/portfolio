'use strict'

const img1 = "/img/book1.jpg"
const img2 = "/img/book2.jpg"
const img3 = "/img/book3.jpg"
const KEY = 'booksDB';
const PAGE_SIZE = 3;

var gBooks;
var gCurrReadBook
var gPageIdx = 0;
var gSortBy = 'title'

function togglePage(val) {
    switch (val) {
        case '+':
            gPageIdx++
            break
        case '-':
            gPageIdx--
            break
        default:
            gPageIdx = +val - 1
            break
    }
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    } else if (gPageIdx < 0) {
        gPageIdx = (gBooks.length % PAGE_SIZE === 0) ? gBooks.length / PAGE_SIZE - 1 : (gBooks.length / PAGE_SIZE)
    }
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getBooks() {
    var books = gBooks
    switch (gSortBy) {
        case 'price':
            books = books.sort((a, b) => parseInt(a.price) - parseInt(b.price))
            break
        case 'title':
            books = books.sort(sortByTitle)
            break
    }
    const fromIdx = gPageIdx * PAGE_SIZE
    books = books.slice(fromIdx, fromIdx + PAGE_SIZE)
    return books
}

function deleteBook(bookId) {
    var bookIdx = getIndexById(bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();

}

function addBook(title, price) {
    var book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function getIndexById(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    return idx
}

function updateBookPrice(bookId, newPrice) {
    var book = getBookById(bookId)
    book.price = newPrice;
    _saveBooksToStorage();
}

function updateBookRate(num) {
    if (Number.isNaN(num) || num < 0) {
        gCurrReadBook.rate = 0
        onReadBook(gCurrReadBook.id)
    } else if (num > 10) {
        gCurrReadBook.rate = 10
        onReadBook(gCurrReadBook.id)
    } else gCurrReadBook.rate = num
    _saveBooksToStorage()
}

function _createBook(title, price, imgUrl = '', rate = 0) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl,
        rate,

    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        //Demo Default model
        books = [
            _createBook('aThe Greatest Secret1', '1$', img1),
            _createBook('fThe Power Of Now2', '2$', img2, 2),
            _createBook('bThe Secret History Of The World3', '3$', img3),
            _createBook('gThe Greatest Secret4', '4$', img1),
            _createBook('cThe Power Of Now5', '5$', img2, 2),
            _createBook('hThe Secret History Of The World6', '6$', img3),
            _createBook('dThe Greatest Secret4', '7$', img1),
            _createBook('iThe Power Of Now5', '8$', img2, 2),
            _createBook('eThe Secret History Of The World6', '9$', img3),
        ]
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function sortByTitle(a, b) {
    var nameA = a.title.toUpperCase()
    var nameB = b.title.toUpperCase()
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

function getPages() {
    return (gBooks.length % PAGE_SIZE === 0) ?
        gBooks.length / PAGE_SIZE :
        (gBooks.length / PAGE_SIZE) + 1
}