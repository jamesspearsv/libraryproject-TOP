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

function toggleReadStatus() {
  // Do something
}

function removeBookFromLibrary(id) {
  LIBRARY = LIBRARY.filter((book) => parseInt(id) != book.id);
  displayLibrary();
}

// UI Display Functions
function createCard(book) {
  const catalog = document.getElementById("catalog");

  let newCard = document.createElement("div");
  newCard.classList.add("card");

  for (let prop in book) {
    if (prop === "id") {
      newCard.setAttribute("data-id", book[prop]);
    }
    let newElement = document.createElement("p");
    newElement.classList.add(prop);
    newElement.innerHTML = book[prop];
    newCard.appendChild(newElement);
  }

  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "Toggle Status";
  newCard.append(toggleButton);

  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove Book";
  removeButton.classList.add("removeButton");
  newCard.append(removeButton);

  catalog.appendChild(newCard);
}

function displayLibrary() {
  document.getElementById("catalog").replaceChildren();

  if (LIBRARY.length > 0) {
    for (let i = 0; i < LIBRARY.length; i++) {
      createCard(LIBRARY[i]);
    }
  } else {
    document.getElementById("catalog").replaceChildren();
  }

  return;
}

function openDialog() {
  const dialog = document.getElementById("formDialog");
  dialog.showModal();
}

function closeModal() {
  const dialog = document.getElementById("formDialog");
  dialog.close();
}

document.addEventListener("DOMContentLoaded", () => {
  displayLibrary();
  // Open form dialog
  document.getElementById("addBook").addEventListener("click", openDialog);

  //   Close form dialog
  document
    .getElementById("closeDialogButton")
    .addEventListener("click", closeModal);

  //   Submit the add book form
  document.getElementById("addBookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const formFields = form.elements;

    const title = formFields.title.value;
    const author = formFields.title.value;
    const pages = formFields.pages.value;
    const readYet = formFields.readYet.checked;

    // Make new book object
    let newBook = new Book(title, author, pages, readYet);

    // Add new book to library
    addBookToLibrary(newBook);
    displayLibrary();
    closeModal();
    form.reset();

    document.querySelectorAll(".removeButton").forEach((button) => {
      button.addEventListener("click", () => {
        const bookID = button.parentElement.getAttribute("data-id");
        removeBookFromLibrary(bookID);
      });
    });
  });
});
