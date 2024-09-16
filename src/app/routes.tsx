import { RequestsPage, CreatePage, CreateDeliverPage, CreateOrderPage } from '@/pages'
import { createRootRoute, createRoute, Outlet, redirect } from '@tanstack/react-router'

const rootRoute = createRootRoute({})

const defaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/requests' });
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId',
  component: () => {
    return <Outlet />
  },
  beforeLoad: (context) => {
    throw redirect({ to: `/${context.params?.userId || 1}/requests` });
  },
})

const requestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId/requests',
  component: () => <RequestsPage />,
});


const allRequestsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/requests',
    component: () => <RequestsPage />
})

const createPackageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId/create',
  component: () => <CreatePage />,
})

const createOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId/create/order',
  component: () => <CreateOrderPage />,
})

const createDeliverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId/create/deliver',
  component: () => <CreateDeliverPage />,
})

export const routeTree = rootRoute.addChildren([
    defaultRoute,
    allRequestsRoute,
    indexRoute,
    createPackageRoute,
    createOrderRoute,
    createDeliverRoute,
    requestsRoute,
  ])


