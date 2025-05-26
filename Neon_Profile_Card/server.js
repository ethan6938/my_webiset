import express from 'express';
import escapeHtml from 'escape-html';
import serverless from 'serverless-http';

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Home page with profile card
app.get('/', (req, res) => {
  res.send(`
    <div class="card fade-in" style="width: 22rem;" hx-target="this" hx-swap="outerHTML">
      <div class="card-body text-center">
        <h5 class="card-title">Greg Lim</h5>
        <p class="card-text">Follower of Christ | Author...</p>
        <button class="btn btn-primary mt-3" hx-get="/user/1/edit">
          Edit Profile
        </button>
      </div>
    </div>
  `);
});

// Edit form
app.get('/user/:id/edit', (req, res) => {
  res.send(`
    <form class="fade-in" 
          hx-post="/api/user/${req.params.id}" 
          hx-target="this" 
          hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label text-info">Name</label>
        <input type="text" class="form-control" id="name" name="name" value="Greg Lim">
      </div>
      <div class="mb-3">
        <label for="bio" class="form-label text-info">Bio</label>
        <textarea class="form-control" id="bio" name="bio" rows="3">Follower of Christ | Author...</textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100 mb-2">Save Changes</button>
      <button class="btn btn-secondary w-100" hx-get="/">Cancel</button>
    </form>
  `);  
});

// This is the actual POST handler HTMX is calling!
app.post('/api/user/:id', (req, res) => {
  const name = escapeHtml(req.body.name || 'Unknown');
  const bio = escapeHtml(req.body.bio || 'No bio provided');

  res.send(`
    <div class="card fade-in" style="width: 22rem;" hx-target="this" hx-swap="outerHTML">
      <div class="card-body text-center">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${bio}</p>
        <button class="btn btn-primary mt-3" hx-get="/user/${req.params.id}/edit">
          Edit Profile
        </button>
      </div>
    </div>
  `);
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// Catch errors and show in browser
app.use((err, req, res, next) => {
  console.error('🔥 SERVER ERROR:', err.stack);
  res.status(500).send('<p style="color:red">Internal Server Error</p>');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
export default serverless(app);