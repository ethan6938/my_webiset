import express from 'express';
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Users route with error handling
app.get('/users', async (req, res) => {
  try {
    const limit = +req.query.limit || 5;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
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
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send(`
      <div class="alert alert-danger">
        <h4>❌ Error loading users</h4>
        <p>Unable to fetch user data. Please try again later.</p>
      </div>
    `);
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Galactic User Fetcher</title>
      <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { background: #1a1a2e; color: #eee; }
        .card-neon { 
          border: 2px solid #00d4ff; 
          border-radius: 10px; 
          padding: 20px; 
          background: rgba(0, 212, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }
        .user-avatar { 
          width: 50px; 
          height: 50px; 
          margin-right: 15px; 
          border-radius: 50%;
        }
      </style>
    </head>
    <body class="container mt-5">
      <h1 class="text-center mb-4">🚀 Galactic User Fetcher</h1>
      <div class="text-center mb-4">
        <button class="btn btn-primary" hx-get="/users" hx-target="#users-container">
          Load Users
        </button>
        <button class="btn btn-secondary" hx-get="/users?limit=10" hx-target="#users-container">
          Load 10 Users
        </button>
      </div>
      <div id="users-container"></div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  • http://localhost:${PORT}/`);
  console.log(`  • http://localhost:${PORT}/users`);
});