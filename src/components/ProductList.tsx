import Grid2 from '@mui/material/Grid2';
import React, { useCallback, useMemo, useState } from 'react';
import { Stack } from '@mui/material';

import { IProduct } from '../types/product';

import ProductCard from './ProductCard';
import SearchBar from './ProductList/SearchBar';

interface ProductListProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [search, setSearch] = useState<{ query: string; results: IProduct[] }>({
    query: '',
    results: [],
  });

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
      </Stack>
    );
  }, [handleSearch, search.query, search.results]);

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
        {products.map((product: IProduct) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ProductList;
