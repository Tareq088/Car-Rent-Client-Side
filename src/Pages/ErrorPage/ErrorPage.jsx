import React from 'react';
import { Link } from 'react-router';
import Button from '../../assets/UI/Button';

const ErrorPage = () => {
    return (
            <div className='w-11/12 mx-auto p-5 text-center'>
                            {/* <Helmet>
                                <title>FindMate | Error</title>
                            </Helmet> */}
                <h1 className='text-9xl text-red-700 font-extrabold mt-10 mb-5'>404</h1>
                <p>Oops! The page You are looking for doesn't exist.</p>
                <Link to='/'><Button label='Go Back Home'></Button></Link>
            </div>
    );
};

export default ErrorPage;