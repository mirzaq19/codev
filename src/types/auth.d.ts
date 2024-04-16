export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
