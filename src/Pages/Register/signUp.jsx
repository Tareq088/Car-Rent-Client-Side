import React, { use, useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const SignUp = () => {
    const[showPassword, setShowPassword] = useState(false);
    const[errorMessage,setErrorMessage] = useState(" ");
    const {signUpUser, updateUserProfile, setUser} = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const handleSignUp = (e) =>{
        e.preventDefault();
        const form = e.target;;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        // console.log(userData);
        const {name, email, photo,password} = userData;
                        // reset errorMessage 
        setErrorMessage("");
                    // error,  password validation
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]){8,}/; 
        if(!passwordRegExp.test(password)){
            setErrorMessage("Password must have 8 characters including 1 small, 1 capital, 1 special character");
            return;
        }
                    // create user
        signUpUser(email, password)
        .then(result =>{
            console.log(result.user);
            const profile = {
                displayName: name,
                photoURL: photo,
            };
            updateUserProfile(profile)
            .then(()=>{
                setUser({...result.user,...profile});
                toast.success("user is created successfully.");
                navigate(location.state || "/home")
            })
            .catch(error=>{
                console.log(error.message);
                Swal.fire(`${error.message}`)
            })
        })
        .catch(error =>{
            console.log(error.message);
        })
    }
    return (
    <div>
                        {/* <Helmet>
                            <title>FindMate | Register</title>
                        </Helmet> */}
            <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl mx-auto p-5">
                <h2 className='text-center font-bold text-lg md:text-3xl pt-4'>Sign Up</h2>
                <form onSubmit={handleSignUp} className="card-body">
                    <fieldset className="fieldset">
                                {/* name */}
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" required/>
                                    {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required/>
                                    {/* photoURL */}
                    
                        <label className="label">photoURL</label>
                        <input type="url" name='photo' className="input" placeholder="https://examle.com" required/>
                                    {/* password */}
                        <label className="label">Password</label> 
                        <div className="join">
                            <input type={showPassword?"text" :"password"} name='password' className="input join-item" placeholder="Password" required/>
                            <button 
                                onClick={()=>{
                                    setShowPassword(!showPassword)
                                    }} className="btn join-item">
                                {showPassword ?
                                <IoIosEyeOff/>
                                :
                                <IoIosEye/>
                                }
                            </button>
                        </div>
                        {
                            errorMessage && <p className='text-xs text-red-700'>{errorMessage}</p>
                        }
                        
                        <button type='submit' to='/home' className="btn btn-success mt-4">Register</button>
                    </fieldset>
                </form>
                <p className='text-center'>Already Have an Account? 
                    <span className='font-bold text-red-600 hover:text-green-800 hover:underline'><Link to='/login'> Log In</Link></span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;