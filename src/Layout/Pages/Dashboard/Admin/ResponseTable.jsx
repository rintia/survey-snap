import moment from 'moment';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Statistics from '../../SurveyDetails/Statistics';

const ResponseTable = () => {
    const survey = useLoaderData();
    const { title, voters, totalVoted, yesVoted } = survey;

   
    return (
        <div>
            <h1 className='text-center my-8 text-[#61B15A] text-4xl'>{title}</h1>
            {
                voters ?
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Time</th>
                                        <th>Voted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        voters.map((voter, index) => <tr key={voter.id}>
                                            <th>{index + 1}</th>
                                            <th>{voter.name}</th>
                                            <td>{voter.email}</td>
                                            <td>{moment(voter.timeVoted).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                            <td>{voter.voted}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-20'>
                            <h1 className="text-center text-2xl text-[#61B15A] font-semibold">Chart</h1>
                            <Statistics totalVoted={totalVoted} yesVoted={yesVoted}></Statistics>
                        </div>
                    </div>
                    :
                    <h1 className='text-center text-6xl text-gray-600 mt-20'>No Response Yet</h1>
            }
        </div>
    );
};

export default ResponseTable;