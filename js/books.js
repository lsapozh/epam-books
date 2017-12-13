
let books = [];
let currentBookIndex;
initBooks();
paintListOfBooks();
switchOnListeners();
switchOnListenerForList();


function initBooks() {
    books[0] = {
        name: "Design Patterns: Elements of Reusable Object-Oriented Software",
        authors: "Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm",
        year: "1994",
        image: "https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg"
    }

    books[1] = {
        name: "JavaScript: The Good Parts",
        authors: "Douglas Crockford",
        year: "2008",
        image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg"
    }

    books[2] = {
        name: "JavaScript Patterns: Build Better Applications with Coding and Design Patterns",
        authors: "Stoyan Stefanov",
        year: 2008,
        image: "https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg"
    }
}

function paintListOfBooks() {
    document.getElementById("books-list").innerHTML = "";
    books.forEach((currentBook) => {
        var book = document.createElement('div');
        book.innerHTML = "" +
            "<img src=\"" + currentBook.image + "\" class=\"book-image\">\n" +
            "<div class=\"info-about-book\">\n" +
            "    <p class=\"book-name\">" + currentBook.name + "</p>\n" +
            "    <p class=\"book-authors\">" + currentBook.authors + "</p>\n" +
            "    <p class=\"book-year\">" + currentBook.year+ "</p>\n" +
            "</div>\n" +
            "<div class=\"book-buttons\">\n" +
            "    <button class=\"btn-update\" id=\"btn-update-book-" + books.indexOf(currentBook) + "\"\>Изменить</button>\n" +
            "    <button class=\"btn-delete\" id=\"btn-delete-book-" + books.indexOf(currentBook)+ "\"\>Удалить</button>\n" +
            "</div>";
        document.getElementById("books-list").appendChild(book);
    });
}

function showPage(id) {
    document.getElementById(id).style.display = "block";
}

function hidePage(id) {
    document.getElementById(id).style.display = "none";
}

function returnToBooksList() {
    hidePage("adding-new-book");
    hidePage("updating-book");
    showPage("books-list");
}


function saveNewBook() {
    let name = document.getElementById("name-input").value;
    let authors = document.getElementById("authors-input").value;
    let year = document.getElementById("year-input").value;
    let image = document.getElementById("image-input").value;
    books.push({name: name, authors: authors, year: year, image: image});
    paintListOfBooks();
    switchOnListenerForList();
    returnToBooksList();
}

function addBook() {
    hidePage("books-list");
    showPage("adding-new-book");
    document.getElementById("name-input").value = null;
    document.getElementById("authors-input").value = null;
    document.getElementById("year-input").value = null;
    document.getElementById("image-input").value = null;
}

function updateBook(id) {
    hidePage("books-list");
    showPage("updating-book");
    let book = books[id];
    document.getElementById("name-input-updated").value = book.name;
    document.getElementById("authors-input-updated").value = book.authors;
    document.getElementById("year-input-updated").value = book.year;
    document.getElementById("image-input-updated").value = book.image;
}

function saveUpdatedBook(id) {
    let name = document.getElementById("name-input-updated").value;
    let authors = document.getElementById("authors-input-updated").value;
    let year = document.getElementById("year-input-updated").value;
    let image = document.getElementById("image-input-updated").value;
    books[id] = {name: name, authors: authors, year: year, image: image};
    paintListOfBooks();
    switchOnListenerForList();
    returnToBooksList();
}

function deleteBook(id) {
    books.splice(id, 1);
    paintListOfBooks();
    switchOnListenerForList();
    returnToBooksList();
}

function switchOnListeners() {
    document.getElementById("btn-add").addEventListener('click', () => {
        addBook();
    });
    document.getElementById("adding-btn-cancel").addEventListener('click', () => {
        returnToBooksList();
    });
    document.getElementById("updating-btn-cancel").addEventListener('click', () => {
        returnToBooksList();
    });
    document.getElementById("adding-btn-save").addEventListener('click', () => {
        saveNewBook();
    });
    document.getElementById("updating-btn-save").addEventListener('click', () => {
        saveUpdatedBook(currentBookIndex);
    });

}

function switchOnListenerForList() {
    books.forEach((book, index) => {
        document.getElementById("btn-delete-book-" + index).addEventListener('click', () => {
            deleteBook(index);
        });
        document.getElementById("btn-update-book-" + index).addEventListener('click', () => {
            currentBookIndex = index;
            updateBook(index);
        });
    });
}




