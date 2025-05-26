// File: /api/user/[id].js

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'PUT') {
    try {
      // Mock update logic
      const updatedUser = {
        id,
        name: req.body.name,
        email: req.body.email,
      };

      res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }

  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
