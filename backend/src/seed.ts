import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './modules/users/user.model';
import { config } from './config/env';

async function seed(): Promise<void> {
  await mongoose.connect(config.mongoUri);
  console.log('Connected to MongoDB');

  const adminEmail = 'admin@traceflow.com';
  const existing = await User.findOne({ email: adminEmail });

  if (existing) {
    console.log('Admin user already exists');
  } else {
    const passwordHash = await bcrypt.hash('password123', 12);
    await User.create({
      name: 'Admin',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
    });
    console.log('Admin user created: admin@traceflow.com / password123');
  }

  const operatorEmail = 'operator@traceflow.com';
  const existingOp = await User.findOne({ email: operatorEmail });

  if (existingOp) {
    console.log('Operator user already exists');
  } else {
    const passwordHash = await bcrypt.hash('password123', 12);
    await User.create({
      name: 'Operator',
      email: operatorEmail,
      passwordHash,
      role: 'OPERATOR',
    });
    console.log('Operator user created: operator@traceflow.com / password123');
  }

  await mongoose.disconnect();
  console.log('Done');
}

seed();
