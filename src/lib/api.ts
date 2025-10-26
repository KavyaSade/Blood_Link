import { db } from '@/lib/db';
import { UserType } from '@prisma/client';

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { users };
  } catch (error) {
    return { error: 'Failed to fetch users' };
  }
}

export async function createUser({
  email,
  name,
  phone,
  address,
  bloodType,
  userType,
}: {
  email: string;
  name: string;
  phone?: string;
  address?: string;
  bloodType?: string;
  userType: UserType;
}) {
  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        phone,
        address,
        bloodType,
        userType,
      },
    });
    return { user };
  } catch (error) {
    return { error: 'Failed to create user' };
  }
}