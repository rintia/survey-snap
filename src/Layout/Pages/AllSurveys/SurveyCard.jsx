import React from 'react';
import { Link } from 'react-router-dom';

const SurveyCard = ({survey}) => {
    const{_id, title, category, description, } = survey;
    return (
     <Link to={`/surveyDetails/${_id}`}>
        <div className="card h-full rounded-none bg-gradient-to-r from-[#61B15A] to-[#ADCE74]  border-b-[#61B15A] border-b-2 border-t-[#61B15A] border-t-2  shadow-xl">
 
 <div className='rounded-br-full h-full  bg-white'> 
 <div className="card-body text-center">
   <h2 className="card-title text-[#61B15A]  text-center">{title}</h2>
   <p ><span className='font-semibold'>Category:</span> {category}</p>
   <p>{description}</p>
   <p><span className='font-semibold'>Total Voted:</span> 0</p>
   <div className="card-actions justify-end">
    
   </div>
 </div>
 </div>
 </div>
     </Link>

    );
};

export default SurveyCard;