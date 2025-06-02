export interface WindowSize {
  width: number;
  height: number;
}

export interface IUser {
  _id?: string;
  email: string;
  fullName: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export type Product = {
  id: string;
  title: string;
  price: number;
  gallery?: string[];
  description?: string;
  createdAt?: string;
  [key: string]: any;
};

export type BlogPost = {
  id: string;
  title: string;
  content?: string;
  createdAt?: string;
  [key: string]: any;
};
