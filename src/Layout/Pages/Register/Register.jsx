import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {  toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from "../../../Providers/AuthProvider";


const Register = () => {
    const {createUser, signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
   
    
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(() => {
          navigate('/'),
          toast.success('Sign in Successful')
        })
        .catch(error => console.error(error))
      }
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        console.log(name, email, password);
        if(password.length < 6){
            toast.warning('Password should be 6 character or longer')
            return;
          }
  
          else if(!/[A-Z]/.test(password)){
            toast.warning('Your password should have at least one upper class character ');
            return;
          }
          else if(!/[!@#$%^&*]/.test(password)){
            toast.warning('Your password should have at least one special character');
            return;
          }
        createUser(email, password)
        .then(result => {
           
              console.log(result.user)
              updateProfile(result.user,{
                displayName: name,
                photoURL: photo
              })
              .then(() =>
              location.reload(),
              navigate('/'),
              toast.success('Registered Successfully')
              
          )
              .catch(error => console.error(error))
            
        })
        .catch(error=> 
            console.log(error))

    }
    return (
        <div >
         
  <div className="flex flex-col-reverse md:flex-row">
  <div className="h-cover md:w-1/2">
        <img className="h-full w-full"  src="https://i.ibb.co/pxz9zDk/login22.gif" alt="" />
        
    </div>
    <div className="card md:w-1/2">
    <h1 className="text-5xl text-[[#61B15A] text-center font-bold">Register now!</h1>
      <form onSubmit={handleRegister} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input type="text" name="name" placeholder="your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Photo</span>
          </label>
          <input type="text" name="photo" placeholder="your photo url" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn border-none text-2xl text-white  bg-[#61B15A] hover:bg-[#6C5F5B] ">Register</button>
          <p className="text-center mt-4">Or</p>
         <div className="flex justify-center">
         <button
           onClick={handleGoogleSignIn} className="btn btn-outline w-full">
            <FcGoogle className="text-3xl"></FcGoogle>
            Login with Google</button>
         </div>
        </div>
        <p className="text-center">Already have an account? Please <Link to='/login'><button className="btn text-dark btn-link">Login</button></Link></p>
       
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;