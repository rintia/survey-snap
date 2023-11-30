import axios from 'axios';


const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://survey-snap-server.vercel.app'
    })
    return (
        axiosPublic
    )
};

export default useAxiosPublic;