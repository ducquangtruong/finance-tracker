import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import Error from "./pages/Error/Error";
import "./App.css";
import { SignedIn, UserButton } from "@clerk/clerk-react";

const router = createBrowserRouter([
  {
    element: (<>
      <div className="navbar">
        <Link to="/">Dashboard</Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Outlet />
    </>),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <Error />
      },
      {
        path: "/auth",
        element: <Auth />,
        errorElement: <Error />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
