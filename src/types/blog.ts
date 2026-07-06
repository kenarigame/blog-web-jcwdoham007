export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  content: string;
  thumbnail: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
  };
}