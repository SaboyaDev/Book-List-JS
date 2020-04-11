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
		<td><a href='#' class='delete'><i class="fa fa-times text-success" aria-hidden="true"></i></a></td>
	`;
  list.appendChild(row);
};

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Event Listeners
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

  // Add Book To List
  ui.addBookToList(book);

  // Clear Fields
  ui.clearFields();
});
