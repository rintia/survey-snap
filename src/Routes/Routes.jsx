import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Pages/Home/Home";
import AllSurveys from "../Layout/Pages/AllSurveys/AllSurveys";
import SurveyDetail from "../Layout/Pages/SurveyDetails/SurveyDetail";
import Login from "../Login/Login";
import Register from "../Layout/Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddSurvey from "../Layout/Pages/Dashboard/AddSurvey";
import UpdateSurvey from "../Layout/Pages/Dashboard/UpdateSurvey";
import UpdateForm from "../Layout/Pages/Dashboard/UpdateForm";
import AllUsers from "../Layout/Pages/Dashboard/Admin/AllUsers";
import Responses from "../Layout/Pages/Dashboard/Admin/Responses";

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
      ],
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: '/dashboard/addSurvey',
          element: <AddSurvey></AddSurvey>
        },
        {
          path: '/dashboard/updateSurvey',
          element: <UpdateSurvey></UpdateSurvey>
        },
        {
          path: '/dashboard/updateSurvey/form/:id',
          element: <UpdateForm></UpdateForm>,
          loader: ({params}) => fetch(`http://localhost:5000/surveys/${params.id}`)
        },
        {
          path: '/dashboard/allUsers',
          element: <AllUsers></AllUsers>
        },
        {
          path: '/dashboard/responses',
          element: <Responses></Responses>
        }
      ]
    }
  ]);



export default router;