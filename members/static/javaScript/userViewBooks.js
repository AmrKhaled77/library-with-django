// Initialize test books if none exist
function initializeTestBooks() {
    const availableBooks = JSON.parse(localStorage.getItem('available_books')) || [];
    if (availableBooks.length === 0) {
        const testBooks = [
            {
                id: '001',
                name: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                category: 'Fiction',
                description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
                availability: 'Available',
                isbn: '9780743273565',
                publisher: 'Scribner',
                year: '1925'
            },
            {
                id: '002',
                name: 'Sapiens',
                author: 'Yuval Noah Harari',
                category: 'Non-Fiction',
                description: 'A brief history of humankind, exploring the ways in which biology and history have defined us.',
                availability: 'Available',
                isbn: '9780062316097',
                publisher: 'Harper',
                year: '2014'
            },
            {
                id: '003',
                name: 'A Brief History of Time',
                author: 'Stephen Hawking',
                category: 'Science',
                description: 'An exploration of cosmology and the nature of time and the universe.',
                availability: 'Available',
                isbn: '9780553380163',
                publisher: 'Bantam',
                year: '1988'
            }
        ];
        console.log('Initializing test books:', testBooks); // Debug log
        localStorage.setItem('available_books', JSON.stringify(testBooks));
    }
}

function displayBooks() {
    // Initialize test books if needed
    initializeTestBooks();
    
    const books = JSON.parse(localStorage.getItem('available_books')) || [];
    console.log('Displaying books:', books); // Debug log
    const tableBody = document.querySelector('table tbody');
    
    // Clear existing rows except header
    const headerRow = document.querySelector('table thead tr');
    tableBody.innerHTML = '';
    
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
                ${book.availability === 'Available' ? 
                    `<a href="borrow_book.html?id=${book.id}" class="btn-borrow"><i class="fas fa-book"></i> Borrow</a>` :
                    `<span class="btn-disabled"><i class="fas fa-book"></i> Borrow</span>`
                }
            </td>
        `;
        tableBody.appendChild(row);
    });
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
    const headerRow = document.querySelector('table thead tr');
    if (headerRow) {
        tableBody.appendChild(headerRow.cloneNode(true));
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
                ${book.availability === 'Available' ? 
                    `<a href="borrow_book.html?id=${book.id}" class="btn-borrow"><i class="fas fa-book"></i> Borrow</a>` :
                    `<span class="btn-disabled"><i class="fas fa-book"></i> Borrow</span>`
                }
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function handleBorrow() {
    const bookId = document.getElementById('bookId').value.trim();
    if (!bookId) {
        alert('Please enter a book ID');
        return;
    }

    // Get books from localStorage
    const books = JSON.parse(localStorage.getItem('available_books')) || [];
    const book = books.find(b => b.id === bookId);

    if (!book) {
        alert('Book not found. Please check the ID and try again.');
        return;
    }

    if (book.availability !== 'Available') {
        alert('This book is not available for borrowing.');
        return;
    }

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to borrow books.');
        window.location.href = '../index.html';
        return;
    }

    // Update book availability
    book.availability = 'Not Available';
    localStorage.setItem('available_books', JSON.stringify(books));

    // Add to borrowed books
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowed_books')) || [];
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 14);

    const borrowRecord = {
        id: book.id,
        name: book.name,
        author: book.author,
        category: book.category,
        description: book.description,
        borrowedBy: currentUser.username,
        borrowDate: today.toISOString(),
        dueDate: dueDate.toISOString(),
        status: 'Borrowed'
    };

    borrowedBooks.push(borrowRecord);
    localStorage.setItem('borrowed_books', JSON.stringify(borrowedBooks));

    alert('Book borrowed successfully!');
    displayBooks(); // Refresh the table
    document.getElementById('bookId').value = ''; // Clear the input
}

document.addEventListener('DOMContentLoaded', function() {
    displayBooks();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchBooks);
    }

    const borrowForm = document.getElementById('borrow-form');
    if (borrowForm) {
        borrowForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBorrow();
        });
    }
});
