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
    // Successful Message
    ui.alertMsg('Book was added - check it out!', 'success');
    // Add Book To List
    ui.addBookToList(book);
    // Clear Fields
    ui.clearFields();
  }
});

// Delete Book Elment
document.getElementById('book-list').addEventListener('click', (e) => {
  e.preventDefault();
  let ui = new UI();
  ui.deleteBook(e.target);
  ui.alertMsg('Book was removed successfully!', 'success');
});
