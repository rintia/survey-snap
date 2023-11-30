import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import moment from "moment";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payemnts = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    const { date } = payemnts;

    const formattedTime = moment(date).format('MMMM Do YYYY, h:mm:ss a');
    return (
        <div>
           <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Payed</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        payemnts.map((payment, index) => <tr key={payment._id}>
                                            <th>{index + 1}</th>
                                            <th>{payment.name}</th>
                                            <td>{payment.email}</td>
                                            <td>200 $</td>
                                            <td>{moment(payment.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
        </div>
    );
};

export default PaymentHistory;