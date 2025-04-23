export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  try {
    console.log('🧪 Incoming Method:', req.method);
    console.log('🧪 Body:', req.body);

    res.status(200).send(`
      <pre style="color: lime; background: #111; padding: 1rem;">
        METHOD: ${req.method}
        BODY: ${JSON.stringify(req.body, null, 2)}
      </pre>
    `);
  } catch (err) {
    console.error('🔥 ERROR:', err);
    res.status(500).send('Internal Server Error');
  }
}
