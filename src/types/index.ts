export interface NavItem {
  title: string;
  href?: string ;
  description?: string;
}
export interface NavItemWithChildren extends NavItem {
  card?: NavItemWithChildren[];
  menu?: NavItemWithChildren[];
}
export type MainNavItem = NavItemWithChildren;

export type ProductImage = {
  id: number;   // Changed from string to number based on your data output
  path: string;
};

export type Product = {
  id: number;   // Changed from string to number based on your data output
  name: string;
  description: string;
  price: string; // Note: Your data shows "250" as a string in quotes
  images: ProductImage[]; // This MUST be an array
  categoryId: string;
  rating: number;
  inventory: number;
  status: string;
  discount: number;
};

export type Post = {
  id: number;
  user: {
    fullName:string
  };
  title: string;
  content: string;
  image: string;
  body:string;
  updated_at:string;
  tags: string[];
}
export type types = {
  id: string;
  label: string;
}

export type categories = {
  id: string;
  label: string;
}

export type filterList = {
  types: types[];
  categories: categories[];
}

export type user = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  imageUrl: string;
}

export type cart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    id: string;
    name: string;
    url: string;
  };
  category: string;
  subcategory: string;
}

export type Status = "otp" | "confirm" | "verify" | "reset" | "none";