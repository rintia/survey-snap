import { useLoaderData } from "react-router-dom";

const UpdateForm = () => {
    const survey = useLoaderData();
    const {title, category, description, question} = survey;
    return (
        <div>
              <div className="p-4 md:p-12 lg:p-24">
            <h2 className="text-3xl text-blue-950 mb-12 font-extrabold text-center">Add A New Survey</h2>
            <form onSubmit={handleUpdateSurvey}>

                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text ">Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" defaultValue={title} name="title"  placeholder="Title" className="input input-bordered w-full" />
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
                            <input defaultValue={question} type="text" name="question" placeholder="Question" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
               

                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span defaultValue={description} className="label-text text-dark">Short Description</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="description" placeholder="Short Description" className="input input-bordered w-full" />
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