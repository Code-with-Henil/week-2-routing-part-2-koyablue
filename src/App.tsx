import { ReactNode, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  NavLink,
  Navigate,
  Outlet,
} from 'react-router-dom';

import './index.css';

import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import Contact from './components/Contact';
import Recipes from './components/Recipes/Recipes';
import Recipe from './components/Recipes/Recipe';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const [isLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

const Layout = () => (
  <div>
    <nav className="flex gap-4 p-4 bg-gray-200">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <NavLink to="/products" className={({ isActive }) => isActive ? 'text-blue-500' : undefined}>Products</NavLink>
      <NavLink to="/services" className={({ isActive }) => isActive ? 'text-blue-500' : undefined}>Services</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-blue-500' : undefined}>Contact</NavLink>
      <NavLink to="/recipes" className={({ isActive }) => isActive ? 'text-blue-500' : undefined}>Recipes</NavLink>
    </nav>
    <div className="p-4">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "products", element: <Products /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "recipes", element: <Recipes />},
      { path: "recipes/:recipeId", element: <Recipe /> },
      { path: "signup", element: <Signup /> },
      { path: "welcome", element: <Welcome /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
