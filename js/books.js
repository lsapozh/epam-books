function initBooks() {
    books = [{
        name: "Design Patterns: Elements of Reusable Object-Oriented Software",
        authors: "Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm",
        year: "1994",
        image: "https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg"
    },
        {
        name: "JavaScript: The Good Parts",
        authors: "Douglas Crockford",
        year: "2008",
        image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg"
    }, {
        name: "JavaScript Patterns: Build Better Applications with Coding and Design Patterns",
        authors: "Stoyan Stefanov",
        year: 2008,
        image: "https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg"
    }, {
        name: "JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)",
        authors: "David Flanagan",
        year: 2011,
        image: "https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg"
    }];
}

function paintListOfBooks() {
    document.getElementById("books-list").innerHTML = "";
    books.forEach((currentBook) => {
        const book = document.createElement('div');
        book.className = "book container";
        book.innerHTML = `
            <img src="${currentBook.image}" class="book-image">
            <div class="info-about-book">
                <p class="book-name">${currentBook.name}</p>
                <p class="book-authors">${currentBook.authors}</p>
                <p class="book-year">${currentBook.year}</p>
            </div>
            <div class="book-buttons">
                <button class="btn-update btn-cyan" id="btn-update-book-${books.indexOf(currentBook)}">       <span class="btn-text">Изменить</span>       <i class="fa fa-pencil-square-o icons" aria-hidden="true"></i>    </button>
                <button class="btn-delete btn-red" id="btn-delete-book-${books.indexOf(currentBook)}">       <span class="btn-text">Удалить</span>       <i class="fa fa-times icons" aria-hidden="true"></i></button>
            </div>
            <div class="clear"></div>
        `;
        document.getElementById("books-list").appendChild(book);
    });
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function returnToBooksList() {
    hide("adding-new-book");
    hide("updating-book");
    show("books-list");
}

function isCorrectYear(year) {
    if (year <= 2017 && year >= 0) {
        return true;
    } else {
        return false;
    }
}

function isCorrectName(name) {
    return !!name;
}

function hideError() {
    hide("adding-error-name");
    hide("updating-error-name");
    hide("adding-error-year");
    hide("updating-error-year");
}

function showAddingPage() {
    hide("books-list");
    hide("updating-book");
    show("adding-new-book");
    hideError();
    document.getElementById("name-input").value = null;
    document.getElementById("authors-input").value = null;
    document.getElementById("year-input").value = null;
    document.getElementById("image-input").value = null;
}

function saveNewBook() {
    let name = document.getElementById("name-input").value;
    let authors = document.getElementById("authors-input").value;
    let year = document.getElementById("year-input").value;
    let image = document.getElementById("image-input").value;
    if (!isCorrectYear(year)) {
        show("adding-error-year");
        hide("adding-error-name");
    } else if (!isCorrectName(name)) {
        show("adding-error-name");
        hide("adding-error-year");
    } else {
        if (!image) {
            image = standardImage;
        }
        books.push({name: name, authors: authors, year: year, image: image});
        paintListOfBooks();
        switchOnListenerForList();
        returnToBooksList();
        saveToLocalStorage();
    }
}


function showUpdatingPage(id) {
    hide("books-list");
    hide("adding-new-book");
    show("updating-book");
    hideError();
    let book = books[id];
    document.getElementById("name-input-updated").value = book.name;
    document.getElementById("authors-input-updated").value = book.authors;
    document.getElementById("year-input-updated").value = book.year;
    document.getElementById("image-input-updated").value = book.image;
}

function saveUpdatedBook(id) {
    const name = document.getElementById("name-input-updated").value;
    const authors = document.getElementById("authors-input-updated").value;
    const year = document.getElementById("year-input-updated").value;
    let image = document.getElementById("image-input-updated").value;

    if (!isCorrectYear(year)) {
        show("updating-error-year");
        hide("updating-error-name");
    } else if (!isCorrectName(name)) {
        show("updating-error-name");
        hide("updating-error-year");
    } else {
        if (!image) {
            image = standardImage;
        }
        books[id] = {name: name, authors: authors, year: year, image: image};
        paintListOfBooks();
        switchOnListenerForList();
        returnToBooksList();
        saveToLocalStorage();
    }
}

function deleteBook(id) {
    books.splice(id, 1);
    paintListOfBooks();
    switchOnListenerForList();
    returnToBooksList();
    saveToLocalStorage();
}

function addScrollListener() {
    let showButton = false;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            if (!showButton) {
                showButton = true;
                show("btn-plus");
            }
        } else {
            if (showButton) {
                showButton = false;
                hide("btn-plus");
            }
        }
    });
}

function switchOnListeners() {
    document.getElementById("btn-add").addEventListener('click', () => {
        showAddingPage();
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
    document.getElementById("btn-plus").addEventListener('click', () => {
        showAddingPage();
    });
    addScrollListener();

}

function switchOnListenerForList() {
    books.forEach((book, index) => {
        document.getElementById("btn-delete-book-" + index).addEventListener('click', () => {
            deleteBook(index);
        });
        document.getElementById("btn-update-book-" + index).addEventListener('click', () => {
            currentBookIndex = index;
            showUpdatingPage(index);
        });
    });
}

function saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}



let books = [];
//localStorage.clear(); // uncomment to clear storage
if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"));
} else {
    initBooks();
}

let currentBookIndex;
const standardImage = "https://i.pinimg.com/736x/fb/ab/7a/fbab7ad8cf7c407c40a66a7fafd4c933--clipart-black-and-white-open-book.jpg";
paintListOfBooks();
switchOnListeners();
switchOnListenerForList();




