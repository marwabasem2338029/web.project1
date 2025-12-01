
function LoginPage() {
  return (
    <div className="auth-container">
      <h2>User Login</h2>
      
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default LoginPage;