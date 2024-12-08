export interface IProduct {
  id?: string;
  title: string;
  price?: number;
  description?: string;
  category?: string;
  image: string;
  rating?: IRating;
}

export interface IRating {
  rate: number;
  count: number;
}

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  category: string;
  priceRange: number[];
};
