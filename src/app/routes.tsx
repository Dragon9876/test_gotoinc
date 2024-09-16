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
    if(context.params?.userId) {
      throw redirect({ to: `/${context.params?.userId || 1}/requests` });
    } else {
      throw redirect({ to: `/requests` });
    }
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

// const requestsRoute = createRoute({
//   getParentRoute: () => indexRoute,
//   path: '/requests',
//   component: () => <RequestsPage />
// })

const createPackageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId/create',
  component: () => <CreatePage />,
  loader: (context) => {
    // if (!context.params?.userId) {
    //   throw redirect({
    //     to: '/requests',
    //   })
    // }
  },
})

const createOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId/create/order',
  component: () => <CreateOrderPage />,
  loader: (context) => {
    // if (!context.params?.userId) {
    //   throw redirect({
    //     to: '/requests',
    //   })
    // }
  },
})

const createDeliverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$userId/create/deliver',
  component: () => <CreateDeliverPage />,
  loader: (context) => {
    // if (!context.params?.userId) {
    //   throw redirect({
    //     to: '/requests',
    //   })
    // }
  },
})

export const routeTree = rootRoute.addChildren([
    defaultRoute,
    allRequestsRoute,
    indexRoute,
    createPackageRoute,
    createOrderRoute,
    createDeliverRoute,
    requestsRoute,
    // requestsRoute,
    // notFoundRoute,
    // indexRoute.addChildren([
    //     createOrderRoute,
    //     createDeliverRoute,
    // ]),
  ])


