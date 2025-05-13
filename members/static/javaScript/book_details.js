const books = JSON.parse(localStorage.getItem('available_books')) || [];
const selectedBookId = localStorage.getItem('selected_book_id');

const book = books.find(b => b.id === selectedBookId);

if (book) {
    document.getElementById('book-title').textContent = book.title;
    document.getElementById('book-id').textContent = book.id;
    document.getElementById('book-author').textContent = book.author;
    document.getElementById('book-category').textContent = book.category;
    document.getElementById('book-description').textContent = book.description || "No description available.";
    document.getElementById('book-availability').textContent = book.isAvailable ? "Available" : "Not Available";
} else {
    // Book not found
    document.querySelector('.card').innerHTML = "<h2>Book not found!</h2>";
}
