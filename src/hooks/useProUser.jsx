import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useProUser = () => {
    const {user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isPending: isProUserLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    const currentUser = users.find((data) => data.email === user?.email);
    const isProUser = currentUser && currentUser.role === 'pro-user'
    return  {isProUser, isProUserLoading }
};

export default useProUser;