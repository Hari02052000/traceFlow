import { User, IUser } from './user.model';

export class UserRepository {
  async create(data: { name: string; email: string; passwordHash: string; role?: 'ADMIN' | 'OPERATOR' }): Promise<IUser> {
    return User.create(data);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+passwordHash');
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }
}

export const userRepository = new UserRepository();
