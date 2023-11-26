import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Pages/Home/Home";
import AllSurveys from "../Layout/Pages/AllSurveys/AllSurveys";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/allSurveys',
          element: <AllSurveys></AllSurveys>
        }
      ]
    },
  ]);



export default router;