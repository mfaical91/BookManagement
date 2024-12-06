const API_URL = 'http://localhost:3000';

let isAdmin = false;

document.addEventListener('DOMContentLoaded', () => {
    const loginUserBtn = document.getElementById('loginUser');
    const loginAdminBtn = document.getElementById('loginAdmin');
    const logoutBtn = document.getElementById('logout');
    const adminControls = document.getElementById('adminControls');
    const booksTableBody = document.querySelector('#booksTable tbody');
    const addBookForm = document.getElementById('addBookForm');

    // Charger les livres
    const loadBooks = async () => {
        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();
        booksTableBody.innerHTML = '';
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.text}</td>
                <td>
                    ${isAdmin ? `<button class=\"delete\" data-id=\"${book.id}\">Supprimer</button>` : ''}
                </td>
            `;
            booksTableBody.appendChild(row);
        });

        if (isAdmin) {
            document.querySelectorAll('.delete').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    await fetch(`${API_URL}/books/${id}`, { method: 'DELETE' });
                    loadBooks();
                });
            });
        }
    };

    // Gestion des logins
    loginUserBtn.addEventListener('click', () => {
        isAdmin = false;
        adminControls.style.display = 'none';
        loginUserBtn.style.display = 'none';
        loginAdminBtn.style.display = 'none';
        logoutBtn.style.display = 'inline';
        loadBooks();
    });

    loginAdminBtn.addEventListener('click', () => {
        isAdmin = true;
        adminControls.style.display = 'block';
        loginUserBtn.style.display = 'none';
        loginAdminBtn.style.display = 'none';
        logoutBtn.style.display = 'inline';
        loadBooks();
    });

    logoutBtn.addEventListener('click', () => {
        isAdmin = false;
        adminControls.style.display = 'none';
        loginUserBtn.style.display = 'inline';
        loginAdminBtn.style.display = 'inline';
        logoutBtn.style.display = 'none';
        booksTableBody.innerHTML = '';
    });

    // Ajout d'un livre
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const text = document.getElementById('text').value;
        await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, text }),
        });
        addBookForm.reset();
        loadBooks();
    });

    // Charger initialement
    loadBooks();
});
