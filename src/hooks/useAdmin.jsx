import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch, status } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });
    const currentUser = users.find((data) => data.email === user?.email);
    const isAdmin = currentUser && currentUser.role === 'admin'
    return  {isAdmin, loading: status === 'loading', error: status === 'error' }
};

export default useAdmin;