import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Landing, News, Homelayout, NewInfo } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//loader
import { loader as landingLoader } from "./pages/Landing";
import { loader as newInfoLoader } from "./pages/NewInfo";
import { loader as newsLoader } from "./pages/News";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "/news",
        element: <News />,
        loader: newsLoader,
      },
      {
        path: "/news/:id",
        element: <NewInfo />,
        loader: newInfoLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
