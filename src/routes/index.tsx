import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import MainLoader from '@/common/loader/MainLoader';
import MainLayout from '@/layouts/main-layout';
import ErrorBoundaryPage from '@/pages/error-boundary-page';

export default function AppRouter() {
  const LazyHomePage = lazy(() => import('@/pages/home-page'));
  const LazyProductDetailPage = lazy(
    () => import('@/pages/product-detail-page'),
  );

  return useRoutes([
    {
      element: (
        <MainLayout>
          <Suspense fallback={<MainLoader />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      ),
      children: [
        { path: '/', element: <LazyHomePage /> },
        {
          path: 'products',
          children: [{ path: ':id', element: <LazyProductDetailPage /> }],
        },
        {
          path: '*',
          element: <ErrorBoundaryPage />,
        },
      ],
    },
  ]);
}
