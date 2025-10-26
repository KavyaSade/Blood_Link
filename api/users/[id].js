import prisma from '../_prisma.js';

export default async function handler(req, res) {
  try {
    const id = req.query?.id || getIdFromUrl(req.url);

    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    if (req.method === 'DELETE') {
      try {
        const deleted = await prisma.user.delete({ where: { id } });
        return res.status(200).json(deleted);
      } catch (err) {
        // Prisma 'not found' error
        console.error('Delete user error:', err);
        return res.status(404).json({ error: 'User not found' });
      }
    }

    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('API /api/users/[id] error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function getIdFromUrl(url) {
  try {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1] || null;
  } catch (e) {
    return null;
  }
}
