// api/user/[id].js
import escapeHtml from 'escape-html';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Example: Fetch and return user data by id
    res.status(200).json({ id, name: 'Demo User' });
  } else if (req.method === 'PUT') {
    const name = escapeHtml(req.body.name || 'Unknown');
    const bio = escapeHtml(req.body.bio || 'No bio provided');
    // Save logic here...

    res.status(200).send(`
      <div class="card fade-in" style="width: 22rem;">
        <div class="card-body text-center">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${bio}</p>
          <button class="btn btn-primary mt-3" hx-get="/user/${id}/edit">Edit Profile</button>
        </div>
      </div>
    `);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
