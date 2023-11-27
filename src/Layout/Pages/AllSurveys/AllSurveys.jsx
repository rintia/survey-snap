import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SurveyCard from './SurveyCard';

const AllSurveys = () => {
    let surveys = []
    const [selectedFilter, setSelectedFilter] = useState('');
    const axiosPublic = useAxiosPublic();
    const { data: initialSurveys = [], refetch } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
            
        }
    });
    surveys = initialSurveys;

    const handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedFilter(selectedValue);
    
        // Perform actions based on the selected option
        switch (selectedValue) {
          case 'Title':
            handleTitleSelect();
            break;
          case 'Category':
            handleCategorySelect();
            break;
          case 'Total Vote':
            handleTotalVoteSelect();
            break;
        //   default:
           
            // Handle default case or perform no action
        }
      };
    
   const handleTitleSelect = () =>{
       const sorted = surveys.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
    surveys =sorted
   }
   const  handleCategorySelect = () =>{
       const sorted = surveys.sort((a, b) => {
        return a.category.localeCompare(b.category);
    });
    surveys =sorted
   }
   const  handleTotalVoteSelect = () =>{
    const sorted = surveys.sort((a, b) => {
    const totalVotedA = a?.totalVoted || 0; 
    const totalVotedB = b?.totalVoted || 0; 
    return totalVotedB - totalVotedA;
    });
    surveys =sorted
   }
    return (
        <div>
           
          <div className='flex justify-end'>
          <select className=" mt-8 select select-success  max-w-xs"
            value={selectedFilter}
            onChange={handleFilterChange}>
                <option selected>Filter By</option>
                <option>Title</option>
                <option>Category</option>
                <option>Total Vote</option>
            </select>
          </div>
           
            <div className='my-12 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    surveys.map(survey => <SurveyCard key={survey._id} survey={survey}></SurveyCard>)
                }
            </div>
        </div>
    );
};

export default AllSurveys;