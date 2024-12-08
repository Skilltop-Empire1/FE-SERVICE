import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import AppLayout from './layouts/appLayout/AppLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Employees from './pages/employees/Employees'
import Services from './pages/services/Services'
import Clients from './pages/clients/Clients'
import Inventory from './pages/inventory/Inventory'
import Finance from './pages/finance/Finance'
import Reports from './pages/reports/Reports'
import Communications from './pages/communications/Communications'
import Settings from './pages/settings/Settings'
import AddEmployee from './pages/addEmployee/AddEmployee'
import CreateTask from './pages/createTask/CreateTask'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'clients',
        element: <Clients />,
      },
      {
        path: 'inventories',
        element: <Inventory />,
      },
      {
        path: 'finance',
        element: <Finance />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'communication',
        element: <Communications />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'addEmployee',
        element: <AddEmployee />,
      },
      {
        path: 'createTask',
        element: <CreateTask />,
      },
    ],
  },
  {
    path: '/*',
    element: <h1>Page Not Found</h1>,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
