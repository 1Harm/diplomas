import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      console.log('Login failed', data);
      if (response.ok) {
        console.log('Login successful', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/company');
      } else {
        console.log('Login failed', response.body);
        console.log('Login failed', loginData);
        console.log('Login failed', data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegister = () => {
    navigate('/signup')
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have account?</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignIn;
