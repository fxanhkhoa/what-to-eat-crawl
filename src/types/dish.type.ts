import { BaseType, MultiLanguage } from './base.type';

export type IngredientsInDish = {
  quantity: number;
  slug: string;
  note?: string;
};

export type CreateDishDto = {
  slug: string;
  title: MultiLanguage<string>[];
  shortDescription: MultiLanguage<string>[];
  content: MultiLanguage<string>[];
  tags: string[];
  preparationTime?: number;
  cookingTime?: number;
  difficultLevel?: string;
  mealCategories: string[];
  ingredientCategories: string[];
  thumbnail?: string;
  videos: string[];
  ingredients: IngredientsInDish[];
  relatedDishes: string[];
  labels: string[];
};

export type Dish = {
  slug: string;
  title: MultiLanguage<string>[];
  shortDescription: MultiLanguage<string>[];
  content: MultiLanguage<string>[];
  tags: string[];
  preparationTime?: number;
  cookingTime?: number;
  difficultLevel?: string;
  mealCategories: string[];
  ingredientCategories: string[];
  thumbnail?: string;
  videos: string[];
  ingredients: IngredientsInDish[];
  relatedDishes: string[];
  labels: string[];
} & BaseType;
