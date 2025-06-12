import React, { use, useRef, useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const LogIn = () => {
    const[showPassword, setShowPassword] = useState(false);
    const{logInUser, googleSignInUser, resetPassword} = use(AuthContext);
    const emailRef = useRef("");
    const navigate = useNavigate();
    const location = useLocation();
                        // login
    const handleLogIn =(e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
                        //log in user
        logInUser(email, password)
        .then(result=>{
            // console.log(result.user);
              Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Logged In Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(location.state || "/home")
        })
        .catch(error =>{
            // console.log(error.message.split("/")[1].split(")")[0]);
            if(error.message.split("/")[1].split(")")[0] == "missing-password"){
                Swal.fire({icon:"error", title:"Fill Up the Password Field"});
            }
            else if(error.message.split("/")[1].split(")")[0] == "invalid-credential"){
                 Swal.fire({icon:"error", title:"Incorrect Password. Please try again.."});
            }
            else{
                Swal.fire({icon:"error", title:`${error.message.split("/")[1].split(")")[0]}`});
            }
        })
    }
    const handleGoogleSignIn = () =>{
        googleSignInUser()
        .then(result =>{
            // console.log(result.user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Logged In Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(location.state || "/home")
        })
        .catch(error =>{
            Swal.fire({icon:"error", title:`${error.message}`});
        })
    }
    const handleForgetPassword =() =>{
        const email = emailRef.current.value;
        resetPassword(email)
        .then(()=>{
            Swal.fire(`Password Reset Mail is sent to  Email: ${email}`);
        })
        .catch(error=>{
            Swal.fire(`${error.message}`);
        })
        
    }
    return (
        <div>
            {/* <Helmet>
                <title>FindMate | Log in</title>
            </Helmet> */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto p-5">
                <h2 className='text-center font-bold text-lg md:text-3xl pt-4'>Sign In</h2>
                <form onSubmit={handleLogIn} className="card-body">
                    <fieldset className="fieldset">
                                    {/* email */}
                        <label className="label">Email</label>
                        <input ref={emailRef} type="email" name='email' className="input" placeholder="Email" required/>
                                  
                                    {/* password */}
                        <label className="label">Password</label>
                        <div className="join">
                            <input type={showPassword?"text" :"password"} name='password' className="input join-item" placeholder="Password" required/>
                            <button type='button'
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
                        {/* {
                            errorMessage && <p className='text-xs text-red-700'>{errorMessage}</p>
                        } */}
                        <div>
                            <button type='button' onClick={handleForgetPassword} className="link link-hover">Forgot password?</button>
                        </div>
                        <button type='submit' to='/auth/login' className="btn btn-success mt-4">Log In</button>
                    </fieldset>
                </form>
                <div className="divider divider-primary">OR</div>
                                {/* Google */}
                <button onClick={handleGoogleSignIn} className="btn btn-success btn-outline hover:text-white  border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
                </button>
                <p className='text-center'>Have No Account? 
                    <span className='font-bold text-red-600 hover:text-green-800 hover:underline'><Link to='/signup'> Register Now</Link></span>
                </p>
            </div>
        </div>
    );
};

export default LogIn;