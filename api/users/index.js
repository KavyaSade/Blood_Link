import prisma from '../_prisma.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(users);
    }

    if (req.method === 'POST') {
      const body = req.body || (await getRequestBody(req));
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          phone: body.phone,
          address: body.address,
          bloodType: body.bloodType,
          userType: body.userType,
        },
      });
      return res.status(201).json(user);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('API /api/users error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}
