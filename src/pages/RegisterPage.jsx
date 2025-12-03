// src/pages/RegisterPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  
   
  return (
    <div className="auth-container">
      <h2>Create New Account</h2>
      <p>Join our community and start your reading journey.</p>

      <form>
         <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>

         <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

         <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

         <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
        </div>

         <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;