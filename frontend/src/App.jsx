import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { asyncFetchRecords } from "./slices/FinancialRecordSlice";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import Error from "./pages/Error/Error";
import "./App.css";

const router = createBrowserRouter([
  {
    element: (<div className="app-container">
      <div className="navbar">
        <Link to="/">Dashboard</Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Outlet />
    </div>),
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
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(asyncFetchRecords(user?.id));
  }, [user]);

  return <RouterProvider router={router} />;
}

export default App;
