

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
        const position1 = myLibrary.length;
        let bookToShelf = myLibrary[myLibrary.length - 1];
        console.log(bookToShelf);

        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("style", "text-wrap:pretty; width:280px; background-color: white; z-index: 3; border-radius: 12px;box-shadow:5px 5px 5px black; margin: 5%; display: grid;");
        bookDiv.setAttribute("id", `${position1}book`);
        console.log(bookDiv);


        const inputElement = document.createElement("input");
        inputElement.setAttribute("class", "image-upload");
        inputElement.setAttribute("type", "file");

        const imageElement = document.createElement("img");
        imageElement.setAttribute("class", "imagePreview");
        imageElement.setAttribute("style", "width:280px;height:340px;border-radius:12px;")


        let bookTitle = bookToShelf.title;
        let bookAuthor = bookToShelf.author;
        let bookPages = bookToShelf.pages;
        let bookRead = bookToShelf.read;

        const bookInfoTitle = document.createElement("p");
        bookInfoTitle.setAttribute("id", "bookTitle")
        bookInfoTitle.textContent = "Title: " + bookTitle;
        
        const bookInfoAuthor = document.createElement("p");
        bookInfoAuthor.setAttribute("id", "bookAuthor")
        bookInfoAuthor.textContent = "Author: " + bookAuthor;
        
        const bookInfoPages = document.createElement("p");
        bookInfoPages.setAttribute("id", "bookPages")
        bookInfoPages.textContent = "Pages: " + bookPages;

        const bookInfoRead = document.createElement("p");
        bookInfoRead.setAttribute("id", `${position1}bookRead`)
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
        // To be loaded first. Start button.
        const startTimerImg = document.createElement("img");
        startTimerImg.setAttribute("style", "font-size: 24px; border-radius:50%;height:48px;width:48px;");
        startTimerImg.setAttribute("src", "timerIconDark.svg");
        const startTimerButton = document.createElement("button");
        startTimerButton.setAttribute("style", "border-radius:50%; align-self: end;background: none;color: inherit;border: none;padding: 0;cursor: pointer;outline: inherit;");
        startTimerButton.setAttribute("id", `${position1}timerButton`);
        startTimerButton.appendChild(startTimerImg);
        // To be loaded after selecting start timer. Stop button.
        const startTimerImg2 = document.createElement("img");
        startTimerImg2.setAttribute("style", "font-size: 24px; border-radius:50%;height:48px;width:48px; background-color: lightblue;");
        startTimerImg2.setAttribute("src", "timerIconDark.svg");
        const endTimerButton = document.createElement("button");
        endTimerButton.setAttribute("style", "border-radius:50%; align-self: end;background: none;color: inherit;border: none;padding: 0;cursor: pointer;outline: inherit;");
        endTimerButton.setAttribute("id", `${position1}timerButton2`);
        endTimerButton.appendChild(startTimerImg2);

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
        bookDiv.appendChild(startTimerButton);

        let timeArray = [];
        let count = 0;

        startTimerButton.addEventListener("click", () => {
            start();
            startTimerButton.remove();
            bookDiv.appendChild(endTimerButton);
        })
        endTimerButton.addEventListener("click", () => {
            let time = end();
            endTimerButton.remove();
            bookDiv.appendChild(startTimerButton);
            timeArray[count] = time;
            console.log(timeArray);
            count++;
        })
        
        
    }
    readButton.addEventListener("click", () => {
        const position = (myLibrary.length);
        console.log(position);
        const specificPElement = document.getElementById(`${position}item`);
        const specificButton = document.getElementById(`${position}`)
        console.log(specificButton);
        console.log(specificPElement);
        specificButton.remove();
        specificPElement.remove();
        let bookToShelf = myLibrary[position - 1];
        console.log(bookToShelf);
        bookToShelf.read = "read";
        const pRead = document.getElementById(`${position}bookRead`);
        pRead.remove();
        const newPRead = document.createElement("p");
        newPRead.setAttribute("id", "bookRead2");
        newPRead.textContent = "Read? " + bookToShelf.read;
        const divInQ = document.getElementById(`${position}book`);
        divInQ.appendChild(newPRead);
        console.log(myLibrary[0]);
        console.log(bookToShelf.read);

        console.log("the event fired");
    })

    function start () {
        startTime = new Date();
    }
    function end () {
         endTime = new Date();

        let timeElapsed = endTime - startTime;

        let timeInSeconds = Math.round(timeElapsed/1000);

        return timeInSeconds;
    }

    function myPosition () {

        const position = (myLibrary.length + 1);
        console.log(position);
        return position;
    }

    
    console.log(myLibrary);
    })
    