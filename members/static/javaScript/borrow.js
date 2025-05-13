function generateNextId() {
    const books = JSON.parse(localStorage.getItem('borrowed_books')) || [];
    
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

    const bookId = document.getElementById('bookId').textContent;
    const bookName = document.getElementById('bookName').textContent;
    const author = document.getElementById('authorName').textContent;
    const category = document.getElementById('category').textContent;
    const description = document.getElementById('description').textContent;
    const dateAdded = document.getElementById('dateAdded').textContent;
    const availability = document.getElementById('availability').textContent;

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

    let books = JSON.parse(localStorage.getItem('borrowed_books')) || [];

    if (books.some(b => b.id === bookId)) {
        alert('A book with this ID already exists');
        window.location.href = 'user_borrowed_books.html';
        return;
    }

    books.push(book);

    localStorage.setItem('borrowed_books', JSON.stringify(books));

    alert(`Book added successfully!\nBook ID: ${bookId}`);
    updateDisplayedId();
    
    window.location.href = 'user_borrowed_books.html';
}

function borrowBook(bookId) {
    let availableBooks = JSON.parse(localStorage.getItem('available_books')) || [];
    console.log('Available books:', availableBooks);

    const bookIndex = availableBooks.findIndex(b => b.id === bookId);
    console.log('Book index:', bookIndex);

    if (bookIndex === -1) {
        alert('Book not found. Please check the ID and try again.');
        return false;
    }

    if (availableBooks[bookIndex].availability !== 'Available') {
        alert('This book is not available for borrowing.');
        return false;
    }

    availableBooks[bookIndex].availability = 'Not Available';
    localStorage.setItem('available_books', JSON.stringify(availableBooks));

    let borrowedBooks = JSON.parse(localStorage.getItem('borrowed_books')) || [];
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 14);

    const borrowRecord = {
        id: availableBooks[bookIndex].id,
        name: availableBooks[bookIndex].name,
        author: availableBooks[bookIndex].author,
        category: availableBooks[bookIndex].category,
        description: availableBooks[bookIndex].description,
        borrowDate: today.toISOString(),
        dueDate: dueDate.toISOString(),
        status: 'Borrowed'
    };

    borrowedBooks.push(borrowRecord);
    localStorage.setItem('borrowed_books', JSON.stringify(borrowedBooks));

    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    if (bookId) {
        document.getElementById('bookId').value = bookId;
        document.getElementById('bookId').readOnly = true;
    }

    const borrowForm = document.getElementById('borrow-form');
    if (borrowForm) {
        borrowForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bookId = document.getElementById('bookId').value.trim();
            if (!bookId) {
                alert('Please enter a book ID');
                return;
            }

            if (borrowBook(bookId)) {
                alert('Book borrowed successfully!');
                window.location.href = 'user_borrowed_books.html';
            }
        });
    }
});

