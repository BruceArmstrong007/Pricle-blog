import { User } from "../user/user.model";

export interface Post {
  _id: string;
  title: string;
  description: string;
  tags: Tags[];
  content: string;
  author: Omit<User,'verified'>;
  createdAt: string;
  updatedAt: string;
}


export interface Tags {
  _id: string,
  name: string
}
