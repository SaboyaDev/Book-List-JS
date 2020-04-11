// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function (book) {
  let list = document.getElementById('book-list');

  // Create <tr></tr> Element
  const row = document.createElement('tr');

  // Insert Columns
  row.innerHTML = `
		<td class='td'>${book.title}</td>
		<td class='td'>${book.author}</td>
		<td class='td'>${book.isbn}</td>
		<td><a href='#' class='delete'>x</a></td>
	`;
  list.appendChild(row);
};

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.alertMsg = function (msg, color) {
  let notification = document.querySelector('.alert');
  notification.classList.add(`alert-${color}`);
  notification.appendChild(document.createTextNode(msg));
  notification.style.display = 'block';
  setTimeout(function () {
    notification.classList.remove(`alert-${color}`);
    notification.style.display = 'none';
    notification.removeChild(notification.firstChild);
  }, 2000);
};

// Submit Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
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
    // Successful Message
    ui.alertMsg('Book was added - check it out!', 'success');
    // Add Book To List
    ui.addBookToList(book);
    // Clear Fields
    ui.clearFields();
  }
});

// Delete Book Elment
document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault();
  let ui = new UI();
  ui.deleteBook(e.target);
  ui.alertMsg('Book was removed successfully!', 'success');
});
