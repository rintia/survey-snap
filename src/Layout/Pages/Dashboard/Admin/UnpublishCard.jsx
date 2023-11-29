import React, { useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UnpublishCard = ({survey}) => {
    const{_id, title, category, description, } = survey;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure
    const [adminFeedback, setAdminFeedback]=  useState([])
    const { data: surveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosSecure.get('/surveys');
            return res.data;
            
        }
    });
    const handlePublish =async () => {
        try {
            await axiosPublic.patch(`surveys/${_id}`, {
                status: 'published'
            });
            refetch(); 
            Swal.fire({
                title: 'Success!',
                text: 'Survey Published Successfully',
                icon: 'success',
                confirmButtonText: 'OK',
            });
    
        } catch (error) {
            console.error('Error publishing survey:', error.message);
            // Handle the error (e.g., show a notification to the user)
        }
    }

    const handleUnPublish = async () => {
        Swal.fire({
            title: "Are you sure you want to unpublish this survey?",
            text: "Give your feedback",
            input: 'text',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, unpublish it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const reportReason = result.value || "No reason provided";
                setAdminFeedback([...adminFeedback, reportReason])
                console.log(reportReason);
                try {
                    await axiosPublic.patch(`surveys/${_id}`, {
                        adminFeedback: [...adminFeedback, reportReason],
                        status: 'unpublish'
        
                    });
                    refetch();
                } catch (error) {
                    console.error('Error updating survey data:', error.message);
                }
                Swal.fire({
                    title: "Unpublished!",
                    text: "Survey has been unpublished",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div className="card h-full rounded-none bg-gradient-to-r from-[#61B15A] to-[#ADCE74]  border-b-[#61B15A] border-b-2 border-t-[#61B15A] border-t-2  shadow-xl">
 
        <div className='rounded-br-full h-full  bg-white'> 
        <div className="card-body text-center">
          <div className='h-full'>
          <h2 className="card-title text-[#61B15A]  text-center">{title}</h2>
          <p ><span className='font-semibold'>Category:</span> {category}</p>
          <p>{description}</p>
          <p><span className='font-semibold'>Total Voted:</span> {survey.totalVoted || 0}</p>
          </div>
          {
            survey.status === 'published' ?
            <h1 className='text-centet font-semibold text-2xl shadow-md border-2 p-2'>Survey Published</h1>
            : survey.status === 'unpublish'?
            <h1 className='text-centet font-semibold text-2xl shadow-md border-2 p-2'>Survey Unpublished</h1>
            :
            <div className="card-actions justify-between">
         <button onClick={handlePublish} className='btn rounded-full btn-primary hover:bg-gray-400 bg-[#ADCE74] text-black border-none'>Publish</button>
         <button onClick={handleUnPublish} className='btn btn-primary rounded-full hover:bg-gray-400 bg-[#FFF76A] text-black border-none'>Unpublish</button>
          </div>

          }
        </div>
        </div>
        </div>
    );
};

export default UnpublishCard;