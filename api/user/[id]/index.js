import escapeHtml from 'escape-html';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  try {
    const method = req.body?._method || req.method;
    console.log('➡️ METHOD:', method);
    console.log('📦 BODY:', req.body);

    if (method !== 'PUT') {
      return res.status(405).send('Method Not Allowed');
    }

    const { name = 'Unknown', bio = 'No bio provided' } = req.body;

    return res.status(200).send(`
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
    console.error('💥 ERROR:', err);
    return res.status(500).send('Internal Server Error');
  }
}
