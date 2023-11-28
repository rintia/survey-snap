import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";

const UpdateForm = () => {
    const survey = useLoaderData();
    const {_id,  title, description, question } = survey;
    console.log(description);
    const axiosPublic = useAxiosPublic();

    const handleUpdateSurvey = e => {
        e.preventDefault();
        e.preventDefault();

        const form = e.target;


        const title = form.title.value;
        const question = form.question.value;
        const description = form.description.value;

        const updatedSurvey = { title, question, description }

        axiosPublic.put(`/surveys/${_id}`, updatedSurvey)
            .then(response => {
                console.log(response.data);
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Survey Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error updating survey:', error);
            });

    }

    return (
        <div>
            <div className="p-4 md:p-12 lg:p-24">
                <h2 className="text-3xl text-blue-950 mb-12 font-extrabold text-center">Update Survey</h2>
                <form onSubmit={handleUpdateSurvey}>

                    <div className="md:flex mb-8">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text ">Title</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={title} name="title" placeholder="Title" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>


                    <div className="mb-8">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Question</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={question} type="text" name="question" placeholder="Question" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>


                    <div className="mb-8">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-dark">Short Description</span>
                            </label>
                            <label className="input-group">
                                <input  defaultValue={description} type="text" name="description" placeholder="Short Description" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>



                    <input type="submit" value="Update Survey" className=" btn btn-block bg-gradient-to-br from-[#61B15A] to-[#ADCE74] text-white text-2xl" />



                </form>
            </div>
        </div>
    );
};

export default UpdateForm;