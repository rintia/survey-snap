
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineAddToPhotos,  MdOutlineSystemUpdateAlt } from "react-icons/md";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="min-h-screen w-40 md:w-52 lg:w-64  bg-gradient-to-br from-[#61B15A] to-[#ADCE74]  text-center text-white">
                <ul className="menu p-4">
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
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;