import Grid2 from '@mui/material/Grid2';
import isEqual from 'lodash/isEqual';
import { useCallback, useMemo, useState } from 'react';
import { Stack } from '@mui/material';

import { useBoolean } from '@/hook/use-boolean';
import { applyFilter } from '@/utils/apply-filter';

import {
  IProduct,
  IProductFilters,
  IProductFilterValue,
} from '../../types/product';

import ProductCard from './product-card';
import SearchBar from './search-bar';
import ProductSort from './product-sort';
import ProductFilters from './product-filter';

interface ProductListProps {
  products: IProduct[];
}

const SORT_OPTIONS = [
  { value: 'titleDesc', label: 'Title: Low - High' },
  { value: 'titleAsc', label: 'Title: Low - High' },
  { value: 'categoryDesc', label: 'Category: High - Low' },
  { value: 'categoryAsc', label: 'Category: Low - High' },
];
const defaultFilters: IProductFilters = {
  rating: '',
  category: 'all',
  priceRange: [0, 200],
};
const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export default function ProductList({ products }: ProductListProps) {
  const [search, setSearch] = useState<{ query: string; results: IProduct[] }>({
    query: '',
    results: [],
  });
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('titleDesc');

  const openFilters = useBoolean();

  const handleSearch = useCallback(
    (inputValue: string) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = products.filter(
          (product) =>
            product.title.toLowerCase().indexOf(search.query.toLowerCase()) !==
            -1,
        );
        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      } else {
        setSearch((prevState) => ({
          ...prevState,
          results: products,
        }));
      }
    },
    [products, search.query],
  );
  const handleFilters = useCallback(
    (name: string, value: IProductFilterValue) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );
  const dataFiltered = applyFilter({
    inputData: products,
    filters,
    sortBy,
  });
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const canReset = !isEqual(defaultFilters, filters);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const categories = Array.from(
    new Set(
      products
        .map((product) =>
          product.category !== 'undefined' ? product.category : null,
        )
        .filter((category): category is string => category !== null),
    ),
  );
  const renderFilters = useMemo(() => {
    return (
      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
      >
        <SearchBar
          query={search.query}
          results={search.results}
          onSearch={handleSearch}
          hrefItem={(id: string) => `/products/${id}`}
        />
        <Stack direction="row" spacing={1} flexShrink={0}>
          <ProductFilters
            open={openFilters.value}
            onOpen={openFilters.onTrue}
            onClose={openFilters.onFalse}
            filters={filters}
            onFilters={handleFilters}
            canReset={canReset}
            onResetFilters={handleResetFilters}
            ratingOptions={PRODUCT_RATING_OPTIONS}
            categoryOptions={['all', ...categories]}
          />
          <ProductSort
            sort={sortBy}
            onSort={handleSortBy}
            sortOptions={SORT_OPTIONS}
          />
        </Stack>
      </Stack>
    );
  }, [
    canReset,
    categories,
    filters,
    handleFilters,
    handleResetFilters,
    handleSearch,
    handleSortBy,
    openFilters.onFalse,
    openFilters.onTrue,
    openFilters.value,
    search.query,
    search.results,
    sortBy,
  ]);

  return (
    <>
      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}
      </Stack>
      <Grid2 container spacing={2} sx={{ flexGrow: 1 }}>
        {dataFiltered.map((product: IProduct) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
