// pages/api/auth/me.js

import { authenticateToken } from '@/utils/auth'; // Function to verify JWT
import { connectToDatabase } from '@/utils/mongodb';
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {userId,email} = decoded
    const { db } = await connectToDatabase();
    const user =  await db.collection('users').findOne({ email })
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
