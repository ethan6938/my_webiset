import escapeHtml from 'escape-html';

export const config = {
  api: {
    bodyParser: true, // Vercel parses JSON and form data automatically
  },
};

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.status(405).send('Method Not Allowed');
    return;
  }

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
}
