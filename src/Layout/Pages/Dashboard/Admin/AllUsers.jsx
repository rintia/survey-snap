import React, { useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { GrUserAdmin } from "react-icons/gr";
import { RiSurveyLine } from "react-icons/ri";
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    
    
    const handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedFilter(selectedValue);
    
        // Perform actions based on the selected option
        switch (selectedValue) {
          case 'User':
            handleUserSelect();
            break;
          case 'Pro-User':
            handleProUserSelect();
            break;
          case 'Surveyor':
            handleSurveyorSelect();
            break;
          case 'All':
            handleAllSelect();
            break;
        //   default:
           
            // Handle default case or perform no action
        }
      };

      const handleSurveyorSelect = () => {
        const Users = users.filter(user => user.role === 'surveyor');
        setFilteredUsers(Users)
      }
      const handleUserSelect = () => {
        const Users = users.filter(user => user.role === 'user');
       setFilteredUsers(Users)
      }
      const handleProUserSelect = () => {
        const Users = users.filter(user => user.role === 'pro-user');
       setFilteredUsers(Users);
      };
    const handleAllSelect = () => {
        location.reload()
    }

     


    const handleMakeAdmin = (user) =>{
            const role = 'admin';
            const updatedUser = {role}
            console.log(updatedUser, user);


            axiosPublic.put(`/users/${user._id}`, updatedUser)
            .then(response => {
                console.log(response.data);
                if (response.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: 'Success!',
                        text: `${user.name} is admin now`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error updating role:', error);
            });
        };

        const handleMakeSurveyor = (user) =>{
            const role = 'surveyor';
            const updatedUser = {role}
            console.log(updatedUser, user);


            axiosPublic.put(`/users/${user._id}`, updatedUser)
            .then(response => {
                console.log(response.data);
                if (response.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: 'Success!',
                        text: `${user.name} is surveyor now`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error updating role:', error);
            });
        }

       


    return (
        <div>
           <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className='flex justify-end'>
          <select className=" mt-8 select select-success  max-w-xs"
           value={selectedFilter}
           onChange={handleFilterChange}
           >
                <option selected>Filter By</option>
                <option>User</option>
                <option>Pro-User</option>
                <option>Surveyor</option>
                <option>All</option>
            </select>
          </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    {filteredUsers.length > 0
                     ? 
                    <tbody>
                        { 
                            filteredUsers.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                   {user.role}
                                </td>
                                <td>
                                  {
                                    user.role === 'admin' ?
                                    <></>
                                    :
                                    <div className='flex flex-col gap-2 '>
                                  <button onClick={() =>handleMakeAdmin(user)} className="btn w-1/2 btn-outline text-yellow-800">
                                    <GrUserAdmin></GrUserAdmin>
                                        Make Admin
                                    </button>
                                   {
                                    user.role === 'surveyor' ?
                                    <></>
                                    :
                                    <button onClick={() => handleMakeSurveyor(user)} className="btn btn-outline text-green-800 w-1/2">
                                    <RiSurveyLine></RiSurveyLine>
                                    Make Surveyor
                                </button>
                                   }
                                  </div>
                                  }
                                </td>
                            </tr>)
                        }

                    </tbody>
                    :
                    <tbody>
                        { 
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                   {user.role}
                                </td>
                                <td>
                                  {
                                    user.role === 'admin' ?
                                    <></>
                                    :
                                    <div className='flex flex-col gap-2 '>
                                  <button onClick={() =>handleMakeAdmin(user)} className="btn w-1/2 btn-outline text-yellow-800">
                                    <GrUserAdmin></GrUserAdmin>
                                        Make Admin
                                    </button>
                                   {
                                    user.role === 'surveyor' ?
                                    <></>
                                    :
                                    <button onClick={() => handleMakeSurveyor(user)} className="btn btn-outline text-green-800 w-1/2">
                                    <RiSurveyLine></RiSurveyLine>
                                    Make Surveyor
                                </button>
                                   }
                                  </div>
                                  }
                                </td>
                            </tr>)
                        }

                    </tbody>
                    }
                </table>
            </div>
        </div>
    );
};

export default AllUsers;