import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isPending: isAdminLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    const currentUser = users.find((data) => data.email === user?.email);
    const isAdmin = currentUser && currentUser.role === 'admin'
    return  {isAdmin, isAdminLoading }
};

export default useAdmin;