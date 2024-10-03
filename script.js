

document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    function Book(author, title, pages, read, notRead) {
        this.author = author;
        this.title = title;
        this.pages = parseInt(pages, 10);
        this.read = readON();
    }


    const authorName = document.getElementById("author");
    const titleName = document.getElementById("title");
    const pagesNumber = document.getElementById("number-of-pages");
    const readOrNot = document.getElementsByName("read");

    const dialog = document.querySelector("#form-dialog");
    const openModal = document.querySelector("#newBook");
    const closeModal = document.querySelector("#close");

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
        createShelfUnit();

        form.reset();
    }

    // Open modal
    openModal.addEventListener("click", () => {
        dialog.showModal();
    })

    // Close modal
    closeModal.addEventListener("click", () => {
        dialog.close();
    })

    form.addEventListener("submit", handleForm)

    function addBookToLibrary(author, title, pages, read) {
        const bookEntry = new Book(author, title, pages, read);
        myLibrary.push(bookEntry);
    }

    function createShelfUnit () {
        const firstDiv = document.querySelector(".shelf-container");

        const bookToShelf = myLibrary[myLibrary.length - 1];

        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("style", "text-wrap:pretty; width:200px; background-color: white; z-index: 3; border-radius: 12px;box-shadow:5px 5px 5px black; margin: 5%;");


        const inputElement = document.createElement("input");
        inputElement.setAttribute("class", "image-upload");
        inputElement.setAttribute("type", "file");

        const imageElement = document.createElement("img");
        imageElement.setAttribute("class", "imagePreview");
        imageElement.setAttribute("style", "width:200px;height:150px;border-radius:12px;")


        const bookTitle = bookToShelf.title;
        const bookAuthor = bookToShelf.author;
        const bookPages = bookToShelf.pages;
        const bookRead = bookToShelf.read;

        const bookInfoTitle = document.createElement("p");
        bookInfoTitle.setAttribute("class", "bookInfo")
        bookInfoTitle.textContent = "Title: " + bookTitle;
        
        const bookInfoAuthor = document.createElement("p");
        bookInfoAuthor.setAttribute("class", "bookInfo")
        bookInfoAuthor.textContent = "Author: " + bookAuthor;
        
        const bookInfoPages = document.createElement("p");
        bookInfoPages.setAttribute("class", "bookInfo")
        bookInfoPages.textContent = "Pages: " + bookPages;

        const bookInfoRead = document.createElement("p");
        bookInfoRead.setAttribute("class", "bookInfo")
        bookInfoRead.textContent = "Read?: " + bookRead;

        const newLine = document.createElement("br");

        inputElement.addEventListener("change", function () {
            const file = inputElement.files[0];

            const reader = new FileReader();

            reader.onload = function(e) {
                const imageDataURL = e.target.result;
                const imagePreview = document.querySelector(".imagePreview");
                imagePreview.src = imageDataURL;
            
            };
            reader.readAsDataURL(file);
        })

        firstDiv.appendChild(bookDiv);
        bookDiv.appendChild(imageElement);
        bookDiv.appendChild(newLine);
        bookDiv.appendChild(inputElement); 
        bookDiv.appendChild(bookInfoTitle);
        bookDiv.appendChild(bookInfoAuthor);
        bookDiv.appendChild(bookInfoPages);
        bookDiv.appendChild(bookInfoRead);
    }
    console.log(myLibrary);

})


    
