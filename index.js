// TODO
// [x] Refractor book constructor into factory function
// [x] Refactor library into class
//        Requires:
//        library array
//        library functions
// [x] Write display controller module

const Book = (title, author, pages, readYet) => {
  const id = Math.floor(Math.random() * 1000);
  return { id, title, author, pages, readYet };
};

const testBook = Book("The Martian", "Andy Weir", 250, false);

class Library {
  constructor() {
    return 1;
  }

  catalog = [testBook];

  add(newBook) {
    this.catalog.push(newBook);
    DisplayController.closeDialog();
    DisplayController.displayLibrary();
  }

  remove(id) {
    let updatedCatalog = [];
    this.catalog.forEach((book) => {
      if (parseInt(id) !== book.id) {
        updatedCatalog.push(book);
      }
    });
    this.catalog = updatedCatalog;
    DisplayController.displayLibrary();
  }

  updateStatus(id) {
    let updatedCatalog = [];
    this.catalog.forEach((book) => {
      if (parseInt(id) === book.id) {
        book.readYet = !book.readYet;
      }
      updatedCatalog.push(book);
    });
    this.catalog = updatedCatalog;
    DisplayController.displayLibrary();
  }
}

const library = new Library();

const DisplayController = (() => {
  // Document element selectors
  const dialog = document.getElementById("formDialog");
  const form = document.getElementById("addBookForm");
  const catalog = document.getElementById("catalog");

  const displayLibrary = () => {
    document.getElementById("catalog").replaceChildren();

    if (library.catalog.length > 0) {
      for (let i = 0; i < library.catalog.length; i++) {
        DisplayController.createCard(library.catalog[i]);
      }
    } else {
      const catalog = document.getElementById("catalog");
      const content = document.createElement("p");
      content.innerHTML = "There's nothing here. Add a book to get started";

      catalog.appendChild(content);
    }
  };

  const createCard = (book) => {
    // Create card div and apply content from book props
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

    // Set content for toggle status button and append to div
    const readYet = book.readYet ? "Read" : "Not Read Yet";
    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.innerHTML = readYet;
    toggleStatusButton.classList.add(
      "actionButton",
      book.readYet ? "success" : "danger"
    );
    toggleStatusButton.addEventListener("click", () => {
      const bookID = toggleStatusButton.parentElement.getAttribute("data-id");
      library.updateStatus(bookID);
    });
    newCard.append(toggleStatusButton);

    // Create and append remove button to div
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove Book";
    removeButton.classList.add("actionButton", "danger");
    removeButton.addEventListener("click", () => {
      const bookID = removeButton.parentElement.getAttribute("data-id");
      library.remove(bookID);
    });
    newCard.appendChild(removeButton);

    // Append card to catalog
    catalog.appendChild(newCard);
  };

  const openDialog = () => {
    dialog.showModal();
  };

  const closeDialog = () => {
    form.reset();
    dialog.close();
  };

  return { displayLibrary, createCard, openDialog, closeDialog };
})();

// Attach UI elements to Display Controller functions
document.addEventListener("DOMContentLoaded", () => {
  // Display catalog on initial load
  DisplayController.displayLibrary();

  // Open form dialog
  document
    .getElementById("addBook")
    .addEventListener("click", DisplayController.openDialog);

  // Close form dialog
  document
    .getElementById("closeDialogButton")
    .addEventListener("click", DisplayController.closeDialog);

  // Submit the add book form
  document.getElementById("addBookForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formFields = event.target.elements;

    const title = formFields.title.value;
    const author = formFields.author.value;
    const pages = formFields.pages.value;
    const readYet = formFields.readYet.checked;

    // Make new book object
    const newBook = Book(title, author, pages, readYet);

    // Add new book to library
    library.add(newBook);
  });
});
