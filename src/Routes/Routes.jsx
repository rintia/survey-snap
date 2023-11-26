import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Pages/Home/Home";
import AllSurveys from "../Layout/Pages/AllSurveys/AllSurveys";
import SurveyDetail from "../Layout/Pages/SurveyDetails/SurveyDetail";
import Login from "../Login/Login";
import Register from "../Layout/Pages/Register/Register";

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
        },
        {
          path: '/surveyDetails/:id',
          element: <SurveyDetail></SurveyDetail>,
          loader: ({params}) => fetch(`http://localhost:5000/surveys/${params.id}`)
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }
      ]
    },
  ]);



export default router;