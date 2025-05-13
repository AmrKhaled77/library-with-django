function generateNextId() {
    const books = JSON.parse(localStorage.getItem('available_books')) || [];
    
    if (books.length === 0) {
        return 1; 
    }
    
    const maxId = Math.max(...books.map(book => parseInt(book.id)));
    return maxId + 1;
}

function updateDisplayedId() {
    const nextId = generateNextId();
    document.getElementById('bookId').value = nextId;
}

function addBookToLibrary(event) {
    event.preventDefault(); 

    const bookId = document.getElementById('bookId').value;
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const dateAdded = document.getElementById('dateAdded').value;
    const availability = document.getElementById('availability').value;

    if (!bookName || !author || !category || !dateAdded) {
        alert('Please fill in all required fields');
        return;
    }

    const book = {
        id: bookId,
        name: bookName,
        author: author,
        category: category,
        description: description,
        dateAdded: dateAdded,
        availability: availability
    };

    let books = JSON.parse(localStorage.getItem('available_books')) || [];

    if (books.some(b => b.id === bookId)) {
        alert('A book with this ID already exists');
        return;
    }

    books.push(book);

    localStorage.setItem('available_books', JSON.stringify(books));

    alert(`Book added successfully!\nBook ID: ${bookId}`);
    
    document.getElementById('addBookForm').reset();
    updateDisplayedId();
    
    window.location.href = 'admin_view_books.html';
}

document.addEventListener('DOMContentLoaded', function() {
    updateDisplayedId();

    const form = document.getElementById('addBookForm');
    if (form) {
        form.addEventListener('submit', addBookToLibrary);
    }
});
