// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../../auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      history.push('/');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <section class="bg-light py-3 py-md-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div class="card border border-light-subtle rounded-3 shadow-sm">
              <div class="card-body p-3 p-md-4 p-xl-5">
                <div class="text-center mb-3">
                  <a href="#!">
                    <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width="175" height="57" />
                  </a>
                </div>
                <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                <form onSubmit={handleLogin}>
                  <div class="row gy-2 overflow-hidden">
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"/>
                        <label for="email" class="form-label">Email</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                        <label for="password" class="form-label">Password</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="d-flex gap-2 justify-content-between">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe" />
                          <label class="form-check-label text-secondary" for="rememberMe">
                            Keep me logged in
                          </label>
                        </div>
                        <a href="#!" class="link-primary text-decoration-none">Forgot password?</a>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="d-grid my-3">
                        <button class="btn btn-primary btn-lg" type="submit">Log in</button>
                      </div>
                    </div>
                    <div class="col-12">
                      <p class="m-0 text-secondary text-center">Don't have an account? <a href="/register" class="link-primary text-decoration-none">Sign up</a></p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
