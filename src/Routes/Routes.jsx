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
import AdminRoute from "./AdminRoute";
import SurveyorRoute from "./SurveyorRoute";
import PrivateRoute from "./PrivateRoute";
import ResponseTable from "../Layout/Pages/Dashboard/Admin/ResponseTable";
import SharedRoute from "./SharedRoute";
import Unpublish from "../Layout/Pages/Dashboard/Admin/Unpublish";
import Feedback from "../Layout/Pages/Dashboard/Feedback";

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
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: '/dashboard/addSurvey',
          element: <SurveyorRoute><AddSurvey></AddSurvey></SurveyorRoute>
        },
        {
          path: '/dashboard/updateSurvey',
          element: <SurveyorRoute><UpdateSurvey></UpdateSurvey></SurveyorRoute>
        },
        {
          path: '/dashboard/updateSurvey/form/:id',
          element: <UpdateForm></UpdateForm>,
          loader: ({params}) => fetch(`http://localhost:5000/surveys/${params.id}`)
        },
        {
          path: '/dashboard/allUsers',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: '/dashboard/responses',
          element: <SharedRoute><Responses></Responses></SharedRoute>
        },
        {
          path: '/dashboard/response/:id',
          element:<SharedRoute><ResponseTable></ResponseTable></SharedRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/surveys/${params.id}`)
        },
        {
          path: '/dashboard/unpublish',
          element: <AdminRoute><Unpublish></Unpublish></AdminRoute>
        },
        {
          path: '/dashboard/feedbacks',
          element: <SurveyorRoute><Feedback></Feedback></SurveyorRoute>
        }
      ]
    }
  ]);



export default router;