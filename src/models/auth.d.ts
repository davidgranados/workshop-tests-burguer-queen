export type UserRole = 'admin' | 'waiter' | 'kitchen';

export type User = {
  email: string;
  role: UserRole;
  id: number;
}

export type Session = {
  token: string | null;
  user: User | null;
}

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type LoginService = (email: string, password: string) => Promise<LoginResponse>;
