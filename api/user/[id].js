export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, bio } = req.body;

    // Simulate saving (you could use a DB here)
    const updatedUser = {
      id,
      name,
      bio,
    };

    // Send updated HTML back
    const html = `
      <div class="card fade-in" style="width: 22rem;" hx-target="this" hx-swap="outerHTML">
        <div class="card-body text-center">
          <h5 class="card-title">${updatedUser.name}</h5>
          <p class="card-text">${updatedUser.bio}</p>
          <button class="btn btn-primary mt-3" hx-get="/api/user/${id}/edit">
            Edit Profile
          </button>
        </div>
      </div>
    `;

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(html);
  }

  // If method is not allowed
  return res.status(405).send("Method Not Allowed");
}
