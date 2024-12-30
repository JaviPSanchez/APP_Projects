import { User } from '../../../types/shared.types';

export type CreateUserData = Omit<User, 'id'>;
