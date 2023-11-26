import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Pages/Home/Home";
import AllSurveys from "../Layout/Pages/AllSurveys/AllSurveys";
import SurveyDetail from "../Layout/Pages/SurveyDetails/SurveyDetail";

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
        }
      ]
    },
  ]);



export default router;