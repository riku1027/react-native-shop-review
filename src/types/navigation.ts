import { Shop } from "./shop";

export type RootStackParamList = {
  Home: undefined;
  Shop: { shop: Shop };
  User: { user: undefined };
  CreateReview: { shop: Shop };
};
