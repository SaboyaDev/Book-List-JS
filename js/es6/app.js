// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
class UI {
  // Add book to list
  addBookToList(book) {
    let list = document.getElementById('book-list');
    // Create <tr></tr> Element
    let row = document.createElement('tr');

    // Insert Columns
    row.innerHTML = `
			<td class='td'>${book.title}</td>
			<td class='td'>${book.author}</td>
			<td class='td'>${book.isbn}</td>
			<td><a href='#' class='delete'>x</a></td>`;

    list.appendChild(row);
  }

  // Alert message
  alertMsg(msg, color) {
    // Target the alert div
    let notification = document.querySelector('.alert');
    // Adds the Bootstrap class
    notification.classList.add(`alert-${color}`);
    // Appends the message
    notification.appendChild(document.createTextNode(msg));
    // Displays the div element
    notification.style.display = 'block';
    // Lets it run for 2 Seconds
    setTimeout(() => {
      // All of these get the div element ready for next time
      notification.classList.remove(`alert-${color}`);
      notification.style.display = 'none';
      notification.removeChild(notification.firstChild);
    }, 2000);
  }

  // Deletes the book from the list
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  // Clear Fields
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();
      // Add Book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(target) {
    if (target.className === 'delete') {
      const books = Store.getBooks();
      const isbn = target.parentElement.previousElementSibling.textContent;

      books.forEach((book, index) => {
        if (book.isbn === isbn) {
          books.splice(index, 1);
        }
      });

      localStorage.setItem('books', JSON.stringify(books));
    }
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Submit Event Listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Get Form Value
  let title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate Book
  let book = new Book(title, author, isbn);

  // Instantiate UI
  let ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error Message
    ui.alertMsg('All Fields Must Be Filled In!', 'danger');
  } else {
    // Add Book To List
    ui.addBookToList(book);

    // Add to Local Storage
    Store.addBook(book);

    // Successful Message
    ui.alertMsg('Book was added - check it out!', 'success');
    // Clear Fields
    ui.clearFields();
  }
});

// Delete Book Elment
document.getElementById('book-list').addEventListener('click', (e) => {
  e.preventDefault();
  let ui = new UI();
  ui.deleteBook(e.target);

  // Remove from Local Storage
  Store.removeBook(e.target);

  ui.alertMsg('Book was removed successfully!', 'success');
});
