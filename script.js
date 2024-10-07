

document.addEventListener("DOMContentLoaded", () => {
    // Create array to store book objects.
    const myLibrary = [];
    // Create book constructor.
    function Book(author, title, pages) {
        this.author = author;
        this.title = title;
        this.pages = parseInt(pages, 10);
        this.read = readON();
        this.position = myPosition();
    }

    // Book.prototype.readOrN = function () {
    //     let checkedVal;
    //     for (i = 0; i < 2; i++) {
    //         if (readOrNot[i].checked) {
    //             checkedVal = readOrNot[i].value;
    //         }
    //     }
        
    // }

    let today = getCurrentDate();

    // Create Timestorage constructor.
    function Timestorage (bookEntry, today, timeArray) {
        this.bookTitle = bookEntry.title;
        this.timeArray = timeArray;
        this.today = today;
        this.totalTime = totalTime(timeArray);

    }
    // Declare global variables.
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
    // Determine whether or not, according to the user checked value, a book has been read.
    function readON () {
        for (i = 0; i < 2; i++) {
            if (readOrNot[i].checked) {
                return readOrNot[i].value;
            }
        }
    }

    // Create function that handles form processing.
    const form = document.getElementById("my-form");
    function handleForm (event) {
        event.preventDefault();
        const author = authorName.value;
        const title = titleName.value;
        const pages = pagesNumber.value;
        let readNotRead = this.read.value;
        console.log(readNotRead);
        let bookEntry = addBookToLibrary(author, title, pages, readNotRead);
        console.log(Object.getPrototypeOf(bookEntry));
        createShelfUnit(readNotRead, bookEntry);

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


    // Adds book object to myLibrary array.
    function addBookToLibrary(author, title, pages) {
        let bookEntry = new Book(author, title, pages);
        myLibrary.push(bookEntry);
        return bookEntry;
    }
    //let readButton = document.createElement("button");
    // let pElement = document.createElement("p");

    // const node = document.createTextNode("Have you now read this book? ")
    // const buttonNode = document.createTextNode("Yes");
    // Adds the book as a GUI element.
    function createShelfUnit (readNotRead, bookEntry) {


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

        let readButton = document.createElement("button");
        let pElement = document.createElement("p");


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
        // Add all the components into the shelf and into the card.
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
            let today = getCurrentDate();
            endTimerButton.remove();
            bookDiv.appendChild(startTimerButton);
            timeArray[count] = time;
            count++;
            let tlength = timeArray.length;
            console.log(tlength);
            if (tlength != 0) {
                let timeLog = new Timestorage(bookEntry, today, timeArray);
                console.log(timeLog);
            }
        })
        return readButton;

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

    function totalTime (timeArray) {
        let counter = 0;
        let length = timeArray.length;
        for (j = 0; j < length; j++) {
            counter = counter + timeArray[j];
        }
        return counter;
    };
    
    
    function getCurrentDate () {
        let date = new Date();

        // let day = date.getDay();
        // let month = date.getMonth() + 1;
        // let year = date.getFullYear();

        // let currentDate = `${year}-${month}-${day}`;
        // return currentDate;
        return date;

    }})
//console.log(myLibrary);
//function logTime () {
//}