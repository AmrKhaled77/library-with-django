function displayBooks() {
    const books = JSON.parse(localStorage.getItem('available_books')) || [];
    const tableBody = document.querySelector('table tbody');
    
    const headerRow = document.querySelector('table tr');
    tableBody.innerHTML = '';
    if (headerRow) {
        tableBody.appendChild(headerRow);
    }

    if (books.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" style="text-align: center;">No books found</td>';
        tableBody.appendChild(row);
        return;
    }

    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.availability}</td>
            <td>
                <a href="admin_edit_book.html?id=${book.id}"><i class="fas fa-edit"></i> Edit</a> |
                <a href="#" class="delete-book" data-book-id="${book.id}"><i class="fas fa-trash"></i> Delete</a>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.delete-book').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookId = this.getAttribute('data-book-id');
            deleteBook(bookId);
        });
    });
}

function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        let books = JSON.parse(localStorage.getItem('available_books')) || [];
        books = books.filter(book => book.id !== bookId);
        localStorage.setItem('available_books', JSON.stringify(books));
        displayBooks();
        alert('Book deleted successfully!');
    }
}

function searchBooks() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    const books = JSON.parse(localStorage.getItem('available_books')) || [];
    const filteredBooks = books.filter(book => 
        book.name.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.id.toLowerCase().includes(searchTerm)
    );

    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    const headerRow = document.querySelector('table tr');
    if (headerRow) {
        tableBody.appendChild(headerRow);
    }

    if (filteredBooks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" style="text-align: center;">No matching books found</td>';
        tableBody.appendChild(row);
        return;
    }

    filteredBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.availability}</td>
            <td>
                <a href="admin_edit_book.html?id=${book.id}"><i class="fas fa-edit"></i> Edit</a> |
                <a href="#" class="delete-book" data-book-id="${book.id}"><i class="fas fa-trash"></i> Delete</a>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.delete-book').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookId = this.getAttribute('data-book-id');
            deleteBook(bookId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayBooks();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchBooks);
    }
});
