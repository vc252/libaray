
const contentArea = document.querySelector("content");
const myLibrary = {};
let counter = 0;

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

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

function addBookToLibrary(title,author,pages,read) {
    let newBook = new Book(title,author,pages,read);;
    myLibrary[counter] = newBook;
    displayBooksInLibrary(title,author,pages,read);
    counter++;
}

function displayBooksInLibrary(title,author,pages,read) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.setAttribute("data-index",`${counter}`);

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info");
    let buttonContainer = document.createElement("div");

    let readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.addEventListener("click",(e)=>{
        let book = e.target.parentElement.parentElement;
        console.log(book.getAttribute("data-index"));
    })
    buttonContainer.append(readButton);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = `delete`;
    deleteButton.addEventListener("click",(e)=>{
        let book  = e.target.parentElement.parentElement;
        let index = book.getAttribute("data-index");
        delete myLibrary[index];
        contentArea.removeChild(book);
    })
    buttonContainer.append(deleteButton);

    infoContainer.innerHTML = `
        <p>${title}</p>
        <p>${author}</p>
        <p>${pages} pages</p>
    `
    if (read) {
        infoContainer.innerHTML+=`<p>completed</p>`;
        readButton.textContent = `read`;
    } else {
        infoContainer.innerHTML+=`<p>inProgress</p>`;
        readButton.textContent = 'not read';
    }
    bookCard.append(infoContainer);
    bookCard.append(buttonContainer);
    contentArea.append(bookCard);
    
}

let addBookButton = document.querySelector("header button");
addBookButton.addEventListener("click",()=>{
    //get info from somwhere implement it later
    addBookToLibrary("sucess","vipul","3000",true);
})




