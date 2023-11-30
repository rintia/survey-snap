import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';

const useAdmin = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isPending: isAdminLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading,
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