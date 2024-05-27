import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../../auth';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/dashboard');
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:3001/auth/register', { email, password });
      toast.success('Registration successful, please login');
      history.push('/login');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return(
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
                <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Create Account</h2>
                <form onSubmit={handleRegister}>
                  <div class="row gy-2 overflow-hidden">
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                        <label for="email" class="form-label">Email</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <label for="password" class="form-label">Password</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="d-grid my-3">
                        <button class="btn btn-primary btn-lg" type="submit">Register</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Register;