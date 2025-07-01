import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let fakeUsers = []; // Simple in-memory "database"

// Sign up
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const exists = fakeUsers.find(u => u.email === email);
  if (exists) {
    return res.send(`<div class="text-danger">🚫 Email already registered!</div>`);
  }
  fakeUsers.push({ email, password });
  res.send(`<div class="text-success">✅ Signup successful! Welcome, ${email}.</div>`);
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = fakeUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.send(`<div class="text-danger">🚫 Invalid credentials</div>`);
  }
  res.send(`<div class="text-success">🚀 Logged in as ${email}</div>`);
});

// User fetcher API
app.get('/api/users', async (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://my-webiset.vercel.app/Galactic_User_Fetcher/public/index.html`);
});