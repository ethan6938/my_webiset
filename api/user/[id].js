export default function handler(req, res) {
  const { id } = req.query;

  // Support POST with _method=PUT for HTMX
  const method = req.method === 'POST' && req.body._method === 'PUT' ? 'PUT' : req.method;

  if (method === 'PUT') {
    const { name, bio } = req.body;

    // Simulate saving (replace with real DB logic if needed)
    const updatedUser = {
      id,
      name,
      bio,
    };

    // Send updated HTML back to replace the form with updated card
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

  // If GET and for edit form
  if (req.method === 'GET') {
    const html = `
      <form class="fade-in"
            hx-post="/api/user/${id}"
            hx-vals='{"_method": "PUT"}'
            hx-target="this"
            hx-swap="outerHTML">
        <div class="mb-3">
          <label for="name" class="form-label text-info">Name</label>
          <input type="text" class="form-control" id="name" name="name" value="Greg Lim" />
        </div>
        <div class="mb-3">
          <label for="bio" class="form-label text-info">Bio</label>
          <textarea class="form-control" id="bio" name="bio" rows="3">Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses</textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-2">Save Changes</button>
        <a href="/index.html" class="btn btn-secondary w-100">Cancel</a>
      </form>
    `;

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(html);
  }

  // If method is not allowed
  return res.status(405).send("Method Not Allowed");
}
