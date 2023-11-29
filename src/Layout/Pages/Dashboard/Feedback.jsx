import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Feedback = () => {
    const axiosPublic = useAxiosPublic();
    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
        }
    });
    return (
        <div>
            <h1 className='text-center my-8 text-[#61B15A] text-4xl'>Feedback</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>User Feedback</th>
                            <th>Admin Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            surveys.map((survey, index) => <tr key={survey._id} className="border-green-600">
                                <th>{index + 1}</th>
                                <td>{survey.title}</td>
                                {
                                    survey.userFeedback ?
                                        <td><button onClick={() => document.getElementById('my_modal_1').showModal()} className='btn btn-sm bg-[#FFF76A]'>See Feedback</button>
                                            <dialog id="my_modal_1" className="modal">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg text-center mb-4">Users Feedback</h3>

                                                    {survey.userFeedback.map((feedback, index) => (
                                                        <li key={index}>{feedback}</li>
                                                    ))}

                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>
                                        : <td className='text-gray-600'>No Feedback</td>
                                }
                                {
                                    survey.adminFeedback ?
                                        <td><button onClick={() => document.getElementById('my_modal_2').showModal()} className='btn btn-sm bg-[#FFCE89]'>See Feedback</button>
                                        <dialog id="my_modal_2" className="modal">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg text-center mb-4">Admin Feedback</h3>

                                                    {survey.adminFeedback.map((feedback, index) => (
                                                        <li key={index}>{feedback}</li>
                                                    ))}

                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>
                                        : <td className='text-gray-800'>No Feedback</td>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Feedback;