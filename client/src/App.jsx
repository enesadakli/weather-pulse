import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from './components/AuthForm';
import GoalForm from './components/GoalForm';
import GoalList from './components/GoalList';
import { fetchGoals } from './features/goals/goalSlice';
import { logout } from './features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchGoals());
    }
  }, [dispatch, user]);

  return (
    <main className="container">
      <h1>GoalSetter</h1>
      {!user ? (
        <AuthForm />
      ) : (
        <section className="panel">
          <div className="panel-header">
            <p>
              Welcome, <strong>{user.name}</strong>
            </p>
            <button type="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
          <GoalForm />
          <GoalList />
        </section>
      )}
      {authLoading && <p>Loading...</p>}
    </main>
  );
}
