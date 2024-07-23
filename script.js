const myLibrary = [];

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
    myLibrary.push(newBook);
}

function displayBooksInLibrary() {
    myLibrary.forEach((book)=>{
        let info = Object.keys(book).
        filter((key)=>(typeof book[key]) != 'function').
        map((key)=>book[key]);
        console.log(info);
    })
}

addBookToLibrary("hello","vipul",344,true);
addBookToLibrary("hello","vipul",344,true);
addBookToLibrary("hello","vipul",344,true);
addBookToLibrary("hello","vipul",344,true);
displayBooksInLibrary();


