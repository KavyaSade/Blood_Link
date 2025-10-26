import express, { Request, Response } from 'express';
import { PrismaClient, Prisma, UserType } from '@prisma/client';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CreateUserBody {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  bloodType?: string;
  userType: UserType;
}

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    console.log('GET /api/users');
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a new user
app.post('/api/users', async (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  try {
    console.log('POST /api/users', req.body);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        bloodType: req.body.bloodType,
        userType: req.body.userType,
      },
    });
    console.log('Created user id=', user.id);
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    // Handle known Prisma errors for better client feedback
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint failed
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'A user with this email already exists' });
      }
    }
    // Default
    res.status(500).json({ error: (error as Error).message || 'Failed to create user' });
  }
});

// Delete a user
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    console.log('DELETE /api/users/:id', id);
    const user = await prisma.user.delete({
      where: { id },
    });
    console.log('Deleted user id=', user.id);
    res.json(user);
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Record not found
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'User not found' });
      }
    }
    res.status(500).json({ error: (error as Error).message || 'Failed to delete user' });
  }
});

const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});