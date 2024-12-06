import { lazy } from 'react';

interface Route {
  path: string;
  component: React.FC;
}

const LazyHomePage = lazy(() => import('../pages/Home'));
const LazyProductDetailPage = lazy(() => import('../pages/ProductDetail'));

const routesConfig: Route[] = [
  {
    path: '/',
    component: LazyHomePage,
  },
  {
    path: '/products/:id',
    component: LazyProductDetailPage,
  },
];

export default routesConfig;
