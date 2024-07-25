
const contentArea = document.querySelector("content");
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("header button");
const close = document.querySelector("dialog > button:first-child");
const myLibrary = {};
let counter = 0;

function Book(title,author,pages,read,review) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.review = review;

    this.info = function() {
        let returnVal = `${this.title} by ${this.author}, ${this.pages}`;
        if (this.read) {
            returnVal+='read';
        } else {
            returnVal+='not read yet';
        }
        return returnVal;
    }
}

function addBookToLibrary(title,author,pages,read,review) {
    let newBook = new Book(title,author,pages,read);;
    myLibrary[counter] = newBook;
    displayBooksInLibrary(title,author,pages,read,review);
    counter++;
}

function changeReadStatus(e) {
    let book = e.target.parentElement.parentElement;
    let info = book.querySelector(".info");
    let readStatus = info.lastElementChild.textContent;
    if (readStatus === "completed") {
        info.lastElementChild.textContent = "in progress";
    } else {
        info.lastElementChild.textContent = "completed";
    }
    if (e.target.textContent === "read") {
        e.target.textContent = "not read";
    } else {
        e.target.textContent = "read";
    }
}

function showReview(e) {
    let reviewarea = e.target.parentElement.parentElement.querySelector(".book > textarea");
    
    if (reviewarea.style.display==="none") {
        reviewarea.style.display = "block"
    } else {
        reviewarea.style.display = "none";
    }
}

function deleteBook(e) {
    let book  = e.target.parentElement.parentElement;
    let index = book.getAttribute("data-index");
    delete myLibrary[index];
    contentArea.removeChild(book);
}

function displayBooksInLibrary(title,author,pages,read,review) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.setAttribute("data-index",`${counter}`);

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info");
    let buttonContainer = document.createElement("div");

    let readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.addEventListener("click",(e)=>{
        changeReadStatus(e);
    })
    buttonContainer.append(readButton);

    let reviewButton = document.createElement("button");
    reviewButton.textContent = "review >>";
    reviewButton.addEventListener("click",(e)=>{
        showReview(e);
    })
    buttonContainer.append(reviewButton);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = `delete`;
    deleteButton.addEventListener("click",(e)=>{
        deleteBook(e);
    })
    buttonContainer.append(deleteButton);

    infoContainer.innerHTML = `
        <p id="title-card">${title}</p>
        <p id="author-card">by ${author}</p>
        <p id="pages-card">${pages} pages</p>
    `
    if (read) {
        infoContainer.innerHTML+=`<p>completed</p>`;
        readButton.textContent = `read`;
    } else {
        infoContainer.innerHTML+=`<p>in progress</p>`;
        readButton.textContent = 'not read';
    }

    let bookReview = document.createElement("textarea");
    bookReview.textContent = review;

    bookCard.append(infoContainer);
    bookCard.append(bookReview);
    bookCard.append(buttonContainer);
    contentArea.append(bookCard);
    
}

addBookButton.addEventListener("click",()=>{
    //get info from somwhere implement it later
    form.reset()
    dialog.showModal();
})


close.addEventListener("click",()=>{
    dialog.close();
})


form.addEventListener("submit",()=>{
    let data = new FormData(form);
    let bookData = {
        title: data.get("title"),
        author: data.get("author"),
        pages: data.get("pages"),
        review: data.get("review"),
        status: data.get("status")===null ? false : true, 
    }
    addBookToLibrary(bookData["title"],bookData["author"],bookData["pages"],bookData["status"],bookData["review"]);
})





