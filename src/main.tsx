import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  NavLink,
  useParams,
  useNavigate,
  Navigate,
  Outlet,
} from 'react-router-dom';

import './index.css';

const Home = () => (
  <div>
    <h2>Home Page</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About Page</h2>
  </div>
);

const Products = () => (
  <div>
    <h2>Products Page</h2>
  </div>
);

const Services = () => (
  <div>
    <h2>Services Page</h2>
  </div>
);

// Contact コンポーネント
const Contact = () => (
  <div>
    <h2>Contact Page</h2>
  </div>
);

type RecipeData = {
  [key: string]: {
    title: string;
    content: string;
  };
};

const recipeData: RecipeData = {
  '1': { title: 'recipe1', content: 'recipe content 1' },
  '2': { title: 'recipe2', content: 'recipe content 2' },
};

const Recipe = () => {
  const { recipeId } = useParams<'recipeId'>();

  const recipe = recipeData[recipeId!];

  if (!recipe) {
    return <div>レシピが見つかりません。</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.content}</p>
    </div>
  );
};
const Recipes = () => (
  <div>
    <h2>レシピ一覧</h2>
    <ul>
      {Object.entries(recipeData).map(([id, { title }]) => (
        <li key={id}>
          <Link to={`/recipes/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTimeout(() => {
      navigate('/welcome');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name: <input type="text" name="name" />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

// Welcome
const Welcome = () => (
  <div>
    <h2>Welcome! Thank you for signing up.</h2>
  </div>
);

// Login
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

const Dashboard = () => {
  const [isLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
