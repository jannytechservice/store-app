import { useState } from 'react';

import { IProduct } from '@/types/product';

import HttpService from '../services/http.service';

const useProductService = () => {
  const [loading, setLoading] = useState(false);
  const productService = new HttpService(
    {
      baseURL: process.env.REACT_APP_APPLICATION_SERVICE_URL,
    },
    setLoading,
  ).service();

  const getProducts = async () => {
    return await productService.get<IProduct[]>('/products');
  };

  const getProduct = async (id: string) => {
    return await productService.get<IProduct>(`/products/${id}`);
  };

  return {
    loading,
    getProducts,
    getProduct,
  };
};

export default useProductService;
