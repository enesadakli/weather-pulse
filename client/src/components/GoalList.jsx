import { useDispatch, useSelector } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

export default function GoalList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.goals);

  if (loading) {
    return <p>Loading goals...</p>;
  }

  return (
    <section>
      <h3>Your goals</h3>
      {error && <p className="error">{error}</p>}
      {items.length === 0 ? (
        <p>No goals yet. Add your first goal now.</p>
      ) : (
        <ul className="goal-list">
          {items.map((goal) => (
            <li key={goal.id}>
              <span>{goal.text}</span>
              <button type="button" className="danger" onClick={() => dispatch(deleteGoal(goal.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
