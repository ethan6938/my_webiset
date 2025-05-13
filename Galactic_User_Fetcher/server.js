import express from 'express';
import fetch from 'node-fetch'; // ✅ Needed if using Node < 18

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET /users - Fetch and render user data as HTML
app.get('/users', async (req, res) => {
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
              <img src="${avatarUrl}" class="user-avatar" alt="Avatar of ${user.name}" />
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
});

// Root route
app.get('/', (req, res) => {
  res.send('🌍 Hello from Galactic User Fetcher backend!');
});

// Start the server
app.listen(3000, () => {
  console.log('🚀 Server ready at http://localhost:3000');
});
