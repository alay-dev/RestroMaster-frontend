export interface Dish {
  category: string;
  description: string | null;
  price: string;
  image: string[];
  name: string;
  id: string;
}

export type Category =
  | "All"
  | "Starter"
  | "Main Course"
  | "Side Dish"
  | "Bevereges";
