import { useState } from 'react';

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
    return await productService.get<any>('/products');
  };

  return {
    loading,
    getProducts,
  };
};

export default useProductService;
