import { createBrowserRouter, RouterProvider } from "react-router-dom";

import classes from "./App.module.css";
import RootPage from "./pages/RootPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ClosetPage, { loader as closetLoader } from "./pages/ClosetPage";
import RecommendPage from "./pages/RecommendPage";
import EditClothesPage from "./pages/EditClothesPage";
import NewClothesPage from "./pages/NewClothesPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "closet", element: <ClosetPage /> },
      { path: "recommend", element: <RecommendPage /> },
      {
        path: "clothes",
        children: [
          {
            path: ":clothesId/edit",
            element: <EditClothesPage />,
            loader: closetLoader,
          },
          { path: "new", element: <NewClothesPage /> },
        ],
      },
    ],
  },
]);
const App = () => {
  return (
    <div className={classes.App}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
