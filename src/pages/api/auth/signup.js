import { connectToDatabase } from '@/utils/mongodb';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password,name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
    });
    const id = newUser.insertedId.toString()
    const token = jwt.sign({ userId:id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ message: 'User created successfully',token:token, user: newUser });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
