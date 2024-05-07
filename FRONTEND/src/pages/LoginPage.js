import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import HeaderV1 from '../components/Header/HeaderV1';

const LoginPage = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Errors, setErrors] = useState("");
  
  const navigate = useNavigate();

  const handleValid = async (e) => {
    e.preventDefault();
    try{
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              email,
              password
            })
          });
          const content = await response.json();
      
          console.log(content.token)
        
          if (content.token) {
            localStorage.setItem('token', content.token); 
            localStorage.setItem('username', content.username); 
            localStorage.setItem('userId', content.userId); 
            localStorage.setItem('userType', content.userType); 
            localStorage.setItem('userEmail', content.userEmail); 
            localStorage.setItem('userImage', content.userImage); 
            if (content.userType === 'host') {
              navigate('/hostPage');
            } else if (content.userType === 'client') {
              navigate('/home');
      
            } else if(content.userType === 'admin'){
              navigate('/team');
            }
            else {
              console.error('Unknown user type:', content.userType);
            }
          } else {
            console.error('No token received');
          }
    }catch (error) {
        if (error.response) {
          setErrors('email or password not valid');
        }
    }
  };

    return (
        <>
            <div className="py-16 lg:mt-24 mt-12">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}>
                    </div>
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Sign in</h2>
                        <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                        <p className='text-red-600'>{Errors}</p>

                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email" placeholder="examples@example.com" onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* <p className="text-red-500 text-sm mb-4">{errors.email}</p> */}
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>

                            </div>
                            <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"
                                placeholder="*****" onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <p className="text-red-500 text-sm mb-4">{errors.password}</p> */}
                        </div>
                        <div className="mt-8">
                            <button onClick={handleValid} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
                        </div>
                        

                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4"></span>
                            <Link to="/register" className="text-xs text-gray-500 uppercase">or sign up</Link>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
