function displayBorrowedBooks() {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowed_books')) || [];
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    if (borrowedBooks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" style="text-align: center;">No borrowed books found</td>';
        tableBody.appendChild(row);
        return;
    }

    borrowedBooks.forEach(book => {
        const borrowDate = new Date(book.borrowDate);
        const dueDate = new Date(book.dueDate);
        const today = new Date();
        const isOverdue = today > dueDate;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${borrowDate.toLocaleDateString()}</td>
            <td>${dueDate.toLocaleDateString()}</td>
            <td class="${isOverdue ? 'overdue' : ''}">
                ${isOverdue ? 'Overdue' : 'Active'}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayBorrowedBooks();
});

