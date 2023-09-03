// Book object constructor
function Book(title, author, pages, readYet) {
  this.id = Math.floor(Math.random() * 10000);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readYet = readYet;
}

let LIBRARY = [];

// Catalog Functions
function addBookToLibrary(newBook) {
  LIBRARY.push(newBook);
}

function toggleReadStatus(bookID) {
  const updatedLibrary = [];

  LIBRARY.forEach((book) => {
    if (parseInt(bookID) === book.id) {
      book.readYet = !book.readYet;
    }
    updatedLibrary.push(book);
  });

  LIBRARY = updatedLibrary;

  displayLibrary();
}

function removeBookFromLibrary(bookID) {
  let updatedLibrary = [];

  LIBRARY.forEach((book) => {
    if (parseInt(bookID) !== book.id) {
      updatedLibrary.push(book);
    }
  });

  LIBRARY = updatedLibrary;

  displayLibrary();
}

// UI Display Functions
function createCard(book) {
  const catalog = document.getElementById("catalog");
  const readYet = book.readYet ? "Read" : "Not Read Yet";

  let newCard = document.createElement("div");
  newCard.classList.add("card");

  for (let prop in book) {
    if (prop === "id") {
      newCard.setAttribute("data-id", book[prop]);
    } else if (prop != "readYet") {
      let newElement = document.createElement("p");
      newElement.classList.add(prop);
      newElement.innerHTML = book[prop];
      newCard.appendChild(newElement);
    }
  }

  const toggleStatusButton = document.createElement("button");
  toggleStatusButton.innerHTML = readYet;
  toggleStatusButton.classList.add("actionButton");
  toggleStatusButton.classList.add(book.readYet ? "success" : "danger");
  toggleStatusButton.addEventListener("click", () => {
    const bookID = toggleStatusButton.parentElement.getAttribute("data-id");
    toggleReadStatus(bookID);
  });

  newCard.append(toggleStatusButton);

  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove Book";
  removeButton.classList.add("actionButton");
  removeButton.classList.add("danger");
  removeButton.addEventListener("click", () => {
    const bookID = removeButton.parentElement.getAttribute("data-id");
    removeBookFromLibrary(bookID);
  });

  newCard.appendChild(removeButton);

  catalog.appendChild(newCard);
}

function displayLibrary() {
  document.getElementById("catalog").replaceChildren();

  if (LIBRARY.length > 0) {
    for (let i = 0; i < LIBRARY.length; i++) {
      createCard(LIBRARY[i]);
    }
  } else {
    const catalog = document.getElementById("catalog");
    const content = document.createElement("p");
    content.innerHTML = "There's nothing here. Add a book to get started";

    catalog.appendChild(content);
  }
}

function openDialog() {
  const dialog = document.getElementById("formDialog");
  dialog.showModal();
}

function closeModal() {
  const dialog = document.getElementById("formDialog");
  const form = document.getElementById("addBookForm");
  form.reset();
  dialog.close();
}

// Document functions
document.addEventListener("DOMContentLoaded", () => {
  displayLibrary();
  // Open form dialog
  document.getElementById("addBook").addEventListener("click", openDialog);

  // Close form dialog
  document
    .getElementById("closeDialogButton")
    .addEventListener("click", closeModal);

  //   Submit the add book form
  document.getElementById("addBookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const formFields = form.elements;

    const title = formFields.title.value;
    const author = formFields.author.value;
    const pages = formFields.pages.value;
    const readYet = formFields.readYet.checked;

    // Make new book object
    let newBook = new Book(title, author, pages, readYet);

    // Add new book to library
    addBookToLibrary(newBook);
    displayLibrary();
    closeModal();
    form.reset();
  });
});
