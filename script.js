const myLibrary = [];

function Book(author, title, pages, read, notRead) {
    this.author = author;
    this.title = title;
    this.pages = parseInt(pages, 10);
    this.read = readON();
}

const bookSubmission = document.querySelector("submit");
const authorName = document.getElementById("author");
const titleName = document.getElementById("title");
const pagesNumber = document.getElementById("number-of-pages");
const readOrNot = document.getElementsByName("read");

const dialog = document.querySelector("dialog");
const openModal = document.querySelector("newBook");
const closeModal = document.querySelector("close");

const author = authorName.value;
const title = titleName.value;
const pages = pagesNumber.value;

function readON () {
    for (i = 0; i < 2; i++) {
        if (readOrNot[i].checked) {
            return readOrNot[i].value;
        }
            
        
    }
}

const form = document.getElementById("my-form");
function handleForm (event) {
    event.preventDefault();
    const author = authorName.value;
    const title = titleName.value;
    const pages = pagesNumber.value;
    const readNotRead = readON();

    addBookToLibrary(author, title, pages, readNotRead);
    
}
// Open modal
openModal.addEventListener("click", () => {
    dialog.showModal;
})

// Close modal
closeModal.addEventListener("click", () => {
    dialog.close;
})


form.addEventListener("submit", handleForm)

function addBookToLibrary(author, title, pages, read) {
    const bookEntry = new Book(author, title, pages, read);
    myLibrary.push(bookEntry);
    
}

console.log(myLibrary);