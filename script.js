

document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    function Book(author, title, pages) {
        this.author = author;
        this.title = title;
        this.pages = parseInt(pages, 10);
        this.read = readON();
        this.position = myPosition();
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
        const readNotRead = this.read.value;
        console.log(readNotRead);
        addBookToLibrary(author, title, pages, readNotRead);
        createShelfUnit(readNotRead);

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



    function addBookToLibrary(author, title, pages) {
        const bookEntry = new Book(author, title, pages);
        myLibrary.push(bookEntry);
    }
    const readButton = document.createElement("button");
    const pElement = document.createElement("p");
    function createShelfUnit (readNotRead) {
        const firstDiv = document.querySelector(".shelf-container");

        const bookToShelf = myLibrary[myLibrary.length - 1];
        console.log(bookToShelf);

        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("style", "text-wrap:pretty; width:280px; background-color: white; z-index: 3; border-radius: 12px;box-shadow:5px 5px 5px black; margin: 5%;");


        const inputElement = document.createElement("input");
        inputElement.setAttribute("class", "image-upload");
        inputElement.setAttribute("type", "file");

        const imageElement = document.createElement("img");
        imageElement.setAttribute("class", "imagePreview");
        imageElement.setAttribute("style", "width:280px;height:340px;border-radius:12px;")


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
        const position = myLibrary.length;
        console.log(position);
        if (readNotRead === "not read") {

            const node = document.createTextNode("Have you now read this book? ")
            const buttonNode = document.createTextNode("Yes");
            pElement.setAttribute("id", `${position}item`)
            pElement.appendChild(node);
            readButton.setAttribute("id", `${position}`);
            readButton.setAttribute("style", "z-index: 4;");
            readButton.appendChild(buttonNode);
            bookDiv.appendChild(pElement);
            bookDiv.appendChild(readButton);


            

        }
        readButton.addEventListener("click", () => {
            const position = (myLibrary.length);
            console.log(position);
            const specificPElement = document.getElementById(`${position}item`);
            const specificButton = document.getElementById(`${position}`)
            console.log(specificButton);
            console.log(specificPElement);
            specificButton.remove;
            specificPElement.remove;
            
            readNotRead = "read";
            console.log("the event fired");
        })
        
    }
    

    
    function myPosition () {

        const position = myLibrary.length;
        console.log(myLibrary.length);
        return position;
    }
    console.log(myLibrary);
    })

    


    
