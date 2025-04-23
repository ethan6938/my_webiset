const escapeHtml = require('escape-html');

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { name = 'Unknown', bio = 'No bio provided' } = req.body;

    res.status(200).send(`
      <div class="card fade-in" style="width: 22rem;" hx-target="this" hx-swap="outerHTML">
        <div class="card-body text-center">
          <h5 class="card-title">${escapeHtml(name)}</h5>
          <p class="card-text">${escapeHtml(bio)}</p>
          <button class="btn btn-primary mt-3" hx-get="/api/user/1/edit">
            Edit Profile
          </button>
        </div>
      </div>
    `);
  } catch (err) {
    console.error('💥 Error:', err);
    res.status(500).send('Internal Server Error');
  }
};
