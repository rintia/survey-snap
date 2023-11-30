import { useContext, useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { MdOutlineReport } from "react-icons/md";
import { Link, useLoaderData } from 'react-router-dom';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Providers/AuthProvider";
import Statistics from "./Statistics";
import useAdmin from "../../../hooks/useAdmin";
import useSurveyor from "../../../hooks/useSurveyor";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import Swal from "sweetalert2";
import useProUser from "../../../hooks/useProUser";

const SurveyDetail = () => {
    const [totalVoted, setTotalVoted] = useState(0);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [yesVoted, setYesVoted] = useState(0);
    const [noVoted, setNoVoted] = useState(0);
    const [votersEmails, setVotersEmails] = useState([]);
    const [voters, setVoters] = useState([]);
    const [comments, setComments] = useState([]);
    const [userFeedback, setUserFeedback] = useState([]);
    const survey = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const { isAdmin } = useAdmin();
    const { isSurveyor } = useSurveyor();
    const {isProUser} = useProUser();

    const { user } = useContext(AuthContext);
    const { _id, title, category, description, question } = survey;
    console.log(votersEmails, voters);
    // console.log(voters.includes(user?.email));

    useEffect(() => {
        // Fetch existing survey data from the backend when the component mounts
        const fetchSurveyData = async () => {
            try {
                const response = await axiosPublic.get(`surveys/${_id}`);
                const surveys = response.data;
                setTotalVoted(surveys.totalVoted || 0);
                setYesVoted(surveys.yesVoted || 0);
                setNoVoted(surveys.noVoted || 0);
                setLikes(surveys.likes || 0);
                setDislikes(surveys.dislikes || 0);
                setVotersEmails(surveys.votersEmails || []);
                setVoters(surveys.voters || []);
                setComments(surveys.comments || []);
                setUserFeedback(survey.userFeedback || []);
            } catch (error) {
                console.error('Error fetching survey data:', error.message);
            }
        };

        fetchSurveyData();
    }, [_id]);

    const handleComment = async (e) => {
        const form = e.target;
        const comment = form.comment.value;

        // Create a new comment object
        const newComment = {
            id: uuidv4(),
            name: user?.displayName,
            photo: user?.photoURL,
            comment: comment
        };

        setComments(prevComments => [...prevComments, newComment]);

        try {
            await axiosPublic.patch(`surveys/${_id}`, {
                comments: [...comments, newComment],

            });
        } catch (error) {
            console.error('Error updating survey data:', error.message);
        }
    }

    const handleReport = async () => {

        Swal.fire({
            title: "Are you sure you want to report?",
            text: "Reason of your report",
            input: 'text',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, report it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const reportReason = result.value || "No reason provided";
                setUserFeedback([...userFeedback, reportReason])
                console.log(reportReason);
                try {
                    await axiosPublic.patch(`surveys/${_id}`, {
                        userFeedback: [...userFeedback, reportReason]

                    });
                } catch (error) {
                    console.error('Error updating survey data:', error.message);
                }
                Swal.fire({
                    title: "Reported!",
                    text: "Survey has been reported.",
                    icon: "success"
                });
            }
        });

    }

    const handleYesVote = async () => {

        // Create a new voter object
        const newVoter = {
            id: uuidv4(),
            name: user?.displayName,
            email: user?.email,
            voted: 'Yes',
            timeVoted: moment().toISOString()
        };

        // Update state with the new voter
        setVoters(prevVoters => [...prevVoters, newVoter]);

        console.log('yess');
        setTotalVoted(totalVoted + 1);
        setYesVoted(yesVoted + 1);
        setVotersEmails([...votersEmails, user?.email]);
        console.log(totalVoted);
        console.log(voters);
        try {
            await axiosPublic.patch(`surveys/${_id}`, {
                totalVoted: totalVoted + 1,
                yesVoted: yesVoted + 1,
                noVoted: noVoted,
                likes: likes,
                dislikes: dislikes,
                votersEmails: [...votersEmails, user.email],
                voters: [...voters, newVoter],

            });
        } catch (error) {
            console.error('Error updating survey data:', error.message);
        }
    }


    const handleNoVote = async () => {

        // Create a new voter object
        const newVoter = {
            id: uuidv4(),
            name: user?.displayName,
            email: user?.email,
            voted: 'No',
            timeVoted: moment().toISOString()
        };

        // Update state with the new voter
        setVoters(prevVoters => [...prevVoters, newVoter]);

        console.log('nooo');
        setTotalVoted(totalVoted + 1);
        setNoVoted(noVoted + 1);
        setVotersEmails([...votersEmails, user?.email]);

        console.log(totalVoted);
        try {
            await axiosPublic.patch(`surveys/${_id}`, {
                totalVoted: totalVoted + 1,
                yesVoted: yesVoted,
                noVoted: noVoted + 1,
                likes: likes,
                dislikes: dislikes,
                votersEmails: [...votersEmails, user.email],
                voters: [...voters, newVoter],
            });
        } catch (error) {
            console.error('Error updating survey data:', error.message);
        }
    }
    const handleLikes = async () => {
        console.log('like');
        setLikes(likes + 1);
        try {
            await axiosPublic.patch(`surveys/${_id}`, {
                totalVoted: totalVoted,
                yesVoted: yesVoted,
                noVoted: noVoted,
                likes: likes + 1,
                dislikes: dislikes,
                votersEmails: votersEmails,
                voters: voters,
            });
        } catch (error) {
            console.error('Error updating survey data:', error.message);
        }
    }
    const handleDislikes = async () => {
        console.log('like');
        setDislikes(dislikes + 1);
        try {
            await axiosPublic.patch(`surveys/${_id}`, {
                totalVoted: totalVoted,
                yesVoted: yesVoted,
                noVoted: noVoted,
                likes: likes,
                dislikes: dislikes + 1,
                votersEmails: votersEmails,
                voters: voters,
            });
        } catch (error) {
            console.error('Error updating survey data:', error.message);
        }

    }



    return (
        <div>
            {user?.email ?
                <></>
                :
                <div className="text-center mt-12 text-2xl"> <h1>You are not logged in.
                    <Link to='/login'> <button className="btn btn-link text-2xl">Log In Now To Vote</button></Link>
                </h1>
                </div>

            }
            {
                votersEmails.includes(user?.email) ?
                    <h1 className="text-center mt-12 font-semibold text-2xl">Already Voted</h1>
                    : isAdmin ?
                        <p className="text-center mt-12 font-semibold text-2xl">You are an admin. You can't vote</p>
                        : isSurveyor ?
                            <p className="text-center mt-12 font-semibold text-2xl">You are a surveyor. You can't vote</p>
                            : <></>
            }
            <div className='mt-12 border-2 p-4'>

                <div className="flex justify-end">
                    <button disabled={!user || isAdmin || isSurveyor} onClick={handleReport} className="text-red-500 btn btn-outline">Report<MdOutlineReport className="text-2xl"></MdOutlineReport></button>
                </div>
                <div className='text-center  space-y-4'>
                    <h1 className='text-xl md:text-2xl lg:text-4xl text-[#61B15A]'>{title}</h1>
                    <p><span className='font-semibold'>Category: </span>{category}</p>
                    <p className='text-sm'>{description}</p>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl '>Q: {question}</h1>
                </div>
                <div className='space-y-6 mt-12 flex flex-col justify-center text-white'>
                    <button disabled={!user || votersEmails.includes(user?.email) || isAdmin || isSurveyor} onClick={handleYesVote} className="btn w-full h-16 text-3xl text-white hover:text-black bg-[#61B15A]">YES</button>
                    <button disabled={!user || votersEmails.includes(user?.email) || isAdmin || isSurveyor} onClick={handleNoVote} className="btn w-full text-3xl h-16 text-white hover:text-black bg-[#0066b2]">NO</button>
                </div>
            </div>
            <div className='mt-4 flex justify-between'>
                <div className='flex gap-6'>
                    <div className="flex gap-2">
                        <button disabled={!user} onClick={handleLikes}><AiOutlineLike className="text-2xl"></AiOutlineLike></button>
                        <h1 >{likes} likes</h1>
                    </div>
                    <div className="flex gap-2">
                        <button disabled={!(user)} onClick={handleDislikes} ><AiOutlineDislike className="text-2xl"></AiOutlineDislike></button>
                        <h1>{dislikes} dislikes</h1>
                    </div>
                </div>
                <h1>Total Voted:{totalVoted}</h1>
            </div>
            <h1 className="text-center font-semibold my-12 text-4xl py-8 border-b-2 border-b-green-300">Comments</h1>
            <div className=" mb-8 bg-green-300">
                {
                    survey.comments ?
                        <div>
                           
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    
                                    <tbody>
                                        {/* row 1 */}
                                       
                                       {
                                        survey.comments.map(comment =>  <tr>
                                            
                                            <td key={comment._id} className="w-1/6">
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img className="rounded-full" src={comment.photo} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{comment.name} :</div>
                                                      
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-start">
                                                {comment.comment}
                                            </td>
                                            
                                        </tr>)
                                       }
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <div className="p-2">
                            <h1 className="text-center font-semibold ">No Comment Yet</h1>
                        </div>
                }

            </div>
            <div>
                <form onSubmit={handleComment} className="mt-12">
                    <div className="mb-8">
                        <div className="flex gap-2 items-center">
                            <div className="form-control flex-1">

                                <label className="input-group">
                                    <input type="text" name="comment" placeholder="Add Comment" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <button disabled={!isProUser} className="btn btn-sm  bg-yellow-800 text-white">Comment</button>

                        </div>

                    </div>
                </form>
            </div>
            <div className="mt-12">

                {
                    votersEmails.includes(user?.email) ?
                        <div>
                            <h1 className="text-center text-2xl font-semibold">Result</h1>
                            <Statistics totalVoted={totalVoted} yesVoted={yesVoted}></Statistics>
                        </div>
                        : <></>
                }
            </div>
        </div>
    );
};


export default SurveyDetail;