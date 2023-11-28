import React from 'react';
import { Link } from 'react-router-dom';

const UpdateCard = ({survey}) => {
    const{_id, title, category, description, } = survey;
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
          <div className="card-actions justify-stary">
           <Link to={`/dashboard/updateSurvey/form/${_id}`}><button className='btn btn-outline text-[#61B15A]'>Update</button></Link>
          </div>
        </div>
        </div>
        </div>
    );
};

export default UpdateCard;