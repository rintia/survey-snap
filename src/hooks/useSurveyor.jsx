import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";


const useSurveyor = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isPending: isSurveyorLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    const currentUser = users.find((data) => data.email === user?.email);
    const isSurveyor = currentUser && currentUser.role === 'surveyor'
    return  {isSurveyor, isSurveyorLoading  }
};

export default useSurveyor;