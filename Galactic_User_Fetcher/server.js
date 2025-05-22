const express = require('express');
const fetch = require('node-fetch'); // Or use global `fetch` in newer Node versions
const app = express();

app.use(express.static('public')); // If serving CSS/JS
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const limit = +req.query.limit || 5;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    const users = await response.json();

    const html = `
      <div class="card-neon text-start">
        <h2 class="text-center">👨‍🚀 User Profiles</h2>
        <ul class="list-group list-group-flush">
          ${users.map(user => {
            const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user.username)}`;
            return `
              <li class="list-group-item bg-transparent text-light d-flex align-items-center border-light">
                <img src="${avatarUrl}" class="user-avatar me-2" width="50" height="50" alt="Avatar of ${user.name}" />
                <div>
                  <strong>${user.name}</strong><br>
                  <small>📧 ${user.email}</small>
                </div>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
