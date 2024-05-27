import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        console.log(`${response.status} Registration successful`, data);
        navigate('/create-company');
      } else if (response.status === 400) {
        console.log(`${response.status} Bad Request`, data.message);
        alert(data.message);
      } else {
        console.log(`${response.status} Internal Server Error`, data.message);
        alert(`Sorry, problems with server`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration', error);
    }
  };
  

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
