import { Link, useLocation, useNavigate} from "react-router-dom";
import { useContext } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
    const {signInUser, signInWithGoogle} = useContext(AuthContext);
    const location = useLocation();
    console.log('location in the login page', location)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
      signInWithGoogle()
      .then(result => {
         // create user entry in the database
         const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: 'user'
      }
      axiosPublic.post('/users', userInfo)
          .then(res => {
              if (res.data.insertedId) {
                  console.log('user added to the database')
                  navigate('/');
                  toast.success('Registered Successfully')
              }
          })
      })
      .catch(error => console.error(error))
    }
    
      const handleLogin = e => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          console.log(email, password)
          signInUser(email, password)
          .then(result=> {
            navigate(location?.state ? location.state : '/')
            toast.success('Successfully logged in')
            console.log(result.user)
            e.target.reset();
            
          })
          .catch(error =>{
            console.log(error)
            toast.warning('Invalid Email or Password')
        })

      }
    return (
        <div>
    <div className="flex flex-col-reverse md:flex-row">
    <div className="h-cover w-full md:w-1/2">
        <img className="h-full w-full"  src="https://i.ibb.co/pxz9zDk/login22.gif" alt="" />
        
    </div>
    <div className="card w-full md:w-1/2">
    <h1 className="text-5xl font-bold text-center pt-8 text-[#61B15A]">Login now!</h1>
      <form onSubmit={handleLogin} className="card-body">
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
          <button className="btn border-none bg-[#61B15A] hover:bg-[#6C5F5B] text-2xl text-white">Login</button>
          
          <p className="text-center mt-4">Or</p>
          <div className="flex justify-center">
          <button onClick={handleGoogleSignIn} className="btn w-full lg::w-1/2 text-dark btn-outline">
          <FcGoogle className="text-3xl"></FcGoogle>
            Login with Google</button>
          </div>
        </div>
        <p className="text-center">New here? Please <Link to='/register'>
            <button className="btn btn-link text-dark">
                
                Register</button></Link></p>
      </form>
    </div>
  
  </div>

</div>
    );
};

export default Login;