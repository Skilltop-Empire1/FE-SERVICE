import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddOpex from './pages/finance/opex/addOpex/AddOpex'
import AddCapex from './pages/finance/capex/addCapex/addCapex'

// Lazy load pages
const Home = lazy(() => import('./pages/home/Home'))
const Login = lazy(() => import('./pages/login/Login'))
const SignUp = lazy(() => import('./pages/signup/SignUp'))
const AppLayout = lazy(() => import('./layouts/appLayout/AppLayout'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Employees = lazy(() => import('./pages/employees/Employees'))
const Services = lazy(() => import('./pages/services/Services'))
const Clients = lazy(() => import('./pages/clients/Clients'))
const Inventory = lazy(() => import('./pages/inventory/Inventory'))
const Finance = lazy(() => import('./pages/finance/Finance'))
const Reports = lazy(() => import('./pages/reports/Reports'))
const Communications = lazy(
  () => import('./pages/communications/Communications'),
)
const Settings = lazy(() => import('./pages/settings/Settings'))
const AddEmployee = lazy(() => import('./pages/addEmployee/AddEmployee'))
const CreateTask = lazy(() => import('./pages/createTask/CreateTask'))
const AddService = lazy(() => import('./pages/addService/AddService'))
const NotFound = lazy(() => import('./pages/notFound/NotFound'))
const Opex = lazy(() => import('./pages/finance/opex/Opex'))
const Capex = lazy(() => import('./pages/finance/capex/Capex'))
const AddClient = lazy(() => import('./pages/addClient/AddClient'))
const Task = lazy(() => import('./pages/task/Task'))
const AddInventory = lazy(() => import('./pages/addInventory/AddInventory'))
const ProtectedRoute = lazy(() => import('./utils/ProtectedRoute'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: '/app',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: 'dashboard',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'employees',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Employees />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: 'addServices',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddService />
          </Suspense>
        ),
      },
      {
        path: 'clients',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Clients />
          </Suspense>
        ),
      },
      {
        path: 'addClient',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddClient />
          </Suspense>
        ),
      },
      {
        path: 'inventories',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Inventory />
          </Suspense>
        ),
      },
      {
        path: 'addInventory',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddInventory />
          </Suspense>
        ),
      },
      {
        path: 'finance',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Finance />
          </Suspense>
        ),
      },
      {
        path: 'finance/opex',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Opex />
          </Suspense>
        ),
      },
      {
        path: 'finance/opex/add-opex',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddOpex />
          </Suspense>
        ),
      },
      {
        path: 'finance/capex',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Capex />
          </Suspense>
        ),
      },
      {
        path: 'finance/capex/add-capex',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddCapex />
          </Suspense>
        ),
      },
      {
        path: 'reports',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Reports />
          </Suspense>
        ),
      },
      {
        path: 'communication',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Communications />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: 'addEmployee',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddEmployee />
          </Suspense>
        ),
      },
      {
        path: 'task',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Task />
          </Suspense>
        ),
      },
      {
        path: 'createTask',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CreateTask />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
