import { orderBy } from 'lodash';

import { IProduct, IProductFilters } from '@/types/product';

export const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IProduct[];
  filters: IProductFilters;
  sortBy: string;
}) => {
  const { category, priceRange, rating } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  if (sortBy === 'titleDesc') {
    inputData = orderBy(inputData, ['title'], ['desc']);
  }

  if (sortBy === 'titleAsc') {
    inputData = orderBy(inputData, ['title'], ['asc']);
  }

  if (sortBy === 'categoryDesc') {
    inputData = orderBy(inputData, ['category'], ['desc']);
  }

  if (sortBy === 'categoryAsc') {
    inputData = orderBy(inputData, ['category'], ['asc']);
  }

  if (category !== 'all') {
    inputData = inputData.filter((product) => product.category === category);
  }

  if (min !== 0 || max !== 200) {
    inputData = inputData.filter(
      (product) =>
        product.price !== undefined &&
        product.price >= min &&
        product.price <= max,
    );
  }

  if (rating) {
    inputData = inputData.filter((product) => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return (
        product.rating?.rate !== undefined &&
        product.rating.rate > convertRating(rating)
      );
    });
  }

  return inputData;
};
