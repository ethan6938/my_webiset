export default async function handler(req, res) {
    const limit = parseInt(req.query.limit || '5', 10);
  
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
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
  
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  }
  