
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineAddToPhotos,  MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaUsers, FaChartPie } from "react-icons/fa";

import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";

const Dashboard = () => {

   const {isAdmin} = useAdmin();
   const {isSurveyor} = useSurveyor();
   console.log(isAdmin, isSurveyor);
    return (
        <div className="flex">
            <div className="min-h-screen w-40 md:w-52 lg:w-64  bg-gradient-to-br from-[#61B15A] to-[#ADCE74]  text-center text-white">
                <ul className="menu p-4">
                {
                    isSurveyor?
                    <>
                    <li>
                        <NavLink to='/dashboard/addSurvey'>
                            <MdOutlineAddToPhotos></MdOutlineAddToPhotos>
                            Add Survey
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/updateSurvey'>
                            <MdOutlineSystemUpdateAlt></MdOutlineSystemUpdateAlt>
                            Update Survey
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/responses'>
                        <FaChartPie></FaChartPie>
                            Responses
                        </NavLink>
                    </li>
                    </>
                    : isAdmin ?
                    <>
                      <li>
                        <NavLink to='/dashboard/allUsers'>
                            <FaUsers></FaUsers>
                            All Users
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to='/dashboard/responses'>
                        <FaChartPie></FaChartPie>
                            Responses
                        </NavLink>
                    </li>
                    </>
                    :
                    <>
                    <li>
                       Become A Pro-User
                    </li>
                    </>
                }
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;