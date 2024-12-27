import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { asyncFetchRecords } from "./slices/FinancialRecordSlice";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import Error from "./pages/Error/Error";
import NavBar from "./components/NavBar/NavBar";
import styles from "./App.module.css";
import Transactions from "./pages/Transactions/Transactions";

const router = createBrowserRouter([
  {
    element: (
      <div className={styles.appContainer}>
        <NavBar />
        <Outlet />
      </div>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "/auth",
        element: <Auth />,
        errorElement: <Error />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
        errorElement: <Error />,
      },
    ],
  },
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
