
import { Link, NavLink, Outlet } from "react-router-dom";
import { MdOutlineAddToPhotos,  MdOutlineSystemUpdateAlt,MdOutlinePayment,  MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaUsers, FaChartPie, FaHome, FaList } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc"

import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";
import useProUser from "../hooks/useProUser";

const Dashboard = () => {

   const {isAdmin} = useAdmin();
   const {isSurveyor} = useSurveyor();
   const {isProUser} = useProUser();
   console.log(isAdmin, isSurveyor);
    return (
        <div className="flex">
            <div className="min-h-screen w-40 md:w-52 lg:w-64  bg-gradient-to-br from-[#61B15A] to-[#ADCE74]  text-center text-white">
            <Link to='/'><button className="btn mt-8 mb-16 text-white w-52 md:w-auto btn-ghost font-bold normal-case  text-xl md:text-3xl"> <img className="w-8 border-white border-2 rounded-full md:w-12" src="https://i.ibb.co/jWcR9LR/10764276.png" alt="" />
        Survey Snap</button></Link>
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
                    <li>
                        <NavLink to='/dashboard/feedbacks'>
                        <VscFeedback></VscFeedback>
                           Feedbacks
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
                    <li>
                        <NavLink to='/dashboard/unpublish'>
                        <MdOutlinePublishedWithChanges></MdOutlinePublishedWithChanges>
                           Publish/Unpublish
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/payments'>
                        <MdOutlinePayment></MdOutlinePayment>
                           Payment History
                        </NavLink>
                    </li>
                    </>
                    : isProUser ?
                    <></>
                    :
                    <>
                    <li>
                       <NavLink to='/payment'>
                       Become A Pro-User
                       </NavLink>
                    </li>
                    </>
                }
                <div className="divider"></div> 
                <li>
                    <NavLink to='/'>
                        <FaHome></FaHome>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/allSurveys'>
                        <FaList></FaList>
                        All Surveys
                    </NavLink>
                </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;