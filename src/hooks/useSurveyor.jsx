import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";


const useSurveyor = () => {
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
    const isSurveyor = currentUser && currentUser.role === 'surveyor'
    return  {isSurveyor, loading: status === 'loading', error: status === 'error' }
};

export default useSurveyor;