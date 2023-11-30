import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import axios from 'axios';


const AddSurvey = () => {
    const axiosPublic = useAxiosPublic();


    const handleAddSurvey = e => {
        e.preventDefault();

        const form = e.target;

       
        const title = form.title.value;
        const question = form.question.value;
        const category = form.category.value;
        const description = form.description.value;

        const newSurvey = {title, category, question, description}

        console.log(newSurvey);
        const url = 'https://survey-snap-server.vercel.app/surveys'

        axios.post( url, newSurvey, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                const data = response.data;
        
                console.log(data);
        
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Survey Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
        

                    form.reset();
                }
            })
            .catch(error => {
                
                console.error('Error adding survey:', error);
            });
            }

    return (
        <div>
             <div className="p-4 md:p-12 lg:p-24">
            <h2 className="text-3xl text-blue-950 mb-12 font-extrabold text-center">Add A New Survey</h2>
            <form onSubmit={handleAddSurvey}>

                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text ">Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="title"  placeholder="Title" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 md:ml-4">
                    <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select name='category' className="select select-bordered w-full">
                            <option disabled selected>Choose One Category</option>
                            <option>Market Research</option>
                            <option>Customer Satisfaction</option>
                            <option>Employee Satisfaction</option>
                            <option>Political Surveys</option>
                            <option>Health Surveys</option>
                        </select>
                    </div>
                </div>

               
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Question</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="question" placeholder="Question" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
               

                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-dark">Short Description</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="description" placeholder="Short Description" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
               
              
              
              <input type="submit" value="Add Survey" className=" btn btn-block bg-gradient-to-br from-[#61B15A] to-[#ADCE74] text-white text-2xl" />
              
               

            </form>
        </div>
        </div>
    );
};

export default AddSurvey;