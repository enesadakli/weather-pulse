import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../features/auth/authSlice';

export default function AuthForm() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegisterMode) {
      dispatch(register(formData));
    } else {
      dispatch(login({ email: formData.email, password: formData.password }));
    }
  };

  return (
    <section className="panel">
      <h2>{isRegisterMode ? 'Create account' : 'Sign in'}</h2>
      <form onSubmit={handleSubmit} className="form-stack">
        {isRegisterMode && (
          <label>
            Name
            <input
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            required
          />
        </label>

        <button type="submit">{isRegisterMode ? 'Register' : 'Login'}</button>
      </form>
      <button type="button" className="ghost" onClick={() => setIsRegisterMode((prev) => !prev)}>
        {isRegisterMode ? 'Already have an account? Login' : "Need an account? Register"}
      </button>
      {error && <p className="error">{error}</p>}
    </section>
  );
}
