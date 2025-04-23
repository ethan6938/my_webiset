const escapeHtml = require('escape-html');


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default function handler(req, res) {
  // Check for the correct HTTP method
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // If the method is POST, log that the function is operational
    console.log('Serverless function is operational.');

    const { name = 'Unknown', bio = 'No bio provided' } = req.body;

    // Respond with the updated content
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
}
