
// function toggle (bookEntry) {
//     if (toggleInput.checked) {
//         bookEntry.read = "read";
//         console.log(bookEntry.read);
//     }
//     else {
//         bookEntry.read = "not read";
//     }
// }
document.addEventListener("DOMContentLoaded", () => {
    // Create array to store book objects.
    const myLibrary = [];

    function myPosition () {

        const position = (myLibrary.length + 1);
        console.log(position);
        return position;
    }

    let position2 = myPosition();
    // Create book constructor.
    function Book(author, title, pages) {
        this.author = author;
        this.title = title;
        this.pages = parseInt(pages, 10);
        this.read = readON();
        this.position = position2;
    }

    // Book.prototype.readOrN = function () {
    //     let checkedVal;
    //     for (i = 0; i < 2; i++) {
    //         if (readOrNot[i].checked) {
    //             checkedVal = readOrNot[i].value;

    //         }
    //     }
    //     return checkedVal;
    // }
    // Book.prototype.toggleRead = function () {
    //     if (toggleInput.checked) {
    //         this.read = "read";
    //         console.log(bookEntry.read);
    //     }
    //     else {
    //         this.read = "not read";
    //     }
    // }



    //let today = getCurrentDate();

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
    let pElement = document.createElement("p");

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
        imageElement.setAttribute("id", `${position1}imagePreview`);
        imageElement.setAttribute("style", "width:280px;height:340px;border-radius:12px;")
        
        let pElement = document.createElement("p");

        const toggle = document.createElement("label");
        toggle.setAttribute("class", "switch");
        toggle.setAttribute("style", "position: relative;display: inline-block;width: 60px;height: 34px;");
        let toggleInput = document.createElement("input");
        toggleInput.setAttribute("type", "checkbox");
        toggleInput.setAttribute("style", "opacity: 0;width: 0;height: 0;");
        toggleInput.setAttribute("id", `${position1}tInput`);
        const toggleSpan = document.createElement("span");
        toggleSpan.setAttribute("class", "slider round");

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

        let bookInfoRead = document.createElement("p");
        bookInfoRead.setAttribute("id", `${position1}bookRead`)
        bookInfoRead.textContent = "I have " + bookRead + " this book.";

        const newLine = document.createElement("br");

        inputElement.addEventListener("change", function () {
            const file = inputElement.files[0];

            const reader = new FileReader();

            reader.onload = function(e) {
                const imageDataURL = e.target.result;
                const imagePreview = document.querySelector(`#${position1}imagePreview`);
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
        
        
        const position = myLibrary.length;
        console.log(position);


        const nodeRead = document.createTextNode("I have read this book. ")
        const nodeNotRead = document.createTextNode("I have not read this book. ");

        pElement.setAttribute("id", `${position}item`)
        //pElement.appendChild(nodeRead);

        bookDiv.appendChild(pElement);

        toggle.appendChild(toggleInput);
        toggle.appendChild(toggleSpan);

        bookDiv.appendChild(toggle);

        bookDiv.appendChild(startTimerButton);

        bookDiv.appendChild(bookInfoRead);

        let specificToggleInput = document.getElementById(`${position1}tInput`);

        console.log(specificToggleInput);

        console.log(specificToggleInput.value);

        //specificToggleInput.addEventListener("change", toggle(bookEntry));

        specificToggleInput.addEventListener("change", logEvent);

        console.log(bookEntry.read);

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
            }})

        function logEvent () {
            let specificPElement = document.getElementById(`${position1}bookRead`);
            console.log(specificPElement);
            if (specificToggleInput.checked === true){
                //specificPElement.remove();
                let bookToShelf = myLibrary[position1 - 1];
                bookToShelf.read = "read";
                specificPElement.remove();
                bookInfoRead.textContent = "I have " + bookToShelf.read + " this book.";
                
                console.log("on");
                
                bookDiv.appendChild(specificPElement);
            }
            else {
                let bookToShelf = myLibrary[position1 - 1];
                bookToShelf.read = "not read";
                specificPElement.remove();
                bookInfoRead.textContent = "I have " + bookToShelf.read + " this book.";
                bookDiv.appendChild(specificPElement);

                console.log("off");
            }
        }

    function start () {
        startTime = new Date();
    }
    
    function end () {
         endTime = new Date();

        let timeElapsed = endTime - startTime;

        let timeInSeconds = Math.round(timeElapsed/1000);

        return timeInSeconds;
    }

    function totalTime (timeArray) {
        let counter = 0;
        let length = timeArray.length;
        for (j = 0; j < length; j++) {
            counter = counter + timeArray[j];
        }
        return counter;
    }
    
    
    function getCurrentDate () {
        let date = new Date();

        let day = date.getDay();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${year}-${month}-${day}`;
        return currentDate;
        return date;

    }
}})