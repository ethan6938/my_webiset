export default function handler(req, res) {
  const id = req.query.id;

  res.status(200).send(`
    <form class="fade-in" method="POST" 
          hx-post="/api/user/${id}" 
          hx-target="this" 
          hx-swap="outerHTML">
      <input type="hidden" name="_method" value="PUT">

      <div class="mb-3">
        <label for="name" class="form-label text-info">Name</label>
        <input type="text" class="form-control" id="name" name="name" value="Greg Lim">
      </div>
      <div class="mb-3">
        <label for="bio" class="form-label text-info">Bio</label>
        <textarea class="form-control" id="bio" name="bio" rows="3">Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses</textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100 mb-2">Save Changes</button>
      <button class="btn btn-primary w-100" hx-get="/index.html">Cancel</button>
    </form>
  `);
}
