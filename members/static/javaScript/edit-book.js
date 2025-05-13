function loadBookData() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (!bookId) {
        alert('No book ID provided');
        window.location.href = 'admin_view_books.html';
        return;
    }

    const books = JSON.parse(localStorage.getItem('available_books')) || [];
    const book = books.find(b => b.id === bookId);

    if (!book) {

        alert('Book not found');
        window.location.href = 'admin_view_books.html';
        return;
    }

    document.getElementById('book-id').value = book.id;
    document.getElementById('book-name').value = book.name;
    document.getElementById('author').value = book.author;
    document.getElementById('category').value = book.category;
    document.getElementById('description').value = book.description;
    document.getElementById('date-added').value = book.dateAdded;
    document.getElementById('availability').value = book.availability;
}

function saveBookChanges(event) {

    event.preventDefault(); 
    const bookId = document.getElementById('book-id').value;
    const bookName = document.getElementById('book-name').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const dateAdded = document.getElementById('date-added').value;
    const availability = document.getElementById('availability').value;

    if (!bookId || !bookName || !author || !category || !dateAdded) {
        alert('Please fill in all required fields');
        return;
    }

    let books = JSON.parse(localStorage.getItem('available_books')) || [];

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        alert('Book not found');
        return;
    }

    books[bookIndex] = {

        id: bookId,
        name: bookName,
        author: author,
        category: category,
        description: description,
        dateAdded: dateAdded,
        availability: availability
    };

    localStorage.setItem('available_books', JSON.stringify(books));

    alert('Book updated successfully!');
    
    window.location.href = 'admin_view_books.html';
}

document.addEventListener('DOMContentLoaded', function() {

    loadBookData();
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', saveBookChanges);
    }
}
);
