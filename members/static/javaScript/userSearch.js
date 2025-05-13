const form = document.querySelector("form");
const button = document.querySelector("button");
const title = document.getElementById("search-title");
const author = document.getElementById("search-author");
const category = document.getElementById("search-category");
const table = document.querySelector("table");
const rows = table.querySelectorAll("tr");
const data = JSON.parse(localStorage.getItem("available_books"));

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const rows = table.querySelectorAll("tr");  // Re-query after clearing
    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }

    // Search by title
    if (title.value != "") {
        data.forEach((book) => {
            if (book.title === title.value) {
                const row = document.createElement("tr");

                const td0 = document.createElement("td");
                td0.textContent = book.id;

                const td1 = document.createElement("td");
                td1.textContent = book.title;

                const td2 = document.createElement("td");
                td2.textContent = book.author;

                const td3 = document.createElement("td");
                td3.textContent = book.category;
                
                const td4 = document.createElement("td");
                td4.textContent = "Available";

                row.appendChild(td0);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);

                table.appendChild(row);
            }
        });
    }
    // Search by author
    if (author.value != "") {
        data.forEach((book) => {
            if (book.author === author.value) {
                const row = document.createElement("tr");
                
                const td0 = document.createElement("td");
                td0.textContent = book.id;
                
                const td1 = document.createElement("td");
                td1.textContent = book.title;

                const td2 = document.createElement("td");
                td2.textContent = book.author;

                const td3 = document.createElement("td");
                td3.textContent = book.category;
                
                const td4 = document.createElement("td");
                td4.textContent = "Available";
                
                row.appendChild(td0);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);

                table.appendChild(row);
            }
        });
    }
    // Search by category
     if (category.value != "") {
        data.forEach((book) => {
            if (book.category === category.value) {
                const row = document.createElement("tr");

                const td0 = document.createElement("td");
                td0.textContent = book.id;

                const td1 = document.createElement("td");
                td1.textContent = book.title;

                const td2 = document.createElement("td");
                td2.textContent = book.author;

                const td3 = document.createElement("td");
                td3.textContent = book.category;
                
                const td4 = document.createElement("td");
                td4.textContent = "Available";
                
                row.appendChild(td0);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);

                table.appendChild(row);
            }
        });
    }
});