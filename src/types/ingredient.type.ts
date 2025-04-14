import { BaseType, MultiLanguage } from './base.type';

export type Ingredient = {
  slug: string;
  title: MultiLanguage<string>[];
  measure?: string;
  calories?: number;
  carbohydrate?: number;
  fat?: number;
  ingredientCategory: string[];
  weight?: number;
  protein?: number;
  cholesterol?: number;
  sodium?: number;
  images: string[];
} & BaseType;

export type CreateIngredientDto = {
  slug: string;
  title: MultiLanguage<string>[];
  measure?: string;
  calories?: number;
  carbohydrate?: number;
  fat?: number;
  ingredientCategory: string[];
  weight?: number;
  protein?: number;
  cholesterol?: number;
  sodium?: number;
  images: string[];
};
