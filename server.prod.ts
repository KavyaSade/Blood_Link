import express, { Request, Response } from 'express';
import { PrismaClient, Prisma, UserType } from '@prisma/client';
import cors from 'cors';
import path from 'path';

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

// Production middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  try {
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
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'A user with this email already exists' });
      }
    }
    res.status(500).json({ error: (error as Error).message || 'Failed to create user' });
  }
});

// Serve frontend in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});